import { g as getContext, c as create_ssr_component, a as subscribe, b as get_store_value, v as validate_component, e as each, d as escape, n as null_to_empty, f as add_attribute } from "../../chunks/index-e5aafa9e.js";
import { I as Inline_svg } from "../../chunks/inline-svg-360fe78e.js";
import { c as countMyHours, a as countTeamHours } from "../../chunks/hours-c97f14ea.js";
import { u as user, s as setStorageUser } from "../../chunks/login-bcf9c6e3.js";
import { l as loading, a as apiBackend } from "../../chunks/general-ae01896e.js";
import { I as Inputs } from "../../chunks/inputs-e7480b9d.js";
var app = "";
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session,
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function guard(name) {
  return () => {
    throw new Error(`Cannot call ${name}(...) on the server`);
  };
}
const goto = guard("goto");
var Nav_svelte_svelte_type_style_lang = "";
const css = {
  code: "svg.svelte-1krymwh.svelte-1krymwh{min-height:24px;transition:transform 0.3s ease-in-out}svg.svelte-1krymwh line.svelte-1krymwh{stroke:currentColor;stroke-width:3;transition:transform 0.3s ease-in-out}button.svelte-1krymwh.svelte-1krymwh{z-index:20}.open.svelte-1krymwh svg.svelte-1krymwh{transform:scale(0.7)}.open.svelte-1krymwh #top.svelte-1krymwh{transform:translate(6px, 0px) rotate(45deg)}.open.svelte-1krymwh #middle.svelte-1krymwh{opacity:0}.open.svelte-1krymwh #bottom.svelte-1krymwh{transform:translate(-12px, 9px) rotate(-45deg)}aside.svelte-1krymwh.svelte-1krymwh{left:-100%;transition:left 0.3s ease-in-out}.openA.svelte-1krymwh.svelte-1krymwh{left:0}",
  map: null
};
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $countMyHours, $$unsubscribe_countMyHours;
  let $countTeamHours, $$unsubscribe_countTeamHours;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_countMyHours = subscribe(countMyHours, (value) => $countMyHours = value);
  $$unsubscribe_countTeamHours = subscribe(countTeamHours, (value) => $countTeamHours = value);
  let isAdmin = void 0;
  let isUser = void 0;
  let isSuperAdmin = void 0;
  let menu = [];
  let urlParam1;
  $$result.css.add(css);
  {
    {
      let params1 = $page.url.pathname.split("/")[1];
      urlParam1 = "/" + params1;
    }
  }
  {
    {
      let userStore = get_store_value(user);
      if (userStore) {
        const roles = userStore.body.roles;
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "user") {
            isUser = true;
          }
          if (roles[i].name === "admin") {
            isAdmin = true;
          }
          if (roles[i].name === "superAdmin") {
            isSuperAdmin = true;
          }
        }
      }
    }
  }
  menu = [
    {
      title: "Home",
      to: "/",
      icon: "house-solid"
    },
    ...(isAdmin || isUser) && !isSuperAdmin ? [
      {
        title: "Profile",
        to: "/profile",
        icon: "person-solid"
      }
    ] : [],
    ...(isAdmin || isUser) && !isSuperAdmin ? [
      {
        title: "My Hours",
        to: "/hoursEmployee",
        icon: "user-clock-solid"
      }
    ] : [],
    ...isAdmin && !isSuperAdmin ? [
      {
        title: "Team Hours",
        to: "/hoursTeam",
        icon: "clock-solid"
      }
    ] : [],
    ...isAdmin && !isSuperAdmin ? [
      {
        title: "Tasks Team",
        to: "/tasksTeam",
        icon: "list-check-solid"
      }
    ] : [],
    ...isSuperAdmin ? [
      {
        title: "Employees",
        to: "/employees",
        icon: "person-solid"
      }
    ] : [],
    ...isSuperAdmin ? [
      {
        title: "Teams",
        to: "/teams",
        icon: "people-group-solid"
      }
    ] : [],
    ...isSuperAdmin ? [
      {
        title: "Hours",
        to: "/hours",
        icon: "clock-solid"
      }
    ] : [],
    ...isSuperAdmin ? [
      {
        title: "Tasks",
        to: "/tasks",
        icon: "list-check-solid"
      }
    ] : []
  ];
  $$unsubscribe_page();
  $$unsubscribe_countMyHours();
  $$unsubscribe_countTeamHours();
  return `

${`<div class="${"w-full z-50"}"><div class="${"bg-primary w-full min-h-[70px] fixed shadow-md"}">
			<a class="${"absolute -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2"}" href="${"/"}">${validate_component(Inline_svg, "InlineSVG").$$render($$result, {
    class: "text-white w-[50px] h-fit drop-shadow-lg",
    src: "/icons/chart-line-solid.svg"
  }, {}, {})}</a>
			<button class="${[
    "text-white cursor-pointer mr-4 border-none focus:outline-none absolute -translate-y-1/2 top-1/2 -translate-x-1/2 left-[10%] svelte-1krymwh",
    ""
  ].join(" ").trim()}"><svg width="${"32"}" height="${"24"}" class="${"svelte-1krymwh"}"><line id="${"top"}" x1="${"0"}" y1="${"2"}" x2="${"32"}" y2="${"2"}" class="${"svelte-1krymwh"}"></line><line id="${"middle"}" x1="${"0"}" y1="${"12"}" x2="${"24"}" y2="${"12"}" class="${"svelte-1krymwh"}"></line><line id="${"bottom"}" x1="${"0"}" y1="${"22"}" x2="${"32"}" y2="${"22"}" class="${"svelte-1krymwh"}"></line></svg></button>
			${validate_component(Inline_svg, "InlineSVG").$$render($$result, {
    class: "cursor-pointer text-white max-w-[23px] h-[23px] absolute -translate-y-1/2 top-1/2 -translate-x-1/2 left-[90%]",
    src: "/icons/right-from-bracket-solid.svg"
  }, {}, {})}</div>
		<aside class="${[
    "fixed w-10/12 bg-white border-r-2 shadow-lg h-[calc(100%-70px)] bottom-0  svelte-1krymwh",
    ""
  ].join(" ").trim()}"><nav class="${"py-12 px-4 sm:px-6"}"><ul>${each(menu, (item) => {
    return `<li class="${"pb-4"}"><a class="${escape(null_to_empty(`flex items-center rounded-md py-2  ${urlParam1 === item.to ? "text-primary bg-selago border-l-[3px] border-primary" : "text-tertiary border-l-[3px] border-transparent"}`)) + " svelte-1krymwh"}"${add_attribute("href", item.to, 0)}><div class="${"flex ml-6 mr-4 items-center justify-center w-[30px]"}">${validate_component(Inline_svg, "InlineSVG").$$render($$result, {
      class: " max-w-[23px] h-[23px] ",
      src: `/icons/${item.icon}.svg`
    }, {}, {})}</div>

								<h2 class="${"text-left text-sm font-medium py-1"}">${escape(item.title)}</h2>
								${item.to === "/hoursEmployee" ? `<div class="${"text-white bg-primary rounded-full ml-auto mr-6 w-[15px] h-[15px] flex justify-center items-center shadow-btnCount"}"><p class="${"text-[0.6rem]"}">${escape($countMyHours)}</p>
									</div>` : ``}
								${item.to === "/hoursTeam" ? `<div class="${"text-white bg-primary rounded-full ml-auto mr-6 w-[15px] h-[15px] flex justify-center items-center shadow-btnCount"}"><p class="${"text-[0.6rem]"}">${escape($countTeamHours)}</p>
									</div>` : ``}</a>
						</li>`;
  })}</ul></nav></aside></div>`}`;
});
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  let userLogin = { email: "", password: "" };
  let messageLogin = void 0;
  const submitLogin = async () => {
    let config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(userLogin)
    };
    const url = `${apiBackend}/api/login`;
    const res = await fetch(url, config);
    const data = await res.json();
    user.loginUser(data);
    goto("/");
    setStorageUser(data);
  };
  const submitLoginGoogle = async () => {
    loading.set(true);
    let config = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };
    const url = `${apiBackend}/auth/login/success`;
    const res = await fetch(url, config);
    const data = await res.json();
    user.loginUser(data);
    setStorageUser(data);
    loading.set(false);
  };
  submitLoginGoogle();
  const onKeyPressEnter = (e) => {
    if (e.charCode === 13)
      submitLogin();
  };
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        if ($user.message) {
          if ($user.message == "User not found") {
            messageLogin = "User not found";
          } else {
            messageLogin = "Incorrect Password";
          }
        } else {
          messageLogin = void 0;
        }
      }
    }
    {
      console.log("$user", $user);
    }
    $$rendered = `<div class="${"bg-selago w-full h-[100vh]"}">${`<div class="${"container mx-auto flex justify-center items-center h-full px-6"}"><div class="${"bg-white rounded-xl w-full sm:w-[25rem] h-[30rem] flex flex-col justify-center items-center align-middle shadow-lg"}"><div class="${"flex justify-center mt-6"}"><a href="${"/"}">${validate_component(Inline_svg, "InlineSVG").$$render($$result, {
      class: "text-primary w-[75px] h-fit drop-shadow-lg",
      src: "/icons/chart-line-solid.svg"
    }, {}, {})}</a></div>
					<div class="${"flex flex-col w-full p-6"}">${validate_component(Inputs, "Inputs").$$render($$result, {
      class: "mb-4",
      placeholder: "Enter Email",
      name: "user",
      type: "email",
      required: true,
      value: userLogin.email
    }, {
      value: ($$value) => {
        userLogin.email = $$value;
        $$settled = false;
      }
    }, {})}

						${validate_component(Inputs, "Inputs").$$render($$result, {
      class: "mb-4",
      placeholder: "Enter Password",
      name: "password",
      type: "password",
      required: true,
      onKeyPressEnter,
      value: userLogin.password
    }, {
      value: ($$value) => {
        userLogin.password = $$value;
        $$settled = false;
      }
    }, {})}

						<button class="${"bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg"}" type="${"submit"}">Log In</button>

						<div class="${"flex gap-x-3"}"><button class="${"bg-red-600 hover:bg-red-700 w-1/2 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center my-3"}" type="${"submit"}">${validate_component(Inline_svg, "InlineSVG").$$render($$result, {
      class: " w-[15px] h-[15px] drop-shadow-lg",
      src: "/icons/google-brands.svg"
    }, {}, {})}
								<span class="${"ml-1"}">Google</span></button>
							<button class="${"bg-blue-600 hover:bg-blue-700 w-1/2 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center my-3"}" type="${"submit"}">${validate_component(Inline_svg, "InlineSVG").$$render($$result, {
      class: " w-[15px] h-[15px] drop-shadow-lg",
      src: "/icons/facebook-brands.svg"
    }, {}, {})}
								<span class="${"ml-2"}">Facebook</span></button></div>

						<div class="${"relative mt-4"}"><div class="${"absolute left-1/2 -translate-x-1/2 flex flex-col"}">${messageLogin ? `<p class="${"text-center text-red-600 "}">${escape(messageLogin)}</p>` : ``}
								<p class="${"text-center text-primary font-semibold mt-2 cursor-pointer"}">Sign Up
								</p></div></div></div></div></div>`}</div>`;
  } while (!$$settled);
  $$unsubscribe_user();
  return $$rendered;
});
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $loading, $$unsubscribe_loading;
  let $user, $$unsubscribe_user;
  $$unsubscribe_loading = subscribe(loading, (value) => $loading = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_loading();
  $$unsubscribe_user();
  return `<div id="${"app"}" class="${"flex overflow-hidden"}">
	${$loading ? `<div class="${"absolute z-30 w-full h-full bg-white/80 flex justify-center items-center"}">${validate_component(Inline_svg, "InlineSVG").$$render($$result, {
    class: "text-indigo-500 w-[75px] h-fit",
    src: "/icons/loading.svg"
  }, {}, {})}</div>` : ``}
	${$user.login ? `<div class="${"shadow-xl z-20 h-[100vh] md:fixed"}">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}</div>
		<div class="${"flex w-full overflow-auto bg-selago md:px-2 mt-[70px] md:mt-0 z-10 ml-0 md:ml-[290px]"}">${slots.default ? slots.default({}) : ``}</div>` : `${validate_component(Login, "Login").$$render($$result, {}, {}, {})}`}</div>`;
});
export { _layout as default };
