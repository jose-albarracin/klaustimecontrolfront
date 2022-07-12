<!-- <script>
	import { teams } from '../stores/teams';
	// console.log('desde stores', $employees);
	import { fade } from 'svelte/transition';
</script>

<div transition:fade class="container px-4 mx-auto">
	<div class="flex justify-center my-12">
		<h1 class="text-indigo-900 text-3xl uppercase font-bold">Teams</h1>
	</div>
	<div class="w-full bg-white rounded-xl p-6">
		<div class="relative overflow-x-auto  shadow-md sm:rounded-md">
			<table class="table w-full ">
				<thead>
					<tr>
						<th>Team</th>
						<th>Description</th>
						<th>Admin</th>
					</tr>
				</thead>
				<tbody>
					{#each $teams as item}
						<tr>
							<td class="text-center"><p>{item.title}</p></td>
							<td class="text-center"><p>{item.description}</p></td>
							<td class="text-center"><p>{item.admin.first_name} {item.admin.last_name}</p></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
 -->
