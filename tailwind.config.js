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
	plugins: [require('daisyui')]
};
