<script>
	import { fetchTeamTasks, deleteTasks } from '@stores/tasks';
	import InlineSVG from 'svelte-inline-svg';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Table from '@components/Table.svelte';

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
			<!-- <table class="table w-full ">
				<tbody>
					{#each results as item}
						<tr>
							<td>
								<div class="flex flex-col">
									<p class="text-secondary font-bold text-base">{item.title}</p>

									<div class="flex justify-center md:justify-start">
										<p class="text-primary font-bold text-[0.8rem]">Start:&nbsp;</p>
										<p class="text-tertiary font-medium text-[0.8rem]">
											{new Date(item.start).toISOString().split('T')[0]}
										</p>
									</div>
									<div class="flex justify-center md:justify-start">
										<p class="text-primary font-bold text-[0.8rem]">End:&nbsp;</p>
										<p class="text-tertiary font-medium text-[0.8rem]">
											{new Date(item.end).toISOString().split('T')[0]}
										</p>
									</div>
								</div>
							</td>
							<td>
								<div class="flex flex-col justify-center md:justify-start">
									<p class="text-primary font-bold text-[0.8rem] ">
										Description:&nbsp;<span class="text-tertiary font-medium text-[0.8rem]">
											{item.description}
										</span>
									</p>
								</div>
							</td>

							<td class="text-center"
								><div
									class="flex justify-center md:justify-end
								gap-x-3"
								>
									<a
										href={`/tasksTeam/edit/${item._id}`}
										class="flex items-center justify-center cursor-pointer bg-selago text-primary px-4 py-4 rounded-full shadow-sm transition-all hover:bg-primary hover:text-white"
									>
										<InlineSVG class=" w-[20px] h-[20px]" src="/icons/pen-to-square-solid.svg" />
									</a>
									<div
										on:click={async () => {
											await deleteTasks(item._id);
											results = await fetchTeamTasks();
										}}
										class="flex items-center justify-center cursor-pointer bg-selago text-primary px-4 py-4 rounded-full shadow-sm transition-all hover:bg-primary hover:text-white "
									>
										<InlineSVG class=" w-[20px] h-[20px]" src="/icons/trash-solid.svg" />
									</div>
								</div></td
							>
						</tr>
					{/each}
				</tbody>
			</table> -->
		</div>
	</div>
</div>
