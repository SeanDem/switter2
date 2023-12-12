import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],

	resolve: {
		alias: {
			$components: path.resolve('./src/components'),
			$lib: path.resolve('./src/lib')
		}
	},

	optimizeDeps: {
		exclude: ['svelte-hero-icons']
	},

	ssr: {
		noExternal: ['svelte-hero-icons']
	},

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom'
	},

	build: {
		target: 'esnext'
	},

	server: {
		hmr: {
			protocol: 'ws',
			host: 'localhost'
		}
	}
});
