import { c as create_ssr_component, t as add_styles, u as merge_ssr_styles, d as escape, o as spread, p as escape_object, w as now, x as loop, a as subscribe, j as createEventDispatcher, f as add_attribute, v as validate_component, e as each, n as null_to_empty } from "./index-e5aafa9e.js";
import { w as writable } from "./login-bcf9c6e3.js";
import { I as Inline_svg } from "./inline-svg-360fe78e.js";
var CircleSpinner_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "div.svelte-1ri03ub{display:inline-block;vertical-align:middle;margin:0 3pt;border-width:calc(1em / 5);border-style:solid;border-radius:50%;-webkit-animation:var(--duration) infinite svelte-1ri03ub-rotate;animation:var(--duration) infinite svelte-1ri03ub-rotate}@-webkit-keyframes svelte-1ri03ub-rotate{100%{transform:rotate(360deg)}}@keyframes svelte-1ri03ub-rotate{100%{transform:rotate(360deg)}}",
  map: null
};
const CircleSpinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color = `cornflowerblue` } = $$props;
  let { duration = `1.5s` } = $$props;
  let { size = `1em` } = $$props;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  $$result.css.add(css$1);
  return `<div${add_styles(merge_ssr_styles("--duration: " + escape(duration), {
    "border-color": `${color} transparent ${color}
  ${color}`,
    "width": size,
    "height": size
  }))} class="${"svelte-1ri03ub"}"></div>`;
});
const ChevronExpand = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread([escape_object($$props), { fill: "currentColor" }, { viewBox: "0 0 16 16" }], {})}><path d="${"M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"}"></path></svg>`;
});
const Cross = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread([escape_object($$props), { viewBox: "0 0 20 20" }, { fill: "currentColor" }], {})}><path d="${"M10 1.6a8.4 8.4 0 100 16.8 8.4 8.4 0 000-16.8zm4.789 11.461L13.06 14.79 10 11.729l-3.061 3.06L5.21 13.06 8.272 10 5.211 6.939 6.94 5.211 10 8.271l3.061-3.061 1.729 1.729L11.728 10l3.061 3.061z"}"></path></svg>`;
});
const Disabled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread([escape_object($$props), { viewBox: "0 0 24 24" }, { fill: "currentColor" }], {})}><path fill="${"none"}" d="${"M0 0h24v24H0V0z"}"></path><path d="${"M14.48 11.95c.17.02.34.05.52.05 2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4c0 .18.03.35.05.52l3.43 3.43zm2.21 2.21L22.53 20H23v-2c0-2.14-3.56-3.5-6.31-3.84zM0 3.12l4 4V10H1v2h3v3h2v-3h2.88l2.51 2.51C9.19 15.11 7 16.3 7 18v2h9.88l4 4 1.41-1.41L1.41 1.71 0 3.12zM6.88 10H6v-.88l.88.88z"}"></path></svg>`;
});
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map((_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i]));
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
function spring(value, opts = {}) {
  const store = writable(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = value;
  let target_value = value;
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = now();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = now();
      cancel_task = false;
      task = loop((now2) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: (now2 - last_time) * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now2;
        last_value = value;
        store.set(value = next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token)
          fulfil();
      });
    });
  }
  const spring2 = {
    set,
    update: (fn, opts2) => set(fn(target_value, value), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
const Wiggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $store, $$unsubscribe_store;
  let { wiggle = false } = $$props;
  let { angle = 0 } = $$props;
  let { scale = 1 } = $$props;
  let { dx = 0 } = $$props;
  let { dy = 0 } = $$props;
  let { duration = 200 } = $$props;
  let { stiffness = 0.05 } = $$props;
  let { damping = 0.1 } = $$props;
  let restState = { angle: 0, scale: 1, dx: 0, dy: 0 };
  let store = spring(restState, { stiffness, damping });
  $$unsubscribe_store = subscribe(store, (value) => $store = value);
  if ($$props.wiggle === void 0 && $$bindings.wiggle && wiggle !== void 0)
    $$bindings.wiggle(wiggle);
  if ($$props.angle === void 0 && $$bindings.angle && angle !== void 0)
    $$bindings.angle(angle);
  if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0)
    $$bindings.scale(scale);
  if ($$props.dx === void 0 && $$bindings.dx && dx !== void 0)
    $$bindings.dx(dx);
  if ($$props.dy === void 0 && $$bindings.dy && dy !== void 0)
    $$bindings.dy(dy);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.stiffness === void 0 && $$bindings.stiffness && stiffness !== void 0)
    $$bindings.stiffness(stiffness);
  if ($$props.damping === void 0 && $$bindings.damping && damping !== void 0)
    $$bindings.damping(damping);
  {
    if (wiggle)
      setTimeout(() => wiggle = false, duration);
  }
  {
    store.set(wiggle ? { scale, angle, dx, dy } : restState);
  }
  $$unsubscribe_store();
  return `<span${add_styles({
    "transform": `rotate(${$store.angle}deg) scale(${$store.scale}) translate(${$store.dx}px,
  ${$store.dy}px)`
  })}>${slots.default ? slots.default({}) : ``}</span>`;
});
var MultiSelect_svelte_svelte_type_style_lang = "";
const css = {
  code: ".svelte-sepjwt:where(div.multiselect){position:relative;align-items:center;display:flex;cursor:text;border:var(--sms-border, 1pt solid lightgray);border-radius:var(--sms-border-radius, 3pt);background:var(--sms-bg);max-width:var(--sms-max-width);padding:var(--sms-padding, 0 3pt);color:var(--sms-text-color);font-size:var(--sms-font-size, inherit);min-height:var(--sms-min-height, 19pt)}.svelte-sepjwt:where(div.multiselect.open){z-index:var(--sms-open-z-index, 4)}.svelte-sepjwt:where(div.multiselect:focus-within){border:var(--sms-focus-border, 1pt solid var(--sms-active-color, cornflowerblue))}.svelte-sepjwt:where(div.multiselect.disabled){background:var(--sms-disabled-bg, lightgray);cursor:not-allowed}.svelte-sepjwt:where(div.multiselect > ul.selected){display:flex;flex:1;padding:0;margin:0;flex-wrap:wrap}.svelte-sepjwt:where(div.multiselect > ul.selected > li){align-items:center;border-radius:3pt;display:flex;margin:2pt;line-height:normal;transition:0.3s;white-space:nowrap;background:var(--sms-selected-bg, rgba(0, 0, 0, 0.15));padding:var(--sms-selected-li-padding, 1pt 5pt);color:var(--sms-selected-text-color, var(--sms-text-color))}.svelte-sepjwt:where(div.multiselect button){border-radius:50%;display:flex;transition:0.2s;color:inherit;background:transparent;border:none;cursor:pointer;outline:none;padding:0;margin:0 0 0 3pt}.svelte-sepjwt:where(div.multiselect button.remove-all){margin:0 3pt}.svelte-sepjwt:where(ul.selected > li button:hover, button.remove-all:hover, button:focus){color:var(--sms-button-hover-color, lightskyblue)}.svelte-sepjwt:where(div.multiselect input){margin:auto 0;padding:0}.svelte-sepjwt:where(div.multiselect > ul.selected > li > input){border:none;outline:none;background:none;flex:1;min-width:2em;color:inherit;font-size:inherit;cursor:inherit}.svelte-sepjwt:where(div.multiselect > ul.selected > li > input)::-moz-placeholder{padding-left:5pt;color:var(--sms-placeholder-color);opacity:var(--sms-placeholder-opacity)}.svelte-sepjwt:where(div.multiselect > ul.selected > li > input):-ms-input-placeholder{padding-left:5pt;color:var(--sms-placeholder-color);opacity:var(--sms-placeholder-opacity)}.svelte-sepjwt:where(div.multiselect > ul.selected > li > input)::placeholder{padding-left:5pt;color:var(--sms-placeholder-color);opacity:var(--sms-placeholder-opacity)}.svelte-sepjwt:where(div.multiselect > input.form-control){width:2em;position:absolute;background:transparent;border:none;outline:none;z-index:-1;opacity:0;pointer-events:none}.svelte-sepjwt:where(div.multiselect > ul.options){list-style:none;padding:4pt 0;top:100%;left:0;width:100%;position:absolute;border-radius:1ex;overflow:auto;background:var(--sms-options-bg, white);max-height:var(--sms-options-max-height, 50vh);-ms-scroll-chaining:var(--sms-options-overscroll, none);overscroll-behavior:var(--sms-options-overscroll, none);box-shadow:var(--sms-options-shadow, 0 0 14pt -8pt black);transition:all 0.2s}.svelte-sepjwt:where(div.multiselect > ul.options.hidden){visibility:hidden;opacity:0;transform:translateY(50px)}.svelte-sepjwt:where(div.multiselect > ul.options > li){padding:3pt 2ex;cursor:pointer;scroll-margin:var(--sms-options-scroll-margin, 100px)}.svelte-sepjwt:where(div.multiselect > ul.options span){padding:3pt 2ex}.svelte-sepjwt:where(div.multiselect > ul.options > li.selected){background:var(--sms-li-selected-bg);color:var(--sms-li-selected-color)}.svelte-sepjwt:where(div.multiselect > ul.options > li.active){background:var(--sms-li-active-bg, var(--sms-active-color, rgba(0, 0, 0, 0.15)))}.svelte-sepjwt:where(div.multiselect > ul.options > li.disabled){cursor:not-allowed;background:var(--sms-li-disabled-bg, #f5f5f6);color:var(--sms-li-disabled-text, #b8b8b8)}",
  map: null
};
const MultiSelect = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let formValue;
  let matchingOptions;
  let isSelected;
  let { searchText = `` } = $$props;
  let { showOptions = false } = $$props;
  let { maxSelect = null } = $$props;
  let { maxSelectMsg = null } = $$props;
  let { disabled = false } = $$props;
  let { disabledTitle = `This field is disabled` } = $$props;
  let { options } = $$props;
  let { selected = [] } = $$props;
  let { selectedLabels = [] } = $$props;
  let { selectedValues = [] } = $$props;
  let { input = null } = $$props;
  let { outerDiv = null } = $$props;
  let { placeholder = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { name = id } = $$props;
  let { noOptionsMsg = `No matching options` } = $$props;
  let { activeOption = null } = $$props;
  let { filterFunc = (op, searchText2) => {
    if (!searchText2)
      return true;
    return `${get_label(op)}`.toLowerCase().includes(searchText2.toLowerCase());
  } } = $$props;
  let { outerDivClass: outerDivClass2 = `` } = $$props;
  let { ulSelectedClass = `` } = $$props;
  let { liSelectedClass = `` } = $$props;
  let { ulOptionsClass = `` } = $$props;
  let { liOptionClass = `` } = $$props;
  let { liActiveOptionClass = `` } = $$props;
  let { inputClass = `` } = $$props;
  let { removeBtnTitle = `Remove` } = $$props;
  let { removeAllTitle = `Remove all` } = $$props;
  let { defaultDisabledTitle = `This option is disabled` } = $$props;
  let { allowUserOptions = false } = $$props;
  let { parseLabelsAsHtml = false } = $$props;
  let { addOptionMsg = `Create this option...` } = $$props;
  let { autoScroll = true } = $$props;
  let { loading = false } = $$props;
  let { required = false } = $$props;
  let { autocomplete = `off` } = $$props;
  let { invalid = false } = $$props;
  let { sortSelected = false } = $$props;
  if (!((options == null ? void 0 : options.length) > 0))
    console.error(`MultiSelect received no options`);
  if (parseLabelsAsHtml && allowUserOptions)
    console.warn(`You shouldn't combine parseLabelsAsHtml and allowUserOptions. It's susceptible to XSS attacks!`);
  if (maxSelect !== null && maxSelect < 1) {
    console.error(`maxSelect must be null or positive integer, got ${maxSelect}`);
  }
  if (!Array.isArray(selected))
    console.error(`selected prop must be an array`);
  createEventDispatcher();
  let wiggle = false;
  if ($$props.searchText === void 0 && $$bindings.searchText && searchText !== void 0)
    $$bindings.searchText(searchText);
  if ($$props.showOptions === void 0 && $$bindings.showOptions && showOptions !== void 0)
    $$bindings.showOptions(showOptions);
  if ($$props.maxSelect === void 0 && $$bindings.maxSelect && maxSelect !== void 0)
    $$bindings.maxSelect(maxSelect);
  if ($$props.maxSelectMsg === void 0 && $$bindings.maxSelectMsg && maxSelectMsg !== void 0)
    $$bindings.maxSelectMsg(maxSelectMsg);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.disabledTitle === void 0 && $$bindings.disabledTitle && disabledTitle !== void 0)
    $$bindings.disabledTitle(disabledTitle);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.selectedLabels === void 0 && $$bindings.selectedLabels && selectedLabels !== void 0)
    $$bindings.selectedLabels(selectedLabels);
  if ($$props.selectedValues === void 0 && $$bindings.selectedValues && selectedValues !== void 0)
    $$bindings.selectedValues(selectedValues);
  if ($$props.input === void 0 && $$bindings.input && input !== void 0)
    $$bindings.input(input);
  if ($$props.outerDiv === void 0 && $$bindings.outerDiv && outerDiv !== void 0)
    $$bindings.outerDiv(outerDiv);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.noOptionsMsg === void 0 && $$bindings.noOptionsMsg && noOptionsMsg !== void 0)
    $$bindings.noOptionsMsg(noOptionsMsg);
  if ($$props.activeOption === void 0 && $$bindings.activeOption && activeOption !== void 0)
    $$bindings.activeOption(activeOption);
  if ($$props.filterFunc === void 0 && $$bindings.filterFunc && filterFunc !== void 0)
    $$bindings.filterFunc(filterFunc);
  if ($$props.outerDivClass === void 0 && $$bindings.outerDivClass && outerDivClass2 !== void 0)
    $$bindings.outerDivClass(outerDivClass2);
  if ($$props.ulSelectedClass === void 0 && $$bindings.ulSelectedClass && ulSelectedClass !== void 0)
    $$bindings.ulSelectedClass(ulSelectedClass);
  if ($$props.liSelectedClass === void 0 && $$bindings.liSelectedClass && liSelectedClass !== void 0)
    $$bindings.liSelectedClass(liSelectedClass);
  if ($$props.ulOptionsClass === void 0 && $$bindings.ulOptionsClass && ulOptionsClass !== void 0)
    $$bindings.ulOptionsClass(ulOptionsClass);
  if ($$props.liOptionClass === void 0 && $$bindings.liOptionClass && liOptionClass !== void 0)
    $$bindings.liOptionClass(liOptionClass);
  if ($$props.liActiveOptionClass === void 0 && $$bindings.liActiveOptionClass && liActiveOptionClass !== void 0)
    $$bindings.liActiveOptionClass(liActiveOptionClass);
  if ($$props.inputClass === void 0 && $$bindings.inputClass && inputClass !== void 0)
    $$bindings.inputClass(inputClass);
  if ($$props.removeBtnTitle === void 0 && $$bindings.removeBtnTitle && removeBtnTitle !== void 0)
    $$bindings.removeBtnTitle(removeBtnTitle);
  if ($$props.removeAllTitle === void 0 && $$bindings.removeAllTitle && removeAllTitle !== void 0)
    $$bindings.removeAllTitle(removeAllTitle);
  if ($$props.defaultDisabledTitle === void 0 && $$bindings.defaultDisabledTitle && defaultDisabledTitle !== void 0)
    $$bindings.defaultDisabledTitle(defaultDisabledTitle);
  if ($$props.allowUserOptions === void 0 && $$bindings.allowUserOptions && allowUserOptions !== void 0)
    $$bindings.allowUserOptions(allowUserOptions);
  if ($$props.parseLabelsAsHtml === void 0 && $$bindings.parseLabelsAsHtml && parseLabelsAsHtml !== void 0)
    $$bindings.parseLabelsAsHtml(parseLabelsAsHtml);
  if ($$props.addOptionMsg === void 0 && $$bindings.addOptionMsg && addOptionMsg !== void 0)
    $$bindings.addOptionMsg(addOptionMsg);
  if ($$props.autoScroll === void 0 && $$bindings.autoScroll && autoScroll !== void 0)
    $$bindings.autoScroll(autoScroll);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.autocomplete === void 0 && $$bindings.autocomplete && autocomplete !== void 0)
    $$bindings.autocomplete(autocomplete);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.sortSelected === void 0 && $$bindings.sortSelected && sortSelected !== void 0)
    $$bindings.sortSelected(sortSelected);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    selectedLabels = selected.map(get_label);
    selectedValues = selected.map(get_value);
    formValue = selectedValues.join(`,`);
    {
      if (formValue)
        invalid = false;
    }
    matchingOptions = options.filter((op) => filterFunc(op, searchText) && !(op instanceof Object && op.disabled) && !selectedLabels.includes(get_label(op)));
    isSelected = (label) => selectedLabels.includes(label);
    $$rendered = `

