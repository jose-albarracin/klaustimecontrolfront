<script>
	import { get } from 'svelte/store';
	import { user } from '../stores/login';
	import { onMount } from 'svelte';
	import { loading } from '@stores/general';
	import Inputs from '../components/inputs.svelte';
	import { isValid } from '@stores/form';

	///**VARS**///

	let userInitial = {
		first_name: null,
		last_name: null,
		email: null,
		phone: null
	};

	let userState = {};
	let timeValid = false;
	let wastedTimeComponent = {};

	let eventResValue;

	//Call to employee data
	onMount(async () => {
		//console.log('wastedTimeComponent', wastedTimeComponent);

		let inputss = document.querySelectorAll('input');
		//console.log('inputss', inputss);

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
		//console.log('VERIFY', userStore.body._id);

		const url = `${apiBackend}/api/employees/${userStore.body._id}`;
		const res = await fetch(url, config);

		const data = await res.json();

		let resultsFirstStep = data['Employee'];
		let rolesTeamMap = {
			team: resultsFirstStep.team.map((te) => te.title),
			roles: resultsFirstStep.roles.map((rol) => rol.name)
		};
		//console.log('re', teamMap);
		let results = Object.assign(resultsFirstStep, rolesTeamMap);
		if (res.ok) {
			loading.set(false);
		}

		//result = data.Employee;
		userState = results;
	});

	//Function to update employees
	async function updateEmployee() {
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

			body: JSON.stringify(userState)
		};
		console.log('condig', config);
		const url = `${apiBackend}/api/employees/${userStore.body._id}`;
		const res = await fetch(url, config);

		const data = await res.json();
		if (res.ok) {
			loading.set(false);
		}
		//console.log(data);
		//console.log(data['hours']);
	}

	//Load initial values to avoid missing keys
	$: userState = userInitial;

	//$: console.log('resultados load', result);
	//$: console.log('userState', userState);
	//$: console.log('check', check.body._id);

	eventResValue = (e) => {
		console.log('e', e.detail);
	};

	$: console.log('isValid', isValid);
</script>

<div class="container md:max-w-5xl px-4 mx-auto">
	<div class="flex justify-start my-12 pb-6 border-b-[1px] border-tertiary/30">
		<h1 class="text-secondary text-3xl  font-bold">Profile</h1>
	</div>
	<div class="w-full bg-white rounded-xl p-6">
		<form
			on:submit|preventDefault={(e) => {
				//console.log('e', e.target[0].value);
				console.log('PASÓ');

				//updateEmployee()
			}}
			class="grid grid-cols-1 md:grid-cols-12 gap-x-8"
		>
			<div class="col-span-1 md:col-span-6">
				<Inputs
					class="mb-4"
					label="First Name"
					name="first_name"
					type="text"
					minLength="3"
					bind:value={userState.first_name}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<Inputs
					class="mb-4"
					label="Last Name"
					name="last_name"
					type="text"
					minLength="3"
					bind:value={userState.last_name}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<Inputs
					class="mb-4"
					label="Email"
					name="email"
					type="email"
					minLength="3"
					disabled={true}
					bind:value={userState.email}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<Inputs
					class="mb-4"
					label="Phone"
					name="phone"
					type="number"
					minLength="3"
					bind:value={userState.phone}
				/>
			</div>
			<div class="col-span-1 md:col-span-12 flex justify-center">
				<button
					class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg"
					type="submit">Update</button
				>
			</div>
		</form>
	</div>
</div>
