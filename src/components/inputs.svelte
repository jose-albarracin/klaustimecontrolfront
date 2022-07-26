<script>
	import MultiSelect from 'svelte-multiselect';
	import InlineSVG from 'svelte-inline-svg';
	import { isValid } from '@stores/form';
	import { onMount } from 'svelte';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

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
	export let minLength;
	export let validations;
	export let valueeee;

	export let selectedValues;
	export let options;

	export let onKeyPressEnter;

	let clazz;
	export { clazz as class };

	/* VARS */
	let isError = false;

	let valueMatch = false;
	let valueMinLength = false;

	let valueUser = false;

	let showIcon = false;

	let msgError = '';

	let inputSelected = undefined;

	const expressions = {
		user: /^[a-zA-Z0-9\_\-]{1,16}$/, // Letras, numeros, guion y guion_bajo
		name: /^[a-zA-ZÀ-ÿ\s]{0,40}$/, // Letras y espacios, pueden llevar acentos.
		password: /^.{4,12}$/, // 4 a 12 digitos.
		email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		phone: /^\d{0,14}$/ // 7 a 14 numeros.
	};

	function validation(val) {
		//console.log('val', val);
		//isRequiered = required
		if (type == 'text') {
			//console.log('asdsa', expressions.name.test(val));
			showIcon = true;
			valueMatch = expressions.name.test(val) ? true : false;
			valueMinLength = val.length >= minLength ? true : false;

			//console.log('valueMatch', valueMatch);
			//console.log('valueMinLength', valueMinLength);

			if (valueMatch && (valueMinLength || !minLength)) {
				inputSelected.setAttribute('isvalid', 'true');
				isError = false;
				//console.log('No Hay Error');
			} else {
				isError = true;
				/* console.log('checkBV', inputSelected.reportValidity());
				inputSelected.setAttribute('aria-invalid', true);

				inputSelected.checkValidity('invalid'); */
				//console.log('checkBV2', inputSelected.validity);

				msgError = !valueMinLength
					? `The field must have more than ${minLength} characters.`
					: !valueMatch
					? 'The field cannot contain symbols.'
					: '';

				//console.log('Hay error');
			}

			//console.log('el campo es correcto!', val);
		}
		if (type == 'email') {
			showIcon = true;
			valueMatch = expressions.email.test(val) ? true : false;
			valueMinLength = val.length >= minLength ? true : false;

			if (valueMatch && valueMinLength) {
				isError = false;
				//console.log('No Hay Error');
			} else {
				isError = true;
				msgError = !valueMinLength
					? `The field must have more than ${minLength} characters.`
					: !valueMatch
					? 'Enter a valid Email'
					: '';

				//console.log('Hay error');
			}

			//console.log('el campo es correcto!', val);
		}
		if (type == 'number') {
			showIcon = true;
			valueMatch = expressions.phone.test(val) ? true : false;
			valueMinLength = val.length >= minLength ? true : false;
			if (valueMatch && valueMinLength) {
				isError = false;
				//console.log('No Hay Error');
			} else {
				isError = true;
				msgError = 'The number must have between 1 to 14 characters';

				//console.log('Hay error');
			}
		}
		if (textarea) {
			//console.log('asdsa', expressions.name.test(val));
			showIcon = true;

			valueMinLength = val.length >= minLength ? true : false;

			//console.log('valueMatch', valueMatch);
			//console.log('valueMinLength', valueMinLength);

			if (valueMinLength || !minLength) {
				inputSelected.setAttribute('isvalid', 'true');
				isError = false;
				//console.log('No Hay Error');
			} else {
				isError = true;
				/* console.log('checkBV', inputSelected.reportValidity());
				inputSelected.setAttribute('aria-invalid', true);

				inputSelected.checkValidity('invalid'); */
				//console.log('checkBV2', inputSelected.validity);

				msgError = !valueMinLength ? `The field must have more than ${minLength} characters.` : '';

				//console.log('Hay error');
			}

			//console.log('el campo es correcto!', val);
		}

		isValid.set(isError);
	}

	onMount(() => {
		inputSelected = document.getElementById(name);

		//console.log('inputSelected', inputSelected);
	});

	function typeAction(node) {
		node.type = type;
	}
	let outerDivClass =
		'shadow-inputShadow !appearance-none !border-none border-[#e5e7eb] !rounded-lg w-full !py-2 !px-3 !leading-tight';

	$: {
		if (validations) {
		}
	}
	if (valueeee) {
		testExport(valueeee);
	}

	function testExport(e) {
		//console.log('DESDE PAPA', e);
		return 'salida' + e;
	}
</script>

<div class={`form__group ${clazz || ''}`} id="form">
	{#if label}
		<label
			class={`block  text-sm font-bold mb-2 ${isError ? ' text-red-600' : 'text-secondary'}`}
			for={name}
		>
			{label}</label
		>
	{/if}

	{#if !select}
		<div class="group__input flex relative">
			{#if !textarea}
				<input
					class={` shadow-inputShadow appearance-none  border-2 border-transparent rounded-lg w-full py-2 px-3 text-secondary leading-tight  ease-in-out  focus:outline-none   transform-gpu ${
						isError ? ' border-red-600 focus:border-red-600' : 'focus:border-primary'
					}`}
					use:typeAction
					placeholder={placeholder ? placeholder : label}
					{name}
					id={name}
					{required}
					bind:value
					{disabled}
					on:keypress={onKeyPressEnter ? onKeyPressEnter : null}
					on:keyup={(e) => {
						validation(e.target.value);
					}}
					on:blur={(e) => {
						validation(e.target.value);
					}}
					on:input={(e) => {
						validation(e.target.value);
					}}
				/>
			{:else}
				<textarea
					class={`shadow-inputShadow appearance-none  border-2 border-transparent rounded-lg w-full py-2 px-3 text-secondary leading-tight  ease-in-out  focus:outline-none   transform-gpu ${
						isError ? ' border-red-600 focus:border-red-600' : 'focus:border-primary'
					}`}
					placeholder={placeholder ? placeholder : label}
					{name}
					id={name}
					{rows}
					{required}
					bind:value
					on:keyup={(e) => {
						validation(e.target.value);
					}}
					on:blur={(e) => {
						validation(e.target.value);
					}}
				/>
			{/if}
			{#key isError}
				<InlineSVG
					class={`${
						isError ? 'text-red-600' : ' text-primary'
					} w-[16px] h-[16px] drop-shadow-lg absolute right-2 -translate-y-1/2 top-1/2 z-10 ${
						showIcon ? 'opacity-1' : 'opacity-0'
					}`}
					src={isError ? '/icons/circle-xmark-solid.svg' : '/icons/circle-check-solid.svg'}
				/>
			{/key}
		</div>
		<p class={`text-[0.8rem] text-tertiary mb-0 ${isError ? 'block' : 'hidden'}`}>
			{msgError}
		</p>
	{:else}
		<MultiSelect
			maxSelect={multiselect ? null : 1}
			{outerDivClass}
			bind:selectedValues
			bind:selected
			{options}
		/>
	{/if}
</div>
