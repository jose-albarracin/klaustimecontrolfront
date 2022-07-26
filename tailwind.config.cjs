module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				Cabin: ['Cabin'],
				Lato: ['Lato'],
				PlusJakartaSans: ['Plus Jakarta Sans']
			},
			colors: {
				primary: '#6566EA',
				secondary: '#383874',
				tertiary: '#B8B4CB',
				selago: '#F0F0FD',
				carnation: '#fa4f67',
				'yellow-orange': '#fcaf3a',
				'jungle-green': '#29AE76'
			},
			boxShadow: {
				btnCount: '0px 5px 10px 1px rgba(101,102,234,0.30);',
				inputShadow: '0px 0px 12px 0px rgb(0 0 0 / 10%);'
			}
		}
	},
	plugins: []
};
