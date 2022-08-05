import { l as listen, h as bubble, c as create_ssr_component, i as compute_rest_props, j as createEventDispatcher, k as get_current_component, o as spread, p as escape_object } from "./index-e5aafa9e.js";
const nativeEvents = [
  "focus",
  "blur",
  "fullscreenchange",
  "fullscreenerror",
  "scroll",
  "cut",
  "copy",
  "paste",
  "keydown",
  "keypress",
  "keyup",
  "auxclick",
  "click",
  "contextmenu",
  "dblclick",
  "mousedown",
  "mouseenter",
  "mouseleave",
  "mousemove",
  "mouseover",
  "mouseout",
  "mouseup",
  "pointerlockchange",
  "pointerlockerror",
  "select",
  "wheel",
  "drag",
  "dragend",
  "dragenter",
  "dragstart",
  "dragleave",
  "dragover",
  "drop",
  "touchcancel",
  "touchend",
  "touchmove",
  "touchstart",
  "pointerover",
  "pointerenter",
  "pointerdown",
  "pointermove",
  "pointerup",
  "pointercancel",
  "pointerout",
  "pointerleave",
  "gotpointercapture",
  "lostpointercapture"
];
function forwardEventsBuilder(component, additionalEvents = []) {
  const events = [
    ...nativeEvents,
    ...additionalEvents
  ];
  function forward(e) {
    bubble(component, e);
  }
  return (node) => {
    const destructors = [];
    for (let i = 0; i < events.length; i++) {
      destructors.push(listen(node, events[i], forward));
    }
    return {
      destroy: () => {
        for (let i = 0; i < destructors.length; i++) {
          destructors[i]();
        }
      }
    };
  };
}
const Inline_svg = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["src", "transformSrc"]);
  createEventDispatcher();
  forwardEventsBuilder(get_current_component());
  let { src } = $$props;
  let { transformSrc = (svg) => svg } = $$props;
  let svgAttrs = {};
  let svgContent;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.transformSrc === void 0 && $$bindings.transformSrc && transformSrc !== void 0)
    $$bindings.transformSrc(transformSrc);
  return `<svg${spread([
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(svgAttrs),
    escape_object($$restProps),
    { contenteditable: "true" }
  ], {})}>${(($$value) => $$value === void 0 ? `` : $$value)(svgContent)}</svg>`;
});
export { Inline_svg as I };
