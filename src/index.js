import moment from "moment";

// these are passed by the contract and walkthrough
let contractStartDate = moment().add(2, "days");
let contractEndDate = moment(contractStartDate).add(1, "years");
let contractFrequency = ["mon", "wed", "fri"];

const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const getDayIndex = day => daysOfWeek.findIndex(d => d === day);
const calculateDate = day => moment().add(day, "days");

const createSchedule = (start, end, frequency, schedule = []) => {
  if (moment(start).toDate() >= moment(end).toDate()) {
    return schedule;
  }

  let week = frequency
    .map(day => getDayIndex(day))
    .map(i => moment(calculateDate(i + moment(start).weekday())).toDate());

  return createSchedule(
    moment(start).add(7, "days"),
    end,
    frequency,
    schedule.concat(week)
  );
};

let result = createSchedule(
  contractStartDate,
  contractEndDate,
  contractFrequency
);

document.getElementById("app").innerHTML = `
<h1>Hello Parcel!</h1>
<div>
  Look
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>
  for more info about Parcel.
  ${result.map(r => `<p>${r}</p>`).join("")}
</div>
`;