<div${add_attribute("aria-expanded", showOptions, 0)}${add_attribute("aria-multiselectable", maxSelect === null || maxSelect > 1, 0)} class="${[
      "multiselect " + escape(outerDivClass2) + " svelte-sepjwt",
      (disabled ? "disabled" : "") + " " + (maxSelect === 1 ? "single" : "") + " " + (showOptions ? "open" : "") + " " + (invalid ? "invalid" : "")
    ].join(" ").trim()}"${add_attribute("title", disabled ? disabledTitle : null, 0)}${add_attribute("aria-disabled", disabled ? `true` : null, 0)}${add_attribute("this", outerDiv, 0)}><input ${required ? "required" : ""} tabindex="${"-1"}" aria-hidden="${"true"}" aria-label="${"ignore this, used only to prevent form submission if select is required but empty"}" class="${"form-control svelte-sepjwt"}"${add_attribute("value", formValue, 0)}>
  ${validate_component(ChevronExpand, "ExpandIcon").$$render($$result, {
      width: "15px",
      style: "min-width: 1em; padding: 0 1pt;"
    }, {}, {})}
  <ul class="${"selected " + escape(ulSelectedClass) + " svelte-sepjwt"}">${each(selected, (option, idx) => {
      return `<li class="${escape(null_to_empty(liSelectedClass)) + " svelte-sepjwt"}" aria-selected="${"true"}">${slots.selected ? slots.selected({ option, idx }) : `
          ${parseLabelsAsHtml ? `<!-- HTML_TAG_START -->${get_label(option)}<!-- HTML_TAG_END -->` : `${escape(get_label(option))}`}
        `}
        ${!disabled ? `<button type="${"button"}" title="${escape(removeBtnTitle) + " " + escape(get_label(option))}" class="${"svelte-sepjwt"}">${validate_component(Cross, "CrossIcon").$$render($$result, { width: "15px" }, {}, {})}
          </button>` : ``}
      </li>`;
    })}
    <li style="${"display: contents;"}" class="${"svelte-sepjwt"}"><input class="${escape(null_to_empty(inputClass)) + " svelte-sepjwt"}"${add_attribute("autocomplete", autocomplete, 0)}${add_attribute("id", id, 0)}${add_attribute("name", name, 0)} ${disabled ? "disabled" : ""}${add_attribute("placeholder", selectedLabels.length ? `` : placeholder, 0)}${add_attribute("aria-invalid", invalid ? `true` : null, 0)}${add_attribute("this", input, 0)}${add_attribute("value", searchText, 0)}></li></ul>
  ${loading ? `${slots.spinner ? slots.spinner({}) : `
      ${validate_component(CircleSpinner, "CircleSpinner").$$render($$result, {}, {}, {})}
    `}` : ``}
  ${disabled ? `${slots["disabled-icon"] ? slots["disabled-icon"]({}) : `
      ${validate_component(Disabled, "DisabledIcon").$$render($$result, { width: "15px" }, {}, {})}
    `}` : `${selected.length > 0 ? `${maxSelect && (maxSelect > 1 || maxSelectMsg) ? `${validate_component(Wiggle, "Wiggle").$$render($$result, { angle: 20, wiggle }, {
      wiggle: ($$value) => {
        wiggle = $$value;
        $$settled = false;
      }
    }, {
      default: () => {
        return `<span style="${"padding: 0 3pt;"}" class="${"svelte-sepjwt"}">${escape((maxSelectMsg == null ? void 0 : maxSelectMsg(selected.length, maxSelect)) ?? (maxSelect > 1 ? `${selected.length}/${maxSelect}` : ``))}</span>`;
      }
    })}` : ``}
    ${maxSelect !== 1 && selected.length > 1 ? `<button type="${"button"}" class="${"remove-all svelte-sepjwt"}"${add_attribute("title", removeAllTitle, 0)}>${validate_component(Cross, "CrossIcon").$$render($$result, { width: "15px" }, {}, {})}</button>` : ``}` : ``}`}

  <ul class="${[
      "options " + escape(ulOptionsClass) + " svelte-sepjwt",
      !showOptions ? "hidden" : ""
    ].join(" ").trim()}">${matchingOptions.length ? each(matchingOptions, (option, idx) => {
      let { label, disabled: disabled2 = null, title = null, selectedTitle = null, disabledTitle: disabledTitle2 = defaultDisabledTitle } = option instanceof Object ? option : { label: option }, active = activeOption && get_label(activeOption) === label;
      return `
      
      <li${add_attribute("title", disabled2 ? disabledTitle2 : isSelected(label) && selectedTitle || title, 0)} class="${[
        escape(liOptionClass) + " " + escape(active ? liActiveOptionClass : ``) + " svelte-sepjwt",
        (isSelected(label) ? "selected" : "") + " " + (active ? "active" : "") + " " + (disabled2 ? "disabled" : "")
      ].join(" ").trim()}" aria-selected="${"false"}">${slots.option ? slots.option({ option, idx }) : `
          ${parseLabelsAsHtml ? `<!-- HTML_TAG_START -->${get_label(option)}<!-- HTML_TAG_END -->` : `${escape(get_label(option))}`}
        `}
      </li>`;
    }) : `${allowUserOptions && searchText ? `<li${add_attribute("title", addOptionMsg, 0)} aria-selected="${"false"}" class="${["svelte-sepjwt", ""].join(" ").trim()}">${escape(addOptionMsg)}
        </li>` : `<span class="${"svelte-sepjwt"}">${escape(noOptionsMsg)}</span>`}`}</ul>
