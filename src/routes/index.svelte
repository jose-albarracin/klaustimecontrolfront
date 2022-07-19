<script>
	import { onMount } from 'svelte';
	import { fetchTeamTasksInCharged } from '@stores/tasks';
	import { createHour, fetchHour, fetchEmployeesHours, totalHoursWorked } from '@stores/hours';
	import {
		fetchTeamHours,
		fetchEmployeesHoursWeekly,
		fetchEmployeesHoursMonthly,
		fetchEmployeesHoursYearly
	} from '@stores/hours';

	import { fetchTeamHoursWeekly, fetchTeamHourMonthly, fetchTeamHourYearly } from '@stores/hours';

	import {
		fetchTotalEmployeesWeekly,
		fetchTotalEmployeesMonthly,
		fetchTotalEmployeesYearly
	} from '@stores/hours';

	import { fetchEmployeeProfile } from '@stores/employees';
	import { user } from '@stores/login';
	import { get } from 'svelte/store';
	import ChartJS from '../components/ChartJS.svelte';
	import ChartJsGroups from '../components/ChartJsGroups.svelte';
	import { DateTime, Info, Interval } from 'luxon';

	import { dataWeekly, dataMonthly, dataYearly } from '../utils/dataForChartJs';

	///**VARS**///

	let userStore = get(user);
	let isAdmin = undefined;
	let isUser = undefined;
	let isSuperAdmin = undefined;

	// Luxon

	let yearNumber = DateTime.now().year;
	let weekNumber = DateTime.now().weekNumber;
	let month = DateTime.now().month;
	let daysInMonth = DateTime.now().daysInMonth;

	let percentageYear = 0;
	let percentageToday = 0;
	let percentageWeek = 0;
	let percentageMonth = 0;

	let hoursToday = 0;
	let hoursWeek = 0;
	let hoursMonth = 0;

	/// Buttons
	let buttonWeekly = true;
	let buttonMonthly = false;
	let buttonYearly = false;

	//DataClick weekly, monthly, yearly
	let currentData;
	let currentDataTeam;
	let currentDataTotalEmployees;

	// Vars for percentage
	let dataHoursYear;
	let dataHoursToday;
	let dataHoursWeek;
	let dataHoursMonth;

	// Vars for send CharJS one Employee
	let dataHoursWeekly;
	let dataHoursMonthly;
	let dataHoursYearly;

	// Vars for send CharJS Team
	let dataTeamHoursWeekly;
	let dataTeamHoursMonthly;
	let dataTeamHoursYearly;

	// Vars for send CharJS Total Employee
	let dataTotalEmployeesWeekly;
	let dataTotalEmployeesMonthly;
	let dataTotalEmployeesYearly;

	let isTask = {};

	let profile;

	onMount(async () => {
		//loading.set(true);
		profile = await fetchEmployeeProfile();

		profile = await profile.first_name;

		//loading.set(false);

		userStore = get(user);
		//console.log('user', userData.body._id);
		isTask = await fetchTeamTasksInCharged(userStore.body._id);

		/* if (isTask) {
			//console.log('HAY TAREAS');
			//console.log(isTask);
		} else {
			console.log('NO HAY TAREAS');
		} */
	});

	//$: console.log('profile');

	//$: console.log('LuxonTOTAL DATA', DateTime.now());

	$: fetchHour();

	//console.log('Mes :', DateTime.now().month);
	let allDays = [];
	for (let i = 1; i <= daysInMonth; i++) {
		const dt = DateTime.fromObject({
			year: yearNumber,
			month: month,
			day: i
		});
		allDays[i] = {
			day: dt.day,
			dayName: dt.weekdayLong
		};
	}

	let bussinesDays = allDays.filter(
		(item) => item.dayName !== 'Sunday' && item.dayName !== 'Saturday'
	);

	///**FUNCTIONS FOR PERCENTAGES**///

	//Work Year

	dataHoursYear = async () => {
		//let res = await fetchHour();
		//console.log('totalHoursWorked', $totalHoursWorked);
		let res = await fetchEmployeeProfile();
		let hoursExpected = await res.hour_expected;
		let hoursTotal = $totalHoursWorked; /* await res.totalHoursWorked */

		let start =
			(hoursTotal / hoursExpected) * 100 > 100
				? 100
				: Math.round((hoursTotal / hoursExpected) * 100);
		percentageYear = start;
		let end = 100 - start;
		let labels = ['start', 'end'];
		let data = [start, end];
		return { labels, data };
	};

	//Work Today

	dataHoursToday = async () => {
		let res = await fetchHour();
		//console.log(' resTODAY', await res);
		let test;

		let hoursExpected = 8;
		let registers = res ? await res.Registers : undefined;
		console.log('registers ', registers);

		let labels = ['start', 'end'];
		let data = [];
		let results = registers
			? registers
					.map((item) => {
						let now = DateTime.now().toFormat('yyyy-MM-dd');
						let dateCurrent = DateTime.fromISO(item.createdAt).toUTC().toFormat('yyyy-MM-dd');
						//console.log('----------------------------');
						//console.log('now', now);
						//console.log('createdAt', item.createdAt);
						//console.log('DateTime.fromISO', DateTime.fromISO(item.createdAt).toUTC());
						//console.log('dateCurrentTODAY', dateCurrent);
						if (now == dateCurrent) {
							return item.hours_worked;
						}
						return 0;
					})
					.reduce((a, b) => a + b)
			: 0;
		hoursToday = results;
		//console.log('results  ', (results / hoursExpected) * 100);
		let start =
			(results / hoursExpected) * 100 > 100 ? 100 : Math.round((results / hoursExpected) * 100);
		let end = 100 - start;
		percentageToday = start;
		data = [start > 100 ? 100 : start, end];

		//console.log('data TODAY', { labels, data });
		return { labels, data };
	};

	//Work Week

	dataHoursWeek = async () => {
		let res = await fetchHour();
		let hoursExpected = 8 * 5;
		let registers = res ? await res.Registers : undefined;
		//console.log('registers ', registers);

		const dt = DateTime.fromObject({
			weekYear: yearNumber,
			weekNumber: weekNumber
		});
		const dateFromStr = dt.startOf('week');
		const dateToStr = dt.endOf('week');

		let results = registers
			? registers
					.filter((item) => {
						let dateCurrent = DateTime.fromISO(item.createdAt);
						if (dateCurrent >= dateFromStr && dateCurrent <= dateToStr) {
							return item;
						}
					})
					.map((item) => item.hours_worked)
					.reduce((a, b) => a + b, 0)
			: 0;
		hoursWeek = results;
		//console.log('results week', results);

		let start =
			(results / hoursExpected) * 100 > 100 ? 100 : Math.round((results / hoursExpected) * 100);
		let end = 100 - start;
		percentageWeek = start;

		let labels = ['start', 'end'];
		let data = [start, end];

		return { labels, data };
	};

	//Work Month

	dataHoursMonth = async () => {
		let res = await fetchHour();
		let hoursExpected = 8 * bussinesDays.length;
		//console.log('horas al mes : ', hoursExpected);
		let registers = res ? await res.Registers : undefined;
		//console.log('registers ', registers);

		const dt = DateTime.fromObject({
			year: yearNumber,
			month: month
		});
		const dateFromStr = dt.startOf('month');
		const dateToStr = dt.endOf('month');
		let results = registers
			? registers
					.filter((item) => {
						let dateCurrent = DateTime.fromISO(item.createdAt);
						if (dateCurrent >= dateFromStr && dateCurrent <= dateToStr) {
							return item;
						}
					})
					.map((item) => item.hours_worked)
					.reduce((a, b) => a + b, 0)
			: 0;
		hoursMonth = results;
		//console.log('results Month', results);

		let start =
			(results / hoursExpected) * 100 > 100 ? 100 : Math.round((results / hoursExpected) * 100);
		let end = 100 - start;
		//console.log('start Month', start);
		percentageMonth = start;

		let labels = ['start', 'end'];
		let data = [start, end];

		return { labels, data };
	};

	//**HOURS CHART JS , WEEKLY , MONTHLY, YEARLY ///**FUNCTIONS FOR CHART JS , WEEKLY , MONTHLY, YEARLY ==> ONE EMPLOYEE**///

	//Weekly
	dataHoursWeekly = async () => {
		let res = await fetchEmployeesHoursWeekly();

		//console.log('TEST DE FUNCION REUTILIZABLE', dataWeekly(res));

		let results = dataWeekly(res);
		return { labels: results.labels, data: results.data };
	};

	//Monthly
	dataHoursMonthly = async () => {
		let res = await fetchEmployeesHoursMonthly();

		//console.log('DATA DESDE UTILS MESES', dataMonthly(res));

		let results = dataMonthly(res);
		return { labels: results.labels, data: results.data };
	};

	//Yearly
	dataHoursYearly = async () => {
		let res = await fetchEmployeesHoursYearly();

		let results = dataYearly(res);
		return { labels: results.labels, data: results.data };
	};

	///**VALIDATIONS FOR ROLES**///

	$: {
		userStore = get(user);
		//console.log('is admin?', userStore)
		if (userStore) {
			const roles = userStore.body.roles;
			//console.log('roles', roles);
			for (let i = 0; i < roles.length; i++) {
				if (roles[i].name === 'user') {
					//console.log('se cumple: ', roles[i].name);
					isUser = true;
				}
				if (roles[i].name === 'admin') {
					//console.log('se cumple: ', roles[i].name);
					isAdmin = true;
				}
				if (roles[i].name === 'superAdmin') {
					//console.log('se cumple: ', roles[i].name);
					isSuperAdmin = true;
				}
			}
		}
	}

	//Load vars depending on the roles
	$: {
		if (!isSuperAdmin) {
			if (isAdmin) {
				currentDataTeam = { data: dataTeamHoursWeekly(), week: true, nameData: 'weeklyTeam' };
			}
			currentData = { data: dataHoursWeekly(), week: true };
		} else {
			currentDataTotalEmployees = {
				data: dataTotalEmployeesWeekly(),
				week: true,
				nameData: 'weeklyTotalEmployees'
			};
		}
	}

	//**HOURS CHART JS , WEEKLY , MONTHLY, YEARLY ///**FUNCTIONS FOR CHART JS , WEEKLY , MONTHLY, YEARLY ==> TEAMS**///

	//Weekly

	dataTeamHoursWeekly = async () => {
		let res1 = await fetchTeamHoursWeekly();
		let dataResults = await res1.employeesTeam;

		let array = [];
		let array2 = [];

		array = dataResults.forEach((element) => {
			let res = element.registersHours;
			let results = dataWeekly(res);

			//console.log('gasgasdgsdagas', { labels, data, title: element.first_name });
			array2.push({ labels: results.labels, data: results.data, title: element.first_name });
		});

		//console.log('bbbb', array2);
		return array2;
	};

	//Monthly

	dataTeamHoursMonthly = async () => {
		let res1 = await fetchTeamHourMonthly();
		let dataResults = await res1.employeesTeam;

		let array = [];
		let array2 = [];
		array = dataResults.forEach((element) => {
			let res = element.registersHours;
			let results = dataMonthly(res);

			//console.log('labelsss', { labels, data, title: element.first_name });
			array2.push({ labels: results.labels, data: results.data, title: element.first_name });
		});

		return array2;
	};

	//Yearly

	dataTeamHoursYearly = async () => {
		let res1 = await fetchTeamHourYearly();
		let dataResults = await res1.employeesTeam;
		//console.log('res', res1);
		let array = [];
		let array2 = [];
		array = dataResults.forEach((element) => {
			let res = element.registersHours;

			let results = dataYearly(res);

			array2.push({ labels: results.labels, data: results.data, title: element.first_name });
		});

		return array2;
	};

	//**HOURS CHART JS , WEEKLY , MONTHLY, YEARLY ///**FUNCTIONS FOR CHART JS , WEEKLY , MONTHLY, YEARLY ==> TOTAL EMPLOYEES**///

	//Weekly
	dataTotalEmployeesWeekly = async () => {
		let dataResults = await fetchTotalEmployeesWeekly();

		console.log('dataResults', dataResults);

		let array = [];
		let array2 = [];

		array = dataResults.forEach((element) => {
			let res = element.registersHours;
			let results = dataWeekly(res);

			//console.log('gasgasdgsdagas', { labels, data, title: element.first_name });
			array2.push({
				labels: results.labels,
				data: results.data,
				title: element.employee.first_name
			});
		});

		//console.log('bbbb', array2);
		return array2;
	};

	//Monthly
	dataTotalEmployeesMonthly = async () => {
		let dataResults = await fetchTotalEmployeesMonthly();

		let array = [];
		let array2 = [];
		array = dataResults.forEach((element) => {
			let res = element.registersHours;
			let results = dataMonthly(res);

			//console.log('labelsss', { labels, data, title: element.first_name });
			array2.push({
				labels: results.labels,
				data: results.data,
				title: element.employee.first_name
			});
		});

		return array2;
	};

	//Yearly
	dataTotalEmployeesYearly = async () => {
		let dataResults = await fetchTotalEmployeesYearly();
		let array = [];
		let array2 = [];
		array = dataResults.forEach((element) => {
			let res = element.registersHours;

			let results = dataYearly(res);

			array2.push({
				labels: results.labels,
				data: results.data,
				title: element.employee.first_name
			});
		});

		//console.log('array2', array2);

		return array2;
	};
