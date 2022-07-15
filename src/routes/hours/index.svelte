<script>
	import { fetchHours, deleteHours } from '@stores/hours';
	import { onMount } from 'svelte';
	import Table from '@components/Table.svelte';

	let results = [];

	let config = {
		param: 'hours',
		paramFetch: 'hours',
		actions: true,
		route: 'hours',
		fields: [
			{
				name: 'Grupo 1',
				type: 'group',
				align: 'start',
				keys: [
					{
						type: 'joinNameEmployee',
						align: 'start'
					},
					{
						name: 'Start',
						type: 'Hour',
						align: 'start',
						key: 'start'
					},
					{
						name: 'End',
						type: 'Hour',
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
						name: 'Hours Worked',
						type: 'Hour',
						align: 'start',
						key: 'hours_worked'
					},
					{
						name: 'Date',
						type: 'Date',
						align: 'start',
						key: 'createdAt'
					}
				]
			}
		]
	};

	onMount(async () => {
		results = await fetchHours();
	});

	async function deleteItem(event) {
		await deleteHours(event.detail);
		results = await fetchHours();
	}

	//$: console.log('Results teams', results);
</script>

<div class="container px-6 md:max-w-5xl mx-auto h-max">
	<div class="flex justify-center md:justify-start my-12 pb-6 border-b-[1px] border-tertiary/30">
		<h1 class="text-secondary text-3xl font-bold">Hours</h1>
	</div>
	<div class="w-full bg-white rounded-xl p-6 shadow-lg mb-6">
		<a href="/hours/add" class="flex justify-center mb-6">
			<button
				class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
				>Add</button
			>
		</a>

		<div class="relative overflow-x-auto  px-0">
			<Table {config} {results} on:delete={deleteItem} />
		</div>
	</div>
</div>
