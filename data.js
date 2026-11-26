const UPDATED_AT = "26 nov 2026, 03:25 PM";

const rates = {
  USD: [
    {
        "name": "Banreservas",
        "buy": 59.27,
        "sell": 60.17
    },
    {
        "name": "Banco Popular",
        "buy": 59.52,
        "sell": 60.42
    },
    {
        "name": "BHD",
        "buy": 59.42,
        "sell": 60.27
    },
    {
        "name": "Qik",
        "buy": 59.62,
        "sell": 60.17
    },
    {
        "name": "Vimenca",
        "buy": 59.57,
        "sell": 60.12
    }
],
  EUR: [
    {
        "name": "Banreservas",
        "buy": 64.32,
        "sell": 66.62
    },
    {
        "name": "Banco Popular",
        "buy": 64.82,
        "sell": 66.32
    },
    {
        "name": "BHD",
        "buy": 64.57,
        "sell": 66.47
    },
    {
        "name": "Qik",
        "buy": 64.92,
        "sell": 66.17
    },
    {
        "name": "Vimenca",
        "buy": 64.72,
        "sell": 66.27
    }
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

/* ---------- Los 17 Peajes Oficiales de RD Vial (Tarifas por pasada en RD$) ---------- */
const tollsData = [
  // Corredor Este
  {
    name: "Las Américas (Autopista Las Américas)",
    corridor: "Este",
    cat1: 100,
    cat2: 200,
    cat3: 300,
    cat4: 400,
    cat5: 600,
  },
  {
    name: "La Romana (Circunvalación de La Romana)",
    corridor: "Este",
    cat1: 100,
    cat2: 200,
    cat3: 300,
    cat4: 400,
    cat5: 600,
  },
  {
    name: "Coral 1 (Autopista del Coral)",
    corridor: "Este",
    cat1: 100,
    cat2: 200,
    cat3: 300,
    cat4: 400,
    cat5: 600,
  },
  {
    name: "Coral 2 (Autopista del Coral)",
    corridor: "Este",
    cat1: 100,
    cat2: 200,
    cat3: 300,
    cat4: 400,
    cat5: 600,
  },
  // Corredor Nordeste (Samaná)
  {
    name: "Marbella (Autopista del Nordeste)",
    corridor: "Nordeste",
    cat1: 100,
    cat2: 200,
    cat3: 300,
    cat4: 400,
    cat5: 600,
  },
  {
    name: "Guaraguao (Autopista del Nordeste)",
    corridor: "Nordeste",
    cat1: 200,
    cat2: 300,
    cat3: 400,
    cat4: 500,
    cat5: 600,
  },
  {
    name: "El Naranjal (Autopista del Nordeste)",
    corridor: "Nordeste",
    cat1: 200,
    cat2: 300,
    cat3: 400,
    cat4: 500,
    cat5: 600,
  },
  {
    name: "El Catey (Bulevar Turístico del Atlántico)",
    corridor: "Nordeste",
    cat1: 400,
    cat2: 1000,
    cat3: 1300,
    cat4: 1600,
    cat5: 1900,
  },
  // Corredor Norte (Cibao)
  {
    name: "Duarte (Km 32 Autopista Duarte)",
    corridor: "Norte",
    cat1: 100,
    cat2: 200,
    cat3: 300,
    cat4: 400,
    cat5: 600,
  },
  {
    name: "Circunvalación Norte de Santiago",
    corridor: "Norte",
    cat1: 100,
    cat2: 200,
    cat3: 300,
    cat4: 400,
    cat5: 600,
  },
  // Corredor Sur
  {
    name: "6 de Noviembre (Autopista 6 de Noviembre)",
    corridor: "Sur",
    cat1: 100,
    cat2: 200,
    cat3: 300,
    cat4: 400,
    cat5: 600,
  },
  {
    name: "Sánchez (Carretera Sánchez)",
    corridor: "Sur",
    cat1: 100,
    cat2: 200,
    cat3: 300,
    cat4: 400,
    cat5: 600,
  },
  {
    name: "Circunvalación de Azua",
    corridor: "Sur",
    cat1: 100,
    cat2: 200,
    cat3: 300,
    cat4: 400,
    cat5: 600,
  },
  // Gran Santo Domingo
  {
    name: "Circunvalación Juan Bosch — Tramo 1",
    corridor: "Santo Domingo",
    cat1: 100,
    cat2: 200,
    cat3: 300,
    cat4: 400,
    cat5: 600,
  },
  {
    name: "Circunvalación Juan Bosch — Tramo 2",
    corridor: "Santo Domingo",
    cat1: 100,
    cat2: 200,
    cat3: 300,
    cat4: 400,
    cat5: 600,
  },
  {
    name: "Circunvalación Juan Bosch — Tramo 2B",
    corridor: "Santo Domingo",
    cat1: 100,
    cat2: 200,
    cat3: 300,
    cat4: 400,
    cat5: 600,
  },
  {
    name: "Avenida Ecológica",
    corridor: "Santo Domingo",
    cat1: 100,
    cat2: 200,
    cat3: 300,
    cat4: 400,
    cat5: 600,
  },
];

// km y peajes totales (ida y vuelta, Categoría 1)
const popularRoutes = [
  {
    label: "SDQ → Santiago",
    km: 310,
    tollsRoundTrip: 200,
    tollNote: "Peaje Duarte (RD$100 ida + RD$100 vuelta)",
  },
  {
    label: "SDQ → Punta Cana",
    km: 390,
    tollsRoundTrip: 800,
    tollNote: "4 peajes por vía: Las Américas, Romana, Coral 1 y 2",
  },
  {
    label: "SDQ → Las Terrenas",
    km: 315,
    tollsRoundTrip: 1800,
    tollNote: "4 peajes por vía: Marbella, Guaraguao, Naranjal y El Catey",
  },
  {
    label: "SDQ → Puerto Plata",
    km: 420,
    tollsRoundTrip: 200,
    tollNote: "Peaje Duarte (RD$100 ida + RD$100 vuelta)",
  },
  {
    label: "SDQ → Barahona",
    km: 374,
    tollsRoundTrip: 400,
    tollNote: "2 peajes por vía: 6 de Noviembre y Circunvalación Azua",
  },
];

const enginePresets = [
  { label: "Compacto", kmPerGallon: 45 },
  { label: "Sedán", kmPerGallon: 32 },
  { label: "Jeepeta / SUV", kmPerGallon: 22 },
];

/* ---------- 25 Preguntas Oficiales Examen Teórico INTRANT (Ley 63-17) ---------- */
const intrantQuestions = [
  {
    q: "¿A qué velocidad máxima está permitido circular en una zona escolar según el examen teórico del INTRANT?",
    options: ["15 km/h", "20 km/h", "40 km/h", "50 km/h"],
    correct: 1,
    explain:
      "El cuestionario oficial del INTRANT establece un límite máximo de 20 km/h en zonas escolares para proteger a los estudiantes.",
  },
  {
    q: "¿Cuál es la velocidad máxima permitida en las avenidas de las zonas urbanas en República Dominicana, salvo señalización distinta?",
    options: ["45 km/h", "60 km/h", "80 km/h", "100 km/h"],
    correct: 1,
    explain:
      "Según la Ley 63-17, el límite general en zonas urbanas es de 60 km/h.",
  },
  {
    q: "¿Cuál es el período de vigencia de la licencia de conducir de Categoría 02 antes de cumplir los 65 años de edad?",
    options: ["2 años", "4 años", "5 años", "6 años"],
    correct: 1,
    explain:
      "La licencia Categoría 02 tiene una vigencia de 4 años hasta los 65 años de edad; a partir de los 65 años pasa a renovarse cada 2 años.",
  },
  {
    q: "¿Cuál es la tasa máxima de alcohol permitida a un conductor titular de un permiso de aprendizaje o transporte público?",
    options: [
      "0.0 miligramos por litro de aire espirado",
      "0.2 miligramos por litro",
      "0.5 miligramos por litro",
      "0.8 miligramos por litro",
    ],
    correct: 0,
    explain:
      "La Ley 63-17 exige tolerancia cero (0.0 mg/l) para conductores con permiso de aprendizaje, transporte público y vehículos de carga.",
  },
  {
    q: "En una situación de aglomeración o para rebasar a otro vehículo, ¿está permitido circular por el paseo o arcén?",
    options: [
      "Sí, si hay tapón",
      "Sí, con luces intermitentes",
      "No, está prohibido",
      "Solo en autopistas",
    ],
    correct: 2,
    explain:
      "Está terminantemente prohibido circular o rebasar utilizando el paseo o arcén; es exclusivo para emergencias.",
  },
  {
    q: "¿Qué indican las líneas blancas continuas empleadas como líneas de carril en la vía?",
    options: [
      "Se puede cambiar de carril con precaución",
      "Está prohibido cambiarse de carril",
      "Carril exclusivo de transporte pesado",
      "Zona de estacionamiento permitido",
    ],
    correct: 1,
    explain:
      "Las líneas blancas continuas indican que está prohibido cambiarse de carril; el conductor debe mantenerse dentro de su carril.",
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
      "Una línea continua amarilla en el eje de la calzada prohíbe adelantar en ambos sentidos de circulación.",
  },
  {
    q: "¿Qué indica una señal triangular con borde rojo y fondo blanco?",
    options: [
      "Prohibición absoluta",
      "Advertencia o peligro",
      "Información turística",
      "Obligación",
    ],
    correct: 1,
    explain:
      "Las señales triangulares con borde rojo son preventivas: advierten sobre un peligro o condición especial más adelante en la vía.",
  },
  {
    q: "¿Qué indica una señal circular con borde rojo?",
    options: [
      "Advertencia",
      "Prohibición o restricción",
      "Servicio auxiliar",
      "Desvío",
    ],
    correct: 1,
    explain:
      "Las señales circulares con borde rojo indican prohibición o restricción (como límites de velocidad o prohibido girar).",
  },
  {
    q: "Según la Ley 63-17, ¿quién tiene prioridad de paso en una intersección sin semáforos ni señalización?",
    options: [
      "El vehículo más grande",
      "El vehículo que se aproxima por la derecha",
      "El que toca bocina primero",
      "El que circula más rápido",
    ],
    correct: 1,
    explain:
      "En intersecciones sin señalización, tiene preferencia de paso el vehículo que llega por la vía de la derecha.",
  },
  {
    q: "Si al acercarnos a una intersección el semáforo cambia a luz amarilla fija, ¿qué debemos hacer?",
    options: [
      "Acelerar para cruzar antes de la roja",
      "Detenernos antes de entrar a la intersección si es seguro hacerlo",
      "Tocar bocina y seguir",
      "Girar a la izquierda sin parar",
    ],
    correct: 1,
    explain:
      "La luz amarilla advierte que el paso está por cerrarse; el conductor debe detenerse antes de la línea de pare.",
  },
  {
    q: "¿Cómo deben ser transportados los niños de hasta seis (6) años en un vehículo de motor?",
    options: [
      "En el asiento delantero con cinturón",
      "En un asiento especial para infantes en el asiento trasero",
      "En los brazos de un adulto",
      "De pie detrás del conductor",
    ],
    correct: 1,
    explain:
      "La Ley 63-17 exige que los niños de hasta 6 años viajen en un sistema de retención infantil (asiento especial) homologado.",
  },
  {
    q: "¿Es obligatorio el uso del cinturón de seguridad para todos los ocupantes del vehículo?",
    options: [
      "Solo para el conductor",
      "Solo en los asientos delanteros",
      "Sí, para todos los pasajeros en cualquier asiento",
      "Solo fuera de la ciudad",
    ],
    correct: 2,
    explain:
      "Todos los ocupantes del vehículo deben llevar abrochado el cinturón de seguridad en todo momento.",
  },
  {
    q: "Hablar por el teléfono celular mientras se conduce utilizando un sistema de manos libres, ¿supone algún peligro?",
    options: [
      "No, es 100% seguro",
      "Sí, porque se pierde capacidad de concentración al volante",
      "Solo de noche",
      "Solo si llueve",
    ],
    correct: 1,
    explain:
      "Aunque se use manos libres, mantener una conversación telefónica reduce la atención y el tiempo de reacción del conductor.",
  },
  {
    q: "¿En qué horario es obligatorio encender las luces de cruce (cortas) junto a las luces de posición?",
    options: [
      "Solo después de medianoche",
      "Entre el ocaso y la salida del sol en todas las vías",
      "Solo en carreteras sin iluminación",
      "Únicamente cuando llueve",
    ],
    correct: 1,
    explain:
      "Es obligatorio llevar encendidas las luces desde la puesta del sol (ocaso) hasta su salida, tanto en zona urbana como rural.",
  },
  {
    q: "¿Cuál es la finalidad principal de las luces cortas o de cruce?",
    options: [
      "Alumbrar a larga distancia",
      "Alumbrar la vía sin deslumbrar a los demás conductores",
      "Sustituir las luces intermitentes",
      "Señalizar estacionamiento",
    ],
    correct: 1,
    explain:
      "Las luces cortas iluminan la calzada delante del vehículo sin encandilar a quienes vienen en sentido contrario.",
  },
  {
    q: "¿De qué color deben ser las luces cortas o de cruce delanteras de un vehículo?",
    options: ["Amarillas o rojas", "Blancas", "Azules", "Verdes"],
    correct: 1,
    explain:
      "Las luces frontales de cruce deben proyectar luz de color blanco.",
  },
  {
    q: "¿Qué debe hacer el conductor cuando un vehículo de emergencia se aproxima con sirena o luces encendidas?",
    options: [
      "Acelerar delante de él",
      "Tomar el carril derecho y reducir la velocidad hasta detenerse si es necesario",
      "Detenerse en el centro de la vía",
      "Ignorarlo si el semáforo está en verde",
    ],
    correct: 1,
    explain:
      "Se debe ceder el paso orillándose hacia la derecha con precaución y deteniéndose si hace falta.",
  },
  {
    q: "¿En qué consiste el Sistema de Licencia por Puntos establecido por la Ley 63-17?",
    options: [
      "En dar descuentos en peajes por buen manejo",
      "En otorgar un crédito de puntos que se van reduciendo al cometer infracciones",
      "En sumar puntos para comprar vehículos",
      "En exonerar multas antiguas",
    ],
    correct: 1,
    explain:
      "Cada titular recibe una cantidad de puntos que se descuentan según la gravedad de las infracciones cometidas.",
  },
  {
    q: "Para mantener una posición correcta al volante, ¿cómo debe regularse el asiento del conductor?",
    options: [
      "Lo más pegado posible al guía",
      "De modo que al pisar a fondo los pedales, las piernas queden ligeramente flexionadas",
      "Totalmente reclinado hacia atrás",
      "Con los brazos completamente estirados y rígidos",
    ],
    correct: 1,
    explain:
      "Las piernas deben quedar ligeramente flexionadas al pisar los pedales para tener control total y evitar lesiones en caso de impacto.",
  },
  {
    q: "¿Qué se entiende por 'distancia de frenado'?",
    options: [
      "La distancia desde que ves el peligro hasta que pisas el freno",
      "La distancia que recorre el vehículo desde que se pisa el freno hasta detenerse por completo",
      "La separación mínima al estacionar",
      "El ancho de una intersección",
    ],
    correct: 1,
    explain:
      "La distancia de frenado es el espacio recorrido desde el instante en que se acciona el pedal de freno hasta la detención total.",
  },
  {
    q: "Para practicar un manejo preventivo seguro, ¿qué acciones son fundamentales?",
    options: [
      "Conducir siempre en el carril izquierdo",
      "Observar constantemente la vía, anticipar maniobras y mantener distancia de seguimiento",
      "Tocar bocina en cada esquina",
      "Frenar bruscamente para probar los neumáticos",
    ],
    correct: 1,
    explain:
      "El manejo defensivo o preventivo se basa en anticiparse al entorno y conservar una distancia prudente respecto al vehículo delantero.",
  },
  {
    q: "¿Qué función cumple la estructura del chasis y la carrocería moderna en caso de colisión?",
    options: [
      "Mantenerse completamente rígida sin deformarse",
      "Absorber la energía cinética deformándose de manera controlada para proteger la cabina",
      "Aumentar la velocidad del impacto",
      "Evitar el uso del cinturón",
    ],
    correct: 1,
    explain:
      "Las zonas de deformación programada absorben la energía del choque para reducir la fuerza que llega a los ocupantes.",
  },
  {
    q: "¿Qué elemento provoca la chispa en el interior de los motores de gasolina para encender la mezcla de aire y combustible?",
    options: ["Los inyectores", "Las bujías", "El alternador", "El radiador"],
    correct: 1,
    explain:
      "Las bujías generan la chispa eléctrica que enciende la mezcla aire-combustible en los cilindros.",
  },
  {
    q: "¿Cubre el seguro obligatorio de vehículo la responsabilidad civil por daños a terceros?",
    options: [
      "No, solo cubre robo",
      "Sí, cubre daños corporales y materiales a terceros dentro de los límites de la póliza",
      "Solo cubre al conductor culpable",
      "Únicamente si el choque ocurre en autopista",
    ],
    correct: 1,
    explain:
      "El seguro obligatorio de ley cubre la responsabilidad civil por daños personales y materiales causados a terceros hasta el límite contratado.",
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
