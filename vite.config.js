import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			// these are the aliases and paths to them

			'@stores': path.resolve('./src/stores'),
			'@components': path.resolve('./src/components'),
			'@utils': path.resolve('./src/utils')
		}
	}
};

export default config;
