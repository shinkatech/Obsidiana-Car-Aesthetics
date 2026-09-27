// ============================================================
//  DADOS DO CLIENTE — edite aqui nome, contato, preços e textos.
//  Tudo na página é lido deste arquivo.
// ============================================================

export const BRAND = {
  name: 'Obsidiana',
  full: 'Obsidiana Detail Studio',
  city: 'São Paulo',
  whatsapp: '5511900000000', // só números, com DDI 55 + DDD
  phoneDisplay: '(11) 90000-0000',
  instagram: '@obsidiana.detail',
  instagramUrl: 'https://instagram.com/',
  address: 'Av. Exemplo, 1234 · Pinheiros · São Paulo — SP',
  hours: ['Seg a Sex · 8h às 18h', 'Sábado · 8h às 13h'],
}

// FOTO REAL DO CARRO NO TOPO
// Foto em src/assets/ (ideal: PNG ou WebP sem fundo).
// Para voltar ao carro desenhado em SVG, use src: null.
import carPhoto from './assets/carro.webp'
export const HERO_CAR = {
  src: carPhoto,
  alt: 'SUV vermelho com pintura espelhada sob luz de LED',
  transparent: true, // false se a foto tiver fundo (JPG)
  flip: false, // true para espelhar e deixar a frente virada para a esquerda
  // centro de cada farol em % da foto, para o flare de luz (ou [])
  headlights: [
    { x: 8.3, y: 37.5 },
    { x: 59, y: 43 },
  ],
}

// Preços "a partir de" para um sedã médio. hours = tempo de bancada.
export const SERVICES = [
  {
    id: 'polimento',
    icon: 'polish',
    name: 'Polimento técnico',
    tag: 'Correção de pintura',
    short: 'Remove swirls, hologramas e riscos superficiais do verniz e devolve a profundidade da cor.',
    from: 890,
    hours: 12,
    time: '1 a 2 dias',
    bullets: [
      'Medição de verniz painel a painel',
      'Correção em 1, 2 ou 3 etapas',
      'Refino com boina de acabamento',
      'Leitura de brilho antes e depois',
    ],
  },
  {
    id: 'vitrificacao',
    icon: 'ceramic',
    name: 'Vitrificação cerâmica',
    tag: 'Proteção 9H',
    short: 'Camada cerâmica que repele água e sujeira e mantém o brilho por até 3 anos.',
    from: 1490,
    hours: 10,
    time: '2 dias com cura',
    bullets: [
      'Preparação com polimento de refino',
      'Aplicação em pintura, rodas e vidros',
      'Cura controlada por 24 h',
      'Certificado de garantia',
    ],
  },
  {
    id: 'ppf',
    icon: 'ppf',
    name: 'PPF · película de proteção',
    tag: 'Contra pedras e riscos',
    short: 'Filme de poliuretano transparente e autorregenerativo para frente, capô e pontos de impacto.',
    from: 2900,
    hours: 20,
    time: '2 a 3 dias',
    bullets: [
      'Corte computadorizado por modelo',
      'Bordas envelopadas sem emendas',
      'Regenera micro-riscos com calor',
      'Acabamento brilho ou fosco',
    ],
  },
  {
    id: 'interna',
    icon: 'interior',
    name: 'Higienização interna',
    tag: 'Vapor e extração',
    short: 'Bancos, carpete, teto e dutos limpos com vapor seco, extratora e hidratação de couro.',
    from: 390,
    hours: 6,
    time: '1 dia',
    bullets: [
      'Extração de bancos e carpetes',
      'Vapor seco em saídas de ar',
      'Limpeza e hidratação de couro',
      'Oxi-sanitização do ambiente',
    ],
  },
  {
    id: 'farois',
    icon: 'headlight',
    name: 'Restauração de faróis',
    tag: 'Lente cristalina',
    short: 'Lixamento, polimento e verniz UV para tirar o amarelado e recuperar o alcance do facho.',
    from: 220,
    hours: 3,
    time: '3 horas',
    bullets: [
      'Remoção do verniz oxidado',
      'Lixamento progressivo',
      'Verniz com proteção UV',
      'Teste de facho na entrega',
    ],
  },
  {
    id: 'lavagem',
    icon: 'wash',
    name: 'Lavagem detalhada',
    tag: 'Método de 2 baldes',
    short: 'Pré-lavagem com snow foam, contato seguro, rodas descontaminadas e secagem com ar.',
    from: 150,
    hours: 3,
    time: '3 horas',
    bullets: [
      'Snow foam e pré-lavagem',
      'Lavagem com luva de microfibra',
      'Descontaminação de rodas',
      'Secagem com soprador',
    ],
  },
]

