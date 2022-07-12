import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					// these are the aliases and paths to them
					/* '@engine': path.resolve('./src/routes/engine'), */
					'@stores': path.resolve('./src/stores'),
					'@components': path.resolve('./src/components') /* 
					'@utils': path.resolve('./src/lib/utils') */
				}
			}
		}
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
