import { writable } from 'svelte/store';
import { dev } from '$app/env';

if (dev) {
	console.log('Estoy en desarrollo', dev);
}

export const loading = writable(false);
export const apiBackend = dev
	? 'http://localhost:3002'
	: 'https://klaus-time-control-back-app.herokuapp.com';
