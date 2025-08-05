import styles from "./style.module.less";
import SuitCaseIcon from "@/lib/icons/SuitCaseIcon";
import { HeartFill, LocationFill } from "antd-mobile-icons";
const WhyUs = () => {
  return (
    <div className={styles.forbidden_desc}>
      <div className={styles.whyus_title}>为什么选择我们</div>
      <div className={styles.whyus_content_wrapper}>
        <WhyUsItem
          icon={<LocationFill fontSize={28} color="var(--adm-color-primary)" />}
          title="便捷上门服务"
          content="家中、办公室或任意场所，轻松享受专业按摩"
        />
        <WhyUsItem
          icon={
            <SuitCaseIcon
              size={28}
              color="var(--adm-color-primary)"
              fill="var(--adm-color-primary)"
            />
          }
          title="全天候专业技师"
          content="多样化选择，随时预约心仪按摩师"
        />
        <WhyUsItem
          icon={<HeartFill fontSize={28} color="var(--adm-color-primary)" />}
          title="品质有保障"
          content="严选认证技师，规范服务流程，让您安心享受高质量放松体验"
        />
      </div>
    </div>
  );
};
export default WhyUs;
const WhyUsItem = ({
  title,
  content,
  icon,
}: {
  title: string;
  content: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className={styles.whyus_item_wrapper}>
      <div className={styles.whyus_item_icon}>{icon}</div>
      <div className={styles.whyus_item}>
        <div className={styles.whyus_item_title}>{title}</div>
        <div className={styles.whyus_item_content}>{content}</div>
      </div>
    </div>
  );
};
