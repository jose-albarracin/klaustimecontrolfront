<script>
	import { fetchTeams, deleteTeams } from '@stores/teams';
	import InlineSVG from 'svelte-inline-svg';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	let results = [];

	onMount(async () => {
		results = await fetchTeams();
	});
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
			<table class="table w-full ">
				<tbody>
					{#each results as item}
						<tr>
							<td>
								<div class="flex flex-col">
									<p class="text-secondary font-bold text-base">{item.title}</p>

									<div class="flex justify-center md:justify-start">
										<p class="text-primary font-bold text-[0.8rem]">
											Admin:&nbsp;<span class="text-tertiary font-medium text-[0.8rem]">
												{`${item.admin ? item.admin.first_name : ''} ${
													item.admin ? item.admin.last_name : ''
												}`}
											</span>
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

							<td data-th="Actions" class="text-center"
								><div
									class="flex justify-center md:justify-end
								gap-x-3"
								>
									<a
										href={`/teams/edit/${item._id}`}
										class="flex items-center justify-center cursor-pointer bg-selago text-primary px-4 py-4 rounded-full shadow-sm transition-all hover:bg-primary hover:text-white"
									>
										<InlineSVG class=" w-[20px] h-[20px]" src="/icons/pen-to-square-solid.svg" />
									</a>
									<div
										on:click={async () => {
											await deleteTeams(item._id);
											results = await fetchTeams();
										}}
										class="flex items-center justify-center cursor-pointer bg-selago text-primary px-4 py-4 rounded-full shadow-sm transition-all hover:bg-primary hover:text-white"
									>
										<InlineSVG class=" w-[20px] h-[20px]" src="/icons/trash-solid.svg" />
									</div>
								</div></td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
