import { b as get_store_value, c as create_ssr_component, v as validate_component } from "../../../../chunks/index-e5aafa9e.js";
import { l as loading } from "../../../../chunks/general-ae01896e.js";
import { I as Inputs } from "../../../../chunks/inputs-e7480b9d.js";
import { I as Inline_svg } from "../../../../chunks/inline-svg-360fe78e.js";
import { u as user } from "../../../../chunks/login-bcf9c6e3.js";
async function load({ fetch, params }) {
  loading.set(true);
  let id = params.id;
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
  let taskState = {};
  let teams = [];
  let teamsList = [];
  let unwindTeam = [];
  function teamFromResults() {
    let obj = {};
    obj["label"] = results.team.title;
    obj["value"] = results.team._id;
    return obj;
  }
  if ($$props.results === void 0 && $$bindings.results && results !== void 0)
    $$bindings.results(results);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    unwindTeam = [teamFromResults()];
    {
      {
        taskState = Object.assign(taskState, {
          team: unwindTeam[0] ? unwindTeam[0].value : ""
        });
      }
    }
    taskState = results;
    {
      {
        teamsList = teams.map(function(e) {
          let obj = {};
          obj["label"] = e.title;
          obj["value"] = e._id;
          return obj;
        });
      }
    }
    $$rendered = `<div class="${"container px-6 mx-auto md:max-w-5xl h-max"}"><div class="${"flex justify-start items-center my-12 pb-6 border-b-[1px] border-tertiary/30"}"><a href="${"/tasks"}" class="${"flex items-center justify-center cursor-pointer text-white bg-primary px-3 py-3 rounded-full shadow-sm"}">${validate_component(Inline_svg, "InlineSVG").$$render($$result, {
      class: "w-[20px] h-[20px]",
      src: "/icons/arrow-left-solid.svg"
    }, {}, {})}</a>
		<h1 class="${"text-secondary text-3xl font-bold ml-6"}">Edit task</h1></div>

	<div class="${"w-full bg-white rounded-xl p-6 shadow-lg mb-6"}"><form class="${"grid grid-cols-1 md:grid-cols-12 gap-x-8"}"><div class="${"col-span-1 md:col-span-12"}">${validate_component(Inputs, "Inputs").$$render($$result, {
      class: "mb-4",
      label: "Title",
      name: "title",
      type: "text",
      required: true,
      value: taskState.title
    }, {
      value: ($$value) => {
        taskState.title = $$value;
        $$settled = false;
      }
    }, {})}</div>
			<div class="${"col-span-1 md:col-span-12"}">${validate_component(Inputs, "Inputs").$$render($$result, {
      class: "mb-4",
      label: "Description",
      name: "description",
      textarea: true,
      rows: "6",
      required: true,
      value: taskState.description
    }, {
      value: ($$value) => {
        taskState.description = $$value;
        $$settled = false;
      }
    }, {})}</div>
			<div class="${"col-span-1 md:col-span-12 mb-4"}">${validate_component(Inputs, "Inputs").$$render($$result, {
      class: "mb-4",
      label: "Team",
      select: true,
      multiselect: null,
      options: teamsList,
      selected: unwindTeam
    }, {
      selected: ($$value) => {
        unwindTeam = $$value;
        $$settled = false;
      }
    }, {})}
				</div>
			<div class="${"col-span-1 md:col-span-6"}">${validate_component(Inputs, "Inputs").$$render($$result, {
      class: "mb-4",
      label: "Start",
      name: "start",
      type: "date",
      required: true,
      value: taskState.start
    }, {
      value: ($$value) => {
        taskState.start = $$value;
        $$settled = false;
      }
    }, {})}</div>
			<div class="${"col-span-1 md:col-span-6"}">${validate_component(Inputs, "Inputs").$$render($$result, {
      label: "End",
      name: "end",
      type: "date",
      required: true,
      value: taskState.end
    }, {
      value: ($$value) => {
        taskState.end = $$value;
        $$settled = false;
      }
    }, {})}</div>

			<div class="${"col-span-1 md:col-span-12 flex justify-center"}"><button class="${"bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"}" type="${"submit"}">${validate_component(Inline_svg, "InlineSVG").$$render($$result, {
      class: "text-white w-[15px] h-fit mr-3",
      src: "/icons/floppy-disk-solid.svg"
    }, {}, {})}Save</button></div></form></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export { U5Bidu5D as default, load };
