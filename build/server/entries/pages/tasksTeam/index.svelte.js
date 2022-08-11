import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-620e69df.js";
import "../../../_app/immutable/chunks/login-378cee40.js";
import { T as Table } from "../../../_app/immutable/chunks/Table-a3e1d30b.js";
import "../../../_app/immutable/chunks/inline-svg-6543f82a.js";
const TasksTeam = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let results = [];
  let config = {
    param: "Task",
    paramFetch: "TeamTasks",
    actions: true,
    route: "tasksTeam",
    fields: [
      {
        name: "Grupo 1",
        type: "group",
        align: "start",
        keys: [
          {
            type: "title",
            align: "start",
            key: "title"
          },
          {
            name: "Start",
            type: "Date",
            align: "start",
            key: "start"
          },
          {
            name: "End",
            type: "Date",
            align: "start",
            key: "end"
          }
        ]
      },
      {
        name: "Description",
        align: "start",
        key: "description"
      },
      {
        name: "In Charge",
        type: "joinNameEmployeeInCharged",
        align: "start"
      }
    ]
  };
  return `<div class="${"container md:max-w-5xl px-4 mx-auto"}"><div class="${"flex justify-center md:justify-start my-12 pb-6 border-b-[1px] border-tertiary/30"}"><h1 class="${"text-secondary text-3xl font-bold"}">Tasks Teams</h1></div>
	<div class="${"w-full bg-white rounded-xl p-6 shadow-lg"}"><a href="${"/tasksTeam/add"}" class="${"flex justify-center mb-6"}"><button class="${"bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded flex items-center justify-center "}">Add</button></a>

		<div class="${"relative overflow-x-auto "}">${validate_component(Table, "Table").$$render($$result, { config, results }, {}, {})}</div></div></div>`;
});
export {
  TasksTeam as default
};
