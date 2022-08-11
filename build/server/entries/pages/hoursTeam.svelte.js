import { c as create_ssr_component, v as validate_component, d as escape } from "../../_app/immutable/chunks/index-620e69df.js";
import "../../_app/immutable/chunks/login-378cee40.js";
import { T as Table } from "../../_app/immutable/chunks/Table-a3e1d30b.js";
import "../../_app/immutable/chunks/inline-svg-6543f82a.js";
const HoursTeam = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let results = [];
  let config = {
    param: "Hour",
    actions: false,
    route: "",
    fields: [
      {
        name: "Grupo 1",
        type: "group",
        align: "center",
        keys: [
          {
            type: "titleEmployeTeam",
            align: "start",
            key: "hoursWorked"
          }
        ]
      }
    ]
  };
  return `<div class="${"container md:max-w-5xl px-6 mx-auto h-max"}"><div class="${"flex justify-center md:justify-start my-12 pb-6 border-b-[1px] border-tertiary/30"}"><h1 class="${"text-secondary text-3xl font-bold"}">Team Hours</h1></div>

	<div class="${"w-full bg-white rounded-xl p-6 shadow-lg mb-6"}"><div class="${"relative overflow-x-auto px-0 "}">${validate_component(Table, "Table").$$render($$result, { config, results }, {}, {})}
			</div>
		<div class="${"mt-4"}"><p class="${"text-center text-2xl font-bold text-secondary"}">Totals Hours Team Worked: ${escape("")}h
			</p></div></div></div>`;
});
export {
  HoursTeam as default
};
