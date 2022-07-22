<script context="module">
	import { get } from 'svelte/store';
	import { user } from '@stores/login';
	import { onMount } from 'svelte';
	import { fetchEmployees } from '@stores/employees';
	import { updateHours } from '@stores/hours';
	import InlineSVG from 'svelte-inline-svg';
	import Inputs from '@components/inputs.svelte';

	import { loading } from '@stores/general';

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
		const urlData = `http://localhost:3002/api/hours/${id}`;
		const res = await fetch(urlData, config);

		const data = await res.json();
		const resultsFirtStep = data['Hour'];
		const formateDate = {
			createdAt: resultsFirtStep.createdAt.split('T')[0]
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
	export let results;

	let hoursState = {};
	let employess = [];
	let unwindEmployee = [];
	let employessList = [];

	$: unwindEmployee = [employeeFromResults()];

	onMount(async () => {
		employess = await fetchEmployees();
	});

	function employeeFromResults() {
		//console.log('resultsEmp', results.employee);
		let obj = {};
		obj['label'] = `${results.employee ? results.employee.first_name : ''} ${
			results.employee ? results.employee.last_name : ''
		}`;
		obj['value'] = results.employee ? results.employee._id : '';

		return obj;
	}

	$: {
		hoursState = Object.assign(hoursState, {
			employee: unwindEmployee[0] ? unwindEmployee[0].value : ''
		});
	}

	//$: console.log('unwindAdmin', unwindAdmin);

	$: hoursState = results;

	$: {
		employessList = employess.map(function (e) {
			let obj = {};
			obj['label'] = `${e.first_name} ${e.last_name}`;
			obj['value'] = e._id;

			return obj;
		});

		//console.log('employessList', employessList);
	}
</script>

<div class="container px-6 mx-auto md:max-w-5xl h-max">
	<div class="flex justify-start items-center my-12 pb-6 border-b-[1px] border-tertiary/30">
		<a
			href="/hours"
			class="flex items-center justify-center cursor-pointer text-white bg-primary px-3 py-3 rounded-full shadow-sm"
		>
			<InlineSVG class="w-[20px] h-[20px]" src="/icons/arrow-left-solid.svg" />
		</a>
		<h1 class="text-secondary text-3xl  font-bold ml-6">Edit Hour</h1>
	</div>
	<div class="w-full bg-white rounded-xl p-6 shadow-lg mb-6">
		<form
			on:submit|preventDefault={async () => {
				await updateHours(hoursState, results._id);
				//await goto('/teams');
			}}
			class="grid grid-cols-1 md:grid-cols-12 gap-x-8"
		>
			<div class="col-span-1 md:col-span-6 mb-4">
				<Inputs
					class="mb-4"
					label="Employee"
					select={true}
					multiselect={null}
					options={employessList}
					bind:selected={unwindEmployee}
				/>
				<!-- <label class="block text-gray-700 text-sm font-bold mb-2" for="team"> Employee </label>
				<MultiSelect
					maxSelect={1}
					{outerDivClass}
					bind:selected={unwindEmployee}
					options={employessList}
				/> -->
			</div>
			<div class="col-span-1 md:col-span-6">
				<Inputs
					class="mb-4"
					label="Date"
					name="date"
					type="date"
					required={true}
					disabled={true}
					bind:value={hoursState.createdAt}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<Inputs
					class="mb-4"
					label="Start"
					name="start"
					type="number"
					required={true}
					bind:value={hoursState.start}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<Inputs
					class="mb-4"
					label="End"
					name="end"
					type="number"
					required={true}
					bind:value={hoursState.end}
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
