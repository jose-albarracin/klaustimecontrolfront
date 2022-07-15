<script>
	import { fetchTeams, deleteTeams } from '@stores/teams';
	import { onMount } from 'svelte';
	import Table from '@components/Table.svelte';

	let results = [];
	let config = {
		param: 'teams',
		paramFetch: 'teams',
		actions: true,
		route: 'teams',
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
						name: 'Admin',
						type: 'joinNameAdmin',
						align: 'start'
						//key: 'Admin'
					}
				]
			},
			{
				name: 'Description',
				align: 'start',
				key: 'description'
			}
		]
	};

	onMount(async () => {
		results = await fetchTeams();
	});

	async function deleteItem(event) {
		await deleteTeams(event.detail);
		results = await fetchTeams();
	}
	//$: console.log('Results teams', results);
</script>

<div class="container md:max-w-5xl px-6 mx-auto h-max">
	<div class="flex justify-center md:justify-start my-12 pb-6 border-b-[1px] border-tertiary/30">
		<h1 class="text-secondary text-3xl font-bold">Teams</h1>
	</div>
	<div class="w-full bg-white rounded-xl p-6 shadow-lg mb-6">
		<a href="/teams/add" class="flex justify-center mb-6">
			<button
				class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
				>Add</button
			>
		</a>

		<div class="relative overflow-x-auto px-0 ">
			<Table {config} {results} on:delete={deleteItem} />
		</div>
	</div>
</div>
