<script context="module">
	import { get } from 'svelte/store';
	import { user } from '@stores/login';
	import { updateTasks } from '@stores/tasks';
	import { onMount } from 'svelte';
	export async function load({ fetch, params }) {
		let id = params.id;
		console.log('params', id);
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

		const results = Object.assign(resultsFirtStep, formateDate);

		//console.log('llame de nuevo', data);
		if (res.ok) {
			return {
				props: {
					results
				}
			};
		}
	}
</script>

<script>
	import InlineSVG from 'svelte-inline-svg';

	export let results;
	$: console.log('Task', results);
	let taskState = {};
	let initialState = {
		title: undefined,
		description: undefined,
		team: undefined,
		start: undefined,
		end: undefined
	};

	$: taskState = results;

	//$: console.log('data', taskState);
</script>

<div class="container md:max-w-5xl px-4 mx-auto shadow-sm">
	<div class="flex justify-start my-12 pb-6 border-b-[1px] border-tertiary/30">
		<a href="/tasksTeam" class="flex items-center justify-center cursor-pointer">
			<InlineSVG class="text-primary w-fit h-[25px]" src="/icons/arrow-left-solid.svg" />
		</a>
		<h1 class="text-secondary text-3xl  font-bold ml-6">Add Task</h1>
	</div>
	<div class="w-full bg-white rounded-xl p-6">
		<form
			on:submit|preventDefault={updateTasks(taskState, results._id)}
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
