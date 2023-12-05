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
				110: '25rem',
				120: '30rem',
				130: '35rem',
				140: '40rem'
			}
		}
	},
	plugins: [require('daisyui')]
};
