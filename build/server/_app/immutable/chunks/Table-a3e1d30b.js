import { c as create_ssr_component, j as createEventDispatcher, e as each, f as add_attribute, d as escape, v as validate_component } from "./index-620e69df.js";
import { I as Inline_svg } from "./inline-svg-6543f82a.js";
const Table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { results = [] } = $$props;
  let { config } = $$props;
  if ($$props.results === void 0 && $$bindings.results && results !== void 0)
    $$bindings.results(results);
  if ($$props.config === void 0 && $$bindings.config && config !== void 0)
    $$bindings.config(config);
  return `${config ? `<table class="${"table w-full "}"><tbody>${each(results, (item) => {
    return `<tr>${each(config.fields, (fields) => {
      return `<td>${fields.type === "group" ? `<div${add_attribute("class", `flex flex-col items-${fields.align ? fields.align : "start"}`, 0)}>${each(fields.keys, (subfields) => {
        return `${subfields.type === "titleHour" ? `<p class="${"text-secondary font-bold text-base"}">${escape(subfields.name)}</p>
											<p class="${"text-primary font-extrabold text-base"}">${escape(item[subfields.key])}h
											</p>` : `${subfields.type === "title" ? `<p class="${"text-secondary font-bold text-base"}">${escape(subfields.name ? subfields.name : item[subfields.key])}
											</p>` : `${subfields.type === "titleEmployeTeam" ? `<p class="${"text-secondary font-bold text-2xl mb-3 "}">${escape(`${item.first_name} ${item.last_name}`)}</p>
											<p class="${"text-primary font-bold text-2xl mb-3"}">Hours Worked:\xA0</p>
											<p class="${"text-tertiary font-bold text-4xl "}">${escape(item[subfields.key])}h
											</p>` : `${subfields.type === "titleEmployees" ? `<p class="${"text-secondary font-bold text-base"}">${escape(item.first_name)}
												${escape(item.last_name)}</p>
											<p class="${"text-tertiary font-medium text-[0.8rem]"}">${escape(item.email)}</p>` : `${subfields.type === "Date" ? `<div${add_attribute("class", `flex justify-center md:justify-${subfields.align ? subfields.align : "start"}`, 0)}><p class="${"text-primary font-bold text-[0.8rem]"}">${escape(subfields.name)}:\xA0</p>
												<p class="${"text-tertiary font-medium text-[0.8rem]"}">${escape(new Date(item[subfields.key]).toISOString().split("T")[0])}</p>
											</div>` : `${subfields.type === "Array" ? `<div${add_attribute("class", `flex justify-center md:justify-${subfields.align ? subfields.align : "start"}`, 0)}><p class="${"text-primary font-bold text-[0.8rem]"}">${escape(subfields.name)}:\xA0</p>
												<p class="${"text-tertiary font-medium text-[0.8rem]"}">${escape(item[subfields.key].map((element) => subfields.key === "team" ? element.title : element.name))}</p>
											</div>` : `${subfields.type === "joinNameAdmin" ? `<div${add_attribute("class", `flex justify-center md:justify-${subfields.align ? subfields.align : "start"}`, 0)}><p class="${"text-primary font-bold text-[0.8rem]"}">${escape(subfields.name)}:\xA0
												</p>
												<p class="${"text-tertiary font-medium text-[0.8rem]"}">${escape(`${item.admin ? item.admin.first_name : ""} ${item.admin ? item.admin.last_name : ""}`)}</p>
											</div>` : `${subfields.type === "joinNameEmployee" ? `<div${add_attribute("class", `flex justify-center md:justify-${subfields.align ? subfields.align : "start"}`, 0)}><p class="${"text-secondary font-bold text-base"}">${escape(`${item.employee ? item.employee.first_name : ""} ${item.employee ? item.employee.last_name : ""}`)}</p>
											</div>` : `${subfields.type === "joinNameEmployeeInCharged" ? `<div${add_attribute("class", `flex justify-center md:justify-${subfields.align ? subfields.align : "start"}`, 0)}><p class="${"text-primary font-bold text-[0.8rem]"}">${escape(subfields.name)}:\xA0
												</p>
												<p class="${"text-tertiary font-medium text-[0.8rem]"}">${escape(`${item.employeeInCharge ? item.employeeInCharge[0].first_name : ""} ${item.employeeInCharge ? item.employeeInCharge[0].last_name : ""}`)}</p>
											</div>` : `${subfields.type === "Hour" ? `<div${add_attribute("class", `flex justify-center md:justify-${subfields.align ? subfields.align : "start"}`, 0)}><p class="${"text-primary font-bold text-[0.8rem]"}">${escape(subfields.name)}:\xA0</p>
												<p class="${"text-tertiary font-medium text-[0.8rem]"}">${escape(item[subfields.key])}h
												</p>
											</div>` : `${subfields.type === "teamTask" ? `<div${add_attribute("class", `flex justify-center md:justify-${subfields.align ? subfields.align : "start"}`, 0)}><p class="${"text-primary font-bold text-[0.8rem] "}">${escape(subfields.name)}:\xA0<span class="${"text-tertiary font-medium text-[0.8rem]"}">${escape(item.team ? item.team.title : "")}
													</span></p>
											</div>` : `<div${add_attribute("class", `flex justify-center md:justify-${fields.align ? fields.align : "start"}`, 0)}><p class="${"text-primary font-bold text-[0.8rem] "}">${escape(subfields.name)}:\xA0<span class="${"text-tertiary font-medium text-[0.8rem]"}">${escape(item[subfields.key])}
													</span></p>
											</div>`}`}`}`}`}`}`}`}`}`}`}`;
      })}
								</div>` : `${fields.type === "Date" ? `<div${add_attribute("class", `flex justify-center md:justify-${fields.align ? fields.align : "start"}`, 0)}><p class="${"text-primary font-bold text-[0.8rem]"}">${escape(fields.name)}:\xA0</p>
									<p class="${"text-tertiary font-medium text-[0.8rem]"}">${escape(new Date(item[fields.key]).toISOString().split("T")[0])}</p>
								</div>` : `${fields.type === "Hour" ? `<div${add_attribute("class", `flex justify-center md:justify-${fields.align ? fields.align : "start"}`, 0)}><p class="${"text-primary font-bold text-[0.8rem]"}">${escape(fields.name)}:\xA0</p>
									<p class="${"text-tertiary font-medium text-[0.8rem]"}">${escape(item[fields.key])}h
									</p>
								</div>` : `${fields.type === "joinNameEmployeeInCharged" ? `<div${add_attribute("class", `flex justify-center md:justify-${fields.align ? fields.align : "start"}`, 0)}><p class="${"text-primary font-bold text-[0.8rem]"}">${escape(fields.name)}:\xA0
									</p>
									<p class="${"text-tertiary font-medium text-[0.8rem]"}">${escape(`${item.employeeInCharge[0] ? item.employeeInCharge[0].first_name : ""} ${item.employeeInCharge[0] ? item.employeeInCharge[0].last_name : ""}`)}</p>
								</div>` : `${fields.type === "twoLevels" ? `<div${add_attribute("class", `flex justify-center md:justify-${fields.align ? fields.align : "start"}`, 0)}><p class="${"text-primary font-bold text-[0.8rem] "}">${escape(fields.name)}:\xA0<span class="${"text-tertiary font-medium text-[0.8rem]"}">${escape(item[fields.key] ? item[fields.key][fields.key2] : "")}
										</span></p>
								</div>` : `<div${add_attribute("class", `flex justify-center md:justify-${fields.align ? fields.align : "start"}`, 0)}><p class="${"text-primary font-bold text-[0.8rem] "}">${escape(fields.name)}:\xA0<span class="${"text-tertiary font-medium text-[0.8rem]"}">${escape(item[fields.key])}
										</span></p>
								</div>`}`}`}`}`}
						</td>`;
    })}
					${config.actions ? `<td><div class="${"flex justify-center md:justify-end gap-x-3"}"><a${add_attribute("href", `/${config.route}/edit/${item._id}`, 0)} class="${"flex items-center justify-center cursor-pointer bg-selago text-primary px-4 py-4 rounded-full shadow-sm transition-all hover:bg-primary hover:text-white"}">${validate_component(Inline_svg, "InlineSVG").$$render(
      $$result,
      {
        class: " w-[20px] h-[20px]",
        src: "/icons/pen-to-square-solid.svg"
      },
      {},
      {}
    )}</a>
								<div class="${"flex items-center justify-center cursor-pointer bg-selago text-primary px-4 py-4 rounded-full shadow-sm transition-all hover:bg-primary hover:text-white"}">${validate_component(Inline_svg, "InlineSVG").$$render(
      $$result,
      {
        class: " w-[20px] h-[20px]",
        src: "/icons/trash-solid.svg"
      },
      {},
      {}
    )}
								</div></div>
						</td>` : ``}
				</tr>`;
  })}</tbody></table>` : ``}`;
});
export {
  Table as T
};
