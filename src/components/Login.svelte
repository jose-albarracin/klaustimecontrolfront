<script>
	import InlineSVG from 'svelte-inline-svg';
	import { user, setStorageUser } from '../stores/login';

	import { goto } from '$app/navigation';
	import { loading } from '@stores/general';

	import Inputs from '@components/inputs.svelte';
	import Signup from '@components/SignUp.svelte';

	let loginActiveView = true;

	let userLogin = {
		email: '',
		password: ''
	};

	let messageLogin = undefined;

	const stateLoginActive = () => {
		loginActiveView = true;
		//console.log('loginActiveView', loginActiveView);
	};

	const submitLogin = async () => {
		let config = {
			//mode: 'no-cors'
			method: 'POST',
			//credentials: true,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(userLogin)
		};
		const url = 'http://localhost:3001/api/login';
		const res = await fetch(url, config);

		const data = await res.json();

		user.loginUser(data);
		//isRole();

		goto('/');

		setStorageUser(data);
	};

	const submitLoginGoogle = async () => {
		//console.log('HOLA?');
		loading.set(true);
		let config = {
			//mode: 'no-cors',
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
				//'Access-Control-Allow-Credentials': true,
				//'Access-Control-Allow-Origin': '*'
			}
		};
		const url = 'http://localhost:3001/auth/login/success';
		//console.log('url', url);
		const res = await fetch(url, config);

		//console.log('res', res);
		const data = await res.json();

		//console.log('dataGoogle', data);

		user.loginUser(data);
		//isRole();

		//goto('/');

		setStorageUser(data);
		loading.set(false);
	};

	submitLoginGoogle();

	const onKeyPressEnter = (e) => {
		if (e.charCode === 13) submitLogin();
	};

	$: {
		if ($user.message) {
			if ($user.message == 'User not found') {
				messageLogin = 'User not found';
			} else {
				messageLogin = 'Incorrect Password';
			}
		} else {
			messageLogin = undefined;
		}
	}

	$: console.log('$user', $user);
	//$: console.log(userSignUp);
</script>

<div class="bg-selago w-full h-[100vh]">
	{#key loginActiveView}
		{#if loginActiveView}
			<div class="container mx-auto flex justify-center items-center  h-full px-6">
				<div
					class="bg-white rounded-xl w-full sm:w-[25rem] h-[30rem] flex flex-col justify-center items-center align-middle shadow-lg"
				>
					<div class="flex justify-center mt-6">
						<a href="/"
							><InlineSVG
								class="text-primary w-[75px] h-fit drop-shadow-lg"
								src="/icons/chart-line-solid.svg"
							/></a
						>
					</div>
					<div class="flex flex-col w-full p-6">
						<Inputs
							placeholder="Enter Email"
							name="user"
							type="text"
							required={true}
							bind:value={userLogin.email}
						/>

						<Inputs
							placeholder="Enter Password"
							name="password"
							type="password"
							required={true}
							bind:value={userLogin.password}
							{onKeyPressEnter}
						/>

						<button
							class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg"
							type="submit"
							on:click={submitLogin}>Log In</button
						>

						<div class="flex gap-x-3">
							<button
								class="bg-red-600 hover:bg-red-700 w-1/2 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center my-3"
								type="submit"
								on:click={async () => {
									const urlD = 'http://localhost:3001/auth/google';
									window.open(urlD, '_self');
									//submitLoginGoogle();
								}}
								><InlineSVG
									class=" w-[15px] h-[15px] drop-shadow-lg"
									src="/icons/google-brands.svg"
								/>
								<span class="ml-1">Google</span></button
							>
							<button
								class="bg-blue-600 hover:bg-blue-700 w-1/2 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center my-3"
								type="submit"
								on:click={async () => {
									const urlD = 'http://localhost:3001/auth/facebook';
									window.open(urlD, '_self');
									//submitLoginGoogle();
								}}
								><InlineSVG
									class=" w-[15px] h-[15px] drop-shadow-lg"
									src="/icons/facebook-brands.svg"
								/>
								<span class="ml-2">Facebook</span></button
							>
						</div>

						<div class="relative mt-4">
							<div class="absolute left-1/2 -translate-x-1/2 flex flex-col">
								{#if messageLogin}
									<p class="text-center text-red-600 ">
										{messageLogin}
									</p>
								{/if}
								<p
									on:click={() => {
										loginActiveView = false;
									}}
									class="text-center text-primary font-semibold mt-2 cursor-pointer"
								>
									Sign Up
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<Signup {stateLoginActive} />
			<!-- <div class="container mx-auto flex justify-center items-center  h-full px-6">
			<div
				class="bg-white rounded-xl w-full md:w-[700px] h-[500px] flex flex-col justify-center items-center align-middle shadow-lg  relative "
			>
				<div
					class="absolute px-3 py-3 text-white bg-primary top-[5%] left-[0%] translate-x-1/2  cursor-pointer rounded-full shadow-sm"
				>
					<InlineSVG
						class="w-[23px] h-[23px]   "
						src="/icons/arrow-left-solid.svg"
						on:click={() => {
							loginActiveView = true;
						}}
					/>
				</div>

				<form
					on:submit|preventDefault={submitSignUp}
					class="grid grid-cols-1 md:grid-cols-12 gap-x-6 w-full p-6"
				>
					<div class="col-span-2 md:col-span-12 flex justify-center py-6">
						<h1 class="font-semibold text-3xl text-secondary uppercase">Sign up</h1>
					</div>

					<div class="col-span-2 md:col-span-6 flex flex-col w-full ">
						<Inputs
							placeholder="First name"
							name="firstName"
							type="text"
							required={true}
							bind:value={userSignUp.first_name}
						/>
					</div>

					<div class="col-span-2 md:col-span-6 flex flex-col w-full ">
						<Inputs
							placeholder="Last Name"
							name="lastName"
							type="text"
							required={true}
							bind:value={userSignUp.last_name}
						/>
					</div>

					<div class="col-span-2 md:col-span-12 flex flex-col w-full ">
						<Inputs
							placeholder="Phone"
							name="phone"
							type="number"
							required={true}
							bind:value={userSignUp.phone}
						/>
					</div>

					<div class="col-span-2 md:col-span-6 flex flex-col w-full ">
						<Inputs
							placeholder="Email"
							name="email"
							type="email"
							required={true}
							bind:value={userSignUp.email}
						/>
					</div>

					<div class="col-span-2 md:col-span-6 flex flex-col w-full ">
						<Inputs
							placeholder="Password"
							name="password"
							type="password"
							required={true}
							bind:value={userSignUp.password}
						/>
					</div>

					<div class="col-span-2 md:col-span-12 flex justify-center mt-6">
						<button
							class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg"
							type="submit">Sign Up</button
						>
					</div>
					{#if responseSignUp.status}
						<div class="col-span-2 md:col-span-12 flex flex-col items-center mt-4">
							<p>{responseSignUp.message}</p>
							{#if responseSignUp.isSignUp}
								<p
									on:click={() => {
										loginActiveView = true;
									}}
									class="text-primary font-semibold mt-3 cursor-pointer"
								>
									Login Now!
								</p>
							{/if}
						</div>
					{/if}
				</form>
			</div>
		</div> -->
		{/if}
	{/key}
</div>
