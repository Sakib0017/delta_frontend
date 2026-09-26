/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Any-device breakpoints:
    // xs  = small phones (≥475px), sm = phones landscape / large phones,
    // md  = tablets portrait, lg = tablets landscape / laptops,
    // xl  = desktops, 2xl = large / ultrawide
    screens: {
      xs: '475px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      container: { center: true, padding: '1rem' },
    },
  },
  plugins: [],
};
