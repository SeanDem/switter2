/** @type {import('tailwindcss').Config} */
export default {
	content: {
		content: ['./src/**/*.svelte'],
		options: {
			whitelistPatterns: [/svelte-/]
		}
	},
	variants: {}
};
