import MiddleContentTab from "@/components/layout/MiddleContentTab";
import styles from "./style.module.less";
import TechListWrapper from "./TechListWrapper";

const TechContainer = () => {
  // const loading = useAppSelector((state) => state.techuser).loading;
  return (
    <MiddleContentTab className={styles.wrapper}>
      <TechListWrapper />
    </MiddleContentTab>
  );
};

export default TechContainer;
