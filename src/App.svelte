<script>
	import Nav from './components/Nav.svelte';
</script>

<div id="app" class="flex overflow-hidden h-full">
	<div class="shadow-xl">
		<Nav />
	</div>
	<div class="flex w-full overflow-auto bg-[#f1f3ff]">
		<div class="w-full h-full flex justify-center items-center">
			<div
				class="w-[300px] h-[300px] bg-white shadow-md flex justify-center items-center rounded-md"
			>
				<h1 class="uppercase font-semibold text-2xl text-gray-400">Aqui va información</h1>
			</div>
		</div>
	</div>
</div>
