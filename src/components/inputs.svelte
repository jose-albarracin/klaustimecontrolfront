<script>
	import MultiSelect from 'svelte-multiselect';

	export let type;
	export let placeholder;
	export let label;
	export let name;
	export let required;
	export let value;
	export let disabled;
	export let select;
	export let selected;
	export let multiselect;
	export let textarea;
	export let rows;

	export let selectedValues;
	export let options;

	export let onKeyPressEnter;

	function typeAction(node) {
		node.type = type;
	}
	let outerDivClass =
		'shadow !appearance-none !border !border-[#e5e7eb] !rounded-lg w-full !py-2 !px-3 leading-tight';
</script>

{#if label}
	<label class="block text-gray-700 text-sm font-bold mb-2" for={name}> {label}</label>
{/if}

{#if !select}
	{#if !textarea}
		<input
			class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight !focus:outline-none !focus:shadow-outline mb-4"
			use:typeAction
			placeholder={placeholder ? placeholder : label}
			{name}
			id={name}
			{required}
			bind:value
			{disabled}
			on:keypress={onKeyPressEnter ? onKeyPressEnter : null}
		/>
	{:else}
		<textarea
			class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight !focus:outline-none !focus:shadow-outline mb-4"
			placeholder={placeholder ? placeholder : label}
			{name}
			id={name}
			{rows}
			{required}
			bind:value
		/>
	{/if}
{:else}
	<MultiSelect
		maxSelect={multiselect ? null : 1}
		{outerDivClass}
		bind:selectedValues
		bind:selected
		{options}
	/>
{/if}
