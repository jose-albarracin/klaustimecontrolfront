<script>
	import { get } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { user } from '../stores/login';
	import { createHour, fetchHour } from '../stores/hours';

	//VARSS

	let initialHour = {
		start: undefined,
		end: undefined
	};

	let stateHour = initialHour;

	let results = [];
	let response = '';

	//$: console.log('stateHour', stateHour);

	onMount(async () => {
		response = await fetchHour();

		if (response) {
			results = await response.Registers;
		} else {
			results = [];
		}
	});

	/* 	async function fetchHourLocal() {
		console.log('hola?=');
		fetchHour();
	} */

	async function createHourLocal() {
		await createHour(stateHour);
		stateHour = {};

		response = await fetchHour();
		results = await response.Registers;
	}

	//$: createHourLocal();

	//$: console.log('Results', results);
</script>

<div class="container md:max-w-5xl px-6 mx-auto h-max">
	<div class="flex justify-start my-12 pb-6 border-b-[1px] border-tertiary/30">
		<h1 class="text-secondary text-3xl  font-bold">My Hours</h1>
	</div>
	<div class="w-full bg-white rounded-xl p-6 mb-6 shadow-lg">
		<form
			on:submit|preventDefault={createHourLocal}
			class="grid grid-cols-1 md:grid-cols-12 gap-x-8"
		>
			<div class="col-span-1 md:col-span-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="start"> Start </label>
				<input
					class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight !focus:outline-none !focus:shadow-outline mb-4"
					type="number"
					placeholder="Start"
					name="start"
					id="start"
					required
					bind:value={stateHour.start}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="end"> End </label>
				<input
					class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight !focus:outline-none !focus:shadow-outline mb-4"
					type="text"
					placeholder="End"
					name="end"
					id="end"
					required
					bind:value={stateHour.end}
				/>
			</div>
			<div class="col-span-1 md:col-span-12 flex justify-center">
				<button
					class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg"
					type="submit">Add</button
				>
			</div>
		</form>
	</div>

	<div class="w-full bg-white rounded-xl p-6 shadow-lg mb-6">
		<div class="relative overflow-x-auto  ">
			<table class="table w-full ">
				<tbody>
					{#each results as item}
						<tr>
							<td>
								<div class="flex flex-col">
									<p class="text-secondary font-bold text-base mb-2">Hours Worked</p>
									<p class="text-primary font-extrabold text-base">
										{item.hours_worked}h
									</p>
								</div>
							</td>

							<td>
								<div class="flex flex-col">
									<div class="flex justify-center md:justify-start items-center ">
										<p class="text-primary font-bold text-base ">Start:&nbsp;</p>
										<p class="text-tertiary font-medium text-[0.8rem]">{item.start}h</p>
									</div>
								</div>
							</td>
							<td>
								<div class="flex flex-col">
									<div class="flex justify-center md:justify-start items-center">
										<p class="text-primary font-bold text-base ">End:&nbsp;</p>
										<p class="text-tertiary font-medium text-[0.8rem]">{item.end}h</p>
									</div>
								</div>
							</td>

							<td>
								<div class="flex justify-center md:justify-end">
									<div class="flex justify-center md:justify-start items-center">
										<p class="text-primary font-bold text-base ">Date:&nbsp;</p>
										<p class="text-tertiary font-medium text-[0.8rem]">
											{new Date(item.createdAt).toISOString().split('T')[0]}
										</p>
									</div>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<div class="mt-4">
			<p class="text-center text-2xl font-bold text-secondary">
				Totals Hours Worked: {response ? response.totalHoursWorked : ''}h
			</p>
		</div>
	</div>
</div>
