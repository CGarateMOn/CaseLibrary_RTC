// PILOT / PLACEHOLDER SAMPLE DATA — this page is a design pilot, not wired
// into the Sheets sync yet. Replace with real videos once the layout is
// approved.
//
// `firmSlug` groups cards and picks the accent color (mckinsey/bcg/bain,
// same firm colors as MBB Cases) — "general" is for know-how content that
// isn't tied to one firm, using the brand indigo instead.
const VIDEOS = [
  {
    id: "mckinsey-mock-interview",
    title: "McKinsey Case Interview: Full Mock Interview with Feedback",
    channel: "IGotAnOffer",
    duration: "24:10",
    description: "Entrevista completa simulada con feedback real, al estilo McKinsey.",
    url: "https://www.youtube.com/watch?v=PLACEHOLDER1",
    firm: "McKinsey",
    firmSlug: "mckinsey"
  },
  {
    id: "mckinsey-estructura",
    title: "Cómo estructurar un caso al estilo McKinsey",
    channel: "Management Consulted",
    duration: "15:42",
    description: "Framework paso a paso para estructurar cualquier caso tipo McKinsey.",
    url: "https://www.youtube.com/watch?v=PLACEHOLDER2",
    firm: "McKinsey",
    firmSlug: "mckinsey"
  },
  {
    id: "mckinsey-pei",
    title: "McKinsey PEI (Personal Experience Interview) Explicada",
    channel: "CaseCoach",
    duration: "11:05",
    description: "Qué es la PEI de McKinsey y cómo preparar tus historias.",
    url: "https://www.youtube.com/watch?v=PLACEHOLDER3",
    firm: "McKinsey",
    firmSlug: "mckinsey"
  },
  {
    id: "bcg-walkthrough",
    title: "BCG Case Interview: Full Walkthrough",
    channel: "IGotAnOffer",
    duration: "19:33",
    description: "Caso completo de BCG resuelto de principio a fin.",
    url: "https://www.youtube.com/watch?v=PLACEHOLDER4",
    firm: "BCG",
    firmSlug: "bcg"
  },
  {
    id: "bcg-potential-test",
    title: "Cómo destacar en el BCG Potential Test",
    channel: "Management Consulted",
    duration: "13:20",
    description: "Estrategias para el test online de BCG.",
    url: "https://www.youtube.com/watch?v=PLACEHOLDER5",
    firm: "BCG",
    firmSlug: "bcg"
  },
  {
    id: "bcg-framework",
    title: "Framework para casos de BCG paso a paso",
    channel: "CaseCoach",
    duration: "17:48",
    description: "Cómo adaptar tu framework al estilo particular de BCG.",
    url: "https://www.youtube.com/watch?v=PLACEHOLDER6",
    firm: "BCG",
    firmSlug: "bcg"
  },
  {
    id: "bain-mock",
    title: "Bain Case Interview: Full Mock with Ex-Bain Consultant",
    channel: "IGotAnOffer",
    duration: "22:15",
    description: "Simulación completa con un exconsultor de Bain.",
    url: "https://www.youtube.com/watch?v=PLACEHOLDER7",
    firm: "Bain",
    firmSlug: "bain"
  },
  {
    id: "bain-written-case",
    title: "El Written Case Interview de Bain, explicado",
    channel: "Management Consulted",
    duration: "14:07",
    description: "Cómo prepararte para el caso escrito característico de Bain.",
    url: "https://www.youtube.com/watch?v=PLACEHOLDER8",
    firm: "Bain",
    firmSlug: "bain"
  },
  {
    id: "bain-pei",
    title: "Cómo preparar el PEI de Bain",
    channel: "CaseCoach",
    duration: "9:52",
    description: "La parte de fit de Bain, explicada con ejemplos.",
    url: "https://www.youtube.com/watch?v=PLACEHOLDER9",
    firm: "Bain",
    firmSlug: "bain"
  },
  {
    id: "general-dia-en-la-vida",
    title: "Un día en la vida de un consultor de estrategia",
    channel: "Day in the Life",
    duration: "8:30",
    description: "Cómo es realmente el día a día en una consultora top.",
    url: "https://www.youtube.com/watch?v=PLACEHOLDER10",
    firm: "Cómo ser consultor",
    firmSlug: "general"
  },
  {
    id: "general-habilidades",
    title: "Habilidades clave para triunfar en consultoría",
    channel: "Management Consulted",
    duration: "12:44",
    description: "Más allá de resolver casos: qué hace destacar a un consultor.",
    url: "https://www.youtube.com/watch?v=PLACEHOLDER11",
    firm: "Cómo ser consultor",
    firmSlug: "general"
  },
  {
    id: "general-primer-ano",
    title: "De candidato a consultor: qué esperar el primer año",
    channel: "Life at a Consulting Firm",
    duration: "16:02",
    description: "Qué cambia entre el proceso de selección y el primer año real.",
    url: "https://www.youtube.com/watch?v=PLACEHOLDER12",
    firm: "Cómo ser consultor",
    firmSlug: "general"
  }
];

function getVideos() {
  return Promise.resolve(VIDEOS);
}
