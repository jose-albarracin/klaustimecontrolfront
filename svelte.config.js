import node from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: node({ env: { port: process.env.PORT } }),
		vite: {
			resolve: {
				alias: {
					// these are the aliases and paths to them
					/* '@engine': path.resolve('./src/routes/engine'), */
					'@stores': path.resolve('./src/stores'),
					'@components': path.resolve('./src/components'),
					'@utils': path.resolve('./src/utils')
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
