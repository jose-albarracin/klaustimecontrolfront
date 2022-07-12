<script context="module">
	import { get } from 'svelte/store';
	import { user } from '../stores/login';
	import { onMount } from 'svelte';
</script>

<script>
	import { loading } from '@stores/general';
	import { fade } from 'svelte/transition';

	//VARS

	//let result;
	let userInitial = {
		first_name: null,
		last_name: null,
		email: null,
		phone: null
	};

	let userState = {};

	//Llamada a datos de empleado
	onMount(async () => {
		loading.set(true);
		let userStore = get(user);
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
		//console.log('VERIFY', userStore.body._id);

		const url = `http://localhost:3001/api/employees/${userStore.body._id}`;
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

	//Funcion para actualizar empleados
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
		const url = `http://localhost:3001/api/employees/${userStore.body._id}`;
		const res = await fetch(url, config);

		const data = await res.json();
		if (res.ok) {
			loading.set(false);
		}
		//console.log(data);
		//console.log(data['hours']);
	}

	//Cargue de valores iniciales para evitar keys missings
	$: userState = userInitial;

	//$: console.log('resultados load', result);
	$: console.log('userState', userState);
	//$: console.log('check', check.body._id);
</script>

<div class="container md:max-w-5xl px-4 mx-auto">
	<div class="flex justify-start my-12 pb-6 border-b-[1px] border-tertiary/30">
		<h1 class="text-secondary text-3xl  font-bold">Profile</h1>
	</div>
	<div class="w-full bg-white rounded-xl p-6">
		<form
			on:submit|preventDefault={updateEmployee}
			class="grid grid-cols-1 md:grid-cols-12 gap-x-8"
		>
			<div class="col-span-1 md:col-span-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="first_name">
					First name
				</label>
				<input
					class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight !focus:outline-none !focus:shadow-outline mb-4"
					type="text"
					placeholder="First name"
					name="first_name"
					id="first_name"
					required
					bind:value={userState.first_name}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="last_name">
					Last name
				</label>
				<input
					class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight !focus:outline-none !focus:shadow-outline mb-4"
					type="text"
					placeholder="Last name"
					name="last_name"
					id="last_name"
					required
					bind:value={userState.last_name}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="email"> Email</label>
				<input
					class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight !focus:outline-none !focus:shadow-outline mb-4"
					type="email"
					placeholder="Email"
					name="email"
					id="email"
					required
					disabled
					bind:value={userState.email}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="phone"> Phone</label>
				<input
					class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight !focus:outline-none !focus:shadow-outline mb-4"
					type="number"
					placeholder="Phone"
					name="phone"
					id="phone"
					required
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
