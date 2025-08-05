import { useNavigate } from "react-router-dom";
import { Button, Card, Grid, Image, Badge } from "antd-mobile";
import { isDev } from "@/util/config";
import { LocationFill } from "antd-mobile-icons";
import ChatIcon from "@/lib/icons/ChatIcon";
import { baseUrl } from "@/util/config";
import MiddleContentTab from "@/components/layout/MiddleContentTab";
import {
  LocationIcon,
  FollowIcon,
  CouponIcon,
  FeedBackIcon,
  CityAgentIcon,
  TechRecruitIcon,
  WalletIcon,
  AboutUsIcon,
  SettingsIcon,
  CrownIcon,
} from "@/lib/icons";
import styles from "./style.module.less";
import { useAppSelector } from "@/store";
import { isLogin } from "@/util/utils";

const UserContainer = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  // const { address } = useAppSelector((state) => state.address);
  function turoToLogin() {
    navigate(`/${baseUrl}/login`);
  }

  function turnTodevHandler() {
    if (!isLogin(user)) {
      navigate(`/${baseUrl}/login`);
    } else {
      navigate(`/${baseUrl}/userdev`);
    }
  }

  return (
    <MiddleContentTab className={styles.user_container}>
      <div>
        <div className={styles.user_header}>
          {user.openid ? (
            <div className={styles.photo}>
              <Image
                src={user.headimgurl?.replace("https://thirdwx", "https://wx")}
                width={100}
                height={100}
                fit="fill"
              />
            </div>
          ) : (
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <Image
                onClick={turoToLogin}
                src={
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='70' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23f6f6f6'/%3E%3Ccircle cx='50' cy='42' r='16' fill='%23dadada'/%3E%3Cpath d='M50 60 C32 60 18 70 18 82 L18 100 L82 100 L82 82 C82 70 68 60 50 60 Z' fill='%23dadada'/%3E%3C/svg%3E"
                }
                width={70}
                height={70}
                fit="fill"
              />
            </div>
          )}

          <div className={styles.control}>
            {user.openid && (
              <>
                <div className={styles.user_name}>{user.user_nickname}</div>
                <div className={styles.phone}>
                  {user.user_phone?.replace(
                    /(\d{3})(\d{4})(\d{4})/,
                    "$1****$3"
                  )}
                </div>
                <div className={styles.user_class}>
                  <CrownIcon
                    size={16}
                    color={"var(--adm-color-primary)"}
                    fill={"white"}
                  />
                  <span>当前等级：{"青铜"}</span>
                </div>
              </>
            )}

            {/* <p>联系方式:{user.user_phone}</p>
            <p>所在城市:{address.city}</p> */}
            {!user.openid ? (
              <Button
                color="primary"
                style={{
                  marginTop: 10,
                  fontWeight: "bold",
                  color: "black",
                  background: "transparent",
                }}
                // size="mini"
                onClick={turoToLogin}
              >
                登录/注册
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <Card title={"达元信息"} className={`${styles.user_card}`}>
        <Grid columns={3} gap={8}>
          <Grid.Item>
            <div
              className="userCardItem"
              onClick={() => {
                navigate(`/${baseUrl}/user/coupon`);
              }}
            >
              <CouponIcon
                size={24}
                color={"var(--adm-color-primary)"}
                fill={"white"}
              />
              <p>优惠券</p>
            </div>
          </Grid.Item>
          <Grid.Item>
            <div
              className="userCardItem"
              onClick={() => {
                navigate(`/${baseUrl}/user/address`);
              }}
            >
              <LocationIcon
                size={24}
                color={"var(--adm-color-primary)"}
                fill={"white"}
              />
              <p>地址管理</p>
            </div>
          </Grid.Item>
          <Grid.Item>
            <div
              className="userCardItem"
              onClick={() => {
                navigate(`/${baseUrl}/user/follows`);
              }}
            >
              <FollowIcon
                size={24}
                color={"var(--adm-color-primary)"}
                fill={"white"}
              />
              <p>关注</p>
            </div>
          </Grid.Item>
        </Grid>
      </Card>
      <Card title={"常用工具"} className={`${styles.user_card}`}>
        <Grid columns={4} gap={8}>
          <Grid.Item>
            <div
              className="userCardItem"
              onClick={() => {
                navigate(`/${baseUrl}/feedback`);
              }}
            >
              <FeedBackIcon
                size={24}
                color={"var(--adm-color-primary)"}
                fill={"white"}
              />
              <p>意见反馈</p>
            </div>
          </Grid.Item>
          <Grid.Item>
            <div
              className="userCardItem"
              onClick={() => {
                navigate(`/${baseUrl}/partnerRecruit`);
              }}
            >
              <CityAgentIcon
                size={24}
                color={"var(--adm-color-primary)"}
                fill={"white"}
              />
              <p>城市代理</p>
            </div>
          </Grid.Item>
          <Grid.Item
            onClick={() => {
              navigate(`/${baseUrl}/techRecruit`);
            }}
          >
            <div className="userCardItem">
              <TechRecruitIcon
                size={24}
                color={"var(--adm-color-primary)"}
                fill={"white"}
              />
              <p>技师招募</p>
            </div>
          </Grid.Item>
          {/* <Grid.Item>
            <div className="userCardItem">
              <WalletIcon
                size={24}
                color={"var(--adm-color-primary)"}
                fill={"white"}
              />
              <p className="disabled">领券中心</p>
            </div>
          </Grid.Item> */}
          <Grid.Item>
            <div
              className="userCardItem"
              onClick={() => {
                navigate(`/${baseUrl}/user/aboutus`);
              }}
            >
              <AboutUsIcon
                size={24}
                color={"var(--adm-color-primary)"}
                fill={"white"}
              />
              <p>关于我们</p>
            </div>
          </Grid.Item>
          <Grid.Item>
            <div
              className="userCardItem"
              onClick={() => {
                navigate(`/${baseUrl}/chat`);
              }}
            >
              <ChatIcon
                size={24}
                color={"var(--adm-color-primary)"}
                fill={"white"}
              />
              <p>联系客服</p>
            </div>
          </Grid.Item>
          <Grid.Item>
            <div
              className="userCardItem"
              onClick={() => {
                navigate(`/${baseUrl}/user/settings`);
              }}
            >
              <SettingsIcon
                size={24}
                color={"var(--adm-color-primary)"}
                fill={"white"}
              />
              <p>设置</p>
            </div>
          </Grid.Item>
        </Grid>
      </Card>
      {isDev ? <DevComponent turnTodev={turnTodevHandler} /> : null}

      {/* <Badge color="#ff3141">
        <div
          className="custom-service-btn"
          onClick={() => {
            navigate(`/${baseUrl}/chat`);
          }}
        >
          <div style={{ display: "flex" }}>
            <ChatIcon size={20} />
            <span style={{ marginLeft: 5 }}>客服</span>
          </div>
        </div>
      </Badge> */}
    </MiddleContentTab>
  );
};

export default UserContainer;

const DevComponent = ({ turnTodev }: any) => {
  return (
    <Card title={"调试工具"} className="card-style">
      <Grid columns={3} gap={8} style={{ marginTop: "20px" }}>
        <Grid.Item>
          <div className="userCardItem" onClick={turnTodev}>
            <LocationFill fontSize={24} />
            <p>城市管理</p>
          </div>
        </Grid.Item>
      </Grid>
    </Card>
  );
};
