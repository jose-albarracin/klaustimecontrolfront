<script>
	import { createHours } from '@stores/hours';
	import { fetchEmployees } from '@stores/employees';
	import { onMount } from 'svelte';
	import InlineSVG from 'svelte-inline-svg';
	import { goto } from '$app/navigation';
	import Inputs from '@components/inputs.svelte';

	onMount(async () => {
		employess = await fetchEmployees();
	});

	let hoursState = {};
	let employess = [];

	let unwindAdmin = {};
	let initialState = {
		employee: undefined,
		start: undefined,
		end: undefined
	};

	let employessList = [];

	$: {
		hoursState = Object.assign(hoursState, { employee: unwindAdmin[0] });
	}

	//$: unwindAdmin;

	$: {
		employessList = employess.map(function (e) {
			let obj = {};
			obj['label'] = `${e.first_name} ${e.last_name}`;
			obj['value'] = e._id;

			return obj;
		});
	}

	$: hoursState = initialState;

	//$: console.log('hoursState', hoursState);
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
				<Inputs
					label="Employee"
					select={true}
					multiselect={null}
					options={employessList}
					bind:selectedValues={unwindAdmin}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<Inputs
					label="Start"
					name="start"
					type="number"
					required={true}
					bind:value={hoursState.start}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<Inputs label="End" name="end" type="number" required={true} bind:value={hoursState.end} />
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
