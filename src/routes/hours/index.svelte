<script>
	import { fetchHours, deleteHours } from '@stores/hours';
	import InlineSVG from 'svelte-inline-svg';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	let results = [];

	onMount(async () => {
		results = await fetchHours();
	});
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
			<table class="table w-full ">
				<tbody>
					{#each results as item}
						<tr>
							<td>
								<div class="flex flex-col">
									<p class="text-secondary font-bold text-base">
										{`${item.employee ? item.employee.first_name : ''} ${
											item.employee ? item.employee.last_name : ''
										}`}
									</p>
									<div class="flex justify-center md:justify-start">
										<p class="text-primary font-bold text-[0.8rem] ">Start:&nbsp;</p>
										<p class="text-tertiary font-medium text-[0.8rem]">{item.start}h</p>
									</div>
									<div class="flex justify-center md:justify-start">
										<p class="text-primary font-bold text-[0.8rem] ">End:&nbsp;</p>
										<p class="text-tertiary font-medium text-[0.8rem]">{item.end}h</p>
									</div>
								</div>
							</td>
							<td>
								<div class="flex justify-center md:justify-start">
									<p class="text-primary font-bold text-[0.8rem] ">Hours Worked:&nbsp;</p>
									<p class="text-tertiary font-medium text-[0.8rem]">{item.hours_worked}h</p>
								</div>
								<div class="flex justify-center md:justify-start">
									<p class="text-primary font-bold text-[0.8rem] ">Date:&nbsp;</p>

									<p class="text-tertiary font-medium text-[0.8rem]">
										{new Date(item.createdAt).toISOString().split('T')[0]}
									</p>
								</div>
							</td>

							<td class="text-center"
								><div
									class="flex justify-center md:justify-end
								gap-x-3"
								>
									<a
										href={`/hours/edit/${item._id}`}
										class="flex items-center justify-center cursor-pointer bg-selago text-primary px-4 py-4 rounded-full shadow-sm transition-all hover:bg-primary hover:text-white"
									>
										<InlineSVG class=" w-[20px] h-[20px]" src="/icons/pen-to-square-solid.svg" />
									</a>
									<div
										on:click={async () => {
											await deleteHours(item._id);
											results = await fetchHours();
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