export const VEHICLES = [
  { id: 'hatch', label: 'Hatch', factor: 0.9, path: 'M8 36 L10 27 L30 22 L44 12 L76 12 L94 23 L110 26 L112 36 Z' },
  { id: 'sedan', label: 'Sedã', factor: 1, path: 'M4 36 L6 28 L30 23 L46 13 L74 13 L90 23 L114 25 L116 36 Z' },
  { id: 'suv', label: 'SUV', factor: 1.25, path: 'M6 36 L6 22 L24 18 L36 7 L96 7 L108 18 L114 20 L114 36 Z' },
  { id: 'picape', label: 'Picape', factor: 1.4, path: 'M4 36 L4 21 L22 17 L32 7 L64 7 L68 19 L116 19 L116 36 Z' },
]

export const CONDITIONS = [
  { id: 0, label: 'Pintura boa', hint: 'Poucos riscos, só perdeu o brilho', factor: 1 },
  { id: 1, label: 'Swirls visíveis', hint: 'Marcas circulares sob luz do sol', factor: 1.3 },
  { id: 2, label: 'Muitos riscos', hint: 'Riscos de lavagem e hologramas', factor: 1.65 },
]

export const STEPS = [
  { title: 'Avaliação e laudo', time: '40 min', text: 'Medimos a espessura do verniz em µm e o brilho em GU em cada painel. Você vê os números antes de aprovar.' },
  { title: 'Descontaminação', time: '3 h', text: 'Lavagem técnica, removedor férrico para partículas metálicas e clay bar para o que ficou preso no verniz.' },
  { title: 'Correção', time: '6 a 16 h', text: 'Polimento em 1 a 3 etapas, escolhidas pela leitura do laudo. Nunca tiramos mais verniz do que o necessário.' },
  { title: 'Proteção', time: '24 h', text: 'Vitrificação, PPF ou selante aplicados em sala fechada, com cura controlada por temperatura.' },
  { title: 'Entrega', time: '30 min', text: 'Nova leitura de brilho, inspeção sob luz de LED com você e manual de cuidados impresso.' },
]

export const FAQ = [
  {
    q: 'Quanto tempo dura a vitrificação?',
    a: 'Depende da linha escolhida e dos cuidados: trabalhamos com produtos de 1 a 3 anos, com uma manutenção recomendada a cada 6 meses.',
  },
  {
    q: 'Quando posso lavar o carro depois?',
    a: 'Espere 7 dias para a primeira lavagem, com shampoo neutro. Evite lava-rápido com escovas, porque elas voltam a criar swirls.',
  },
  {
    q: 'O polimento tira qualquer risco?',
    a: 'Tira swirls, hologramas e riscos superficiais do verniz. Se o risco chegou à cor ou ao primer, ele precisa de retoque de pintura. O laudo mostra isso antes de começar.',
  },
  {
    q: 'PPF ou vitrificação: qual escolher?',
    a: 'PPF é um filme físico que absorve impacto de pedras e riscos. Vitrificação é uma camada fina que dá brilho e facilita a limpeza. Muitos clientes fazem PPF na frente e vitrificação no resto do carro.',
  },
  {
    q: 'Vocês buscam o carro?',
    a: 'Sim, com leva e traz agendado. Consulte a área de atendimento pelo WhatsApp.',
  },
]

export const brl = (n) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
