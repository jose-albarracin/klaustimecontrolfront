<script>
	import { hours } from '../stores/hours';
	// console.log('desde stores', $employees);
	import { fade } from 'svelte/transition';
</script>

<div transition:fade class="container px-4 mx-auto">
	<div class="flex justify-center my-12">
		<h1 class="text-indigo-900 text-3xl uppercase font-bold">Hours</h1>
	</div>
	<div class="w-full bg-white rounded-xl p-6">
		<div class="relative overflow-x-auto  shadow-md sm:rounded-md">
			<table class="table w-full ">
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Start</th>
						<th>End</th>
						<th>Hours Worked</th>
					</tr>
				</thead>
				<tbody>
					{#each $hours as item}
						<tr>
							<td class="text-center"><p>{item.employee.first_name}</p></td>
							<td class="text-center"><p>{item.employee.last_name}</p></td>
							<td class="text-center"><p>{item.start}</p></td>
							<td class="text-center"><p>{item.end}</p></td>
							<td class="text-center"><p>{item.hours_worked}</p></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
