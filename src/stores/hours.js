import { get, writable } from 'svelte/store';
import { user } from './login';

import { loading, apiBackend } from './general';

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
	const url = `${apiBackend}/api/hours`;
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
	//console.log('id', id);
	const url = `${apiBackend}/api/hoursWorkedEmployees/${userStore.body._id}`;
	//console.log('url', url);
	//console.log('url', url);
	//console.log('config', config);
	const res = await fetch(url, config);
	//console.log('res', res);

	const data = await res.json();

	//console.log('Registers User', data.Results[0]);
	if (data.Results[0]) {
		totalHoursWorked.set(data.Results[0].totalHoursWorked);
		countMyHours.set(data.Results[0].Registers.length);
	} else {
		totalHoursWorked.set(0);
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
	const url = `${apiBackend}/api/hoursWorkedTeam/${userStore.body.teamAdmin}`;
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
	const url = `${apiBackend}/api/hours`;
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
	const url = `${apiBackend}/api/hours`;
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
	const url = `${apiBackend}/api/hours/${id}`;
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
	const url = `${apiBackend}/api/hours/${id}`;
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
	const url = `${apiBackend}/api/hoursWorkedEmployees`;
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
	const url = `${apiBackend}/api/hoursWorkedEmployeesRangeWeekly/${userStore.body._id}`;
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
	const url = `${apiBackend}/api/hoursWorkedEmployeesRangeMonths/${userStore.body._id}`;
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
	const url = `${apiBackend}/api/hoursWorkedEmployeesRangeYear/${userStore.body._id}`;
	const res = await fetch(url, config);

	const data = await res.json();
	if (res.ok) {
		loading.set(false);
	}
	return data.Results;
};

/////********Hours TEAM Worked RANGE*********////
/* WEEKLY */

export const fetchTeamHoursWeekly = async () => {
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
	const url = `${apiBackend}/api/hoursWorkedTeamRangeWeekly/${userStore.body.teamAdmin}`;
	const res = await fetch(url, config);

	const data = await res.json();

	//console.log('data', data);
	if (res.ok) {
		loading.set(false);
	}

	return data.Results[0];
};

/* MONTHY */

export const fetchTeamHourMonthly = async () => {
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
	const url = `${apiBackend}/api/hoursWorkedTeamRangeMonthly/${userStore.body.teamAdmin}`;
	const res = await fetch(url, config);

	const data = await res.json();

	//console.log('data', data);
	if (res.ok) {
		loading.set(false);
	}

	return data.Results[0];
};

/* YEARY */

export const fetchTeamHourYearly = async () => {
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
	const url = `${apiBackend}/api/hoursWorkedTeamRangeYearly/${userStore.body.teamAdmin}`;
	const res = await fetch(url, config);

	const data = await res.json();

	//console.log('data', data);
	if (res.ok) {
		loading.set(false);
	}

	return data.Results[0];
};

/////********Hours TOTAL EMPLOYESS Worked RANGE*********////
/* WEEKLY */

export const fetchTotalEmployeesWeekly = async () => {
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
	const url = `${apiBackend}/api/hoursWorkedTotalEmployeesWeekly`;
	const res = await fetch(url, config);

	const data = await res.json();

	//console.log('data', data);
	if (res.ok) {
		loading.set(false);
	}

	return data.Results;
};

/* MONTHLY */

export const fetchTotalEmployeesMonthly = async () => {
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
	const url = `${apiBackend}/api/hoursWorkedTotalEmployeesMonthly`;
	const res = await fetch(url, config);

	const data = await res.json();

	//console.log('data', data);
	if (res.ok) {
		loading.set(false);
	}

	return data.Results;
};

/* YEARLY */

export const fetchTotalEmployeesYearly = async () => {
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
	const url = `${apiBackend}/api/hoursWorkedTotalEmployeesYearly`;
	const res = await fetch(url, config);

	const data = await res.json();

	//console.log('data', data);
	if (res.ok) {
		loading.set(false);
	}

	return data.Results;
};
