import { get, writable } from 'svelte/store';
import { user } from './login';

import { loading } from './general';

export let countMyHours = writable(0);
export let countTeamHours = writable(0);
export let totalHoursWorked = writable(0);

export const hours = writable([]);

export const createHour = async (stateHour) => {
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
		body: JSON.stringify(Object.assign(stateHour, { employee: userStore.body._id }))
	};
	//console.log('condig', config);
	const url = `http://localhost:3001/api/hours`;
	const res = await fetch(url, config);
	if (res.ok) {
		loading.set(false);
	}

	return await res.json();
};

export const fetchHour = async () => {
	//console.log('FETCH');
	loading.set(true);
	let userStore = get(user);
	//console.log('userStore', userStore);
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
	const url = `http://localhost:3001/api/hoursWorkedEmployees/${userStore.body._id}`;
	//console.log('url', url);
	//console.log('config', config);
	const res = await fetch(url, config);
	//console.log('res', res);

	const data = await res.json();

	//console.log('Registers User', data.Results[0]);
	if (data.Results[0]) {
		totalHoursWorked.set(data.Results[0].totalHoursWorked);
		countMyHours.set(data.Results[0].Registers.length);
	}

	if (res.ok) {
		loading.set(false);
	}
	return data.Results[0] ? data.Results[0] : undefined;
};

//fetchHour();

// Hours team

export const fetchTeamHours = async () => {
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
	//console.log('userStore.body.teamAdmin', userStore.body.teamAdmin);
	const url = `http://localhost:3001/api/hoursWorkedTeam/${userStore.body.teamAdmin}`;
	const res = await fetch(url, config);

	const data = await res.json();
	countTeamHours.set(data.Results[0].employeesTeam.length);
	//console.log('teamHours', data.Results[0].employeesTeam.length);
	//console.log('data', data);
	if (res.ok) {
		loading.set(false);
	}
	return data.Results[0];
};

//////************************ FUNCTIONS FOR SUPER ADMIN ************************///////////

export const fetchHours = async () => {
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
	const url = 'http://localhost:3001/api/hours';
	const res = await fetch(url, config);

	const data = await res.json();
	///const admin = data['Teams'];
	///console.log('admin', admin);

	if (res.ok) {
		loading.set(false);
	}
	//console.log(data);
	console.log(data['hours']);
	return data['hours'];
};

export const createHours = async (stateHours) => {
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
		body: JSON.stringify(stateHours)
	};
	const url = 'http://localhost:3001/api/hours';
	const res = await fetch(url, config);

	const data = await res.json();
	if (res.ok) {
		loading.set(false);
	}
	//console.log(data);
	//console.log(data['hours']);
	return data['hours'];
};

export const updateHours = async (stateHours, id) => {
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

		body: JSON.stringify(stateHours)
	};
	const url = `http://localhost:3001/api/hours/${id}`;
	const res = await fetch(url, config);

	const data = await res.json();

	if (res.ok) {
		loading.set(false);
	}
	//console.log(data);
	//console.log(data['hours']);
	return data['hours'];
};

export const deleteHours = async (id) => {
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
	const url = `http://localhost:3001/api/hours/${id}`;
	const res = await fetch(url, config);

	const data = await res.json();
	if (res.ok) {
		loading.set(false);
	}
	//console.log(data);
	//console.log(data['hours']);
	return data['hours'];
};

/////********Hours Employee Worked*********////

export const fetchEmployeesHours = async () => {
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
	const url = `http://localhost:3001/api/hoursWorkedEmployees`;
	const res = await fetch(url, config);

	const data = await res.json();
	if (res.ok) {
		loading.set(false);
	}
	return data.Results;
};

/////********Hours Employee Worked RANGE*********////
/* WEEKLY */

export const fetchEmployeesHoursWeekly = async () => {
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
	const url = `http://localhost:3001/api/hoursWorkedEmployeesRangeWeekly/${userStore.body._id}`;
	const res = await fetch(url, config);

	const data = await res.json();

	//console.log('data', data);
	if (res.ok) {
		loading.set(false);
	}

	return data.Results;
};

/* MONTHLY */

export const fetchEmployeesHoursMonthly = async () => {
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
	const url = `http://localhost:3001/api/hoursWorkedEmployeesRangeMonths/${userStore.body._id}`;
	const res = await fetch(url, config);

	const data = await res.json();
	if (res.ok) {
		loading.set(false);
	}
	return data.Results;
};

/* YEARLY */

export const fetchEmployeesHoursYearly = async () => {
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
	const url = `http://localhost:3001/api/hoursWorkedEmployeesRangeYear/${userStore.body._id}`;
	const res = await fetch(url, config);

	const data = await res.json();
	if (res.ok) {
		loading.set(false);
	}
	return data.Results;
};
