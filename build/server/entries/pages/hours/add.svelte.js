import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-620e69df.js";
import "../../../_app/immutable/chunks/login-378cee40.js";
import { I as Inline_svg } from "../../../_app/immutable/chunks/inline-svg-6543f82a.js";
import { I as Inputs } from "../../../_app/immutable/chunks/inputs-73f5f085.js";
const Add = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hoursState = {};
  let employess = [];
  let unwindAdmin = {};
  let initialState = {
    employee: void 0,
    start: void 0,
    end: void 0
  };
  let employessList = [];
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        hoursState = Object.assign(hoursState, { employee: unwindAdmin[0] });
      }
    }
    {
      {
        employessList = employess.map(function(e) {
          let obj = {};
          obj["label"] = `${e.first_name} ${e.last_name}`;
          obj["value"] = e._id;
          return obj;
        });
      }
    }
    hoursState = initialState;
    $$rendered = `<div class="${"container px-6 mx-auto md:max-w-5xl h-max"}"><div class="${"flex justify-start items-center my-12 pb-6 border-b-[1px] border-tertiary/30"}"><a href="${"/hours"}" class="${"flex items-center justify-center cursor-pointer text-white bg-primary px-3 py-3 rounded-full shadow-sm"}">${validate_component(Inline_svg, "InlineSVG").$$render(
      $$result,
      {
        class: "w-[20px] h-[20px]",
        src: "/icons/arrow-left-solid.svg"
      },
      {},
      {}
    )}</a>
		<h1 class="${"text-secondary text-3xl font-bold ml-6"}">Add Hour</h1></div>

	<div class="${"w-full bg-white rounded-xl p-6 shadow-lg mb-6"}"><form class="${"grid grid-cols-1 md:grid-cols-12 gap-x-8"}"><div class="${"col-span-1 md:col-span-12 mb-4"}">${validate_component(Inputs, "Inputs").$$render(
      $$result,
      {
        class: "mb-4",
        label: "Employee",
        select: true,
        multiselect: null,
        options: employessList,
        selectedValues: unwindAdmin
      },
      {
        selectedValues: ($$value) => {
          unwindAdmin = $$value;
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
        type: "number",
        minLength: "1",
        required: true,
        value: hoursState.start
      },
      {
        value: ($$value) => {
          hoursState.start = $$value;
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
        value: hoursState.end
      },
      {
        value: ($$value) => {
          hoursState.end = $$value;
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
