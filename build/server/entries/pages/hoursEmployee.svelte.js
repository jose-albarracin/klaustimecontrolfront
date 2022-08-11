import { c as create_ssr_component, v as validate_component, d as escape } from "../../_app/immutable/chunks/index-620e69df.js";
import "../../_app/immutable/chunks/login-378cee40.js";
import { I as Inputs } from "../../_app/immutable/chunks/inputs-73f5f085.js";
import { T as Table } from "../../_app/immutable/chunks/Table-a3e1d30b.js";
import "../../_app/immutable/chunks/inline-svg-6543f82a.js";
const HoursEmployee = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let initialHour = { start: void 0, end: void 0 };
  let stateHour = initialHour;
  let isTask = {};
  let results = [];
  let config = {
    param: "Hour",
    actions: false,
    route: "",
    fields: [
      {
        name: "Grupo 1",
        type: "group",
        align: "start",
        keys: [
          {
            name: "Hours Worked",
            type: "titleHour",
            align: "start",
            key: "hours_worked"
          }
        ]
      },
      {
        name: "Start",
        type: "Hour",
        key: "start",
        align: "center"
      },
      {
        name: "End",
        type: "Hour",
        key: "end",
        align: "center"
      },
      {
        name: "Task",
        type: "twoLevels",
        key: "task",
        key2: "title",
        align: "start"
      },
      {
        name: "Date",
        type: "Date",
        key: "createdAt",
        align: "end"
      }
    ]
  };
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    stateHour = Object.assign(stateHour, { ...isTask && { task: isTask._id } });
    $$rendered = `<div class="${"container md:max-w-5xl px-6 mx-auto h-max"}"><div class="${"flex justify-start my-12 pb-6 border-b-[1px] border-tertiary/30"}"><h1 class="${"text-secondary text-3xl font-bold"}">My Hours</h1></div>
	<div class="${"w-full bg-white rounded-xl p-6 mb-6 shadow-lg"}">${isTask ? `<form class="${"grid grid-cols-1 md:grid-cols-12 gap-x-8"}"><div class="${"col-span-1 md:col-span-6"}">${validate_component(Inputs, "Inputs").$$render(
      $$result,
      {
        class: "mb-4",
        label: "Start",
        name: "start",
        type: "number",
        minLength: "1",
        required: true,
        value: stateHour.start
      },
      {
        value: ($$value) => {
          stateHour.start = $$value;
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
        type: "number",
        minLength: "1",
        required: true,
        value: stateHour.end
      },
      {
        value: ($$value) => {
          stateHour.end = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>
				<div class="${"col-span-1 md:col-span-12 flex justify-center"}"><button class="${"bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg"}" type="${"submit"}">Add</button></div></form>` : `<div class="${"flex justify-center"}"><span class="${"text-base text-primary font-bold text-center"}">&quot;Currently you do not have assigned tasks, therefore you will not be able to record hours
					worked&quot;
				</span></div>`}</div>

	<div class="${"w-full bg-white rounded-xl p-6 shadow-lg mb-6"}"><div class="${"relative overflow-x-auto "}">${validate_component(Table, "Table").$$render($$result, { config, results }, {}, {})}
			</div>
		<div class="${"mt-4"}"><p class="${"text-center text-2xl font-bold text-secondary"}">Totals Hours Worked: ${escape("")}h
			</p></div></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  HoursEmployee as default
};
