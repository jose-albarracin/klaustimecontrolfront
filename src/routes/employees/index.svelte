<script>
	import { fetchEmployees, deleteEmployees } from '@stores/employees';
	import { onMount } from 'svelte';
	import Table from '@components/Table.svelte';

	///**VARS**///
	let results = [];

	let config = {
		param: 'employees',
		paramFetch: 'employees',
		actions: true,
		route: 'employees',
		fields: [
			{
				name: 'Grupo 1',
				type: 'group',
				align: 'start',
				keys: [
					{
						type: 'titleEmployees',
						align: 'start'
					}
				]
			},
			{
				name: 'Grupo 2',
				type: 'group',
				align: 'start',
				keys: [
					{
						name: 'Team(s)',
						type: 'Array',
						//align: 'start',
						key: 'team'
					},
					{
						name: 'Role(s)',
						type: 'Array',
						//align: 'start',
						key: 'roles'
					}
				]
			}
		]
	};

	onMount(async () => {
		results = await fetchEmployees();
	});

	async function deleteItem(event) {
		await deleteEmployees(event.detail);
		results = await fetchEmployees();
	}
	//$: console.log('Results Employees', results);
</script>

<div class="container px-6 md:max-w-5xl mx-auto h-max">
	<div class="flex justify-center md:justify-start my-12 pb-6 border-b-[1px] border-tertiary/30">
		<h1 class="text-secondary text-3xl font-bold">Employees</h1>
	</div>

	<div class="w-full bg-white rounded-xl p-6 shadow-lg mb-6">
		<a href="/employees/add" class="flex justify-center mb-6">
			<button
				class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
				>Add</button
			>
		</a>
		<div class="relative overflow-x-auto px-0">
			<Table {config} {results} on:delete={deleteItem} />
		</div>
	</div>
</div>
