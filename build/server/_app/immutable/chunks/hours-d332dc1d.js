import { w as writable, u as user } from "./login-378cee40.js";
import { l as loading, a as apiBackend } from "./general-28d8188f.js";
import { b as get_store_value } from "./index-620e69df.js";
let countMyHours = writable(0);
let countTeamHours = writable(0);
let totalHoursWorked = writable(0);
const fetchHour = async () => {
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
  const url = `${apiBackend}/api/hoursWorkedEmployees/${userStore.body._id}`;
  const res = await fetch(url, config);
  const data = await res.json();
  if (data.Results[0]) {
    totalHoursWorked.set(data.Results[0].totalHoursWorked);
    countMyHours.set(data.Results[0].Registers.length);
  } else {
    totalHoursWorked.set(0);
  }
  if (res.ok) {
    loading.set(false);
  }
  return data.Results[0] ? data.Results[0] : void 0;
};
const fetchEmployeesHoursWeekly = async () => {
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
  const url = `${apiBackend}/api/hoursWorkedEmployeesRangeWeekly/${userStore.body._id}`;
  const res = await fetch(url, config);
  const data = await res.json();
  if (res.ok) {
    loading.set(false);
  }
  return data.Results;
};
const fetchTeamHoursWeekly = async () => {
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
  const url = `${apiBackend}/api/hoursWorkedTeamRangeWeekly/${userStore.body.teamAdmin}`;
  const res = await fetch(url, config);
  const data = await res.json();
  if (res.ok) {
    loading.set(false);
  }
  return data.Results[0];
};
const fetchTotalEmployeesWeekly = async () => {
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
  const url = `${apiBackend}/api/hoursWorkedTotalEmployeesWeekly`;
  const res = await fetch(url, config);
  const data = await res.json();
  if (res.ok) {
    loading.set(false);
  }
  return data.Results;
};
export {
  countTeamHours as a,
  fetchEmployeesHoursWeekly as b,
  countMyHours as c,
  fetchTeamHoursWeekly as d,
  fetchTotalEmployeesWeekly as e,
  fetchHour as f,
  totalHoursWorked as t
};
