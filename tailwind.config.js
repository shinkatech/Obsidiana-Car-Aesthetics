/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        asphalt: '#090C11', // fundo do box
        bay: '#10151D',     // painéis
        steel: '#222A36',   // linhas e bordas
        mist: '#8D99AC',    // texto secundário
        chrome: '#E9EEF5',  // texto principal
        led: '#8FDBFF',     // luz LED fria (acento)
        amber: '#FFB23F',   // defeitos / "antes"
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', 'Impact', 'Arial Narrow', 'sans-serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        sweep: { '0%': { transform: 'translateX(-120%) skewX(-20deg)' }, '100%': { transform: 'translateX(220%) skewX(-20deg)' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        sweep: 'sweep 2.8s cubic-bezier(.6,0,.2,1) infinite',
      },
    },
  },
  plugins: [],
}
