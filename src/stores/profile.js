import { get, writable } from 'svelte/store';
import { user } from './login';
import { loading, apiBackend } from './general';
export const profile = writable([]);

export const fetchProfile = async () => {
	loading.set(true);
	//console.log('data entre stores', get(user));
	let userStore = {};
	userStore = get(user);
	console.log('userStore', userStore);
	let config = {
		//mode: 'no-cors'
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${userStore.token}`
		}
	};
	///console.log('VERIFY', userStore.body._id);

	const url = `${apiBackend}/api/employees/`;
	const res = await fetch(url, config);

	const data = await res.json();
	//console.log(data);
	//console.log(data['hours']);
	if (res.ok) {
		loading.set(false);
	}
	return data;
	//console.log(loadedHours);
	//console.log('Datos Perfil', loadedProfile);
};
