import { Image } from "antd-mobile";;
import { useNavigate } from "react-router-dom";
import styles from "./style.module.less";
import { isLogin } from "@/util/utils";

const TechPhotoFrame = ({
    techuser,
    images,
    user,
    baseUrl,
    setImageVisible,
    // 其他自定义props
  }) => {
    const navigate = useNavigate();
    if (techuser.is_new_tech)
      return (
        <div
          style={{
            position: "relative",
            width: 85,
            height: 85,
            backgroundImage: `url(${techuser.photo_work})`,
            backgroundSize: "cover",
            borderRadius: "50%",
            padding: 4,
          }}
        >
          <Image
            src={images[0].src}
            width="100px"
            height="100px"
            fit="cover"
            style={{
              borderRadius: "50%",
              marginLeft: "-7px",
              marginTop: "-7px",
              border: user.is_new_tech ? "2px solid gold" : "none", // 示例：新技师加金色边框
            }}
            onClick={(event) => {
              if (!isLogin(user)) {
                navigate(`/${baseUrl}/login`);
              } else {
                event.stopPropagation();
                setImageVisible(true);
              }
            }}
          />
        </div>
      );
    else if (techuser.follow_count > 0)
      return (
        <div
          style={{
            position: "relative",
            width: 85,
            height: 85,
            backgroundImage: `url(${techuser.photo_work})`,
            backgroundSize: "cover",
            borderRadius: "50%",
            padding: 4,
          }}
        >
          <Image
            src={images[1].src}
            width="100px"
            height="100px"
            fit="cover"
            style={{
              borderRadius: "50%",
              marginLeft: "-7px",
              marginTop: "-7px",
              border: user.is_new_tech ? "2px solid gold" : "none", // 示例：新技师加金色边框
            }}
            onClick={(event) => {
              if (!isLogin(user)) {
                navigate(`/${baseUrl}/login`);
              } else {
                event.stopPropagation();
                setImageVisible(true);
              }
            }}
          />
        </div>
      );
    else
      return (
        <div className={styles.tech_item_card_content_left}>
          {/* todo 删掉border，把照片背景换掉 */}
          <Image
            src={techuser.photo_work}
            width={85}
            height={85}
            fit="fill"
            style={{ borderRadius: "50%" }}
            onClick={(event) => {
              if (!isLogin(user)) {
                navigate(`/${baseUrl}/login`);
              } else {
                event.stopPropagation();
                setImageVisible(true);
              }
            }}
          />
        </div>
      );
  };
  
  export default TechPhotoFrame;