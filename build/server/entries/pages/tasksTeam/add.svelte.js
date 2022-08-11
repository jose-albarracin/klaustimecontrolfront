import { c as create_ssr_component, b as get_store_value, v as validate_component } from "../../../_app/immutable/chunks/index-620e69df.js";
import { u as user } from "../../../_app/immutable/chunks/login-378cee40.js";
import { I as Inline_svg } from "../../../_app/immutable/chunks/inline-svg-6543f82a.js";
import { I as Inputs } from "../../../_app/immutable/chunks/inputs-73f5f085.js";
const Add = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let userStore = get_store_value(user);
  let taskState = {};
  let employeesTeam = [];
  let tasksList = [];
  let unwindEmployee = {};
  let initialState = {
    title: void 0,
    description: void 0,
    team: userStore.body.teamAdmin,
    start: void 0,
    end: void 0
  };
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        taskState = Object.assign(taskState, { inCharge: unwindEmployee[0] });
      }
    }
    taskState = initialState;
    {
      {
        tasksList = employeesTeam.map(function(e) {
          let obj = {};
          obj["label"] = `${e.first_name} ${e.last_name}`;
          obj["value"] = e._id;
          return obj;
        });
      }
    }
    $$rendered = `<div class="${"container md:max-w-5xl px-4 mx-auto"}"><div class="${"flex justify-start items-center my-12 pb-6 border-b-[1px] border-tertiary/30"}"><a href="${"/tasksTeam"}" class="${"flex items-center justify-center cursor-pointer text-white bg-primary px-3 py-3 rounded-full shadow-sm"}">${validate_component(Inline_svg, "InlineSVG").$$render(
      $$result,
      {
        class: "w-[20px] h-[20px]",
        src: "/icons/arrow-left-solid.svg"
      },
      {},
      {}
    )}</a>
		<h1 class="${"text-secondary text-3xl font-bold ml-6"}">Add Task</h1></div>

	<div class="${"w-full bg-white rounded-xl p-6 shadow-sm"}"><form class="${"grid grid-cols-1 md:grid-cols-12 gap-x-8"}"><div class="${"col-span-1 md:col-span-12"}">${validate_component(Inputs, "Inputs").$$render(
      $$result,
      {
        class: "mb-4",
        minLength: "3",
        label: "Title",
        name: "title",
        type: "text",
        value: taskState.title
      },
      {
        value: ($$value) => {
          taskState.title = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>
			<div class="${"col-span-1 md:col-span-12"}">${validate_component(Inputs, "Inputs").$$render(
      $$result,
      {
        class: "mb-4",
        textarea: true,
        label: "Description",
        name: "description",
        rows: "6",
        required: true,
        value: taskState.description
      },
      {
        value: ($$value) => {
          taskState.description = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>
			<div class="${"col-span-1 md:col-span-12 mb-4"}">${validate_component(Inputs, "Inputs").$$render(
      $$result,
      {
        class: "mb-4",
        label: "Employee in charge",
        select: true,
        multiselect: null,
        options: tasksList,
        selectedValues: unwindEmployee
      },
      {
        selectedValues: ($$value) => {
          unwindEmployee = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>
			<div class="${"col-span-1 md:col-span-6"}">${validate_component(Inputs, "Inputs").$$render(
      $$result,
      {
        class: "mb-4",
        label: "Start",
        name: "start",
        type: "date",
        required: true,
        value: taskState.start
      },
      {
        value: ($$value) => {
          taskState.start = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>
			<div class="${"col-span-1 md:col-span-6"}">${validate_component(Inputs, "Inputs").$$render(
      $$result,
      {
        class: "mb-4",
        label: "End",
        name: "end",
        type: "date",
        required: true,
        value: taskState.end
      },
      {
        value: ($$value) => {
          taskState.end = $$value;
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
