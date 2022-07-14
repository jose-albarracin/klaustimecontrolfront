<script>
	import { get } from 'svelte/store';
	import { user } from '@stores/login';
	import { fetchTeams } from '@stores/teams';
	import { createEmployees } from '@stores/employees';
	import { onMount } from 'svelte';
	import InlineSVG from 'svelte-inline-svg';
	import { goto } from '$app/navigation';
	import Inputs from '@components/inputs.svelte';

	//import MultiSelect from 'svelte-multiselect';

	onMount(async () => {
		teams = await fetchTeams();
	});

	let employeeState = {};
	let teams = [];
	let value;
	let initialState = {
		first_name: undefined,
		last_name: undefined,
		email: undefined,
		password: undefined,
		phone: undefined,
		team: undefined,
		roles: undefined
	};

	let teamList = [];
	$: {
		teamList = teams.map((te) => te.title);
		//console.log('teamList', teamList);
	}
	let listRoles = ['user', 'admin'];

	$: employeeState = initialState;

	let outerDivClass =
		'shadow !appearance-none !border !border-[#e5e7eb] !rounded-lg w-full !py-2 !px-3 leading-tight';
	//$: console.log('employeeState', employeeState);
	//$: console.log('multiSe results', value);
	//$: console.log('Teams', teams);
</script>

<div class="container md:max-w-5xl px-6 mx-auto h-max">
	<div class="flex justify-start items-center my-12 pb-6 border-b-[1px] border-tertiary/30">
		<a
			href="/employees"
			class="flex items-center justify-center cursor-pointer text-white bg-primary px-3 py-3 rounded-full shadow-sm"
		>
			<InlineSVG class=" w-[20px] h-[20px]" src="/icons/arrow-left-solid.svg" />
		</a>
		<h1 class="text-secondary text-3xl  font-bold ml-6">Add Employee</h1>
	</div>

	<div class="w-full bg-white rounded-xl p-6 shadow-lg mb-6">
		<form
			on:submit|preventDefault={async () => {
				await createEmployees(employeeState);
				await goto('/employees');
			}}
			class="grid grid-cols-1 md:grid-cols-12 gap-x-8"
		>
			<div class="col-span-1 md:col-span-6">
				<Inputs
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
				<!-- <label class="block text-gray-700 text-sm font-bold mb-2" for="team"> Team </label>
				<MultiSelect {outerDivClass} bind:selected={employeeState.team} options={teamList} /> -->
			</div>
			<div class="col-span-1 md:col-span-6 mb-4">
				<Inputs
					label="Roles"
					select={true}
					multiselect={true}
					options={listRoles}
					bind:selected={employeeState.roles}
				/>
				<!-- <label class="block text-gray-700 text-sm font-bold mb-2" for="roles"> Roles </label>

				<MultiSelect {outerDivClass} bind:selected={employeeState.roles} options={listRoles} /> -->
			</div>
			<div class="col-span-1 md:col-span-6">
				<Inputs
					label="Email"
					name="email"
					type="email"
					required={true}
					bind:value={employeeState.email}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<Inputs
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
