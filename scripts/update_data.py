import json
import re
import ssl
import urllib.request
from datetime import datetime, timezone, timedelta

rd_tz = timezone(timedelta(hours=-4))
now_rd = datetime.now(rd_tz)

MESES = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
]
MESES_ABR = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
DIAS_SEMANA = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]

updated_str = f"{now_rd.day} {MESES_ABR[now_rd.month - 1]} {now_rd.year}, {now_rd.strftime('%I:%M %p')}"

# SSL con verificación normal (NO desactivada). Si un sitio da error de
# certificado real, se soluciona puntualmente, nunca apagando la verificación.
def fetch_url(url, timeout=15):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (PulsoRD-Bot/2.0)"})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read().decode("utf-8", errors="ignore")

def strip_html(html):
    text = re.sub(r"<script[\s\S]*?</script>", " ", html, flags=re.IGNORECASE)
    text = re.sub(r"<style[\s\S]*?</style>", " ", text, flags=re.IGNORECASE)
    text = re.sub(r"<[^>]+>", " ", text)
    return re.sub(r"\s+", " ", text)

def two_amounts_near(text, keyword, window=220):
    """
    Busca 'keyword' (nombre del banco/remesadora) y toma los dos primeros
    montos RD$ que aparecen después, dentro de 'window' caracteres.
    El menor es compra, el mayor es venta (siempre cierto por definición
    del spread bancario, sin importar en qué orden los mencione el texto).
    """
    m = re.search(re.escape(keyword), text, re.IGNORECASE)
    if not m:
        return None
    snippet = text[m.end(): m.end() + window]
    nums = re.findall(r"RD\$\s?([\d]{2,3}(?:[.,]\d{1,2})?)", snippet)
    if len(nums) < 2:
        return None
    vals = sorted(float(n.replace(",", ".")) for n in nums[:2])
    return {"buy": round(vals[0], 2), "sell": round(vals[1], 2)}

# ---------- Fuente 1: elcaribe.com.do (Banreservas, Popular, Vimenca, Caribe Express) ----------
def scrape_elcaribe():
    mes = MESES[now_rd.month - 1]
    url = f"https://www.elcaribe.com.do/panorama/dinero/dolar-hoy-republica-dominicana-{now_rd.day}-{mes}-{now_rd.year}/"
    try:
        text = strip_html(fetch_url(url))
        out = {}
        br = two_amounts_near(text, "Banreservas") or two_amounts_near(text, "Banco de Reservas")
        if br:
            out["Banreservas"] = br
        bp = two_amounts_near(text, "Banco Popular")
        if bp:
            out["Banco Popular"] = bp
        wu = two_amounts_near(text, "Western Union")
        if wu:
            out["Vimenca"] = wu
        ce = two_amounts_near(text, "Caribe Express")
        if ce:
            out["Caribe Express"] = ce
        return out
    except Exception as e:
        print(f"Aviso elcaribe.com.do: {e}")
        return {}

# ---------- Fuente 2: eldia.com.do (Banreservas, Popular, BHD) ----------
def scrape_eldia():
    mes = MESES[now_rd.month - 1]
    dia_semana = DIAS_SEMANA[now_rd.weekday()]
    url = f"https://eldia.com.do/tasa-del-dolar-hoy-{dia_semana}-{now_rd.day}-de-{mes}-de-{now_rd.year}/"
    try:
        text = strip_html(fetch_url(url))
        out = {}
        br = two_amounts_near(text, "Banreservas") or two_amounts_near(text, "Banco de Reservas")
        if br:
            out["Banreservas"] = br
        bp = two_amounts_near(text, "Banco Popular")
        if bp:
            out["Banco Popular"] = bp
        bhd = two_amounts_near(text, "BHD")
        if bhd:
            out["BHD"] = bhd
        return out
    except Exception as e:
        print(f"Aviso eldia.com.do: {e}")
        return {}

# ---------- Combinar fuentes ----------
# Orden de prioridad por entidad: si la primera fuente no trae el dato,
# se usa la segunda. Si ninguna trae el dato, NO se toca ese banco:
# se queda con el último valor conocido en data.js (fail-safe).
scraped_a = scrape_elcaribe()
scraped_b = scrape_eldia()

BANK_ORDER = ["Banreservas", "Banco Popular", "BHD", "Vimenca", "Caribe Express"]
combined = {}
for name in BANK_ORDER:
    combined[name] = scraped_a.get(name) or scraped_b.get(name)

with open("data.js", "r", encoding="utf-8") as f:
    content = f.read()

