/** @type {import('tailwindcss').Config} */

export default {
	content: {
		content: ['./src/**/*.svelte'],
		options: {
			whitelistPatterns: [/svelte-/]
		}
	},
	daisyui: {
		themes: ['light', 'dark', 'cupcake', 'lofi']
	},
	theme: {
		extend: {
			width: {
				128: '32rem'
			}
		}
	},
	plugins: [require('daisyui')]
};
