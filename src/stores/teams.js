import { get } from 'svelte/store';
import { user } from './login';

import { loading } from './general';

export const fetchTeams = async () => {
	loading.set(true);
	let userStore = get(user);
	let config = {
		//mode: 'no-cors'
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${userStore.token}`
		}
	};
	const url = 'http://localhost:3001/api/teams';
	const res = await fetch(url, config);

	const data = await res.json();
	///const admin = data['Teams'];
	///console.log('admin', admin);

	if (res.ok) {
		loading.set(false);
	}
	//console.log(data);
	//console.log(data['hours']);
	return data['Teams'];
};

export const createTeams = async (stateTeam) => {
	loading.set(true);
	let userStore = get(user);
	let config = {
		//mode: 'no-cors'
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${userStore.token}`
		},
		body: JSON.stringify(stateTeam)
	};
	const url = 'http://localhost:3001/api/teams';
	const res = await fetch(url, config);

	const data = await res.json();
	if (res.ok) {
		loading.set(false);
	}
	//console.log(data);
	//console.log(data['hours']);
	return data['Teams'];
};

export const updateTeams = async (stateTeam, id) => {
	loading.set(true);
	let userStore = get(user);
	let config = {
		//mode: 'no-cors'
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${userStore.token}`
		},

		body: JSON.stringify(stateTeam)
	};
	const url = `http://localhost:3001/api/teams/${id}`;
	const res = await fetch(url, config);

	const data = await res.json();

	if (res.ok) {
		loading.set(false);
	}
	//console.log(data);
	//console.log(data['hours']);
	return data['Teams'];
};

export const deleteTeams = async (id) => {
	loading.set(true);
	let userStore = get(user);
	let config = {
		//mode: 'no-cors'
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${userStore.token}`
		}
	};
	const url = `http://localhost:3001/api/teams/${id}`;
	const res = await fetch(url, config);

	const data = await res.json();
	if (res.ok) {
		loading.set(false);
	}
	//console.log(data);
	//console.log(data['hours']);
	return data['Teams'];
};
