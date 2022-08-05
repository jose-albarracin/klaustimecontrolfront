import { b as get_store_value, c as create_ssr_component, f as add_attribute, a as subscribe, d as escape, v as validate_component } from "../../chunks/index-e5aafa9e.js";
import { u as user } from "../../chunks/login-bcf9c6e3.js";
import { f as fetchHour, t as totalHoursWorked, b as fetchEmployeesHoursWeekly, d as fetchTeamHoursWeekly, e as fetchTotalEmployeesWeekly } from "../../chunks/hours-c97f14ea.js";
import { l as loading, a as apiBackend } from "../../chunks/general-ae01896e.js";
import "chart.js/auto/auto.js";
import "chartjs-plugin-style";
import { DateTime } from "luxon";
const fetchEmployeeProfile = async () => {
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
  let body = userStore.body;
  const url = `${apiBackend}/api/employees/${body._id}`;
  const res = await fetch(url, config);
  const data = await res.json();
  if (res.ok) {
    loading.set(false);
  }
  return data["Employee"];
};
const ChartJS = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { dataLabelsAndData } = $$props;
  let { type } = $$props;
  let { chartID } = $$props;
  let { title } = $$props;
  let { percentage } = $$props;
  let { push } = $$props;
  if ($$props.dataLabelsAndData === void 0 && $$bindings.dataLabelsAndData && dataLabelsAndData !== void 0)
    $$bindings.dataLabelsAndData(dataLabelsAndData);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.chartID === void 0 && $$bindings.chartID && chartID !== void 0)
    $$bindings.chartID(chartID);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.percentage === void 0 && $$bindings.percentage && percentage !== void 0)
    $$bindings.percentage(percentage);
  if ($$props.push === void 0 && $$bindings.push && push !== void 0)
    $$bindings.push(push);
  return `<canvas${add_attribute("id", chartID, 0)} style="${"width: inherit;"}"></canvas>`;
});
const ChartJsGroups = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { dataLabelsAndData } = $$props;
  let { type } = $$props;
  let { chartID } = $$props;
  let { percentage } = $$props;
  let { push } = $$props;
  if ($$props.dataLabelsAndData === void 0 && $$bindings.dataLabelsAndData && dataLabelsAndData !== void 0)
    $$bindings.dataLabelsAndData(dataLabelsAndData);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.chartID === void 0 && $$bindings.chartID && chartID !== void 0)
    $$bindings.chartID(chartID);
  if ($$props.percentage === void 0 && $$bindings.percentage && percentage !== void 0)
    $$bindings.percentage(percentage);
  if ($$props.push === void 0 && $$bindings.push && push !== void 0)
    $$bindings.push(push);
  return `<canvas${add_attribute("id", chartID, 0)} style="${"width: inherit;"}"></canvas>`;
});
let yearNumber = DateTime.now().year;
let weekNumber = DateTime.now().weekNumber;
let dataWeekly = (res) => {
  const dt = DateTime.fromObject({
    weekYear: yearNumber,
    weekNumber
  });
  const dateFromStr = dt.startOf("week");
  let days = [];
  for (let i = 0; i <= 6; i++) {
    let dateCurrent = dateFromStr.plus({ days: i });
    let dateCurrentFormated = dateCurrent.toFormat("yyyy-MM-dd");
    let value = 0;
    let count = 0;
    while (count < res.length) {
      let dateResCurrent = new Date(res[count].createdAt).toISOString().split("T")[0];
      if (dateResCurrent == dateCurrentFormated) {
        value = res[count].hours_worked ? res[count].hours_worked : 0;
        break;
      } else {
        value = 0;
        count++;
      }
    }
    days[i] = {
      weekDay: dateCurrent.weekdayShort,
      hoursWorked: value
    };
  }
  let labels = days.filter((item) => item.weekDay !== "Sun" && item.weekDay !== "Sat").map((item) => {
    return item.weekDay;
  });
  let data = days.filter((item) => item.weekDay !== "Sun" && item.weekDay !== "Sat").map((item) => {
    return item.hoursWorked;
  });
  return { labels, data };
};
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $totalHoursWorked, $$unsubscribe_totalHoursWorked;
  let $user, $$unsubscribe_user;
  $$unsubscribe_totalHoursWorked = subscribe(totalHoursWorked, (value) => $totalHoursWorked = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  let userStore = get_store_value(user);
  let isAdmin = void 0;
  let isSuperAdmin = void 0;
  let yearNumber2 = DateTime.now().year;
  let weekNumber2 = DateTime.now().weekNumber;
  let month = DateTime.now().month;
  let daysInMonth = DateTime.now().daysInMonth;
  let percentageYear = 0;
  let percentageToday = 0;
  let percentageWeek = 0;
  let percentageMonth = 0;
  let hoursToday = 0;
  let hoursWeek = 0;
  let hoursMonth = 0;
  let currentData;
  let currentDataTeam;
  let currentDataTotalEmployees;
  let dataHoursYear;
  let dataHoursToday;
  let dataHoursWeek;
  let dataHoursMonth;
  let dataHoursWeekly;
  let dataTeamHoursWeekly;
  let dataTotalEmployeesWeekly;
  let isTask = {};
  let allDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const dt = DateTime.fromObject({ year: yearNumber2, month, day: i });
    allDays[i] = { day: dt.day, dayName: dt.weekdayLong };
  }
  let bussinesDays = allDays.filter((item) => item.dayName !== "Sunday" && item.dayName !== "Saturday");
  dataHoursYear = async () => {
    let res = await fetchEmployeeProfile();
    let hoursExpected = await res.hour_expected;
    let hoursTotal = $totalHoursWorked;
    let start = hoursTotal / hoursExpected * 100 > 100 ? 100 : Math.round(hoursTotal / hoursExpected * 100);
    percentageYear = start;
    let end = 100 - start;
    let labels = ["start", "end"];
    let data = [start, end];
    return { labels, data };
  };
  dataHoursToday = async () => {
    let res = await fetchHour();
    let hoursExpected = 8;
    let registers = res ? await res.Registers : void 0;
    console.log("registers ", registers);
    let labels = ["start", "end"];
    let data = [];
    let results = registers ? registers.map((item) => {
      let now = DateTime.now().toFormat("yyyy-MM-dd");
      let dateCurrent = DateTime.fromISO(item.createdAt).toUTC().toFormat("yyyy-MM-dd");
      if (now == dateCurrent) {
        return item.hours_worked;
      }
      return 0;
    }).reduce((a, b) => a + b) : 0;
    hoursToday = results;
    let start = results / hoursExpected * 100 > 100 ? 100 : Math.round(results / hoursExpected * 100);
    let end = 100 - start;
    percentageToday = start;
    data = [start > 100 ? 100 : start, end];
    return { labels, data };
  };
  dataHoursWeek = async () => {
    let res = await fetchHour();
    let hoursExpected = 8 * 5;
    let registers = res ? await res.Registers : void 0;
    const dt = DateTime.fromObject({ weekYear: yearNumber2, weekNumber: weekNumber2 });
    const dateFromStr = dt.startOf("week");
    const dateToStr = dt.endOf("week");
    let results = registers ? registers.filter((item) => {
      let dateCurrent = DateTime.fromISO(item.createdAt);
      if (dateCurrent >= dateFromStr && dateCurrent <= dateToStr) {
        return item;
      }
    }).map((item) => item.hours_worked).reduce((a, b) => a + b, 0) : 0;
    hoursWeek = results;
    let start = results / hoursExpected * 100 > 100 ? 100 : Math.round(results / hoursExpected * 100);
    let end = 100 - start;
    percentageWeek = start;
    let labels = ["start", "end"];
    let data = [start, end];
    return { labels, data };
  };
  dataHoursMonth = async () => {
    let res = await fetchHour();
    let hoursExpected = 8 * bussinesDays.length;
    let registers = res ? await res.Registers : void 0;
    const dt = DateTime.fromObject({ year: yearNumber2, month });
    const dateFromStr = dt.startOf("month");
    const dateToStr = dt.endOf("month");
    let results = registers ? registers.filter((item) => {
      let dateCurrent = DateTime.fromISO(item.createdAt);
      if (dateCurrent >= dateFromStr && dateCurrent <= dateToStr) {
        return item;
      }
    }).map((item) => item.hours_worked).reduce((a, b) => a + b, 0) : 0;
    hoursMonth = results;
    let start = results / hoursExpected * 100 > 100 ? 100 : Math.round(results / hoursExpected * 100);
    let end = 100 - start;
    percentageMonth = start;
    let labels = ["start", "end"];
    let data = [start, end];
    return { labels, data };
  };
  dataHoursWeekly = async () => {
    let res = await fetchEmployeesHoursWeekly();
    let results = dataWeekly(res);
    return {
      labels: results.labels,
      data: results.data
    };
  };
  dataTeamHoursWeekly = async () => {
    let res1 = await fetchTeamHoursWeekly();
    let dataResults = await res1.employeesTeam;
    let array2 = [];
    dataResults.forEach((element) => {
      let res = element.registersHours;
      let results = dataWeekly(res);
      array2.push({
        labels: results.labels,
        data: results.data,
        title: element.first_name
      });
    });
    return array2;
  };
  dataTotalEmployeesWeekly = async () => {
    let dataResults = await fetchTotalEmployeesWeekly();
    console.log("dataResults", dataResults);
    let array2 = [];
    dataResults.forEach((element) => {
      let res = element.registersHours;
      let results = dataWeekly(res);
      array2.push({
        labels: results.labels,
        data: results.data,
        title: element.employee.first_name
      });
    });
    return array2;
  };
  {
    fetchHour();
  }
  {
    {
      userStore = get_store_value(user);
      if (userStore) {
        const roles = userStore.body.roles;
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "user")
            ;
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
  {
    {
      if (!isSuperAdmin) {
        if (isAdmin) {
          currentDataTeam = {
            data: dataTeamHoursWeekly(),
            week: true,
            nameData: "weeklyTeam"
          };
        }
        currentData = { data: dataHoursWeekly(), week: true };
      } else {
        currentDataTotalEmployees = {
          data: dataTotalEmployeesWeekly(),
          week: true,
          nameData: "weeklyTotalEmployees"
        };
      }
    }
  }
  $$unsubscribe_totalHoursWorked();
  $$unsubscribe_user();
  return `<div class="${"container md:max-w-5xl h-max px-4 mx-auto py-6"}"><div class="${"flex justify-center md:justify-start mt-12 mb-6 pb-6 border-b-[1px] border-tertiary/30"}"><h1 class="${"text-secondary text-3xl font-bold"}">Welcome, <span>${escape("")}</span> !
		</h1></div>

	${!isSuperAdmin ? `<div class="${"grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-x-8 pb-6"}"><div class="${"col-span-1 md:col-span-6 lg:col-span-12 mb-4"}"><h2 class="${"text-secondary text-xl font-bold md:mb-0"}">Overview</h2></div>
			<div class="${"col-span-1 md:col-span-3 bg-white w-full flex items-center justify-center rounded-xl shadow-lg p-6 mb-4"}"><div class="${"w-4/12 lg:w-[50px] h-fit relative"}">${validate_component(ChartJS, "ChartJS").$$render($$result, {
    chartID: "percentageToday",
    percentage: true,
    type: "doughnut",
    dataLabelsAndData: { data: dataHoursToday(), week: false },
    title: "percentageToday"
  }, {}, {})}

					<div${add_attribute("class", `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-end select-none  ${percentageToday >= 0 && percentageToday <= 25 ? "text-carnation" : percentageToday >= 26 && percentageToday <= 50 ? "text-yellow-orange" : percentageToday >= 51 && percentageToday <= 75 ? "text-primary" : "text-jungle-green"}`, 0)}><p class="${"text-[1.2rem] md:text-[0.7rem] lg:text-[0.7rem] font-bold t"}">${escape(percentageToday)}</p>
						<p class="${"text-[0.7rem] md:text-[0.4rem] lg:text-[0.4rem] pb-[0.10rem]"}">%</p></div></div>
				<div class="${"flex flex-col ml-4"}"><span class="${"text-xl md:text-sm text-tertiary font-medium"}">Total Today </span>
					<p class="${"text-3xl md:text-2xl font-bold text-secondary"}">${escape(hoursToday)}h</p></div></div>
			<div class="${"col-span-1 md:col-span-3 bg-white w-full flex items-center justify-center rounded-xl shadow-lg p-6 mb-4"}"><div class="${"w-4/12 lg:w-[50px] h-fit relative"}">${validate_component(ChartJS, "ChartJS").$$render($$result, {
    chartID: "percentageWeek",
    percentage: true,
    type: "doughnut",
    dataLabelsAndData: { data: dataHoursWeek(), week: false },
    title: "percentageToday"
  }, {}, {})}

					<div${add_attribute("class", `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-end select-none  ${percentageWeek >= 0 && percentageWeek <= 25 ? "text-carnation" : percentageWeek >= 26 && percentageWeek <= 50 ? "text-yellow-orange" : percentageWeek >= 51 && percentageWeek <= 75 ? "text-primary" : "text-jungle-green"}`, 0)}><p class="${"text-[1.2rem] md:text-[0.7rem] lg:text-[0.7rem] font-bold "}">${escape(percentageWeek)}</p>
						<p class="${"text-[0.7rem] md:text-[0.4rem] lg:text-[0.4rem] pb-[0.10rem] "}">%</p></div></div>
				<div class="${"flex flex-col ml-4"}"><span class="${"text-xl md:text-sm text-tertiary font-medium"}">Total Week </span>
					<p class="${"text-3xl md:text-2xl font-bold text-secondary"}">${escape(hoursWeek)}h</p></div></div>
			<div class="${"col-span-1 md:col-span-3 bg-white w-full flex items-center justify-center rounded-xl shadow-lg p-6 mb-4"}"><div class="${"w-4/12 lg:w-[50px] relative"}">${validate_component(ChartJS, "ChartJS").$$render($$result, {
    chartID: "percentageMoth",
    percentage: true,
    type: "doughnut",
    dataLabelsAndData: { data: dataHoursMonth(), week: false },
    title: "percentageToday"
  }, {}, {})}

					<div${add_attribute("class", `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-end select-none ${percentageMonth >= 0 && percentageMonth <= 25 ? "text-carnation" : percentageMonth >= 26 && percentageMonth <= 50 ? "text-yellow-orange" : percentageMonth >= 51 && percentageMonth <= 75 ? "text-primary" : "text-jungle-green"}`, 0)}><p class="${"text-[1.2rem] md:text-[0.7rem] lg:text-[0.7rem] font-bold "}">${escape(percentageMonth)}</p>
						<p class="${"text-[0.7rem] md:text-[0.4rem] lg:text-[0.4rem] pb-[0.10rem] "}">%</p></div></div>
				<div class="${"flex flex-col ml-4"}"><span class="${"text-xl md:text-sm text-tertiary font-medium"}">Total Month </span>
					<p class="${"text-3xl md:text-2xl font-bold text-secondary"}">${escape(hoursMonth)}h</p></div></div>

			<div class="${"col-span-1 md:col-span-3 bg-white w-full flex items-center justify-center rounded-xl shadow-lg p-6 mb-4"}"><div class="${"w-4/12 lg:w-[50px] h-fit relative"}">${validate_component(ChartJS, "ChartJS").$$render($$result, {
    chartID: "percentageYear",
    percentage: true,
    type: "doughnut",
    dataLabelsAndData: { data: dataHoursYear(), week: false },
    title: "percentageToday"
  }, {}, {})}

					<div${add_attribute("class", `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-end select-none ${percentageYear >= 0 && percentageYear <= 25 ? "text-carnation" : percentageYear >= 26 && percentageYear <= 50 ? "text-yellow-orange" : percentageYear >= 51 && percentageYear <= 75 ? "text-primary" : "text-jungle-green"}`, 0)}><p class="${"text-[1.2rem] md:text-[0.7rem] lg:text-[0.7rem] font-bold "}">${escape(percentageYear)}</p>
						<p class="${"text-[0.7rem] md:text-[0.4rem] lg:text-[0.4rem] pb-[0.1rem]"}">%</p></div></div>
				<div class="${"flex flex-col ml-4"}"><span class="${"text-xl md:text-sm text-tertiary font-medium"}">Total year </span>
					<p class="${"text-3xl md:text-2xl font-bold text-secondary"}">${escape($totalHoursWorked)}h</p></div></div></div>

		<div class="${"w-full bg-white rounded-xl p-6 flex flex-col items-center justify-center mb-12 shadow-lg"}"><h2 class="${"text-secondary text-center text-xl font-bold pb-4"}">Currently Assigned Task</h2>
			${isTask ? `<div><p class="${"text-primary text-center font-semibold text-base pb-2"}">${escape(isTask.title ? isTask.title : "")}</p>
					<p class="${"text-tertiary text-center font-semibold text-sm pb-2"}">Description:</p>
					<p class="${"text-tertiary text-center font-medium text-sm pb-2"}">${escape(isTask.description ? isTask.description : "")}</p>
					<div class="${"flex flex-col md:flex-row gap-x-3"}"><p class="${"text-primary text-center font-bold text-sm pb-2"}">Start:\xA0
							<span class="${"text-tertiary text-center font-medium text-sm pb-2"}">${escape(isTask.start ? new Date(isTask.start).toISOString().split("T")[0] : "")}</span></p>
						<p class="${"text-primary text-center font-bold text-sm pb-2"}">End:\xA0
							<span class="${"text-tertiary text-center font-medium text-sm pb-2"}">${escape(isTask.end ? new Date(isTask.end).toISOString().split("T")[0] : "")}</span></p></div></div>` : `<div class="${"flex justify-center"}"><p class="${"text-tertiary text-center font-medium text-sm pb-2"}">You have no assigned tasks
					</p></div>`}</div>

		<div class="${"w-full bg-white rounded-xl p-6 flex flex-col items-center justify-center mb-6 shadow-lg"}"><div class="${"w-full md:w-11/12"}"><div class="${"flex flex-col md:flex-row justify-between items-center relative"}"><h2 class="${"text-secondary text-xl font-bold mb-4 "}">My Hours</h2>
					<div class="${"flex gap-x-1 justify-end mb-4 bg-selago rounded-md w-fit p-1 "}"><button${add_attribute("class", `select-none  rounded-md px-4 py-1 text-[0.8rem] font-semibold  ${"bg-white text-primary shadow-sm"}`, 0)}>Weekly
						</button>
						<button${add_attribute("class", `select-none  rounded-md px-4 py-1 text-[0.8rem] font-semibold  ${"text-tertiary"}`, 0)}>Monthly
						</button>
						<button${add_attribute("class", `select-none  rounded-md px-4 py-1 text-[0.8rem] font-semibold  ${"text-tertiary"}`, 0)}>Yearly
						</button></div></div>

				${validate_component(ChartJS, "ChartJS").$$render($$result, {
    chartID: "myHoursEmployee",
    type: "line",
    dataLabelsAndData: currentData,
    push: true,
    title: "My Hours"
  }, {}, {})}</div></div>
		${$user.body.teamAdmin ? `<div class="${"w-full bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center mt-12 mb-6"}">
				<div class="${"w-full md:w-11/12"}"><div class="${"flex flex-col md:flex-row justify-between items-center relative"}"><h2 class="${"text-secondary text-xl font-bold text-left mb-4 "}">Team Hours</h2>
						<div class="${"flex gap-x-1 justify-end mb-4 bg-selago rounded-md w-fit p-1 "}"><button${add_attribute("class", `select-none  rounded-md px-4 py-1 text-[0.8rem] font-semibold  ${currentDataTeam.nameData == "weeklyTeam" ? "bg-white text-primary shadow-sm" : "text-tertiary"}`, 0)}>Weekly
							</button>
							<button${add_attribute("class", `select-none  rounded-md px-4 py-1 text-[0.8rem] font-semibold  ${currentDataTeam.nameData == "monthlyTeam" ? "bg-white text-primary shadow-sm" : "text-tertiary"}`, 0)}>Monthly
							</button>
							<button${add_attribute("class", `select-none  rounded-md px-4 py-1 text-[0.8rem] font-semibold  ${currentDataTeam.nameData == "yearlyTeam" ? "bg-white text-primary shadow-sm" : "text-tertiary"}`, 0)}>Yearly
							</button></div></div>
					${validate_component(ChartJsGroups, "ChartJsGroups").$$render($$result, {
    chartID: "myHoursTeam",
    push: true,
    type: "line",
    dataLabelsAndData: currentDataTeam
  }, {}, {})}</div></div>` : ``}` : `<div class="${"w-full bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center mb-6"}"><div class="${"w-full md:w-11/12"}"><div class="${"flex flex-col md:flex-row justify-between items-center relative"}"><h2 class="${"text-secondary text-xl font-bold text-left mb-4 "}">Employees Hours</h2>
					<div class="${"flex gap-x-1 justify-end mb-4 bg-selago rounded-md w-fit p-1 "}"><button${add_attribute("class", `select-none  rounded-md px-4 py-1 text-[0.8rem] font-semibold  ${currentDataTotalEmployees.nameData == "weeklyTotalEmployees" ? "bg-white text-primary shadow-sm" : "text-tertiary"}`, 0)}>Weekly
						</button>
						<button${add_attribute("class", `select-none  rounded-md px-4 py-1 text-[0.8rem] font-semibold  ${currentDataTotalEmployees.nameData == "monthlyTotalEmployees" ? "bg-white text-primary shadow-sm" : "text-tertiary"}`, 0)}>Monthly
						</button>
						<button${add_attribute("class", `select-none  rounded-md px-4 py-1 text-[0.8rem] font-semibold  ${currentDataTotalEmployees.nameData == "yearlyTotalEmployees" ? "bg-white text-primary shadow-sm" : "text-tertiary"}`, 0)}>Yearly
						</button></div></div>
				${validate_component(ChartJsGroups, "ChartJsGroups").$$render($$result, {
    chartID: "myHoursEmployees",
    type: "line",
    push: true,
    dataLabelsAndData: currentDataTotalEmployees
  }, {}, {})}</div></div>`}</div>
`;
});
export { Routes as default };
