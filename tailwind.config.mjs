// const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		screens:{
			'sm': '640px',
			'tab': '768px',
			'lg': '1024px',	  
			'xl': '1280px',
		  },
		extend: {},
	},
	plugins: [],
};
