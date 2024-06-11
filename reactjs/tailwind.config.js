/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		"./src/**/*.{html,js,jsx}",
		// "./node_modules/flowbite/**/*.js"
	],

	theme: {
		container: {
			padding: {
				DEFAULT: "1rem",
				sm: "2rem",
				lg: "4rem",
				xl: "5rem",
				"2xl": "6rem",
			},
		},
		extend: {
			colors: {
				primary: "#1A1A2E",
				primaryHover: "#484858",
				secondary: "#DD7224",
				secondaryHover: "#FF8B37",
			},
		},
	},
	plugins: [
		// require("flowbite/plugin")
	],
};

export default config;
