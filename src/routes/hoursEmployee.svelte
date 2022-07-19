<script>
	import { onMount } from 'svelte';
	import { createHour, fetchHour } from '../stores/hours';
	import { fetchTeamTasksInCharged } from '@stores/tasks';
	import Inputs from '../components/inputs.svelte';
	import Table from '@components/Table.svelte';
	import { user } from '@stores/login';
	import { get } from 'svelte/store';

	///**VARS**///

	let initialHour = {
		start: undefined,
		end: undefined
	};

	let stateHour = initialHour;

	let response = '';
	let isTask = {};

	let userData = {};

	let results = [];
	let config = {
		param: 'Hour',
		actions: false,
		route: '',
		fields: [
			{
				name: 'Grupo 1',
				type: 'group',
				align: 'start',
				keys: [
					{
						name: 'Hours Worked',
						type: 'titleHour',
						align: 'start',
						key: 'hours_worked'
					}
				]
			},
			{
				name: 'Start',
				type: 'Hour',
				key: 'start',
				align: 'center'
			},
			{
				name: 'End',
				type: 'Hour',
				key: 'end',
				align: 'center'
			},
			{
				name: 'Task',
				type: 'twoLevels',
				key: 'task',
				key2: 'title',
				align: 'start'
			},
			{
				name: 'Date',
				type: 'Date',
				key: 'createdAt',
				align: 'end'
			}
		]
	};

	$: stateHour = Object.assign(stateHour, {
		...(isTask && { task: isTask._id })
	});

	//$: console.log('stateHour', stateHour);
	onMount(async () => {
		response = await fetchHour();

		if (response) {
			results = await response.Registers;
		} else {
			results = [];
		}
		userData = get(user);
		//console.log('user', userData.body._id);
		isTask = await fetchTeamTasksInCharged(userData.body._id);

		if (isTask) {
			console.log('HAY TAREAS');
			console.log(isTask);
		} else {
			console.log('NO HAY TAREAS');
		}
	});

	async function createHourLocal() {
		await createHour(stateHour);
		stateHour = {};

		response = await fetchHour();
		results = await response.Registers;
	}

	//$: createHourLocal();

	$: console.log('Results', results);
</script>

<div class="container md:max-w-5xl px-6 mx-auto h-max">
	<div class="flex justify-start my-12 pb-6 border-b-[1px] border-tertiary/30">
		<h1 class="text-secondary text-3xl  font-bold">My Hours</h1>
	</div>
	<div class="w-full bg-white rounded-xl p-6 mb-6 shadow-lg">
		{#if isTask}
			<form
				on:submit|preventDefault={createHourLocal}
				class="grid grid-cols-1 md:grid-cols-12 gap-x-8"
			>
				<div class="col-span-1 md:col-span-6">
					<Inputs
						label="Start"
						name="start"
						type="number"
						required={true}
						bind:value={stateHour.start}
					/>
				</div>
				<div class="col-span-1 md:col-span-6">
					<Inputs label="End" name="end" type="number" required={true} bind:value={stateHour.end} />
				</div>
				<div class="col-span-1 md:col-span-12 flex justify-center">
					<button
						class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg"
						type="submit">Add</button
					>
				</div>
			</form>
		{:else}
			<div class="flex justify-center">
				<span class="text-base text-primary font-bold text-center">
					"Currently you do not have assigned tasks, therefore you will not be able to record hours
					worked"
				</span>
			</div>
		{/if}
	</div>

	<div class="w-full bg-white rounded-xl p-6 shadow-lg mb-6">
		<div class="relative overflow-x-auto  ">
			<Table {config} {results} />
			<!-- <table class="table w-full ">
				<tbody>
					{#each results as item}
						<tr>
							<td>
								<div class="flex flex-col">
									<p class="text-secondary font-bold text-base mb-2">Hours Worked</p>
									<p class="text-primary font-extrabold text-base">
										{item.hours_worked}h
									</p>
								</div>
							</td>

							<td>
								<div class="flex flex-col">
									<div class="flex justify-center md:justify-start items-center ">
										<p class="text-primary font-bold text-base ">Start:&nbsp;</p>
										<p class="text-tertiary font-medium text-[0.8rem]">{item.start}h</p>
									</div>
								</div>
							</td>
							<td>
								<div class="flex flex-col">
									<div class="flex justify-center md:justify-start items-center">
										<p class="text-primary font-bold text-base ">End:&nbsp;</p>
										<p class="text-tertiary font-medium text-[0.8rem]">{item.end}h</p>
									</div>
								</div>
							</td>

							<td>
								<div class="flex justify-center md:justify-end">
									<div class="flex justify-center md:justify-start items-center">
										<p class="text-primary font-bold text-base ">Date:&nbsp;</p>
										<p class="text-tertiary font-medium text-[0.8rem]">
											{new Date(item.createdAt).toISOString().split('T')[0]}
										</p>
									</div>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table> -->
		</div>
		<div class="mt-4">
			<p class="text-center text-2xl font-bold text-secondary">
				Totals Hours Worked: {response ? response.totalHoursWorked : ''}h
			</p>
		</div>
	</div>
</div>
