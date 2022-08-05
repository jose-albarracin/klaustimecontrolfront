import { c as create_ssr_component, v as validate_component } from "../../chunks/index-e5aafa9e.js";
import { w as writable } from "../../chunks/login-bcf9c6e3.js";
import { I as Inputs } from "../../chunks/inputs-e7480b9d.js";
import "../../chunks/inline-svg-360fe78e.js";
let isValid = writable(false);
const Profile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let userInitial = {
    first_name: null,
    last_name: null,
    email: null,
    phone: null
  };
  let userState = {};
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    userState = userInitial;
    {
      console.log("isValid", isValid);
    }
    $$rendered = `<div class="${"container md:max-w-5xl px-4 mx-auto"}"><div class="${"flex justify-start my-12 pb-6 border-b-[1px] border-tertiary/30"}"><h1 class="${"text-secondary text-3xl font-bold"}">Profile</h1></div>
	<div class="${"w-full bg-white rounded-xl p-6"}"><form class="${"grid grid-cols-1 md:grid-cols-12 gap-x-8"}"><div class="${"col-span-1 md:col-span-6"}">${validate_component(Inputs, "Inputs").$$render($$result, {
      class: "mb-4",
      label: "First Name",
      name: "first_name",
      type: "text",
      minLength: "3",
      value: userState.first_name
    }, {
      value: ($$value) => {
        userState.first_name = $$value;
        $$settled = false;
      }
    }, {})}</div>
			<div class="${"col-span-1 md:col-span-6"}">${validate_component(Inputs, "Inputs").$$render($$result, {
      class: "mb-4",
      label: "Last Name",
      name: "last_name",
      type: "text",
      minLength: "3",
      value: userState.last_name
    }, {
      value: ($$value) => {
        userState.last_name = $$value;
        $$settled = false;
      }
    }, {})}</div>
			<div class="${"col-span-1 md:col-span-6"}">${validate_component(Inputs, "Inputs").$$render($$result, {
      class: "mb-4",
      label: "Email",
      name: "email",
      type: "email",
      minLength: "3",
      disabled: true,
      value: userState.email
    }, {
      value: ($$value) => {
        userState.email = $$value;
        $$settled = false;
      }
    }, {})}</div>
			<div class="${"col-span-1 md:col-span-6"}">${validate_component(Inputs, "Inputs").$$render($$result, {
      class: "mb-4",
      label: "Phone",
      name: "phone",
      type: "number",
      minLength: "3",
      value: userState.phone
    }, {
      value: ($$value) => {
        userState.phone = $$value;
        $$settled = false;
      }
    }, {})}</div>
			<div class="${"col-span-1 md:col-span-12 flex justify-center"}"><button class="${"bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg"}" type="${"submit"}">Update</button></div></form></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export { Profile as default };
