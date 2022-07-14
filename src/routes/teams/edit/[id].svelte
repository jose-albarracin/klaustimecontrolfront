<script context="module">
	import { get } from 'svelte/store';
	import { user } from '@stores/login';
	import { onMount } from 'svelte';
	import { fetchEmployees } from '@stores/employees';
	import { updateTeams } from '@stores/teams';
	import InlineSVG from 'svelte-inline-svg';
	import { goto } from '$app/navigation';
	import Inputs from '@components/inputs.svelte';
	import MultiSelect from 'svelte-multiselect';

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
		//console.log('condig', config);
		const urlData = `http://localhost:3001/api/teams/${id}`;
		const res = await fetch(urlData, config);

		const data = await res.json();

		/* 	let resultsFirstStep = data['Employee'];
		let rolesTeamMap = {
			team: resultsFirstStep.team.map((te) => te.title),
			roles: resultsFirstStep.roles.map((rol) => rol.name)
		}; */

		//console.log('re', teamMap);
		let results = data['Team'];
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
	$: console.log('Teams', teamState);
	onMount(async () => {
		employess = await fetchEmployees();
	});

	let teamState = {};
	let employess = [];
	let value;

	let unwindAdmin = [];
	$: unwindAdmin = [adminFromResults()];

	function adminFromResults() {
		//console.log('e', e);
		let obj = {};
		obj['label'] = `${results.admin ? results.admin.first_name : ''} ${
			results.admin ? results.admin.last_name : ''
		}`;
		obj['value'] = results.admin ? results.admin._id : '';

		return obj;
	}

	$: {
		teamState = Object.assign(teamState, {
			admin: unwindAdmin[0] ? unwindAdmin[0].value : ''
		});
	}

	//$: console.log('unwindAdmin', unwindAdmin);

	teamState = results;

	let employessList = [];
	$: {
		employessList = employess.map(function (e) {
			let obj = {};
			obj['label'] = `${e.first_name} ${e.last_name}`;
			obj['value'] = e._id;

			return obj;
		});

		//console.log('employessList', employessList);
	}

	let outerDivClass =
		'shadow !appearance-none !border !border-[#e5e7eb] !rounded-lg w-full !py-2 !px-3 leading-tight';
</script>

<div class="container md:max-w-5xl px-6 mx-auto h-max">
	<div class="flex justify-start items-center my-12 pb-6 border-b-[1px] border-tertiary/30">
		<a
			href="/teams"
			class="flex items-center justify-center cursor-pointer text-white bg-primary px-3 py-3 rounded-full shadow-sm"
		>
			<InlineSVG class="w-[20px] h-[20px]" src="/icons/arrow-left-solid.svg" />
		</a>
		<h1 class="text-secondary text-3xl  font-bold ml-6">Edit Team</h1>
	</div>
	<div class="w-full bg-white rounded-xl p-6 shadow-sm">
		<form
			on:submit|preventDefault={async () => {
				await updateTeams(teamState, results._id);
				//await goto('/teams');
			}}
			class="grid grid-cols-1 md:grid-cols-12 gap-x-8"
		>
			<div class="col-span-1 md:col-span-12">
				<Inputs
					label="Title"
					name="title"
					type="text"
					required={true}
					bind:value={teamState.title}
				/>
			</div>
			<div class="col-span-1 md:col-span-12">
				<Inputs
					label="Description"
					textarea={true}
					name="description"
					rows="6"
					required={true}
					bind:value={teamState.description}
				/>
			</div>

			<div class="col-span-1 md:col-span-12 mb-4">
				<Inputs
					label="Admin"
					select={true}
					multiselect={null}
					options={employessList}
					bind:selected={unwindAdmin}
				/>
				<!-- <label class="block text-gray-700 text-sm font-bold mb-2" for="team"> Admin </label>
				<MultiSelect
					maxSelect={1}
					{outerDivClass}
					bind:selected={unwindAdmin}
					options={employessList}
				/> -->
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
