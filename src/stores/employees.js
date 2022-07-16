import { get } from 'svelte/store';
import { user } from './login';
import { loading } from './general';

export const fetchEmployees = async () => {
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
	const url = 'http://localhost:3002/api/employees';
	const res = await fetch(url, config);

	const data = await res.json();
	if (res.ok) {
		loading.set(false);
	}
	//console.log(data);
	//console.log(data['hours']);
	return data['Employees'];
};

export const createEmployees = async (stateEmployee) => {
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
		body: JSON.stringify(stateEmployee)
	};
	const url = 'http://localhost:3002/api/employees';
	const res = await fetch(url, config);

	const data = await res.json();
	if (res.ok) {
		loading.set(false);
	}
	//console.log(data);
	//console.log(data['hours']);
	return data['Employees'];
};

export const updateEmployees = async (stateEmployee, id) => {
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

		body: JSON.stringify(stateEmployee)
	};
	const url = `http://localhost:3002/api/employees/${id}`;
	const res = await fetch(url, config);

	const data = await res.json();
	if (res.ok) {
		loading.set(false);
	}
	//console.log(data);
	//console.log(data['hours']);
	return data['Employees'];
};

export const deleteEmployees = async (id) => {
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
	const url = `http://localhost:3002/api/employees/${id}`;
	const res = await fetch(url, config);

	const data = await res.json();
	if (res.ok) {
		loading.set(false);
	}
	//console.log(data);
	//console.log(data['hours']);
	return data['Employees'];
};

export const fetchEmployeeProfile = async () => {
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
	let body = userStore.body;
	//console.log('userStore.body_id', body._id);
	const url = `http://localhost:3002/api/employees/${body._id}`;
	const res = await fetch(url, config);

	const data = await res.json();
	if (res.ok) {
		loading.set(false);
	}
	//console.log(data);
	//console.log(data['hours']);
	return data['Employee'];
};
