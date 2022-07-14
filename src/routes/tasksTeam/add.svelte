<script>
	import { get } from 'svelte/store';
	import { user } from '@stores/login';
	import { createTasks } from '@stores/tasks';
	import { onMount } from 'svelte';
	import InlineSVG from 'svelte-inline-svg';
	import { goto } from '$app/navigation';
	import Inputs from '@components/inputs.svelte';

	export let results;

	let userStore = get(user);

	$: console.log('Task', results);
	let taskState = {};
	let initialState = {
		title: undefined,
		description: undefined,
		team: userStore.body.teamAdmin,
		start: undefined,
		end: undefined
	};

	$: taskState = initialState;

	$: console.log('data', taskState);
</script>

<div class="container md:max-w-5xl  px-4 mx-auto">
	<div class="flex justify-start items-center my-12 pb-6 border-b-[1px] border-tertiary/30">
		<a
			href="/tasksTeam"
			class="flex items-center justify-center cursor-pointer text-white bg-primary px-3 py-3 rounded-full shadow-sm"
		>
			<InlineSVG class="w-[20px] h-[20px]" src="/icons/arrow-left-solid.svg" />
		</a>
		<h1 class="text-secondary text-3xl  font-bold ml-6">Add Task</h1>
	</div>
	<!-- <div class="flex justify-start items-center my-12">
		<a href="/tasksTeam" class="flex items-center justify-center cursor-pointer">
			<InlineSVG class="text-indigo-500 w-fit h-[25px]" src="/icons/arrow-left-solid.svg" />
		</a>
		<h1 class="text-secondary text-3xl  font-bold ml-6">Add Task</h1>
	</div> -->
	<div class="w-full bg-white rounded-xl p-6 shadow-sm">
		<form
			on:submit|preventDefault={async () => {
				await createTasks(taskState);
				await goto('/tasksTeam');
			}}
			class="grid grid-cols-1 md:grid-cols-12 gap-x-8"
		>
			<div class="col-span-1 md:col-span-12">
				<Inputs
					label="Title"
					name="title"
					type="text"
					required={true}
					bind:value={taskState.title}
				/>
			</div>
			<div class="col-span-1 md:col-span-12">
				<Inputs
					textarea={true}
					label="Description"
					name="description"
					rows="6"
					required={true}
					bind:value={taskState.description}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<Inputs
					label="Start"
					name="start"
					type="date"
					required={true}
					bind:value={taskState.start}
				/>
			</div>
			<div class="col-span-1 md:col-span-6">
				<Inputs label="End" name="end" type="date" required={true} bind:value={taskState.end} />
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
