import adapter from '@sveltejs/adapter-static';

import preprocess from 'svelte-preprocess';
//import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ fallback: '200.html' })
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
