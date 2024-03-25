/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html", "./src/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
      colors: {
        PaRxGreen: '#95bc87',
        PaRxDGrenn: '#404729',
      },
      width: {
        "1/8": "12.5%"
      },
    },
	},
	plugins: [],
};
