import { useRef, useState } from "react";
import { Image, Card, Divider, ImageViewer } from "antd-mobile";
import { AppOutline, EnvironmentOutline, HeartFill, HeartOutline, MessageOutline } from "antd-mobile-icons";
import { baseUrl, staticUrl } from "@/util/config";
import { useNavigate } from "react-router-dom";
import { TechUser } from "@/types/Tech";
import ReserveTag from "./ReserveTag";
import styles from "./style.module.less";
import ReserveOrderButton from "./ReserveOrderButton";
import TechPhotoFrame from "./TechPhotoFrame";
import { generateRandomScoreFromName, isLogin } from "@/util/utils";
import useTechFollow from "@/hooks/useTechFollow";
import { useAppSelector } from "@/store";

const images = [
  {
    src: `${staticUrl}/images/photoframe/cs_tech_new_green.png`,
    text: "新上技师",
  },
  {
    src: `${staticUrl}/images/photoframe/cs_tech_good_ratio.png`,
    text: "优选技师",
  },
];
const TechItemFrame = ({ techuser }: { techuser: TechUser }) => {
  const navigate = useNavigate();
  const { follow, followed, followNumber } = useTechFollow(techuser);
  const { user } = useAppSelector((state) => state.user);
  const [imageVisible, setImageVisible] = useState(false);
  const imageViewerRef = useRef(null);
  const getRate = () => {
    return generateRandomScoreFromName(techuser.user_nickname);
  };

  const turnToTechDetail = () => {
    navigate(`/${baseUrl}/tech/${techuser.user_id}`);
  };

  return (
    <Card key={techuser.user_id} onClick={() => turnToTechDetail()} className={styles.tech_item_card}>
      <div className={styles.tech_item_card_content}>
        <div className={styles.tech_item_card_content_left}>
          <TechPhotoFrame techuser={techuser} images={images} user={user} baseUrl={baseUrl} setImageVisible={setImageVisible} />
        </div>
        <div className={styles.tech_item_card_content_right}>
          <div className={styles.name_line}>
            {techuser.user_nickname}
            <div
              onClick={(event) => {
                event.stopPropagation();
                follow();
              }}
            >
              {followed ? <HeartFill fontSize={18} color={"#f85959"} /> : <HeartOutline fontSize={18} color={"var(--adm-color-weak)"} />}
            </div>
          </div>
          <div className={styles.first_line}>
            <ReserveTag techuser={techuser} />
            <div>
              <EnvironmentOutline color="var(--adm-color-weak)" fontSize={14} />
              <span className={styles.distance}>{techuser.distance.toFixed(2)}km</span>
            </div>
          </div>
          <div className={styles.line}>
            <div className={styles.line_content}>
              <AppOutline color="var(--adm-color-weak)" fontSize={14} />
              <span>商户</span>
            </div>
            <Divider
              direction="vertical"
              style={{
                borderColor: "var(--adm-color-weak)",
                margin: 0,
              }}
            />
            <div className={styles.line_content}>
              <HeartOutline color="var(--adm-color-weak)" fontSize={14} />
              <span>{followNumber}</span>
            </div>
            <Divider
              direction="vertical"
              style={{
                borderColor: "var(--adm-color-weak)",
                margin: 0,
              }}
            />
            <div className={styles.line_content}>
              <MessageOutline color="var(--adm-color-weak)" fontSize={14} />
              <span>{techuser.comment_count || 0}</span>
            </div>
          </div>
          {/* <div className={styles.line}>
            <div className={styles.line_content}>
              <RateIcon size={14} color={"#d58f41"} fill={"#fff"} />
              <span style={{ color: "#d58f41" }}>评价:{getRate()}</span>
            </div>
          </div> */}
        </div>

        <ReserveOrderButton techuser={techuser} />
      </div>
      {/* {techuser.is_new_tech ? (
        <div className={styles.new_tech_tag}>新人技师</div>
      ) : null} */}
      {/* <ImageViewer
        classNames={{
          mask: "customize-mask",
          body: "customize-body",
        }}
        image={imageUrl}
        visible={imageUrl !== null}
        onClose={() => {
          setImageUrl(null);
        }}
      /> */}
      {/* 与imageviewer不同，imageviewer.multi是个很坑的组件，这里只能这么写 */}
      <ImageViewer.Multi
        images={[techuser.photo_work, techuser.photo_life_1, techuser.photo_life_2, techuser.photo_life_3].filter(
          (p) => p !== null && p !== undefined && p !== "string" && p !== ""
        )}
        visible={imageVisible}
        defaultIndex={0}
        onClose={() => {
          setImageVisible(false);
        }}
        afterClose={() => {
          imageViewerRef.current.swipeTo(0);
        }}
        ref={imageViewerRef}
      />
    </Card>
  );
};

export default TechItemFrame;