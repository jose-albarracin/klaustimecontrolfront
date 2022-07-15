<script>
	import { get } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { user } from '../stores/login';
	import { fetchTeamHours } from '../stores/hours';
	import Table from '@components/Table.svelte';

	//VARSS

	let initialHour = {
		start: undefined,
		end: undefined
	};

	let results = [];
	let response = '';

	let config = {
		param: 'Hour',
		actions: false,
		route: '',
		fields: [
			{
				name: 'Grupo 1',
				type: 'group',
				align: 'center',
				keys: [
					{
						type: 'titleEmployeTeam',
						align: 'start',
						key: 'hoursWorked'
					}
				]
			}
		]
	};

	//$: console.log('stateHour', stateHour);

	onMount(async () => {
		response = await fetchTeamHours();

		if (response) {
			results = await response.employeesTeam;
		} else {
			results = [];
		}
	});
</script>

<div class="container md:max-w-5xl px-6 mx-auto h-max">
	<div class="flex justify-center md:justify-start my-12 pb-6 border-b-[1px] border-tertiary/30">
		<h1 class="text-secondary text-3xl  font-bold">Team Hours</h1>
	</div>

	<div class="w-full bg-white rounded-xl p-6 shadow-lg mb-6">
		<div class="relative overflow-x-auto px-0 ">
			<Table {config} {results} />
			<!-- <table class="table w-full ">
				<tbody>
					{#each resultsEmployees as item}
						<tr>
							<td>
								<div class="flex flex-col justify-center items-center gap-y-6">
									<p class="text-secondary font-bold text-2xl ">
										{`${item.first_name} ${item.last_name}`}
									</p>
									<p class="text-primary font-bold text-2xl ">Hours Worked:&nbsp;</p>
									<p class="text-tertiary font-bold text-4xl ">
										{item.hoursWorked}h
									</p>
								</div>
							</td>
							
						</tr>
					{/each}
				</tbody>
			</table> -->
		</div>
		<div class="mt-4">
			<p class="text-center text-2xl font-bold text-secondary">
				Totals Hours Team Worked: {response ? response.hoursWorked : ''}h
			</p>
		</div>
	</div>
</div>
