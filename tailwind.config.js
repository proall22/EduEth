/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		// "./components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			screens: {
				lg: "1200px",
			},
			colors: {
				primary: "var(--primary)",
				"primary-dark": "var(--primary-dark)",
			},
		},
	},
	plugins: [import("@tailwindcss/forms")],
};
