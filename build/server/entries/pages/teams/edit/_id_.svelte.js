import { b as get_store_value, c as create_ssr_component, v as validate_component } from "../../../../_app/immutable/chunks/index-620e69df.js";
import { a as apiBackend, l as loading } from "../../../../_app/immutable/chunks/general-28d8188f.js";
import { I as Inputs } from "../../../../_app/immutable/chunks/inputs-6cc5d157.js";
import { I as Inline_svg } from "../../../../_app/immutable/chunks/inline-svg-6543f82a.js";
import { u as user } from "../../../../_app/immutable/chunks/login-378cee40.js";
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
  const urlData = `${apiBackend}/api/teams/${id}`;
  const res = await fetch(urlData, config);
  const data = await res.json();
  let results = data["Team"];
  if (res.ok) {
    loading.set(false);
    return { props: { results } };
  }
}
const U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { results } = $$props;
  let teamState = {};
  let employess = [];
  let unwindAdmin = [];
  let employessList = [];
  function adminFromResults() {
    let obj = {};
    obj["label"] = `${results.admin ? results.admin.first_name : ""} ${results.admin ? results.admin.last_name : ""}`;
    obj["value"] = results.admin ? results.admin._id : "";
    return obj;
  }
  teamState = results;
  if ($$props.results === void 0 && $$bindings.results && results !== void 0)
    $$bindings.results(results);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    unwindAdmin = [adminFromResults()];
    {
      {
        teamState = Object.assign(teamState, {
          admin: unwindAdmin[0] ? unwindAdmin[0].value : ""
        });
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
    $$rendered = `<div class="${"container md:max-w-5xl px-6 mx-auto h-max"}"><div class="${"flex justify-start items-center my-12 pb-6 border-b-[1px] border-tertiary/30"}"><a href="${"/teams"}" class="${"flex items-center justify-center cursor-pointer text-white bg-primary px-3 py-3 rounded-full shadow-sm"}">${validate_component(Inline_svg, "InlineSVG").$$render(
      $$result,
      {
        class: "w-[20px] h-[20px]",
        src: "/icons/arrow-left-solid.svg"
      },
      {},
      {}
    )}</a>
		<h1 class="${"text-secondary text-3xl font-bold ml-6"}">Edit Team</h1></div>
	<div class="${"w-full bg-white rounded-xl p-6 shadow-sm"}"><form class="${"grid grid-cols-1 md:grid-cols-12 gap-x-8"}"><div class="${"col-span-1 md:col-span-12"}">${validate_component(Inputs, "Inputs").$$render(
      $$result,
      {
        class: "mb-4",
        label: "Title",
        name: "title",
        type: "text",
        required: true,
        value: teamState.title
      },
      {
        value: ($$value) => {
          teamState.title = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>
			<div class="${"col-span-1 md:col-span-12"}">${validate_component(Inputs, "Inputs").$$render(
      $$result,
      {
        class: "mb-4",
        label: "Description",
        textarea: true,
        name: "description",
        rows: "6",
        required: true,
        value: teamState.description
      },
      {
        value: ($$value) => {
          teamState.description = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>

			<div class="${"col-span-1 md:col-span-12 mb-4"}">${validate_component(Inputs, "Inputs").$$render(
      $$result,
      {
        class: "mb-4",
        label: "Admin",
        select: true,
        multiselect: null,
        options: employessList,
        selected: unwindAdmin
      },
      {
        selected: ($$value) => {
          unwindAdmin = $$value;
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
