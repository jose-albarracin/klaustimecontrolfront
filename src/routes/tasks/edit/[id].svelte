<script context="module">
	import { get } from 'svelte/store';
	import { user } from '@stores/login';
	import { onMount } from 'svelte';
	import { fetchTeams } from '@stores/teams';
	import { updateTasks } from '@stores/tasks';
	import InlineSVG from 'svelte-inline-svg';
	import { goto } from '$app/navigation';
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
		const urlData = `http://localhost:3001/api/tasks/${id}`;
		const res = await fetch(urlData, config);

		const data = await res.json();
		const resultsFirtStep = data['Task'];
		const formateDate = {
			start: resultsFirtStep.start.split('T')[0],
			end: resultsFirtStep.end.split('T')[0]
		};

		//console.log('re', teamMap);
		const results = Object.assign(resultsFirtStep, formateDate);

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
	//$: console.log('Hours', results);
	onMount(async () => {
		teams = await fetchTeams();
	});

	let taskState = {};
	let teams = [];
	let value;

	let unwindTeam = [];
	$: unwindTeam = [teamFromResults()];

	//	$: console.log(' unwindTeam ', unwindTeam);
	function teamFromResults() {
		//console.log('resultsEmp', results.employee);
		let obj = {};
		obj['label'] = results.team.title;
		obj['value'] = results.team._id;

		return obj;
	}

	$: {
		taskState = Object.assign(taskState, {
			team: unwindTeam[0] ? unwindTeam[0].value : ''
		});
	}

	//$: console.log('unwindAdmin', unwindAdmin);

	$: taskState = results;

	let teamsList = [];
	//$: console.log('teamsList', teamsList);
	$: {
		teamsList = teams.map(function (e) {
			let obj = {};
			obj['label'] = e.title;
			obj['value'] = e._id;

			return obj;
		});
	}
	let outerDivClass =
		'shadow !appearance-none !border !border-[#e5e7eb] !rounded-lg w-full !py-2 !px-3 leading-tight';
</script>

<div class="container px-6 mx-auto md:max-w-5xl h-max">
	<div class="flex justify-start items-center my-12 pb-6 border-b-[1px] border-tertiary/30">
		<a
			href="/tasks"
			class="flex items-center justify-center cursor-pointer text-white bg-primary px-3 py-3 rounded-full shadow-sm"
		>
			<InlineSVG class="w-[20px] h-[20px]" src="/icons/arrow-left-solid.svg" />
		</a>
		<h1 class="text-secondary text-3xl  font-bold ml-6">Edit task</h1>
	</div>

	<div class="w-full bg-white rounded-xl p-6 shadow-lg mb-6">
		<form
			on:submit|preventDefault={async () => {
				await updateTasks(taskState, results._id);
				//await goto('/teams');
			}}
			class="grid grid-cols-1 md:grid-cols-12 gap-x-8"
		>
			<div class="col-span-1 md:col-span-12">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="title"> Title </label>
				<input
					class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight !focus:outline-none !focus:shadow-outline mb-4"
					type="text"
					placeholder="Title"
					name="title"
					id="title"
					required
					bind:value={taskState.title}
				/>
			</div>
			<div class="col-span-1 md:col-span-12">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="description">
					Description
				</label>
				<textarea
					class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight !focus:outline-none !focus:shadow-outline mb-4"
					placeholder="Description"
					name="description"
					id="description"
					rows="6"
					required
					bind:value={taskState.description}
				/>
			</div>
			<div class="col-span-1 md:col-span-12 mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="team"> Team </label>
				<MultiSelect maxSelect={1} {outerDivClass} bind:selected={unwindTeam} options={teamsList} />
			</div>
			<div class="col-span-1 md:col-span-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="start"> Start </label>
				<input
					class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight !focus:outline-none !focus:shadow-outline mb-4"
					type="date"
					placeholder="Start"
					name="start"
					id="start"
					required
					bind:value={taskState.start}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="end"> End </label>
				<input
					class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight !focus:outline-none !focus:shadow-outline mb-4"
					type="date"
					placeholder="End"
					name="end"
					id="end"
					required
					bind:value={taskState.end}
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
