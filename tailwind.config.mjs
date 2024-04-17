/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        purple: '#A408FF',
        blue: '#1760EC',
        green: '#2FF5A3',
        'almost-white': '#EBF0F8',
        'light-grey': '#BCBCBC',
      },
      boxShadow: {
        'serviceCard': '0 8px 10px 0 rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
