import adapter from '@sveltejs/adapter-auto';

import preprocess from 'svelte-preprocess';
//import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	],
	ssr: false
};

export default config;
