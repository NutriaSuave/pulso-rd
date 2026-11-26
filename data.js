const UPDATED_AT = "26 nov 2026, 11:00 AM";

const rates = {
  USD: [
    { name: "Banreservas", buy: 61.2, sell: 62.0 },
    { name: "Banco Popular", buy: 61.5, sell: 62.3 },
    { name: "BHD", buy: 61.35, sell: 62.15 },
    { name: "Qik", buy: 61.6, sell: 62.1 },
    { name: "Vimenca", buy: 61.55, sell: 62.05 },
  ],
  EUR: [
    { name: "Banreservas", buy: 66.1, sell: 68.4 },
    { name: "Banco Popular", buy: 66.7, sell: 68.1 },
    { name: "BHD", buy: 66.4, sell: 68.25 },
    { name: "Qik", buy: 66.8, sell: 67.95 },
    { name: "Vimenca", buy: 66.55, sell: 68.05 },
  ],
};

const fuels = [
  { id: "premium", name: "Gasolina Premium", price: 280.5 },
  { id: "regular", name: "Gasolina Regular", price: 262.9 },
  { id: "optimo", name: "Gasoil Óptimo", price: 229.3 },
  { id: "gasoilReg", name: "Gasoil Regular", price: 213.7 },
  { id: "glp", name: "GLP (gas vehicular)", price: 134.6 },
];

const FUEL_WEEK_LABEL = "Semana del 24 al 30 nov 2026";

const popularRoutes = [
  { label: "SDQ → Santiago", km: 310 },
  { label: "SDQ → Punta Cana", km: 390 },
  { label: "SDQ → Jarabacoa", km: 290 },
  { label: "SDQ → Puerto Plata", km: 420 },
];

const enginePresets = [
  { label: "Compacto", kmPerGallon: 45 },
  { label: "Sedán", kmPerGallon: 32 },
  { label: "Jeepeta / SUV", kmPerGallon: 22 },
];

