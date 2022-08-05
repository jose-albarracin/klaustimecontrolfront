<script>
	import { fetchTasks, deleteTasks } from '@stores/tasks';
	import { onMount } from 'svelte';
	import Table from '@components/Table.svelte';

	let results = [];

	let config = {
		param: 'tasks',
		paramFetch: 'tasks',
		actions: true,
		route: 'tasks',
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
				name: 'Grupo 2',
				type: 'group',
				align: 'start',
				keys: [
					{
						name: 'Description',
						//type: 'Date',
						align: 'start',
						key: 'description'
					},
					{
						name: 'Team',
						type: 'teamTask',
						align: 'start'
					}
				]
			}
		]
	};

	onMount(async () => {
		results = await fetchTasks();
	});

	async function deleteItem(event) {
		await deleteTasks(event.detail);
		results = await fetchTasks();
	}
	$: console.log('Results tasks', results);
</script>

<div class="container px-6 md:max-w-5xl h-max mx-auto">
	<div class="flex justify-center md:justify-start my-12 pb-6 border-b-[1px] border-tertiary/30">
		<h1 class="text-secondary text-3xl font-bold">Tasks</h1>
	</div>
	<div class="w-full bg-white rounded-xl p-6 shadow-lg mb-6">
		<a href="/tasks/add" class="flex justify-center mb-6">
			<button
				class="bg-primary hover:bg-secondary  text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
				>Add</button
			>
		</a>

		<div class="relative overflow-x-auto  px-0">
			<Table {config} {results} on:delete={deleteItem} />
		</div>
	</div>
</div>
