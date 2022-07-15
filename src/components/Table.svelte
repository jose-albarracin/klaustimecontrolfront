<script>
	import InlineSVG from 'svelte-inline-svg';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let results = [];

	export let config;

	//$: console.log('results', results);
	//$: console.log('config', config['param']);
</script>

{#if config}
	<table class="table w-full ">
		<tbody>
			{#each results as item}
				<tr>
					{#each config.fields as fields}
						<td>
							{#if fields.type === 'group'}
								<div class={`flex flex-col items-${fields.align ? fields.align : 'start'}`}>
									{#each fields.keys as subfields}
										{#if subfields.type === 'titleHour'}
											<p class="text-secondary font-bold text-base">{subfields.name}</p>
											<p class="text-primary font-extrabold text-base">
												{item[subfields.key]}h
											</p>
										{:else if subfields.type === 'title'}
											<p class="text-secondary font-bold text-base">
												{subfields.name ? subfields.name : item[subfields.key]}
											</p>
										{:else if subfields.type === 'titleEmployeTeam'}
											<p class="text-secondary font-bold text-2xl mb-3 ">
												{`${item.first_name} ${item.last_name}`}
											</p>
											<p class="text-primary font-bold text-2xl mb-3">Hours Worked:&nbsp;</p>
											<p class="text-tertiary font-bold text-4xl ">
												{item[subfields.key]}h
											</p>
										{:else if subfields.type === 'titleEmployees'}
											<p class="text-secondary font-bold text-base">
												{item.first_name}
												{item.last_name}
											</p>
											<p class="text-tertiary font-medium text-[0.8rem]">{item.email}</p>
										{:else if subfields.type === 'Date'}
											<div
												class={`flex justify-center md:justify-${
													subfields.align ? subfields.align : 'start'
												}`}
											>
												<p class="text-primary font-bold text-[0.8rem]">{subfields.name}:&nbsp;</p>
												<p class="text-tertiary font-medium text-[0.8rem]">
													{new Date(item[subfields.key]).toISOString().split('T')[0]}
												</p>
											</div>
										{:else if subfields.type === 'Array'}
											<div
												class={`flex justify-center md:justify-${
													subfields.align ? subfields.align : 'start'
												}`}
											>
												<p class="text-primary font-bold text-[0.8rem]">{subfields.name}:&nbsp;</p>
												<p class="text-tertiary font-medium text-[0.8rem]">
													{item[subfields.key].map((element) =>
														subfields.key === 'team' ? element.title : element.name
													)}
												</p>
											</div>
										{:else if subfields.type === 'joinNameAdmin'}
											<div
												class={`flex justify-center md:justify-${
													subfields.align ? subfields.align : 'start'
												}`}
											>
												<p class="text-primary font-bold text-[0.8rem]">
													{subfields.name}:&nbsp;
												</p>
												<p class="text-tertiary font-medium text-[0.8rem]">
													{`${item.admin ? item.admin.first_name : ''} ${
														item.admin ? item.admin.last_name : ''
													}`}
												</p>
											</div>
										{:else if subfields.type === 'joinNameEmployee'}
											<div
												class={`flex justify-center md:justify-${
													subfields.align ? subfields.align : 'start'
												}`}
											>
												<p class="text-secondary font-bold text-base">
													{`${item.employee ? item.employee.first_name : ''} ${
														item.employee ? item.employee.last_name : ''
													}`}
												</p>
											</div>
										{:else if subfields.type === 'Hour'}
											<div
												class={`flex justify-center md:justify-${
													subfields.align ? subfields.align : 'start'
												}`}
											>
												<p class="text-primary font-bold text-[0.8rem]">{subfields.name}:&nbsp;</p>
												<p class="text-tertiary font-medium text-[0.8rem]">
													{item[subfields.key]}h
												</p>
											</div>
										{:else if subfields.type === 'teamTask'}
											<div
												class={`flex justify-center md:justify-${
													subfields.align ? subfields.align : 'start'
												}`}
											>
												<p class="text-primary font-bold text-[0.8rem] ">
													{subfields.name}:&nbsp;<span
														class="text-tertiary font-medium text-[0.8rem]"
													>
														{item.team.title}
													</span>
												</p>
											</div>
										{:else}
											<div
												class={`flex justify-center md:justify-${
													fields.align ? fields.align : 'start'
												}`}
											>
												<p class="text-primary font-bold text-[0.8rem] ">
													{subfields.name}:&nbsp;<span
														class="text-tertiary font-medium text-[0.8rem]"
													>
														{item[subfields.key]}
													</span>
												</p>
											</div>
										{/if}
									{/each}
								</div>
							{:else if fields.type === 'Date'}
								<div
									class={`flex justify-center md:justify-${fields.align ? fields.align : 'start'}`}
								>
									<p class="text-primary font-bold text-[0.8rem]">{fields.name}:&nbsp;</p>
									<p class="text-tertiary font-medium text-[0.8rem]">
										{new Date(item[fields.key]).toISOString().split('T')[0]}
									</p>
								</div>
							{:else if fields.type === 'Hour'}
								<div
									class={`flex justify-center md:justify-${fields.align ? fields.align : 'start'}`}
								>
									<p class="text-primary font-bold text-[0.8rem]">{fields.name}:&nbsp;</p>
									<p class="text-tertiary font-medium text-[0.8rem]">
										{item[fields.key]}h
									</p>
								</div>
							{:else}
								<div
									class={`flex justify-center md:justify-${fields.align ? fields.align : 'start'}`}
								>
									<p class="text-primary font-bold text-[0.8rem] ">
										{fields.name}:&nbsp;<span class="text-tertiary font-medium text-[0.8rem]">
											{item[fields.key]}
										</span>
									</p>
								</div>
							{/if}
						</td>
					{/each}
					{#if config.actions}
						<td>
							<div
								class="flex justify-center md:justify-end
								gap-x-3"
							>
								<a
									href={`/${config.route}/edit/${item._id}`}
									class="flex items-center justify-center cursor-pointer bg-selago text-primary px-4 py-4 rounded-full shadow-sm transition-all hover:bg-primary hover:text-white"
								>
									<InlineSVG class=" w-[20px] h-[20px]" src="/icons/pen-to-square-solid.svg" />
								</a>
								<div
									on:click={() => {
										dispatch('delete', item._id);
									}}
									class="flex items-center justify-center cursor-pointer bg-selago text-primary px-4 py-4 rounded-full shadow-sm transition-all hover:bg-primary hover:text-white"
								>
									<InlineSVG class=" w-[20px] h-[20px]" src="/icons/trash-solid.svg" />
								</div>
							</div>
						</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
