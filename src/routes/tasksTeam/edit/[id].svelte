<script context="module">
	import { get } from 'svelte/store';
	import { user } from '@stores/login';
	import { updateTasks } from '@stores/tasks';
	import { fetchTeamHours } from '@stores/hours';
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
		const urlData = `${apiBackend}/api/tasks/${id}`;
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
	import Inputs from '@components/inputs.svelte';

	export let results;
	let employeesTeam = [];
	let tasksList = [];
	let taskState = {};
	let unwindEmployee = [];

	$: taskState = results;

	$: {
		taskState = Object.assign(taskState, {
			inCharge: unwindEmployee[0] ? unwindEmployee[0].value : null
		});
	}

	onMount(async () => {
		let res;
		res = await fetchTeamHours();
		employeesTeam = await res.employeesTeam;
	});

	$: tasksList = employeesTeam.map(function (e) {
		let obj = {};
		obj['label'] = `${e.first_name} ${e.last_name}`;
		obj['value'] = e._id;

		return obj;
	});

	$: unwindEmployee = [employeFromResults()];

	function employeFromResults() {
		//console.log('e', e);
		let obj = {};
		obj['label'] = `${results.inCharge ? results.inCharge.first_name : ''} ${
			results.inCharge ? results.inCharge.last_name : ''
		}`;
		obj['value'] = results.inCharge ? results.inCharge._id : '';
		//console.log('obj', obj);
		return obj;
	}

	$: console.log('unwindEmployee', unwindEmployee);
	$: console.log('taskState', taskState);
	$: console.log('Results', results);
</script>

<div class="container md:max-w-5xl px-4 mx-auto shadow-sm">
	<div class="flex justify-start my-12 pb-6 border-b-[1px] border-tertiary/30">
		<a href="/tasksTeam" class="flex items-center justify-center cursor-pointer">
			<InlineSVG class="text-primary w-fit h-[25px]" src="/icons/arrow-left-solid.svg" />
		</a>
		<h1 class="text-secondary text-3xl  font-bold ml-6">Edit Task</h1>
	</div>
	<div class="w-full bg-white rounded-xl p-6">
		<form
			on:submit|preventDefault={updateTasks(taskState, results._id)}
			class="grid grid-cols-1 md:grid-cols-12 gap-x-8"
		>
			<div class="col-span-1 md:col-span-12">
				<Inputs
					class="mb-4"
					label="Title"
					name="title"
					type="text"
					required={true}
					bind:value={taskState.title}
				/>
			</div>
			<div class="col-span-1 md:col-span-12">
				<Inputs
					class="mb-4"
					textarea={true}
					label="Description"
					name="description"
					rows="6"
					required={true}
					bind:value={taskState.description}
				/>
			</div>
			<div class="col-span-1 md:col-span-12 mb-4">
				<Inputs
					class="mb-4"
					label="Employee in charge"
					select={true}
					multiselect={null}
					options={tasksList}
					bind:selected={unwindEmployee}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<Inputs
					class="mb-4"
					label="Start"
					name="start"
					type="date"
					required={true}
					bind:value={taskState.start}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<Inputs
					class="mb-4"
					label="End"
					name="end"
					type="date"
					required={true}
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
