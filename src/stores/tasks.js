import { get } from 'svelte/store';
import { user } from './login';
import { loading } from './general';

export const fetchTeamTasks = async () => {
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
	//console.log('condig', config);
	const url = `http://localhost:3002/api/teamTasks/${userStore.body.teamAdmin}`;
	const res = await fetch(url, config);

	const data = await res.json();

	if (res.ok) {
		loading.set(false);
	}

	//console.log('llame de nuevo', data);
	return data.Results;
	//console.log(data);
	//console.log(data['hours']);
};

export const fetchTasks = async () => {
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
	//console.log('condig', config);
	const url = `http://localhost:3002/api/tasks`;
	const res = await fetch(url, config);

	const data = await res.json();
	if (res.ok) {
		loading.set(false);
	}
	return data['Tasks'];
	//console.log(data);
	//console.log(data['hours']);
};

export const createTasks = async (body) => {
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

		body: JSON.stringify(body)
	};
	//console.log('condig', config);
	const url = `http://localhost:3002/api/tasks`;
	const res = await fetch(url, config);
	//console.log('response', res);
	if (res.ok) {
		loading.set(false);
	}
	return await res.json();
};

export const updateTasks = async (body, id) => {
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
		body: JSON.stringify(body)
	};
	console.log('condig', config);
	const url = `http://localhost:3002/api/tasks/${id}`;
	const res = await fetch(url, config);
	//console.log('response', res);
	if (res.ok) {
		loading.set(false);
	}
	return await res.json();
};

export const deleteTasks = async (id) => {
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
	///console.log('condig', config);
	const url = `http://localhost:3002/api/tasks/${id}`;
	const res = await fetch(url, config);
	//console.log('response', res);
	if (res.ok) {
		loading.set(false);
	}
	return await res.json();
};

export const fetchTeamTasksInCharged = async (id) => {
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
	//console.log('condig', config);
	const url = `http://localhost:3002/api/tasksInCharge/${id}`;
	const res = await fetch(url, config);

	const data = await res.json();

	if (res.ok) {
		loading.set(false);
	}

	//console.log('llame de nuevo', data);
	return data.Results[0];
	//console.log(data);
	//console.log(data['hours']);
};
