import adapter from '@sveltejs/adapter-node';

//import preprocess from 'svelte-preprocess';
//import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(/* { fallback: '200.html' } */)
	}
	/* preprocess: [
		preprocess({
			postcss: true
		})
	], */
	/* prerender: {
		enabled: false
	},
	ssr: false */
};

export default config;
