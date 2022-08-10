<script>
	import { fetchTeamTasks, deleteTasks } from '@stores/tasks';
	import { onMount } from 'svelte';
	import Table from '@components/Table.svelte';

	///**VARS**///
	let results = [];

	let config = {
		param: 'Task',
		paramFetch: 'TeamTasks',
		actions: true,
		route: 'tasksTeam',
		fields: [
			{
				name: 'Grupo 1',
				type: 'group',
				align: 'start',
				keys: [
					{
						type: 'title',
						align: 'start',
						key: 'title'
					},
					{
						name: 'Start',
						type: 'Date',
						align: 'start',
						key: 'start'
					},
					{
						name: 'End',
						type: 'Date',
						align: 'start',
						key: 'end'
					}
				]
			},
			{
				name: 'Description',
				//type: 'Date',
				align: 'start',
				key: 'description'
			},
			{
				name: 'In Charge',
				type: 'joinNameEmployeeInCharged',
				align: 'start'
				//key: 'description'
			}
		]
	};

	onMount(async () => {
		results = await fetchTeamTasks();
	});

	async function deleteItem(event) {
		await deleteTasks(event.detail);
		results = await fetchTeamTasks();
	}

	//$: console.log('Results Taks', results);
</script>

<div class="container md:max-w-5xl px-4 mx-auto">
	<div class="flex justify-center md:justify-start my-12 pb-6 border-b-[1px] border-tertiary/30">
		<h1 class="text-secondary text-3xl  font-bold">Tasks Teams</h1>
	</div>
	<div class="w-full bg-white rounded-xl p-6 shadow-lg">
		<a href="/tasksTeam/add" class="flex justify-center mb-6">
			<button
				class="bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded flex items-center justify-center "
				>Add</button
			>
		</a>

		<div class="relative overflow-x-auto  ">
			<Table {config} {results} on:delete={deleteItem} />
		</div>
	</div>
</div>
