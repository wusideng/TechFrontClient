{
  const moment = require("moment");
  const convertSlotidToTime = (slot_id: number): string => {
    // 假设slot_id 1对应00:00，2对应00:30...
    const totalMinutes =
      Math.floor((slot_id - 1) / 2) * 60 + ((slot_id - 1) % 2) * 30;
    return moment().startOf("day").add(totalMinutes, "minutes").format("HH:mm");
  };
  for (let i = 1; i <= 48; i++) {
    console.log(convertSlotidToTime(i));
  }
}
