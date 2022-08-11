import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-620e69df.js";
import "../../../_app/immutable/chunks/login-378cee40.js";
import { I as Inline_svg } from "../../../_app/immutable/chunks/inline-svg-6543f82a.js";
import { I as Inputs } from "../../../_app/immutable/chunks/inputs-6cc5d157.js";
const Add = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let employeeState = {};
  let teams = [];
  let initialState = {
    first_name: void 0,
    last_name: void 0,
    email: void 0,
    password: void 0,
    phone: void 0,
    team: void 0,
    roles: void 0
  };
  let listRoles = ["user", "admin"];
  let teamList = [];
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        teamList = teams.map((te) => te.title);
      }
    }
    employeeState = initialState;
    $$rendered = `<div class="${"container md:max-w-5xl px-6 mx-auto h-max"}"><div class="${"flex justify-start items-center my-12 pb-6 border-b-[1px] border-tertiary/30"}"><a href="${"/employees"}" class="${"flex items-center justify-center cursor-pointer text-white bg-primary px-3 py-3 rounded-full shadow-sm"}">${validate_component(Inline_svg, "InlineSVG").$$render(
      $$result,
      {
        class: " w-[20px] h-[20px]",
        src: "/icons/arrow-left-solid.svg"
      },
      {},
      {}
    )}</a>
		<h1 class="${"text-secondary text-3xl font-bold ml-6"}">Add Employee</h1></div>

	<div class="${"w-full bg-white rounded-xl p-6 shadow-lg mb-6"}"><form class="${"grid grid-cols-1 md:grid-cols-12 gap-x-8"}"><div class="${"col-span-1 md:col-span-6"}">${validate_component(Inputs, "Inputs").$$render(
      $$result,
      {
        class: "mb-4",
        label: "First Name",
        name: "first_name",
        type: "text",
        required: true,
        value: employeeState.first_name
      },
      {
        value: ($$value) => {
          employeeState.first_name = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>
			<div class="${"col-span-1 md:col-span-6"}">${validate_component(Inputs, "Inputs").$$render(
      $$result,
      {
        class: "mb-4",
        label: "Last Name",
        name: "last_name",
        type: "text",
        required: true,
        value: employeeState.last_name
      },
      {
        value: ($$value) => {
          employeeState.last_name = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>
			<div class="${"col-span-1 md:col-span-12"}">${validate_component(Inputs, "Inputs").$$render(
      $$result,
      {
        class: "mb-4",
        label: "Phone",
        name: "phone",
        type: "number",
        minLength: "1",
        required: true,
        value: employeeState.phone
      },
      {
        value: ($$value) => {
          employeeState.phone = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>

			<div class="${"col-span-1 md:col-span-6 mb-4"}">${validate_component(Inputs, "Inputs").$$render(
      $$result,
      {
        class: "mb-4",
        label: "Team",
        select: true,
        multiselect: true,
        options: teamList,
        selected: employeeState.team
      },
      {
        selected: ($$value) => {
          employeeState.team = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>
			<div class="${"col-span-1 md:col-span-6 mb-4"}">${validate_component(Inputs, "Inputs").$$render(
      $$result,
      {
        class: "mb-4",
        label: "Roles",
        select: true,
        multiselect: true,
        options: listRoles,
        selected: employeeState.roles
      },
      {
        selected: ($$value) => {
          employeeState.roles = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>
			<div class="${"col-span-1 md:col-span-6"}">${validate_component(Inputs, "Inputs").$$render(
      $$result,
      {
        class: "mb-4",
        label: "Email",
        name: "email",
        type: "email",
        required: true,
        value: employeeState.email
      },
      {
        value: ($$value) => {
          employeeState.email = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>
			<div class="${"col-span-1 md:col-span-6"}">${validate_component(Inputs, "Inputs").$$render(
      $$result,
      {
        class: "mb-4",
        label: "Password",
        name: "password",
        type: "password",
        required: true,
        value: employeeState.password
      },
      {
        value: ($$value) => {
          employeeState.password = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>

			<div class="${"col-span-1 md:col-span-12 flex justify-center"}"><button class="${"bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"}" type="${"submit"}">${validate_component(Inline_svg, "InlineSVG").$$render(
      $$result,
      {
        class: "text-white w-[15px] h-fit mr-3",
        src: "/icons/floppy-disk-solid.svg"
      },
      {},
      {}
    )}Save</button></div></form></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Add as default
};
