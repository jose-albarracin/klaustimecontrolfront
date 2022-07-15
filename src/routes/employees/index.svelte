<script>
	import { fetchEmployees, deleteEmployees } from '@stores/employees';
	import InlineSVG from 'svelte-inline-svg';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Table from '@components/Table.svelte';
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

			<!-- <table class="table w-full ">
				<tbody>
					{#each results as item}
						<tr>
							<td>
								<div class="flex flex-col">
									<p class="text-secondary font-bold text-base">
										{item.first_name}
										{item.last_name}
									</p>
									<p class="text-tertiary font-medium text-[0.8rem]">{item.email}</p>
								</div>
							</td>
							<td>
								<div class="flex justify-center md:justify-start">
									<p class="text-primary font-bold text-[0.8rem] ">Team(s):&nbsp;</p>
									<p class="text-tertiary font-medium text-[0.8rem]">
										{item.team.map((team) => team.title)}
									</p>
								</div>
								<div class="flex justify-center md:justify-start">
									<p class="text-primary font-bold text-[0.8rem] ">Role(s):&nbsp;</p>
									<p class="text-tertiary font-medium text-[0.8rem]">
										{item.roles.map((rol) => rol.name)}
									</p>
								</div>
							</td>
							<td>
								<div
									class="flex items-center justify-center md:justify-end
								gap-x-3"
								>
									<a
										href={`/employees/edit/${item._id}`}
										class="flex items-center justify-center cursor-pointer bg-selago text-primary px-4 py-4 rounded-full shadow-sm transition-all hover:bg-primary hover:text-white"
									>
										<InlineSVG class=" w-[20px] h-[20px]" src="/icons/pen-to-square-solid.svg" />
									</a>
									<div
										on:click={async () => {
											await deleteEmployees(item._id);
											results = await fetchEmployees();
										}}
										class="flex items-center justify-center cursor-pointer bg-selago text-primary px-4 py-4 rounded-full shadow-sm transition-all hover:bg-primary hover:text-white"
									>
										<InlineSVG class=" w-[20px] h-[20px]" src="/icons/trash-solid.svg" />
									</div>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table> -->
		</div>
	</div>
</div>
