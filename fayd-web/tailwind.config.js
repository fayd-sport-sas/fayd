/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // Inter se declaraba pero nunca se cargaba (sin @font-face ni <link>);
      // el render real siempre fue system-ui. Se declara explícito.
      fontFamily: { sans: ['system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
