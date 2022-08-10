<script>
	import Inputs from '@components/inputs.svelte';
	import { loading, apiBackend } from '@stores/general';

	import InlineSVG from 'svelte-inline-svg';

	let userSignUp = {
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		team: [''],
		phone: undefined
	};

	let responseSignUp = {
		status: undefined
	};

	export let stateLoginActive;

	const submitSignUp = async () => {
		let config = {
			//mode: 'no-cors'
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(userSignUp)
		};
		const url = `${apiBackend}/api/signup`;
		const res = await fetch(url, config);

		const data = await res.json();
		//console.log(data);
		responseSignUp = data;

		//userSignUp = Object.assign(userSignUp, initialObject);
	};
</script>

<div class="container mx-auto flex justify-center items-center  h-full px-6">
	<div
		class="bg-white rounded-xl w-full md:w-[700px] h-[500px] flex flex-col justify-center items-center align-middle shadow-lg  relative "
	>
		<div
			class="absolute px-3 py-3 text-white bg-primary top-[5%] left-[0%] translate-x-1/2  cursor-pointer rounded-full shadow-sm"
		>
			<InlineSVG
				class="w-[23px] h-[23px]   "
				src="/icons/arrow-left-solid.svg"
				on:click={stateLoginActive}
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
					class="mb-4"
					placeholder="First name"
					name="firstName"
					type="text"
					required={true}
					bind:value={userSignUp.first_name}
				/>
			</div>

			<div class="col-span-2 md:col-span-6 flex flex-col w-full ">
				<Inputs
					class="mb-4"
					placeholder="Last Name"
					name="lastName"
					type="text"
					required={true}
					bind:value={userSignUp.last_name}
				/>
			</div>

			<div class="col-span-2 md:col-span-12 flex flex-col w-full ">
				<Inputs
					class="mb-4"
					placeholder="Phone"
					name="phone"
					type="number"
					minLength="1"
					required={true}
					bind:value={userSignUp.phone}
				/>
			</div>

			<div class="col-span-2 md:col-span-6 flex flex-col w-full ">
				<Inputs
					class="mb-4"
					placeholder="Email"
					name="email"
					type="email"
					required={true}
					bind:value={userSignUp.email}
				/>
			</div>

			<div class="col-span-2 md:col-span-6 flex flex-col w-full ">
				<Inputs
					class="mb-4"
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
						<p on:click={stateLoginActive} class="text-primary font-semibold mt-3 cursor-pointer">
							Login Now!
						</p>
					{/if}
				</div>
			{/if}
		</form>
	</div>
</div>