# Tomamos los bancos actuales de data.js como base, y solo pisamos los que
# sí se pudieron confirmar hoy. Esto evita que un fallo parcial de scraping
# borre bancos que no fallaron.
m_current = re.search(r'const rates\s*=\s*(\{[\s\S]*?\n\});', content)
current_rates = {}
if m_current:
    try:
        # data.js no es JSON estricto (claves sin comillas), así que
        # extraemos los bancos actuales con una pasada simple por regex
        # en vez de parsear el objeto completo.
        for bank_match in re.finditer(
            r'\{\s*name:\s*"([^"]+)",\s*buy:\s*([\d.]+),\s*sell:\s*([\d.]+)\s*\}',
            m_current.group(1),
        ):
            current_rates[bank_match.group(1)] = {
                "buy": float(bank_match.group(2)),
                "sell": float(bank_match.group(3)),
            }
    except Exception as e:
        print(f"Aviso: no se pudo leer rates actual de data.js: {e}")

usd_banks = []
any_update = False
for name in BANK_ORDER:
    if combined[name]:
        usd_banks.append({"name": name, **combined[name]})
        any_update = True
    elif name in current_rates:
        usd_banks.append({"name": name, **current_rates[name]})
    else:
        print(f"Aviso: sin dato (ni nuevo ni previo) para {name}; se omite esta corrida.")

if not any_update:
    raise RuntimeError(
        "Ninguna fuente de scraping respondió hoy (ni elcaribe ni eldia). "
        "No se actualiza nada para no sobreescribir datos buenos con nada."
    )

# EUR: no hay fuente pública confiable con desglose por banco (pendiente).
# Se mantiene el bloque EUR tal cual está en data.js.
m_eur = re.search(r'EUR:\s*(\[[\s\S]*?\])', content)
eur_block = m_eur.group(1) if m_eur else "[]"

new_rates_block = f"""const UPDATED_AT = "{updated_str}";

const rates = {{
  USD: {json.dumps(usd_banks, indent=4, ensure_ascii=False)},
  EUR: {eur_block},
}};"""

pattern_rates = r'const UPDATED_AT\s*=\s*"[^"]*";\s*const rates\s*=\s*\{[\s\S]*?\n\};'
if not re.search(pattern_rates, content):
    raise RuntimeError("No se encontró el bloque UPDATED_AT / rates en data.js")
content = re.sub(pattern_rates, new_rates_block, content, count=1)

# ---------- Combustibles (igual que antes, solo cambia la verificación SSL) ----------
def try_update_fuels(js_text):
    try:
        html = fetch_url("https://micm.gob.do/")
        text = strip_html(html)

        fuel_patterns = [
            ("premium", "Gasolina Premium", r"Gasolina\s+Premium[^0-9]{0,40}(\d{3}\.\d{2})"),
            ("regular", "Gasolina Regular", r"Gasolina\s+Regular[^0-9]{0,40}(\d{3}\.\d{2})"),
            ("optimo", "Gasoil Óptimo", r"Gasoil\s+[ÓO]ptimo[^0-9]{0,40}(\d{3}\.\d{2})"),
            ("gasoilReg", "Gasoil Regular", r"Gasoil\s+Regular[^0-9]{0,40}(\d{3}\.\d{2})"),
            ("glp", "GLP (gas vehicular)", r"(?:Gas\s+Licuado|GLP)[^0-9]{0,50}(\d{3}\.\d{2})"),
        ]

        parsed_fuels = []
        for fid, fname, pat in fuel_patterns:
            m = re.search(pat, text, re.IGNORECASE)
            if not m:
                print(f"No se pudo extraer {fname} del HTML del MICM; se conservan precios actuales.")
                return js_text
            parsed_fuels.append({"id": fid, "name": fname, "price": float(m.group(1))})

        days_since_sat = (now_rd.weekday() + 2) % 7
        sat = now_rd - timedelta(days=days_since_sat)
        fri = sat + timedelta(days=6)
        week_label = f"Semana del {sat.day} {MESES_ABR[sat.month - 1]} al {fri.day} {MESES_ABR[fri.month - 1]} {fri.year}"

        new_fuels_block = f"""const fuels = {json.dumps(parsed_fuels, indent=2, ensure_ascii=False)};

const FUEL_WEEK_LABEL = "{week_label}";"""

        pat_fuels = r'const fuels\s*=\s*\[[\s\S]*?\];\s*const FUEL_WEEK_LABEL\s*=\s*"[^"]*";'
        if re.search(pat_fuels, js_text):
            js_text = re.sub(pat_fuels, new_fuels_block, js_text, count=1)
            print(f"Combustibles actualizados desde MICM: {week_label}")
    except Exception as e:
        print(f"Aviso MICM (se mantienen precios vigentes): {e}")
    return js_text

content = try_update_fuels(content)

with open("data.js", "w", encoding="utf-8") as f:
    f.write(content)

print(f"Actualización completada: {updated_str}")
print(f"Bancos confirmados hoy por scraping: {list(combined.keys())}")
for name, val in combined.items():
    print(f"  {name}: {'OK' if val else 'sin dato nuevo, se conservó el anterior'}")