</div>`;
  } while (!$$settled);
  return $$rendered;
});
const get_label = (op) => op instanceof Object ? op.label : op;
const get_value = (op) => op instanceof Object ? op.value ?? op.label : op;
let outerDivClass = "shadow-inputShadow !appearance-none !border-none border-[#e5e7eb] !rounded-lg w-full !py-2 !px-3 !leading-tight";
const Inputs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { type } = $$props;
  let { placeholder } = $$props;
  let { label } = $$props;
  let { name } = $$props;
  let { required } = $$props;
  let { value } = $$props;
  let { disabled } = $$props;
  let { select } = $$props;
  let { selected } = $$props;
  let { multiselect } = $$props;
  let { textarea } = $$props;
  let { rows } = $$props;
  let { minLength } = $$props;
  let { validations } = $$props;
  let { valueeee } = $$props;
  let { selectedValues } = $$props;
  let { options } = $$props;
  let { onKeyPressEnter } = $$props;
  let { class: clazz } = $$props;
  let msgError = "";
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.select === void 0 && $$bindings.select && select !== void 0)
    $$bindings.select(select);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.multiselect === void 0 && $$bindings.multiselect && multiselect !== void 0)
    $$bindings.multiselect(multiselect);
  if ($$props.textarea === void 0 && $$bindings.textarea && textarea !== void 0)
    $$bindings.textarea(textarea);
  if ($$props.rows === void 0 && $$bindings.rows && rows !== void 0)
    $$bindings.rows(rows);
  if ($$props.minLength === void 0 && $$bindings.minLength && minLength !== void 0)
    $$bindings.minLength(minLength);
  if ($$props.validations === void 0 && $$bindings.validations && validations !== void 0)
    $$bindings.validations(validations);
  if ($$props.valueeee === void 0 && $$bindings.valueeee && valueeee !== void 0)
    $$bindings.valueeee(valueeee);
  if ($$props.selectedValues === void 0 && $$bindings.selectedValues && selectedValues !== void 0)
    $$bindings.selectedValues(selectedValues);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.onKeyPressEnter === void 0 && $$bindings.onKeyPressEnter && onKeyPressEnter !== void 0)
    $$bindings.onKeyPressEnter(onKeyPressEnter);
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
    $$bindings.class(clazz);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div${add_attribute("class", `form__group ${clazz || ""}`, 0)} id="${"form"}">${label ? `<label${add_attribute("class", `block  text-sm font-bold mb-2 ${"text-secondary"}`, 0)}${add_attribute("for", name, 0)}>${escape(label)}</label>` : ``}

	${!select ? `<div class="${"group__input flex relative"}">${!textarea ? `<input${add_attribute("class", ` shadow-inputShadow appearance-none  border-2 border-transparent rounded-lg w-full py-2 px-3 text-secondary leading-tight  ease-in-out  focus:outline-none   transform-gpu ${"focus:border-primary"}`, 0)}${add_attribute("placeholder", placeholder ? placeholder : label, 0)}${add_attribute("name", name, 0)}${add_attribute("id", name, 0)} ${required ? "required" : ""} ${disabled ? "disabled" : ""}${add_attribute("value", value, 0)}>` : `<textarea${add_attribute("class", `shadow-inputShadow appearance-none  border-2 border-transparent rounded-lg w-full py-2 px-3 text-secondary leading-tight  ease-in-out  focus:outline-none   transform-gpu ${"focus:border-primary"}`, 0)}${add_attribute("placeholder", placeholder ? placeholder : label, 0)}${add_attribute("name", name, 0)}${add_attribute("id", name, 0)}${add_attribute("rows", rows, 0)} ${required ? "required" : ""}>${value || ""}</textarea>`}
			${validate_component(Inline_svg, "InlineSVG").$$render($$result, {
      class: `${" text-primary"} w-[16px] h-[16px] drop-shadow-lg absolute right-2 -translate-y-1/2 top-1/2 z-10 ${"opacity-0"}`,
      src: "/icons/circle-check-solid.svg"
    }, {}, {})}</div>
		<p${add_attribute("class", `text-[0.8rem] text-tertiary mb-0 ${"hidden"}`, 0)}>${escape(msgError)}</p>` : `${validate_component(MultiSelect, "MultiSelect").$$render($$result, {
      maxSelect: multiselect ? null : 1,
      outerDivClass,
      options,
      selectedValues,
      selected
    }, {
      selectedValues: ($$value) => {
        selectedValues = $$value;
        $$settled = false;
      },
      selected: ($$value) => {
        selected = $$value;
        $$settled = false;
      }
    }, {})}`}</div>`;
  } while (!$$settled);
  return $$rendered;
});
export { Inputs as I };
