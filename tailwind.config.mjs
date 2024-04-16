/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				purple: '#A408FF',
				blue: '#1760EC',
				green:'#2FF5A3'
			}
		},
	},
	plugins: [],
}
