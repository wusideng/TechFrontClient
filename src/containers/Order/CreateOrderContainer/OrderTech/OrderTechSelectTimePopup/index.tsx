import { getWorktimeBlockApi } from "@/api/orderApi";
import { Grid, Popup, Tabs } from "antd-mobile";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styles from "./style.module.less";
import { TechWorktime } from "@/types/TechWorktime";
import { useAppSelector } from "@/store";

const convertSlotidToTime = (slot_id: number): string => {
  // 假设slot_id 1对应00:00，2对应00:30...
  const totalMinutes =
    Math.floor((slot_id - 1) / 2) * 60 + ((slot_id - 1) % 2) * 30;
  return moment().startOf("day").add(totalMinutes, "minutes").format("HH:mm");
};
const getDateDescription = (date: string): string => {
  if (moment(date).isSame(moment(), "day")) {
    return "今天";
  } else if (moment(date).isSame(moment().add(1, "day"), "day")) {
    return "明天";
  } else if (moment(date).isSame(moment().add(2, "day"), "day")) {
    return "后天";
  } else {
    return "";
  }
};

const OrderTechSelectTimePopup = ({
  showPopup,
  onCancel,
  onConfirm,
}: {
  showPopup: boolean;
  onCancel: () => void;
  onConfirm: (workdate: string, worktime: string) => void;
}) => {
  const [worktimesInDates, setWorktimesInDates] = useState<
    {
      date: string;
      slots: TechWorktime[];
    }[]
  >([]);
  const { newOrder } = useAppSelector((state) => state.order);
  const isCurrentTime = (date: string, time: string) => {
    if (!newOrder.tech?.workdate || !newOrder.tech?.worktime) {
      return false;
    }

    const currentDateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");
    const selectedDateTime = moment(
      `${newOrder.tech.workdate} ${newOrder.tech.worktime}`,
      "YYYY-MM-DD HH:mm"
    );

    return currentDateTime.isSame(selectedDateTime);
  };
  useEffect(() => {
    const init = async () => {
      const tech_openid = newOrder.tech.openid;
      const result = await getWorktimeBlockApi(tech_openid);
      let res;
      if (result.length === 0) {
        res = generateEmptyWorktime(tech_openid);
      } else {
        res = result;
      }

      //将res按照日期分组
      const worktimesInDates = res.reduce((acc, item) => {
        const dateKey = item.work_date;
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        if (
          moment(
            `${item.work_date} ${convertSlotidToTime(item.slot_id)}`
          ).isAfter(moment())
        ) {
          acc[dateKey].push(item);
        }
        return acc;
      }, {});
      const worktimesInDatesArray = Object.keys(worktimesInDates)
        .map((date) => ({
          date,
          slots: worktimesInDates[date],
        }))
        .sort((a, b) => moment(a.date).diff(moment(b.date)));
      setWorktimesInDates(worktimesInDatesArray);
    };
    init();
  }, []);
  return (
    <Popup
      destroyOnClose={true}
      className={styles.select_worktime_popup}
      visible={showPopup}
      onMaskClick={() => {
        onCancel();
      }}
      bodyStyle={{
        height: "50vh",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        // minHeight: "40vh",
      }}
    >
      <div className={styles.booktime}>请选择预约时间</div>
      <Tabs defaultActiveKey={"0"}>
        {worktimesInDates.map((workTimeInDate, index1) => {
          return (
            <Tabs.Tab
              title={`${moment(workTimeInDate.date).format(
                "MM-DD"
              )}（${getDateDescription(workTimeInDate.date)}）`}
              key={index1.toString()}
            >
              <Grid columns={4}>
                {workTimeInDate.slots.map((item, index2) => (
                  <Grid.Item key={index1.toString() + index2.toString()}>
                    <div
                      className={styles.worktime_block}
                      onClick={() => {
                        if (item.active == 1) {
                          onConfirm(
                            item.work_date,
                            convertSlotidToTime(item.slot_id)
                          );
                        }
                      }}
                    >
                      <div
                        className={
                          styles.time_slot +
                          (item.active == 1 ? "" : ` ${styles.disabled}`) +
                          (isCurrentTime(
                            item.work_date,
                            convertSlotidToTime(item.slot_id)
                          )
                            ? ` ${styles.current}`
                            : "")
                        }
                      >
                        {convertSlotidToTime(item.slot_id)}
                      </div>
                    </div>
                  </Grid.Item>
                ))}
              </Grid>
            </Tabs.Tab>
          );
        })}
      </Tabs>
    </Popup>
  );
};
export default OrderTechSelectTimePopup;
const generateEmptyWorktime = (tech_userid): TechWorktime[] => {
  const currentDate = moment().format("YYYY-MM-DD");
  const worktime: TechWorktime[] = [];
  for (let day = 0; day < 3; day++) {
    const workdate = moment(currentDate).add(day, "days").format("YYYY-MM-DD");
    for (let i = 1; i <= 24 * 2; i++) {
      worktime.push({
        slot_id: i,
        active: 0,
        work_date: workdate,
        tech_user_id: tech_userid,
      });
    }
  }
  return worktime;
};
