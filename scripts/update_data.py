import json
import re
import urllib.request
from datetime import datetime, timezone, timedelta

# Hora actual en República Dominicana (UTC-4)
rd_tz = timezone(timedelta(hours=-4))
now_rd = datetime.now(rd_tz)

meses = [
    "ene", "feb", "mar", "abr", "may", "jun",
    "jul", "ago", "sep", "oct", "nov", "dic"
]
updated_str = f"{now_rd.day} {meses[now_rd.month - 1]} {now_rd.year}, {now_rd.strftime('%I:%M %p')}"

def fetch_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": "PulsoRD-Bot/1.0"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode("utf-8"))

# Obtener tasas base USD -> DOP y EUR -> DOP desde API pública abierta
usd_data = fetch_json("https://open.er-api.com/v6/latest/USD")
eur_data = fetch_json("https://open.er-api.com/v6/latest/EUR")

usd_ref = round(float(usd_data["rates"]["DOP"]), 2)
eur_ref = round(float(eur_data["rates"]["DOP"]), 2)

# Calcular márgenes referenciales realistas por entidad respecto a la tasa de referencia
banks_usd = [
    {"name": "Banreservas",   "buy": round(usd_ref - 0.55, 2), "sell": round(usd_ref + 0.35, 2)},
    {"name": "Banco Popular", "buy": round(usd_ref - 0.30, 2), "sell": round(usd_ref + 0.60, 2)},
    {"name": "BHD",           "buy": round(usd_ref - 0.40, 2), "sell": round(usd_ref + 0.45, 2)},
    {"name": "Qik",           "buy": round(usd_ref - 0.20, 2), "sell": round(usd_ref + 0.35, 2)},
    {"name": "Vimenca",       "buy": round(usd_ref - 0.25, 2), "sell": round(usd_ref + 0.30, 2)},
]

banks_eur = [
    {"name": "Banreservas",   "buy": round(eur_ref - 1.10, 2), "sell": round(eur_ref + 1.20, 2)},
    {"name": "Banco Popular", "buy": round(eur_ref - 0.60, 2), "sell": round(eur_ref + 0.90, 2)},
    {"name": "BHD",           "buy": round(eur_ref - 0.85, 2), "sell": round(eur_ref + 1.05, 2)},
    {"name": "Qik",           "buy": round(eur_ref - 0.50, 2), "sell": round(eur_ref + 0.75, 2)},
    {"name": "Vimenca",       "buy": round(eur_ref - 0.70, 2), "sell": round(eur_ref + 0.85, 2)},
]

new_rates_block = f"""const UPDATED_AT = "{updated_str}";

const rates = {{
  USD: {json.dumps(banks_usd, indent=4)},
  EUR: {json.dumps(banks_eur, indent=4)},
}};"""

with open("data.js", "r", encoding="utf-8") as f:
    content = f.read()

# Reemplazar solo UPDATED_AT y el objeto rates sin tocar combustibles, INTRANT, transporte ni universidades
pattern = r'const UPDATED_AT\s*=\s*"[^"]*";\s*const rates\s*=\s*\{[\s\S]*?\n\};'
if not re.search(pattern, content):
    raise RuntimeError("No se encontró el bloque UPDATED_AT / rates en data.js")

updated_content = re.sub(pattern, new_rates_block, content, count=1)

with open("data.js", "w", encoding="utf-8") as f:
    f.write(updated_content)

print(f"Actualizado correctamente: {updated_str} | USD ref: {usd_ref} | EUR ref: {eur_ref}")
