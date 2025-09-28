import { TechUser } from "@/types/Tech";
import moment from "moment";
import styles from "./style.module.less";
const ReserveTag = ({ techuser }: { techuser: TechUser }) => {
  const { worktime, workdate } = techuser;
  const isAvailable = () => {
    return (
      workdate &&
      worktime &&
      moment(`${workdate} ${worktime}`).diff(moment(), "days") <= 1
    );
  };
  const renderReserveTime = () => {
    if (isAvailable()) {
      return moment(worktime, "HH:mm:ss").format("HH:mm");
    }
    return "休息中";
  };

  return (
    <div className={styles.worktime}>
      <div className={styles.worktime_title}>最早可约</div>
      <div
        className={
          isAvailable()
            ? styles.worktime_content_success
            : styles.worktime_content_fail
        }
      >
        {renderReserveTime()}
      </div>
    </div>
  );
};
export default ReserveTag;
