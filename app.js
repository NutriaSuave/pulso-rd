/* ---------- Tema ---------- */
const themeToggle = document.getElementById("themeToggle");

function systemPrefersDark() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

function applyTheme(theme) {
  if (theme) document.documentElement.setAttribute("data-theme", theme);
  else document.documentElement.removeAttribute("data-theme");

  const effectiveDark = theme ? theme === "dark" : systemPrefersDark();
  themeToggle.textContent = effectiveDark ? "Modo claro" : "Modo oscuro";
}

let savedTheme = null;
try {
  savedTheme = localStorage.getItem("pulsoRdTheme");
} catch (e) {}

applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const currentlyDark = current ? current === "dark" : systemPrefersDark();
  const next = currentlyDark ? "light" : "dark";

  applyTheme(next);
  try {
    localStorage.setItem("pulsoRdTheme", next);
  } catch (e) {}
});

function formatMoney(n, symbol) {
  return (
    symbol +
    " " +
    n.toLocaleString("es-DO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

/* ---------- Ticker dinámico ---------- */
const tickerRow = document.getElementById("tickerRow");

const bestUsdBuy = Math.max(...rates.USD.map((b) => b.buy));
const bestUsdSell = Math.min(...rates.USD.map((b) => b.sell));
const bestEurBuy = Math.max(...rates.EUR.map((b) => b.buy));
const bestEurSell = Math.min(...rates.EUR.map((b) => b.sell));
const premFuel = fuels.find((f) => f.id === "premium") || fuels[0];

tickerRow.innerHTML = `
  <a class="tick" href="#divisas">
    <div class="label">Dólar (mejor tasa)</div>
    <div class="pair">
      <span class="v">${bestUsdBuy.toFixed(2)}<span class="k">Compra</span></span>
      <span class="v">${bestUsdSell.toFixed(2)}<span class="k">Venta</span></span>
    </div>
  </a>

  <a class="tick" href="#divisas">
    <div class="label">Euro (mejor tasa)</div>
    <div class="pair">
      <span class="v">${bestEurBuy.toFixed(2)}<span class="k">Compra</span></span>
      <span class="v">${bestEurSell.toFixed(2)}<span class="k">Venta</span></span>
    </div>
  </a>

  <a class="tick" href="#combustibles">
    <div class="label">${premFuel.name}</div>
    <div class="pair">
      <span class="v">${premFuel.price.toFixed(2)}<span class="k">RD$/galón</span></span>
    </div>
  </a>

  <a class="tick" href="#intrant">
    <div class="label">Examen INTRANT</div>
    <div class="pair">
      <span class="v">${intrantQuestions.length}<span class="k">Preguntas</span></span>
    </div>
  </a>

  <a class="tick" href="#transporte">
    <div class="label">Transporte SDQ</div>
    <div class="pair">
      <span class="v">${transportRoutes.length}<span class="k">Rutas</span></span>
    </div>
  </a>
`;

/* ---------- 01 Divisas ---------- */
document.getElementById("updatedNote").textContent =
  `Actualizado: ${UPDATED_AT}`;

const dState = { dir: "buy", cur: "USD" };
let amountTouched = false;

const bankSelect = document.getElementById("bank");
const bankList = document.getElementById("bankList");
const amountInput = document.getElementById("amount");
const amountLabel = document.getElementById("amountLabel");
const resultLabel = document.getElementById("resultLabel");
const resultValue = document.getElementById("resultValue");
const dirToggle = document.getElementById("dirToggle");
const curToggle = document.getElementById("curToggle");
const shareBtn = document.getElementById("shareBtn");

amountInput.addEventListener("input", () => {
  amountTouched = true;
  calc();
});

function renderDivisas() {
  const list = rates[dState.cur];
  const op = dState.dir;

  const best = list.reduce((a, b) =>
    op === "buy" ? (b.buy > a.buy ? b : a) : b.sell < a.sell ? b : a,
  );

  bankSelect.innerHTML = "";
  bankList.innerHTML = "";

  list.forEach((b) => {
    const opt = document.createElement("option");
    opt.value = b.name;
    opt.textContent = `${b.name} — ${b[op].toFixed(2)}`;
    bankSelect.appendChild(opt);

    const row = document.createElement("div");
    row.className = "bank-row" + (b.name === best.name ? " best" : "");
    row.innerHTML = `<span class="name">${b.name}</span><span class="num${op === "buy" ? " used" : ""}">${b.buy.toFixed(2)}</span><span class="num${op === "sell" ? " used" : ""}">${b.sell.toFixed(2)}</span>`;

    bankList.appendChild(row);
  });

  bankSelect.value = best.name;

  if (!amountTouched) amountInput.value = op === "buy" ? 100 : 5000;

  if (op === "buy") {
    amountLabel.textContent = `Monto en ${dState.cur}`;
    resultLabel.textContent = "Recibes en pesos dominicanos";
  } else {
    amountLabel.textContent = "Monto en pesos dominicanos (DOP)";
    resultLabel.textContent = `Recibes en ${dState.cur}`;
  }

  calc();
}

let lastSummary = "";

function calc() {
  const amount = parseFloat(amountInput.value) || 0;
  const bank = rates[dState.cur].find((b) => b.name === bankSelect.value);
  const rate = bank ? bank[dState.dir] : 0;
  const bankName = bank ? bank.name : "";

  if (dState.dir === "buy") {
    const out = amount * rate;
    resultValue.textContent = formatMoney(out, "RD$");
    lastSummary = `${amount} ${dState.cur} = ${formatMoney(out, "RD$")} en ${bankName} (tasa ${rate.toFixed(2)}) — vía Pulso RD`;
  } else {
    const symbol = dState.cur === "USD" ? "US$" : "€";
    const out = rate ? amount / rate : 0;
    resultValue.textContent = formatMoney(out, symbol);
    lastSummary = `${formatMoney(amount, "RD$")} = ${formatMoney(out, symbol)} en ${bankName} (tasa ${rate.toFixed(2)}) — vía Pulso RD`;
  }
}

dirToggle.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-dir]");
  if (!btn) return;
  dState.dir = btn.dataset.dir;
  [...dirToggle.children].forEach((b) =>
    b.classList.toggle("active", b === btn),
  );
  renderDivisas();
});

