import { b as get_store_value, c as create_ssr_component, v as validate_component } from "../../../../_app/immutable/chunks/index-620e69df.js";
import { a as apiBackend, l as loading } from "../../../../_app/immutable/chunks/general-28d8188f.js";
import { u as user } from "../../../../_app/immutable/chunks/login-378cee40.js";
import { I as Inline_svg } from "../../../../_app/immutable/chunks/inline-svg-6543f82a.js";
import { I as Inputs } from "../../../../_app/immutable/chunks/inputs-73f5f085.js";
async function load({ fetch, params }) {
  let id = params.id;
  console.log("params", id);
  loading.set(true);
  let userStore = get_store_value(user);
  let config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${userStore.token}`
    }
  };
  const urlData = `${apiBackend}/api/tasks/${id}`;
  const res = await fetch(urlData, config);
  const data = await res.json();
  const resultsFirtStep = data["Task"];
  const formateDate = {
    start: resultsFirtStep.start.split("T")[0],
    end: resultsFirtStep.end.split("T")[0]
  };
  const results = Object.assign(resultsFirtStep, formateDate);
  if (res.ok) {
    loading.set(false);
    return { props: { results } };
  }
}
const U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { results } = $$props;
  let employeesTeam = [];
  let tasksList = [];
  let taskState = {};
  let unwindEmployee = [];
  function employeFromResults() {
    let obj = {};
    obj["label"] = `${results.inCharge ? results.inCharge.first_name : ""} ${results.inCharge ? results.inCharge.last_name : ""}`;
    obj["value"] = results.inCharge ? results.inCharge._id : "";
    return obj;
  }
  if ($$props.results === void 0 && $$bindings.results && results !== void 0)
    $$bindings.results(results);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    taskState = results;
    unwindEmployee = [employeFromResults()];
    {
      {
        taskState = Object.assign(taskState, {
          inCharge: unwindEmployee[0] ? unwindEmployee[0].value : null
        });
      }
    }
    tasksList = employeesTeam.map(function(e) {
      let obj = {};
      obj["label"] = `${e.first_name} ${e.last_name}`;
      obj["value"] = e._id;
      return obj;
    });
    $$rendered = `<div class="${"container md:max-w-5xl px-4 mx-auto shadow-sm"}"><div class="${"flex justify-start my-12 pb-6 border-b-[1px] border-tertiary/30"}"><a href="${"/tasksTeam"}" class="${"flex items-center justify-center cursor-pointer"}">${validate_component(Inline_svg, "InlineSVG").$$render(
      $$result,
      {
        class: "text-primary w-fit h-[25px]",
        src: "/icons/arrow-left-solid.svg"
      },
      {},
      {}
    )}</a>
		<h1 class="${"text-secondary text-3xl font-bold ml-6"}">Edit Task</h1></div>
	<div class="${"w-full bg-white rounded-xl p-6"}"><form class="${"grid grid-cols-1 md:grid-cols-12 gap-x-8"}"><div class="${"col-span-1 md:col-span-12"}">${validate_component(Inputs, "Inputs").$$render(
      $$result,
      {
        class: "mb-4",
        label: "Title",
        name: "title",
        type: "text",
        required: true,
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
        selected: unwindEmployee
      },
      {
        selected: ($$value) => {
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
  U5Bidu5D as default,
  load
};
