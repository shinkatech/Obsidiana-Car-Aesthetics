# Obsidiana Detail Studio · Landing page

Landing page de estética automotiva em **React 18 + Tailwind CSS 3 + Framer Motion** (Vite).

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera a pasta dist/ para hospedar (Vercel, Netlify, Hostinger...)
```

## Onde editar

| O que | Arquivo |
|---|---|
| Nome, WhatsApp, endereço, horário, Instagram | `src/config.js` → `BRAND` |
| Serviços, preços "a partir de", tempo, itens inclusos | `src/config.js` → `SERVICES` |
| Multiplicador por tipo de veículo e estado da pintura | `src/config.js` → `VEHICLES`, `CONDITIONS` |
| Etapas do processo e perguntas frequentes | `src/config.js` → `STEPS`, `FAQ` |
| Foto do carro no topo, posição dos faróis | `src/config.js` → `HERO_CAR` (imagem em `src/assets/`) |
| Cores e fontes | `tailwind.config.js` |

## Seções e animações

- **Hero**: teto de LED hexagonal acendendo em perspectiva, foto real do carro revelada por uma barra de LED (silhueta de luz que se apaga), flare nos faróis, brilho em loop só sobre a lataria, luz que segue o mouse, reflexo no piso e leituras técnicas contando. Com `HERO_CAR.src = null` volta para o carro em SVG que se desenha traço a traço.
- **Faixa** de serviços rolando.
- **Serviços**: 6 cards com inclinação 3D e brilho seguindo o mouse, giram ao clicar/tocar e cada um tem um ícone SVG animado próprio (politriz, gotas perolando, PPF descolando, vapor, farol, espuma). O verso adiciona o serviço ao orçamento.
- **Antes e depois**: comparador arrastável (mouse, toque e teclado) com swirls gerados em SVG.
- **Processo**: linha do tempo guiada pela rolagem com um carrinho descendo o trilho.
- **Laudo**: 4 manômetros estilo painel de carro com ponteiro animado.
- **Simulador de orçamento**: tipo de veículo, estado da pintura e serviços → faixa de preço animada, medidor em segmentos e botão que abre o WhatsApp com a mensagem pronta.
- **FAQ** em acordeão, CTA final com barra de LED e rodapé.

Respeita `prefers-reduced-motion`. Fontes self-hosted via @fontsource (Big Shoulders Display, Instrument Sans, IBM Plex Mono).