curToggle.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-cur]");
  if (!btn) return;
  dState.cur = btn.dataset.cur;
  [...curToggle.children].forEach((b) =>
    b.classList.toggle("active", b === btn),
  );
  renderDivisas();
});

bankSelect.addEventListener("change", calc);

shareBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(lastSummary);
  } catch (e) {}
  shareBtn.textContent = "Copiado ✓";
  shareBtn.classList.add("copied");
  setTimeout(() => {
    shareBtn.textContent = "Copiar resumen";
    shareBtn.classList.remove("copied");
  }, 1800);
});

renderDivisas();

/* ---------- 02 Combustibles y Peajes ---------- */
document.getElementById("fuelWeekNote").textContent = FUEL_WEEK_LABEL;

const fuelTable = document.getElementById("fuelTable");
const fuelType = document.getElementById("fuelType");

fuels.forEach((f) => {
  const row = document.createElement("div");
  row.className = "fuel-row";
  row.innerHTML = `<span>${f.name}</span><span class="price">RD$ ${f.price.toFixed(2)}<span class="unit"> /galón</span></span>`;
  fuelTable.appendChild(row);

  const opt = document.createElement("option");
  opt.value = f.id;
  opt.textContent = f.name;
  fuelType.appendChild(opt);
});

const fuelModeToggle = document.getElementById("fuelModeToggle");
const fuelAmountLabel = document.getElementById("fuelAmountLabel");
const fuelAmount = document.getElementById("fuelAmount");
const fuelResultLabel = document.getElementById("fuelResultLabel");
const fuelResultValue = document.getElementById("fuelResultValue");

let fuelMode = "byAmount";