</script>

<div class="container md:max-w-5xl h-max px-4 mx-auto py-6">
	<div
		class="flex justify-center md:justify-start mt-12 mb-6 pb-6 border-b-[1px] border-tertiary/30"
	>
		<h1 class="text-secondary text-3xl  font-bold">
			Welcome, <span>{profile ? profile : ''}</span> !
		</h1>
	</div>

	{#if !isSuperAdmin}
		<div class="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-x-8 pb-6">
			<div class="col-span-1 md:col-span-6 lg:col-span-12 mb-4">
				<h2 class="text-secondary text-xl font-bold  md:mb-0">Overview</h2>
			</div>
			<div
				class="col-span-1  md:col-span-3 bg-white w-full flex items-center justify-center rounded-xl shadow-lg p-6 mb-4"
			>
				<div class=" w-4/12 lg:w-[50px]  h-fit relative">
					<ChartJS
						chartID="percentageToday"
						percentage={true}
						type="doughnut"
						dataLabelsAndData={{ data: dataHoursToday(), week: false }}
						title="percentageToday"
					/>

					<div
						class={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-end select-none  ${
							percentageToday >= 0 && percentageToday <= 25
								? 'text-carnation'
								: percentageToday >= 26 && percentageToday <= 50
								? 'text-yellow-orange'
								: percentageToday >= 51 && percentageToday <= 75
								? 'text-primary'
								: 'text-jungle-green'
						}`}
					>
						<p class="text-[1.2rem] md:text-[0.7rem] lg:text-[0.7rem] font-bold t">
							{percentageToday}
						</p>
						<p class="text-[0.7rem]  md:text-[0.4rem] lg:text-[0.4rem] pb-[0.10rem]">%</p>
					</div>
				</div>
				<div class="flex flex-col ml-4">
					<span class="text-xl md:text-sm text-tertiary font-medium"> Total Today </span>
					<p class="text-3xl md:text-2xl font-bold text-secondary">{hoursToday}h</p>
				</div>
			</div>
			<div
				class="col-span-1  md:col-span-3 bg-white w-full flex items-center justify-center rounded-xl shadow-lg p-6 mb-4"
			>
				<div class=" w-4/12 lg:w-[50px]  h-fit relative">
					<ChartJS
						chartID="percentageWeek"
						percentage={true}
						type="doughnut"
						dataLabelsAndData={{ data: dataHoursWeek(), week: false }}
						title="percentageToday"
					/>

					<div
						class={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-end select-none  ${
							percentageWeek >= 0 && percentageWeek <= 25
								? 'text-carnation'
								: percentageWeek >= 26 && percentageWeek <= 50
								? 'text-yellow-orange'
								: percentageWeek >= 51 && percentageWeek <= 75
								? 'text-primary'
								: 'text-jungle-green'
						}`}
					>
						<p class="text-[1.2rem] md:text-[0.7rem] lg:text-[0.7rem] font-bold ">
							{percentageWeek}
						</p>
						<p class="text-[0.7rem]  md:text-[0.4rem] lg:text-[0.4rem] pb-[0.10rem] ">%</p>
					</div>
				</div>
				<div class="flex flex-col ml-4">
					<span class="text-xl md:text-sm text-tertiary font-medium"> Total Week </span>
					<p class="text-3xl md:text-2xl font-bold text-secondary">{hoursWeek}h</p>
				</div>
			</div>
			<div
				class="col-span-1  md:col-span-3 bg-white w-full flex items-center justify-center rounded-xl shadow-lg p-6 mb-4"
			>
				<div class=" w-4/12 lg:w-[50px]   relative">
					<ChartJS
						chartID="percentageMoth"
						percentage={true}
						type="doughnut"
						dataLabelsAndData={{ data: dataHoursMonth(), week: false }}
						title="percentageToday"
					/>

					<div
						class={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-end select-none ${
							percentageMonth >= 0 && percentageMonth <= 25
								? 'text-carnation'
								: percentageMonth >= 26 && percentageMonth <= 50
								? 'text-yellow-orange'
								: percentageMonth >= 51 && percentageMonth <= 75
								? 'text-primary'
								: 'text-jungle-green'
						}`}
					>
						<p class="text-[1.2rem] md:text-[0.7rem] lg:text-[0.7rem] font-bold ">
							{percentageMonth}
						</p>
						<p class="text-[0.7rem]  md:text-[0.4rem] lg:text-[0.4rem] pb-[0.10rem] ">%</p>
					</div>
				</div>
				<div class="flex flex-col ml-4">
					<span class="text-xl md:text-sm text-tertiary font-medium"> Total Month </span>
					<p class="text-3xl md:text-2xl font-bold text-secondary">{hoursMonth}h</p>
				</div>
			</div>

			<div
				class="col-span-1  md:col-span-3 bg-white w-full flex items-center justify-center rounded-xl shadow-lg p-6 mb-4"
			>
				<div class=" w-4/12 lg:w-[50px]  h-fit relative">
					<ChartJS
						chartID="percentageYear"
						percentage={true}
						type="doughnut"
						dataLabelsAndData={{ data: dataHoursYear(), week: false }}
						title="percentageToday"
					/>

					<div
						class={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-end select-none ${
							percentageYear >= 0 && percentageYear <= 25
								? 'text-carnation'
								: percentageYear >= 26 && percentageYear <= 50
								? 'text-yellow-orange'
								: percentageYear >= 51 && percentageYear <= 75
								? 'text-primary'
								: 'text-jungle-green'
						}`}
					>
						<p class="text-[1.2rem] md:text-[0.7rem] lg:text-[0.7rem] font-bold ">
							{percentageYear}
						</p>
						<p class="text-[0.7rem]  md:text-[0.4rem] lg:text-[0.4rem] pb-[0.1rem]">%</p>
					</div>
				</div>
				<div class="flex flex-col ml-4">
					<span class="text-xl md:text-sm text-tertiary font-medium"> Total year </span>
					<p class="text-3xl md:text-2xl font-bold text-secondary">{$totalHoursWorked}h</p>
				</div>
			</div>
		</div>

		<div
			class="w-full bg-white rounded-xl p-6 flex flex-col items-center justify-center mb-12 shadow-lg"
		>
			<h2 class="text-secondary text-center text-xl font-bold pb-4">Currently Assigned Task</h2>
			{#if isTask}
				<div>
					<p class="text-primary text-center font-semibold text-base pb-2">
						{isTask.title ? isTask.title : ''}
					</p>
					<p class="text-tertiary text-center font-semibold text-sm pb-2">Description:</p>
					<p class="text-tertiary text-center font-medium text-sm pb-2">
						{isTask.description ? isTask.description : ''}
					</p>
					<div class="flex flex-col md:flex-row gap-x-3">
						<p class="text-primary text-center font-bold text-sm pb-2">
							Start:&nbsp;
							<span class="text-tertiary text-center font-medium text-sm pb-2">
								{isTask.start ? new Date(isTask.start).toISOString().split('T')[0] : ''}
							</span>
						</p>
						<p class="text-primary text-center font-bold text-sm pb-2">
							End:&nbsp;
							<span class="text-tertiary text-center font-medium text-sm pb-2">
								{isTask.end ? new Date(isTask.end).toISOString().split('T')[0] : ''}
							</span>
						</p>
					</div>
				</div>
			{:else}
				<div class="flex justify-center">
					<p class="text-tertiary text-center font-medium text-sm pb-2">
						You have no assigned tasks
					</p>
				</div>
			{/if}
		</div>

		<div
			class="w-full bg-white rounded-xl p-6 flex flex-col items-center justify-center mb-6 shadow-lg"
		>
			<!-- <h2 class="uppercase text-center font-semibold text-xl text-gray-400 mb-4">My hours</h2> -->
			<!-- <canvas class="!w-[70%] !h-fit !flex" id="myTeamHoursChart" /> -->
			<div class="w-full md:w-11/12">
				<div class="flex flex-col md:flex-row justify-between items-center relative">
					<h2 class="text-secondary text-xl font-bold mb-4 ">My Hours</h2>
					<div class="flex gap-x-1 justify-end mb-4 bg-selago rounded-md w-fit p-1 ">
						<button
							class={`select-none  rounded-md px-4 py-1 text-[0.8rem] font-semibold  ${
								buttonWeekly ? 'bg-white text-primary shadow-sm' : 'text-tertiary'
							}`}
							on:click={() => {
								(buttonWeekly = true),
									(buttonMonthly = false),
									(buttonYearly = false),
									(currentData = { data: dataHoursWeekly(), week: true });
							}}
						>
							Weekly
						</button>
						<button
							class={`select-none  rounded-md px-4 py-1 text-[0.8rem] font-semibold  ${
								buttonMonthly ? 'bg-white text-primary shadow-sm' : 'text-tertiary'
							}`}
							on:click={() => {
								(buttonWeekly = false),
									(buttonMonthly = true),
									(buttonYearly = false),
									(currentData = { data: dataHoursMonthly(), week: true });
							}}
						>
							Monthly
						</button>
						<button
							class={`select-none  rounded-md px-4 py-1 text-[0.8rem] font-semibold  ${
								buttonYearly ? 'bg-white text-primary shadow-sm' : 'text-tertiary'
							}`}
							on:click={() => {
								(buttonWeekly = false),
									(buttonMonthly = false),
									(buttonYearly = true),
									(currentData = { data: dataHoursYearly(), week: false });
							}}
						>
							Yearly
						</button>
					</div>
				</div>

				{#key currentData}
					<ChartJS
						chartID="myHoursEmployee"
						type="line"
						dataLabelsAndData={currentData}
						push={true}
						title="My Hours"
					/>
				{/key}
			</div>
		</div>
		{#if $user.body.teamAdmin}
			<div
				class="w-full bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center mt-12 mb-6"
			>
				<!-- <canvas class="!w-[70%] !h-fit !flex" id="myTeamHoursChart" /> -->
				<div class="w-full md:w-11/12">
					<div class="flex flex-col md:flex-row justify-between items-center relative">
						<h2 class="text-secondary text-xl font-bold text-left mb-4 ">Team Hours</h2>
						<div class="flex gap-x-1 justify-end mb-4 bg-selago rounded-md w-fit p-1 ">
							<button
								class={`select-none  rounded-md px-4 py-1 text-[0.8rem] font-semibold  ${
									currentDataTeam.nameData == 'weeklyTeam'
										? 'bg-white text-primary shadow-sm'
										: 'text-tertiary'
								}`}
								on:click={() => {
									currentDataTeam = {
										data: dataTeamHoursWeekly(),
										week: true,
										nameData: 'weeklyTeam'
									};
								}}
							>
								Weekly
							</button>
							<button
								class={`select-none  rounded-md px-4 py-1 text-[0.8rem] font-semibold  ${
									currentDataTeam.nameData == 'monthlyTeam'
										? 'bg-white text-primary shadow-sm'
										: 'text-tertiary'
								}`}
								on:click={() => {
									currentDataTeam = {
										data: dataTeamHoursMonthly(),
										week: true,
										nameData: 'monthlyTeam'
									};
								}}
							>
								Monthly
							</button>
							<button
								class={`select-none  rounded-md px-4 py-1 text-[0.8rem] font-semibold  ${
									currentDataTeam.nameData == 'yearlyTeam'
										? 'bg-white text-primary shadow-sm'
										: 'text-tertiary'
								}`}
								on:click={() => {
									currentDataTeam = {
										data: dataTeamHoursYearly(),
										week: false,
										nameData: 'yearlyTeam'
									};
								}}
							>
								Yearly
							</button>
						</div>
					</div>
					{#key currentDataTeam}
						<ChartJsGroups
							chartID="myHoursTeam"
							push={true}
							type="line"
							dataLabelsAndData={currentDataTeam}
						/>
					{/key}
				</div>
			</div>
		{/if}
	{:else}
		<div
			class="w-full bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center mb-6"
		>
			<div class="w-full md:w-11/12">
				<div class="flex flex-col md:flex-row justify-between items-center relative">
					<h2 class="text-secondary text-xl font-bold text-left mb-4 ">Employees Hours</h2>
					<div class="flex gap-x-1 justify-end mb-4 bg-selago rounded-md w-fit p-1 ">
						<button
							class={`select-none  rounded-md px-4 py-1 text-[0.8rem] font-semibold  ${
								currentDataTotalEmployees.nameData == 'weeklyTotalEmployees'
									? 'bg-white text-primary shadow-sm'
									: 'text-tertiary'
							}`}
							on:click={() => {
								currentDataTotalEmployees = {
									data: dataTotalEmployeesWeekly(),
									week: true,
									nameData: 'weeklyTotalEmployees'
								};
							}}
						>
							Weekly
						</button>
						<button
							class={`select-none  rounded-md px-4 py-1 text-[0.8rem] font-semibold  ${
								currentDataTotalEmployees.nameData == 'monthlyTotalEmployees'
									? 'bg-white text-primary shadow-sm'
									: 'text-tertiary'
							}`}
							on:click={() => {
								currentDataTotalEmployees = {
									data: dataTotalEmployeesMonthly(),
									week: true,
									nameData: 'monthlyTotalEmployees'
								};
							}}
						>
							Monthly
						</button>
						<button
							class={`select-none  rounded-md px-4 py-1 text-[0.8rem] font-semibold  ${
								currentDataTotalEmployees.nameData == 'yearlyTotalEmployees'
									? 'bg-white text-primary shadow-sm'
									: 'text-tertiary'
							}`}
							on:click={() => {
								currentDataTotalEmployees = {
									data: dataTotalEmployeesYearly(),
									week: false,
									nameData: 'yearlyTotalEmployees'
								};
							}}
						>
							Yearly
						</button>
					</div>
				</div>
				{#key currentDataTotalEmployees}
					<ChartJsGroups
						chartID="myHoursEmployees"
						type="line"
						push={true}
						dataLabelsAndData={currentDataTotalEmployees}
					/>
				{/key}
			</div>
		</div>
	{/if}
</div>
<!-- <App /> -->
