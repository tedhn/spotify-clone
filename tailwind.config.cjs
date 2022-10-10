/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],

	theme: {
		colors: {
			green: "#1db954",
			black: "#121212",
			darkgrey: "#212121",
			grey: "#535353",
			lightgrey: "#b3b3b3",
			white: "#ffffff",
		},
		fontFamily: {
			spotify: ["spotify-font", "sans-serif"],
		},
	},
	plugins: [],
};