function fuelCalc() {
  const f = fuels.find((x) => x.id === fuelType.value);
  const val = parseFloat(fuelAmount.value) || 0;

  if (fuelMode === "byAmount") {
    fuelResultLabel.textContent = "Galones aproximados";
    fuelResultValue.textContent = (f.price ? val / f.price : 0).toLocaleString(
      "es-DO",
      { minimumFractionDigits: 2, maximumFractionDigits: 2 },
    );
  } else {
    fuelResultLabel.textContent = "Pagas aproximadamente";
    fuelResultValue.textContent = formatMoney(val * f.price, "RD$");
  }
}

const tripKm = document.getElementById("tripKm");
const tripEff = document.getElementById("tripEff");
const tripTolls = document.getElementById("tripTolls");
const tripBreakdown = document.getElementById("tripBreakdown");
const tripResultValue = document.getElementById("tripResultValue");
const routeChips = document.getElementById("routeChips");
const engineChips = document.getElementById("engineChips");

popularRoutes.forEach((r) => {
  const b = document.createElement("button");
  b.className = "chip";
  b.type = "button";
  b.textContent = `${r.label} (${r.km} km)`;
  b.title = r.tollNote;
  b.addEventListener("click", () => {
    tripKm.value = r.km;
    tripTolls.value = r.tollsRoundTrip;
    tripCalc();
  });
  routeChips.appendChild(b);
});

enginePresets.forEach((e) => {
  const b = document.createElement("button");
  b.className = "chip";
  b.type = "button";
  b.textContent = `${e.label} (${e.kmPerGallon} km/g)`;
  b.addEventListener("click", () => {
    tripEff.value = e.kmPerGallon;
    tripCalc();
  });
  engineChips.appendChild(b);
});

function tripCalc() {
  const f = fuels.find((x) => x.id === fuelType.value);
  const km = parseFloat(tripKm.value) || 0;
  const eff = parseFloat(tripEff.value) || 1;
  const tolls = parseFloat(tripTolls.value) || 0;
  const gasCost = (km / eff) * f.price;
  const total = gasCost + tolls;

  tripBreakdown.textContent = `Gasolina: ${formatMoney(gasCost, "RD$")} + Peajes: ${formatMoney(tolls, "RD$")}`;
  tripResultValue.textContent = formatMoney(total, "RD$");
}

