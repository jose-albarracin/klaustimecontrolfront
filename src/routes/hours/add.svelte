<script>
	import { get } from 'svelte/store';
	import { user } from '@stores/login';
	import { fetchHours, createHours } from '@stores/hours';
	import { fetchEmployees } from '@stores/employees';
	import { onMount } from 'svelte';
	import InlineSVG from 'svelte-inline-svg';
	import { goto } from '$app/navigation';

	import MultiSelect from 'svelte-multiselect';

	onMount(async () => {
		employess = await fetchEmployees();
	});

	/* 	const myOptions = Option[] = [
    { label: 'foo', value: 42 },
    { label: 'bar', value: 69 },
  ] */

	let hoursState = {};
	let employess = [];
	let value = [];
	let unwindAdmin = {};
	$: {
		//unwindAdmin;
		//console.log('unwindAdmin', unwindAdmin);
		hoursState = Object.assign(hoursState, { employee: unwindAdmin[0] });
	}
	/* $: value = [
		{ label: 'foo', value: 42 },
		{ label: 'bar', value: 69 }
	]; */
	let initialState = {
		employee: undefined,
		start: undefined,
		end: undefined
	};

	//$: unwindAdmin;

	let employessList = [];
	$: {
		employessList = employess.map(function (e) {
			let obj = {};
			obj['label'] = `${e.first_name} ${e.last_name}`;
			obj['value'] = e._id;

			return obj;
		});
	}

	$: hoursState = initialState;

	let outerDivClass =
		'shadow !appearance-none !border !border-[#e5e7eb] !rounded-lg w-full !py-2 !px-3 leading-tight';
	//$: console.log('data', hoursState);
	//$: console.log('multiSe results', value);
	//$: console.log('Teams', teams);
</script>

<div class="container px-6 mx-auto md:max-w-5xl h-max">
	<div class="flex justify-start items-center my-12 pb-6 border-b-[1px] border-tertiary/30">
		<a
			href="/hours"
			class="flex items-center justify-center cursor-pointer text-white bg-primary px-3 py-3 rounded-full shadow-sm"
		>
			<InlineSVG class="w-[20px] h-[20px]" src="/icons/arrow-left-solid.svg" />
		</a>
		<h1 class="text-secondary text-3xl  font-bold ml-6">Add Hour</h1>
	</div>

	<div class="w-full bg-white rounded-xl p-6 shadow-lg mb-6">
		<form
			on:submit|preventDefault={async () => {
				await createHours(hoursState);
				await goto('/hours');
			}}
			class="grid grid-cols-1 md:grid-cols-12 gap-x-8"
		>
			<div class="col-span-1 md:col-span-12 mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="team"> Employee </label>
				<MultiSelect
					maxSelect={1}
					{outerDivClass}
					bind:selectedValues={unwindAdmin}
					options={employessList}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="start"> Start </label>
				<input
					class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight !focus:outline-none !focus:shadow-outline mb-4"
					type="number"
					placeholder="Start"
					name="start"
					id="start"
					required
					bind:value={hoursState.start}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="end"> End </label>
				<input
					class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight !focus:outline-none !focus:shadow-outline mb-4"
					type="number"
					placeholder="End"
					name="end"
					id="end"
					required
					bind:value={hoursState.end}
				/>
			</div>

			<div class="col-span-1 md:col-span-12 flex justify-center">
				<button
					class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
					type="submit"
				>
					<InlineSVG
						class="text-white w-[15px] h-fit mr-3"
						src="/icons/floppy-disk-solid.svg"
					/>Save</button
				>
			</div>
		</form>
	</div>
</div>
