<script context="module">
</script>

<script>
	import '../app.css';
	import InlineSVG from 'svelte-inline-svg';
	import { fade } from 'svelte/transition';
	//import App from '../App.svelte';
	import Nav from '../components/Nav.svelte';
	import Login from '../components/Login.svelte';
	import PageTransitions from '../components/PageTransitions.svelte';
	import { onMount } from 'svelte';
	//import { fetchUser } from '../stores/login';
	//import { datas } from '../stores/login';
	import { user } from '../stores/login';
	import { users, admin, superAdmin } from '@stores/roles';
	import { loading } from '@stores/general';
	import { get } from 'svelte/store';
	/* import { isRole } from '@stores/roles';
	onMount(isRole); */

	/* 	$: {
		let userStore = get(user);
		let ddd = userStore.body;
		if (ddd) {
			const xxx = ddd.roles;
			console.log('user', xxx);
		}
	} */

	//$: users.set();

	//import { dataLogin } from '../stores/login';

	//$: console.log('valor', $user);

	//loginState = $login;
</script>

<div id="app" class="flex overflow-hidden">
	<!-- <p>{$user.login}</p> -->
	{#if $loading}
		<div
			transition:fade
			class="absolute z-30 w-full h-full bg-white/80 flex justify-center items-center"
		>
			<InlineSVG class="text-indigo-500 w-[75px] h-fit" src="/icons/loading.svg" />
		</div>
	{/if}
	{#if $user.login}
		<div class="shadow-xl z-20 h-[100vh] md:fixed">
			<Nav />
		</div>
		<div
			class="flex w-full overflow-auto bg-selago md:px-2 mt-[70px]  md:mt-0 z-10 ml-0 md:ml-[290px]"
		>
			<slot />
		</div>
	{:else}
		<Login />
	{/if}
</div>
