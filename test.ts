const moment = require("moment");
const convertSlotidToTime = (slot_id: number): string => {
  // 假设slot_id 1对应00:00，2对应00:30...
  const totalMinutes =
    Math.floor((slot_id - 1) / 2) * 60 + ((slot_id - 1) % 2) * 30;
  return moment().startOf("day").add(totalMinutes, "minutes").format("HH:mm");
};
const res = [
  {
    work_time_id: 35042,
    slot_id: 47,
    active: 1,
    work_date: "2025-04-04",
    tech_user_id: "BeijingMocka",
  },
  {
    work_time_id: 35043,
    slot_id: 48,
    active: 1,
    work_date: "2025-04-04",
    tech_user_id: "BeijingMocka",
  },
  {
    work_time_id: 35043,
    slot_id: 2,
    active: 1,
    work_date: "2025-04-05",
    tech_user_id: "BeijingMocka",
  },
  {
    work_time_id: 35043,
    slot_id: 2,
    active: 1,
    work_date: "2025-04-05",
    tech_user_id: "BeijingMocka",
  },
];
const worktimesInDates = res.reduce((acc, item) => {
  const dateKey = item.work_date;
  if (!acc[dateKey]) {
    acc[dateKey] = [];
  }
  console.log(`${item.work_date} ${convertSlotidToTime(item.slot_id)}`);
  if (
    moment(`${item.work_date} ${convertSlotidToTime(item.slot_id)}`).isAfter(
      moment()
    )
  ) {
    acc[dateKey].push(item);
  }
  return acc;
}, {});
console.log(worktimesInDates);
//将worktimesInDates转换为数组形式，并按照日期排序
const worktimesInDatesArray = Object.keys(worktimesInDates)
  .map((date) => ({
    date,
    slots: worktimesInDates[date],
  }))
  .sort((a, b) => moment(a.date).diff(moment(b.date)));
console.log(worktimesInDatesArray);