const tollTableBody = document.getElementById("tollTableBody");
let lastCorridor = "";
tollsData.forEach((t) => {
  if (t.corridor !== lastCorridor) {
    lastCorridor = t.corridor;
    const trHead = document.createElement("tr");
    trHead.className = "toll-corridor";
    trHead.innerHTML = `<td colspan="6">Corredor ${t.corridor}</td>`;
    tollTableBody.appendChild(trHead);
  }
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${t.name}</td>
    <td><strong>RD$ ${t.cat1}</strong></td>
    <td>RD$ ${t.cat2}</td>
    <td>RD$ ${t.cat3}</td>
    <td>RD$ ${t.cat4}</td>
    <td>RD$ ${t.cat5}</td>
  `;
  tollTableBody.appendChild(tr);
});

fuelType.addEventListener("change", () => {
  fuelCalc();
  tripCalc();
});
fuelAmount.addEventListener("input", fuelCalc);
tripKm.addEventListener("input", tripCalc);
tripEff.addEventListener("input", tripCalc);
tripTolls.addEventListener("input", tripCalc);

fuelModeToggle.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-mode]");
  if (!btn) return;
  fuelMode = btn.dataset.mode;
  [...fuelModeToggle.children].forEach((b) =>
    b.classList.toggle("active", b === btn),
  );
  if (fuelMode === "byAmount") {
    fuelAmountLabel.textContent = "Monto en RD$";
    fuelAmount.value = 1000;
  } else {
    fuelAmountLabel.textContent = "Cantidad de galones";
    fuelAmount.value = 10;
  }
  fuelCalc();
});

fuelCalc();
tripCalc();

/* ---------- 03 Simulador INTRANT ---------- */
const quizBox = document.getElementById("quizBox");
const quizProgress = document.getElementById("quizProgress");
const QUIZ_SIZE = 10;

function shuffle(a) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

let quizSet = shuffle(intrantQuestions).slice(0, QUIZ_SIZE);
let qIdx = 0;
let score = 0;

function renderQuestion() {
  if (qIdx >= quizSet.length) {
    const pct = Math.round((score / quizSet.length) * 100);
    const passed = pct >= 70;
    quizProgress.textContent = "Resultado final";
    quizBox.innerHTML = `
      <div class="quiz-q">${passed ? "¡Aprobado!" : "Necesitas repasar un poco más"}</div>
      <p class="section-sub">Obtuviste <strong>${score} de ${quizSet.length}</strong> respuestas correctas (${pct}%). El mínimo para aprobar suele ser 70%.</p>
      <button class="quizBtn" id="restartQuiz">Intentar de nuevo</button>
    `;
    document.getElementById("restartQuiz").addEventListener("click", () => {
      quizSet = shuffle(intrantQuestions).slice(0, QUIZ_SIZE);
      qIdx = 0;
      score = 0;
      renderQuestion();
    });
    return;
  }

  const item = quizSet[qIdx];
  quizProgress.textContent = `Pregunta ${qIdx + 1} de ${quizSet.length}`;
  quizBox.innerHTML = `
    <div class="quiz-q">${item.q}</div>
    <div class="quiz-opts">
      ${item.options.map((opt, i) => `<button class="quiz-opt" data-i="${i}">${opt}</button>`).join("")}
    </div>
    <div id="quizFeedback"></div>
  `;

  const opts = quizBox.querySelectorAll(".quiz-opt");
  opts.forEach((btn) => {
    btn.addEventListener("click", () => {
      const chosen = Number(btn.dataset.i);
      opts.forEach((b) => (b.disabled = true));
      if (chosen === item.correct) {
        btn.classList.add("ok");
        score++;
      } else {
        btn.classList.add("bad");
        opts[item.correct].classList.add("ok");
      }
      document.getElementById("quizFeedback").innerHTML = `
        <div class="quiz-explain">${item.explain}</div>
        <button class="quizBtn" id="nextQ">${qIdx + 1 < quizSet.length ? "Siguiente pregunta" : "Ver resultado"}</button>
      `;
      document.getElementById("nextQ").addEventListener("click", () => {
        qIdx++;
        renderQuestion();
      });
    });
  });
}

renderQuestion();

/* ---------- 04 Transporte Público ---------- */
const routeList = document.getElementById("routeList");
const transportFilter = document.getElementById("transportFilter");
const transportSearch = document.getElementById("transportSearch");

let activeTransportType = "ALL";

function renderRoutes() {
  const query = transportSearch.value.trim().toLowerCase();
  const filtered = transportRoutes.filter((r) => {
    const matchesType =
      activeTransportType === "ALL" || r.type === activeTransportType;
    const haystack = `${r.type} ${r.name} ${r.stops}`.toLowerCase();
    return matchesType && haystack.includes(query);
  });

  if (filtered.length === 0) {
    routeList.innerHTML = `<div class="route-empty">No se encontraron rutas con "${transportSearch.value}". Prueba con otra avenida o parada.</div>`;
    return;
  }

  routeList.innerHTML = filtered
    .map(
      (r) => `
      <article class="route-card">
        <div class="route-top">
          <span class="route-badge">${r.type}</span>
          <span class="route-fare">${r.fare}</span>
        </div>
        <div class="route-title">${r.name}</div>
        <p class="route-stops"><strong>Recorrido / Paradas:</strong> ${r.stops}</p>
        <div class="route-sched">Horario: ${r.schedule}</div>
      </article>
    `,
    )
    .join("");
}

transportFilter.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-type]");
  if (!btn) return;
  activeTransportType = btn.dataset.type;
  [...transportFilter.children].forEach((b) =>
    b.classList.toggle("active", b === btn),
  );
  renderRoutes();
});

transportSearch.addEventListener("input", renderRoutes);
renderRoutes();