const intrantQuestions = [
  {
    q: "¿Qué indica una señal triangular con borde rojo y fondo blanco?",
    options: [
      "Prohibición",
      "Advertencia o peligro",
      "Información",
      "Servicio turístico",
    ],
    correct: 1,
    explain:
      "Las señales triangulares de borde rojo son preventivas: advierten sobre un peligro en la vía más adelante.",
  },
  {
    q: "¿Qué indica una señal circular con borde rojo?",
    options: [
      "Advertencia",
      "Prohibición o restricción",
      "Indicación obligatoria en azul",
      "Servicio",
    ],
    correct: 1,
    explain:
      "El círculo con borde rojo representa una prohibición o restricción, como 'prohibido el paso' o límites de velocidad.",
  },
  {
    q: "Según la Ley 63-17, ¿quién tiene prioridad de paso en una intersección sin señalización?",
    options: [
      "El vehículo más grande",
      "El que llega por la derecha",
      "El que toca bocina primero",
      "El que va más rápido",
    ],
    correct: 1,
    explain:
      "En ausencia de señalización, la prioridad es para el vehículo que se aproxima por la derecha.",
  },
  {
    q: "¿Cuál es el límite de velocidad general en zonas urbanas en República Dominicana, salvo señalización distinta?",
    options: ["40 km/h", "60 km/h", "80 km/h", "100 km/h"],
    correct: 1,
    explain:
      "Según la Ley 63-17, el límite general en zona urbana es de 60 km/h (y 40 km/h en zonas escolares o residenciales).",
  },
  {
    q: "¿Qué color de semáforo en flecha indica que solo puedes avanzar en esa dirección?",
    options: [
      "Flecha roja",
      "Flecha amarilla intermitente",
      "Flecha verde",
      "Cualquier color",
    ],
    correct: 2,
    explain:
      "La flecha verde habilita el movimiento exclusivamente en la dirección que señala.",
  },
  {
    q: "¿Es obligatorio el uso del cinturón de seguridad para todos los pasajeros del vehículo?",
    options: [
      "Solo el conductor",
      "Solo asientos delanteros",
      "Sí, para todos los ocupantes",
      "Solo en carretera",
    ],
    correct: 2,
    explain:
      "La Ley 63-17 exige el uso del cinturón de seguridad para todos los ocupantes, sin importar el asiento.",
  },
  {
    q: "¿Qué debes hacer al acercarte a un cruce escolar con niños presentes?",
    options: [
      "Mantener la velocidad",
      "Reducir la velocidad y extremar precaución",
      "Tocar la bocina para que se aparten",
      "Acelerar para cruzar rápido",
    ],
    correct: 1,
    explain:
      "Cerca de centros escolares se debe reducir la velocidad y prestar máxima atención a los peatones.",
  },
  {
    q: "¿Qué significa una línea continua simple amarilla en el centro de la vía?",
    options: [
      "Se puede adelantar en ambos sentidos",
      "Prohibido adelantar en ambos sentidos",
      "Solo informativa",
      "Carril exclusivo de motores",
    ],
    correct: 1,
    explain:
      "Una línea continua amarilla indica que está prohibido adelantar en ambos sentidos de circulación.",
  },
  {
    q: "¿Qué documento es obligatorio portar al conducir en RD?",
    options: [
      "Solo la cédula",
      "Licencia de conducir vigente",
      "Solo el seguro",
      "Ninguno si el carro es propio",
    ],
    correct: 1,
    explain:
      "Se debe portar la licencia de conducir vigente, además de los documentos del vehículo.",
  },
  {
    q: "¿Qué debes hacer si una ambulancia se aproxima con sirena encendida?",
    options: [
      "Ignorarla si vas con prisa",
      "Detenerte en seco donde estés",
      "Ceder el paso moviéndote con precaución hacia un costado",
      "Acelerar para no estorbar",
    ],
    correct: 2,
    explain:
      "Debes ceder el paso de forma segura, moviéndote hacia el costado de la vía sin maniobras bruscas.",
  },
];
/* ---------- Datos Módulo 04: Transporte Público ---------- */
const transportRoutes = [
  {
    type: "Metro",
    name: "Línea 1 (Villa Mella — Centro de los Héroes)",
    fare: "RD$ 20.00",
    schedule: "Lun–Sáb 6:00 AM – 10:30 PM | Dom/Fer 6:00 AM – 10:00 PM",
    stops:
      "Mamá Tingó, Gregorio Urbano Gilbert, Gregorio Luperón, José Francisco Peña Gómez, Hermanas Mirabal, Máximo Gómez, Los Taínos, Pedro Livio Cedeño, Manuel Arturo Peña Batlle, Juan Pablo Duarte (conexión L2), Prof. Juan Bosch, Casandra Damirón, Joaquín Balaguer, Amín Abel Hasbún, Francisco Alberto Caamaño, Centro de los Héroes (La Feria).",
  },
  {
    type: "Metro",
    name: "Línea 2 (María Montez / Km 9 — Concepción Bona / Megacentro)",
    fare: "RD$ 20.00",
    schedule: "Lun–Sáb 6:00 AM – 10:30 PM | Dom/Fer 6:00 AM – 10:00 PM",
    stops:
      "María Montez (Km 9 Autopista Duarte), Pedro Francisco Bonó, Francisco Gregorio Billini, Ulises Francisco Espaillat, Pedro Mir, Freddy Beras Goico, Juan Ulises García Saleta, Juan Pablo Duarte (conexión L1), Coronel Rafael Tomás Fernández, Mauricio Báez, Ramón Cáceres, Horacio Vásquez, Manuel de Jesús Galván, Eduardo Brito (conexión Teleférico T1), Ercilia Pepín, Rosa Duarte, Trina de Moya de Vásquez, Concepción Bona (Megacentro).",
  },
  {
    type: "Teleférico",
    name: "Línea 1 (Gualey — Sabana Perdida — Charles de Gaulle)",
    fare: "RD$ 20.00 (incluye transferencia gratuita al Metro)",
    schedule: "Lun–Sáb 6:00 AM – 10:30 PM | Dom 8:00 AM – 9:00 PM",
    stops:
      "Gualey (conexión estación Eduardo Brito L2), Los Tres Brazos, Sabana Perdida, Charles de Gaulle.",
  },
  {
    type: "Teleférico",
    name: "Línea 2 (Los Alcarrizos — Km 9 Autopista Duarte)",
    fare: "RD$ 20.00",
    schedule: "Lun–Sáb 6:00 AM – 10:30 PM | Dom 8:00 AM – 9:00 PM",
    stops:
      "Los Alcarrizos, Las Toronjas, Puente Blanco, Los Americanos, Km 9 Autopista Duarte (conexión Metro L2).",
  },
  {
    type: "Corredor",
    name: "Corredor Núñez de Cáceres",
    fare: "RD$ 35.00 (pago electrónico / tarjeta / contactless)",
    schedule: "5:30 AM – 10:30 PM",
    stops:
      "Av. Independencia (Feria) → Av. Rómulo Betancourt → Av. 27 de Febrero → Av. Gustavo Mejía Ricart → Av. John F. Kennedy → Los Ríos / Intec.",
  },
  {
    type: "Corredor",
    name: "Corredor Winston Churchill",
    fare: "RD$ 35.00 (pago electrónico / tarjeta / contactless)",
    schedule: "5:30 AM – 10:30 PM",
    stops:
      "Av. George Washington (Malecón) → Feria → Av. 27 de Febrero → BlueMall / Acrópolis → Av. John F. Kennedy → Plaza de la Salud → Cristo Rey.",
  },
  {
    type: "Corredor",
    name: "Corredor Charles de Gaulle",
    fare: "RD$ 35.00 (pago electrónico / tarjeta / contactless)",
    schedule: "5:30 AM – 10:30 PM",
    stops:
      "Puente Juan Carlos (Autopista Las Américas) → San Isidro → Invivienda → Cancino → Sabana Perdida → Puente Gregorio Luperón → Villa Mella (Estación Mamá Tingó).",
  },
  {
    type: "OMSA",
    name: "Corredor 27 de Febrero (OMSA)",
    fare: "RD$ 15.00 – RD$ 35.00",
    schedule: "6:00 AM – 10:00 PM",
    stops:
      "Pintura (Prolongación 27 de Febrero) → Av. Luperón → Av. Núñez de Cáceres → Av. Winston Churchill → Av. Máximo Gómez → Puente Duarte → Av. Las Américas / Boca Chica.",
  },
];
/* ---------- Datos Módulo 05: Universidades ---------- */
const universities = [
  {
    name: "UASD (Universidad Autónoma de Santo Domingo)",
    city: "Santo Domingo y recintos",
    type: "Pública",
    areas: ["Medicina", "Derecho", "Ingeniería", "Educación", "Contabilidad"],
  },
  {
    name: "INTEC (Instituto Tecnológico de Santo Domingo)",
    city: "Santo Domingo",
    type: "Privada",
    areas: ["Ingeniería", "Medicina", "Economía", "Negocios"],
  },
  {
    name: "PUCMM (Pontificia Universidad Católica Madre y Maestra)",
    city: "Santiago / Santo Domingo",
    type: "Privada",
    areas: [
      "Derecho",
      "Medicina",
      "Ingeniería",
      "Arquitectura",
      "Comunicación",
    ],
  },
  {
    name: "UNPHU (Universidad Nacional Pedro Henríquez Ureña)",
    city: "Santo Domingo",
    type: "Privada",
    areas: ["Arquitectura", "Medicina", "Veterinaria", "Ingeniería", "Derecho"],
  },
  {
    name: "UNAPEC (Universidad APEC)",
    city: "Santo Domingo",
    type: "Privada",
    areas: [
      "Negocios",
      "Ingeniería de Software",
      "Mercadeo",
      "Contabilidad",
      "Diseño",
    ],
  },
  {
    name: "Universidad Dominicana O&M",
    city: "Santo Domingo y recintos",
    type: "Privada",
    areas: [
      "Ingeniería en Sistemas",
      "Contabilidad",
      "Derecho",
      "Administración",
    ],
  },
  {
    name: "UTESA (Universidad Tecnológica de Santiago)",
    city: "Santiago / Santo Domingo",
    type: "Privada",
    areas: ["Medicina", "Ingeniería", "Derecho", "Contabilidad"],
  },
  {
    name: "ITLA (Instituto Tecnológico de Las Américas)",
    city: "La Caleta / Santo Domingo",
    type: "Pública",
    areas: [
      "Desarrollo de Software",
      "Ciberseguridad",
      "Redes",
      "Multimedia",
      "Mecatrónica",
    ],
  },
];
