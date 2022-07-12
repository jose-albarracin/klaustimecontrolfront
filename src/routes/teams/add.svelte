<script>
	import { get } from 'svelte/store';
	import { user } from '@stores/login';
	import { fetchTeams, createTeams } from '@stores/teams';
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

	let teamState = {};
	let employess = [];
	let value = [];
	let unwindAdmin = {};
	$: {
		//unwindAdmin;
		//console.log('unwindAdmin', unwindAdmin);
		teamState = Object.assign(teamState, { admin: unwindAdmin[0] });
	}
	/* $: value = [
		{ label: 'foo', value: 42 },
		{ label: 'bar', value: 69 }
	]; */
	let initialState = {
		title: undefined,
		description: undefined,
		admin: undefined
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

	$: teamState = initialState;

	let outerDivClass =
		'shadow !appearance-none !border !border-[#e5e7eb] !rounded-lg w-full !py-2 !px-3 leading-tight';
	//$: console.log('data', teamState);
	//$: console.log('multiSe results', value);
	//$: console.log('Teams', teams);
</script>

<div class="container md:max-w-5xl px-6 mx-auto h-max">
	<div class="flex justify-start items-center my-12 pb-6 border-b-[1px] border-tertiary/30">
		<a
			href="/teams"
			class="flex items-center justify-center cursor-pointer text-white bg-primary px-3 py-3 rounded-full shadow-sm"
		>
			<InlineSVG class=" w-[20px] h-[20px]" src="/icons/arrow-left-solid.svg" />
		</a>
		<h1 class="text-secondary text-3xl  font-bold ml-6">Add Team</h1>
	</div>
	<div class="w-full bg-white rounded-xl p-6 shadow-sm">
		<form
			on:submit|preventDefault={async () => {
				await createTeams(teamState);
				await goto('/teams');
			}}
			class="grid grid-cols-1 md:grid-cols-12 gap-x-8"
		>
			<div class="col-span-1 md:col-span-12">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="first_name"> Title </label>
				<input
					class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight !focus:outline-none !focus:shadow-outline mb-4"
					type="text"
					placeholder="Title"
					name="title"
					id="title"
					required
					bind:value={teamState.title}
				/>
			</div>
			<div class="col-span-1 md:col-span-12">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="last_name">
					Description
				</label>
				<textarea
					class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight !focus:outline-none !focus:shadow-outline mb-4"
					placeholder="Description"
					name="description"
					id="description"
					rows="6"
					required
					bind:value={teamState.description}
				/>
			</div>

			<div class="col-span-1 md:col-span-12 mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="team"> Admin </label>
				<MultiSelect
					maxSelect={1}
					{outerDivClass}
					bind:selectedValues={unwindAdmin}
					options={employessList}
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
