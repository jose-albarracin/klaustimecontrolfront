<script context="module">
	import { get } from 'svelte/store';
	import { user } from '@stores/login';
	import { onMount } from 'svelte';
	import { fetchTeams } from '@stores/teams';
	import { updateEmployees } from '@stores/employees';
	import InlineSVG from 'svelte-inline-svg';
	import Inputs from '@components/inputs.svelte';

	import { loading } from '@stores/general';
	//import MultiSelect from '@components/MultiSelect.svelte';

	export async function load({ fetch, params }) {
		loading.set(true);
		let id = params.id;
		//console.log('params', id);
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
		console.log('userStore', userStore);
		const urlData = `http://localhost:3002/api/employees/${id}`;
		const res = await fetch(urlData, config);

		const data = await res.json();
		let resultsFirstStep = data['Employee'];
		let rolesTeamMap = {
			team: resultsFirstStep.team.map((te) => te.title),
			roles: resultsFirstStep.roles.map((rol) => rol.name)
		};
		//console.log('re', teamMap);
		let results = Object.assign(resultsFirstStep, rolesTeamMap);
		//console.log('reees', results);
		/* console.log(
			'MAP',
			results.team.map((te) => te.title)
		); */

		//console.log('llame de nuevo', data);
		if (res.ok) {
			loading.set(false);
			return {
				props: {
					results
				}
			};
		}
	}
</script>

<script>
	//$: console.log('seleccionados', selected);
	export let results;
	//$: console.log('Employee', employeeState);
	onMount(async () => {
		teams = await fetchTeams();
	});

	let employeeState = {};
	let teams = [];
	let teamList = [];

	let listRoles = ['user', 'admin'];

	employeeState = results;

	$: {
		teamList = teams.map((te) => te.title);
		//console.log('teamList', teamList);
	}

	//$: console.log('employeeState', employeeState);
</script>

<div class="container md:max-w-5xl h-max px-6 mx-auto">
	<div class="flex justify-start items-center my-12 pb-6 border-b-[1px] border-tertiary/30">
		<a
			href="/employees"
			class="flex items-center justify-center cursor-pointer text-white bg-primary px-3 py-3 rounded-full shadow-sm"
		>
			<InlineSVG class=" w-[20px] h-[20px]" src="/icons/arrow-left-solid.svg" />
		</a>
		<h1 class="text-secondary text-3xl  font-bold ml-6">Edit Employee</h1>
	</div>

	<div class="w-full bg-white rounded-xl p-6 shadow-lg mb-6">
		<form
			on:submit|preventDefault={async () => {
				await updateEmployees(employeeState, results._id);
				/* await goto('/employees'); */
			}}
			class="grid grid-cols-1 md:grid-cols-12 gap-x-8"
		>
			<div class="col-span-1 md:col-span-6">
				<Inputs
					class="mb-4"
					label="First Name"
					name="first_name"
					type="text"
					required={true}
					bind:value={employeeState.first_name}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<Inputs
					label="Last Name"
					name="last_name"
					type="text"
					required={true}
					bind:value={employeeState.last_name}
				/>
			</div>
			<div class="col-span-1 md:col-span-12">
				<Inputs
					class="mb-4"
					label="Phone"
					name="phone"
					type="number"
					required={true}
					bind:value={employeeState.phone}
				/>
			</div>

			<div class="col-span-1 md:col-span-6 mb-4">
				<Inputs
					label="Team"
					select={true}
					multiselect={true}
					options={teamList}
					bind:selected={employeeState.team}
				/>
			</div>
			<div class="col-span-1 md:col-span-6 mb-4">
				<Inputs
					class="mb-4"
					label="Roles"
					select={true}
					multiselect={true}
					options={listRoles}
					bind:selected={employeeState.roles}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<Inputs
					class="mb-4"
					label="Email"
					name="email"
					type="email"
					required={true}
					bind:value={employeeState.email}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<Inputs
					class="mb-4"
					label="Password"
					name="password"
					type="password"
					required={true}
					bind:value={employeeState.password}
				/>
			</div>

			<div class="col-span-1 md:col-span-12 flex justify-center">
				<button
					class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
					type="submit"
				>
					<InlineSVG
						class="text-white w-[15px] h-fit mr-3"
						src="/icons/floppy-disk-solid.svg"
					/>Save</button
				>
			</div>
		</form>
	</div>
</div>
