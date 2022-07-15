<script>
	import { createTeams } from '@stores/teams';
	import { fetchEmployees } from '@stores/employees';
	import { onMount } from 'svelte';
	import InlineSVG from 'svelte-inline-svg';
	import { goto } from '$app/navigation';
	import Inputs from '@components/inputs.svelte';

	let teamState = {};
	let employess = [];

	let unwindAdmin = {};
	let employessList = [];
	let initialState = {
		title: undefined,
		description: undefined,
		admin: undefined
	};

	onMount(async () => {
		employess = await fetchEmployees();
	});

	$: {
		teamState = Object.assign(teamState, { admin: unwindAdmin[0] });
	}

	$: {
		employessList = employess.map(function (e) {
			let obj = {};
			obj['label'] = `${e.first_name} ${e.last_name}`;
			obj['value'] = e._id;

			return obj;
		});
	}

	$: teamState = initialState;

	//$: console.log('teamState', teamState);
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
				<Inputs
					label="Title"
					name="title"
					type="text"
					required={true}
					bind:value={teamState.title}
				/>
			</div>
			<div class="col-span-1 md:col-span-12">
				<Inputs
					label="Description"
					textarea={true}
					name="description"
					rows="6"
					required={true}
					bind:value={teamState.description}
				/>
			</div>

			<div class="col-span-1 md:col-span-12 mb-4">
				<Inputs
					label="Admin"
					select={true}
					multiselect={null}
					options={employessList}
					bind:selectedValues={unwindAdmin}
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
