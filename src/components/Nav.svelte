<script>
	import InlineSVG from 'svelte-inline-svg';
	import { page } from '$app/stores';
	import { fetchHour, fetchTeamHours, countMyHours, countTeamHours } from '@stores/hours';
	import { each } from 'svelte/internal';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { user, logOutSocial } from '../stores/login';
	import { onMount } from 'svelte';

	let isAdmin = undefined;
	let isUser = undefined;
	let isSuperAdmin = undefined;
	let open = false;

	let urlParam1;
	let urlParam2;

	let windowWidth;

	onMount(async () => {
		if (isUser && !isSuperAdmin) {
			await fetchHour();
		}

		if (isAdmin && !isSuperAdmin) {
			await fetchTeamHours();
		}
	});

	//$: console.log('countTeamHours', countTeamHours);
	$: {
		let params1 = $page.url.pathname.split('/')[1];
		urlParam1 = '/' + params1;
		//console.log('urlParam0', urlParam1);
	}

	//$: console.log('windowWidth', windowWidth);

	$: {
		let userStore = get(user);
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
	/* $: isAdmin = get(admin);
	$: isUser = get(users);
	$: isSuperAdmin = get(superAdmin); */
	//console.log('isAdminBav', isAdmin);

	/* 	$: console.log('isAdmin', isAdmin);
	$: console.log('isUser', isUser);
		$: console.log('isSuperAdmin', isSuperAdmin); */
	//$: console.log('estado admin', isAdmin);

	let menu = [];
	$: menu = [
		{
			title: 'Home',
			to: '/',
			icon: 'house-solid'
		},
		...((isAdmin || isUser) && !isSuperAdmin
			? [
					{
						title: 'Profile',
						to: '/profile',
						icon: 'person-solid'
					}
			  ]
			: []),
		...((isAdmin || isUser) && !isSuperAdmin
			? [
					{
						title: 'My Hours',
						to: '/hoursEmployee',
						icon: 'user-clock-solid'
					}
			  ]
			: []),
		...(isAdmin && !isSuperAdmin
			? [
					{
						title: 'Team Hours',
						to: '/hoursTeam',
						icon: 'clock-solid'
					}
			  ]
			: []),
		...(isAdmin && !isSuperAdmin
			? [
					{
						title: 'Tasks Team',
						to: '/tasksTeam',
						icon: 'list-check-solid'
					}
			  ]
			: []),
		...(isSuperAdmin
			? [
					{
						title: 'Employees',
						to: '/employees',
						icon: 'person-solid'
					}
			  ]
			: []),
		...(isSuperAdmin
			? [
					{
						title: 'Teams',
						to: '/teams',
						icon: 'people-group-solid'
					}
			  ]
			: []),
		...(isSuperAdmin
			? [
					{
						title: 'Hours',
						to: '/hours',
						icon: 'clock-solid'
					}
			  ]
			: []),
		...(isSuperAdmin
			? [
					{
						title: 'Tasks',
						to: '/tasks',
						icon: 'list-check-solid'
					}
			  ]
			: [])
	];

	async function logOut() {
		await logOutSocial();
		user.loginUser({
			login: false
		});
		//console.log ()
		goto('/');
		localStorage.clear();
	}
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if windowWidth > 767}
	<nav class="bg-white h-full w-[290px] relative py-12 px-2 flex flex-col ">
		<div class="flex justify-center mt-6">
			<a href="/"
				><InlineSVG
					class="text-primary w-[75px] h-fit drop-shadow-lg"
					src="/icons/chart-line-solid.svg"
				/></a
			>
		</div>

		<nav class="py-12 px-6">
			<ul>
				{#each menu as item}
					<li class="pb-4">
						<a
							class={`flex items-center rounded-md py-2  ${
								urlParam1 === item.to
									? 'text-primary bg-selago border-l-[3px] border-primary'
									: 'text-tertiary border-l-[3px] border-transparent'
							}`}
							href={item.to}
						>
							<div class="flex ml-6 mr-4 items-center justify-center w-[30px]">
								<InlineSVG class=" max-w-[23px] h-[23px] " src={`/icons/${item.icon}.svg`} />
							</div>

							<h2 class="text-left text-sm font-medium py-1">{item.title}</h2>
							{#if item.to === '/hoursEmployee'}
								<div
									class="text-white bg-primary rounded-full ml-auto mr-6 w-[15px] h-[15px] flex justify-center items-center shadow-btnCount"
								>
									<p class="text-[0.6rem]">{$countMyHours}</p>
								</div>
							{/if}
							{#if item.to === '/hoursTeam'}
								<div
									class="text-white bg-primary rounded-full ml-auto mr-6 w-[15px] h-[15px] flex justify-center items-center shadow-btnCount"
								>
									<p class="text-[0.6rem]">{$countTeamHours}</p>
								</div>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
		<div class="mt-auto px-6  flex items-center cursor-pointer" on:click={logOut}>
			<div class="flex ml-6 mr-4 items-center justify-center w-[25px]">
				<InlineSVG
					class="text-primary max-w-[23px] h-[23px] "
					src="/icons/right-from-bracket-solid.svg"
				/>
			</div>

			<h2 class="text-gray-400 text-left text-sm font-medium py-1">Sign Out</h2>
		</div>
	</nav>
{:else}
	<div class="w-full z-50">
		<div class="bg-primary w-full min-h-[70px] fixed shadow-md">
			<!--  -->
			<a class="absolute -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2" href="/">
				<InlineSVG
					class="text-white w-[50px] h-fit drop-shadow-lg"
					src="/icons/chart-line-solid.svg"
				/>
			</a>
			<button
				class="text-white  cursor-pointer mr-4 border-none focus:outline-none absolute -translate-y-1/2 top-1/2 -translate-x-1/2 left-[10%]"
				class:open
				on:click={() => (open = !open)}
			>
				<svg width="32" height="24">
					<line id="top" x1="0" y1="2" x2="32" y2="2" />
					<line id="middle" x1="0" y1="12" x2="24" y2="12" />
					<line id="bottom" x1="0" y1="22" x2="32" y2="22" />
				</svg>
			</button>
			<InlineSVG
				class="cursor-pointer text-white max-w-[23px] h-[23px] absolute -translate-y-1/2 top-1/2 -translate-x-1/2 left-[90%]"
				src="/icons/right-from-bracket-solid.svg"
				on:click={logOut}
			/>
		</div>
		<aside
			class="fixed w-10/12  bg-white border-r-2 shadow-lg h-[calc(100%-70px)] bottom-0 "
			class:openA={open}
		>
			<nav class="py-12 px-4 sm:px-6">
				<ul>
					{#each menu as item}
						<li class="pb-4">
							<a
								class={`flex items-center rounded-md py-2  ${
									urlParam1 === item.to
										? 'text-primary bg-selago border-l-[3px] border-primary'
										: 'text-tertiary border-l-[3px] border-transparent'
								}`}
								href={item.to}
								on:click={() => {
									open = !open;
								}}
							>
								<div class="flex ml-6 mr-4 items-center justify-center w-[30px]">
									<InlineSVG class=" max-w-[23px] h-[23px] " src={`/icons/${item.icon}.svg`} />
								</div>

								<h2 class="text-left text-sm font-medium py-1">{item.title}</h2>
								{#if item.to === '/hoursEmployee'}
									<div
										class="text-white bg-primary rounded-full ml-auto mr-6 w-[15px] h-[15px] flex justify-center items-center shadow-btnCount"
									>
										<p class="text-[0.6rem]">{$countMyHours}</p>
									</div>
								{/if}
								{#if item.to === '/hoursTeam'}
									<div
										class="text-white bg-primary rounded-full ml-auto mr-6 w-[15px] h-[15px] flex justify-center items-center shadow-btnCount"
									>
										<p class="text-[0.6rem]">{$countTeamHours}</p>
									</div>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</aside>
	</div>
{/if}

<style>
	svg {
		min-height: 24px;
		transition: transform 0.3s ease-in-out;
	}

	svg line {
		stroke: currentColor;
		stroke-width: 3;
		transition: transform 0.3s ease-in-out;
	}

	button {
		z-index: 20;
	}

	.open svg {
		transform: scale(0.7);
	}

	.open #top {
		transform: translate(6px, 0px) rotate(45deg);
	}

	.open #middle {
		opacity: 0;
	}

	.open #bottom {
		transform: translate(-12px, 9px) rotate(-45deg);
	}

	aside {
		left: -100%;
		transition: left 0.3s ease-in-out;
	}

	.openA {
		left: 0;
	}
</style>
