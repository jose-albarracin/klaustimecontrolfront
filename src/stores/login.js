import { writable } from 'svelte/store';
import { apiBackend } from './general';

function userStore() {
	const { subscribe, set } = writable(
		getStorageUser() || {
			login: false
		}
	);

	return {
		subscribe,
		loginUser: (arg) => set(arg),
		logoutUser: () => set(null)
	};
}

export function setStorageUser(user) {
	if (typeof window !== 'undefined') {
		return localStorage.setItem('user', JSON.stringify(user));
		// 👉️ can use localStorage here
	} else {
		return console.log('You are on the server');
		// 👉️ can't use localStorage
	}
}

function getStorageUser() {
	if (typeof window !== 'undefined') {
		return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
		// 👉️ can use localStorage here
	} else {
		return console.log('You are on the server');
		// 👉️ can't use localStorage
	}
}
//getStorageUser();
//console.log('console desde login store', getStorageUser());
export const getStorageUserVar = getStorageUser();

export const user = userStore();

///LOGOUT SOCIAL MEDIA

export let logOutSocial = async () => {
	let config = {
		//mode: 'no-cors',
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
			//'Access-Control-Allow-Credentials': true,
			//'Access-Control-Allow-Origin': '*'
		}
	};
	const url = `${apiBackend}/auth/logout`;
	//console.log('url', url);
	const res = await fetch(url, config);

	//console.log('res', res);
	await res.json();
	//console.log('dataLogOut', data);
};
