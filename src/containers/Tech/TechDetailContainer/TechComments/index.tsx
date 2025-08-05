import PersonIcon from "@/lib/icons/PersonIcon";
import { useAppSelector } from "@/store";
import { Card, Rate } from "antd-mobile";
import moment from "moment";
import styles from "./style.module.less";
import { UserCircleOutline, UserOutline } from "antd-mobile-icons";
const TechComments = () => {
  const { techuser } = useAppSelector((state) => state.techuser);
  return (
    <>
      {techuser.comments?.map((comment, index: number) => {
        return (
          <Card className={styles.comment_card} key={index}>
            <div className={styles.comment_card_content}>
              <div className={styles.comment_line_1}>
                <div className={styles.name}>
                  <UserCircleOutline
                    fontSize={24}
                    color={"var(--adm-color-primary)"}
                  />
                  <span style={{ marginRight: 10 }}>匿名用户</span>
                </div>
                <div className={styles.comment_time}>
                  {moment(comment.client_comment_time).format("YYYY-MM-DD")}
                </div>
              </div>
              <div className={styles.comment_line_2}>
                <Rate
                  value={comment.client_score_to_tech}
                  style={{ "--star-size": "20px" }}
                />
              </div>
              <div className={styles.client_comment}>
                {comment.client_comment}
              </div>
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default TechComments;
