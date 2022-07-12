<script>
	import { fetchEmployees, deleteEmployees } from '@stores/employees';
	import InlineSVG from 'svelte-inline-svg';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	let results = [];

	onMount(async () => {
		results = await fetchEmployees();
	});
	//$: console.log('Results Employees', results);
</script>

<div class="container px-6 md:max-w-5xl mx-auto h-max">
	<div class="flex justify-center md:justify-start my-12 pb-6 border-b-[1px] border-tertiary/30">
		<h1 class="text-secondary text-3xl font-bold">Employees</h1>
	</div>

	<div class="w-full bg-white rounded-xl p-6 shadow-lg mb-6">
		<a href="/employees/add" class="flex justify-center mb-6">
			<button
				class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
				>Add</button
			>
		</a>
		<div class="relative overflow-x-auto px-0">
			<table class="table w-full ">
				<tbody>
					{#each results as item}
						<tr>
							<td>
								<div class="flex flex-col">
									<p class="text-secondary font-bold text-base">
										{item.first_name}
										{item.last_name}
									</p>
									<p class="text-tertiary font-medium text-[0.8rem]">{item.email}</p>
								</div>
							</td>
							<td>
								<div class="flex justify-center md:justify-start">
									<p class="text-primary font-bold text-[0.8rem] ">Team(s):&nbsp;</p>
									<p class="text-tertiary font-medium text-[0.8rem]">
										{item.team.map((team) => team.title)}
									</p>
								</div>
								<div class="flex justify-center md:justify-start">
									<p class="text-primary font-bold text-[0.8rem] ">Role(s):&nbsp;</p>
									<p class="text-tertiary font-medium text-[0.8rem]">
										{item.roles.map((rol) => rol.name)}
									</p>
								</div>
							</td>
							<td>
								<div
									class="flex items-center justify-center md:justify-end
								gap-x-3"
								>
									<a
										href={`/employees/edit/${item._id}`}
										class="flex items-center justify-center cursor-pointer bg-selago text-primary px-4 py-4 rounded-full shadow-sm transition-all hover:bg-primary hover:text-white"
									>
										<InlineSVG class=" w-[20px] h-[20px]" src="/icons/pen-to-square-solid.svg" />
									</a>
									<div
										on:click={async () => {
											await deleteEmployees(item._id);
											results = await fetchEmployees();
										}}
										class="flex items-center justify-center cursor-pointer bg-selago text-primary px-4 py-4 rounded-full shadow-sm transition-all hover:bg-primary hover:text-white"
									>
										<InlineSVG class=" w-[20px] h-[20px]" src="/icons/trash-solid.svg" />
									</div>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- <div class="relative overflow-x-auto  shadow-md sm:rounded-md">
			<table class="table w-full ">
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Team</th>
						<th>Role</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each results as item}
						<tr>
							<td data-th="First Name" class="text-center"><p>{item.first_name}</p></td>
							<td data-th="Last Name" class="text-center"><p>{item.last_name}</p></td>
							<td data-th="Email" class="text-center"><p>{item.email}</p></td>
							<td data-th="Team" class="text-center"
								><p>{item.team.map((team) => team.title)}</p></td
							>
							<td data-th="Role" class="text-center"><p>{item.roles.map((rol) => rol.name)}</p></td>
							<td data-th="Actions" class="text-center"
								><div
									class="flex justify-center
								gap-x-3"
								>
									<a
										href={`/employees/edit/${item._id}`}
										class="flex items-center justify-center cursor-pointer"
									>
										<InlineSVG
											class="text-indigo-500 w-fit h-[15px]"
											src="/icons/pen-to-square-solid.svg"
										/>
									</a>
									<div
										on:click={async () => {
											await deleteEmployees(item._id);
											results = await fetchEmployees();
										}}
										class="flex items-center justify-center cursor-pointer"
									>
										<InlineSVG
											class="text-indigo-500 w-fit h-[15px]"
											src="/icons/trash-solid.svg"
										/>
									</div>
								</div></td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div> -->
	</div>
</div>
