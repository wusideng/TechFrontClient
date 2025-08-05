import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  followTechAction,
  getFollowingTechsAction,
  unfollowTechAction,
} from "@/store/slices/followSlice";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import styles from "./style.module.less";
import { Button, Card, Grid, Image } from "antd-mobile";
import { TechUser } from "@/types/Tech";
import { EnvironmentOutline, HeartFill, HeartOutline } from "antd-mobile-icons";
import ReserveTag from "@/components/tech/TechItem/ReserveTag";
import { baseUrl } from "@/util/config";
import { useAppDispatch, useAppSelector } from "@/store";
import useTechFollow from "@/hooks/useTechFollow";
import useGaodeAddress from "@/hooks/address/useGaodeAddress";
const FollowsContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const { address, locationPermissionOn } = useAppSelector(
    (state) => state.address
  );
  useGaodeAddress();
  const { followingTechs } = useAppSelector((state) => state.follow);
  useEffect(() => {
    setLoading(true);
    const init = async () => {
      await dispatch(
        getFollowingTechsAction({
          user_openid: user.openid,
          lon: address?.lon,
          lat: address?.lat,
        })
      );
      setLoading(false);
    };
    if (user.openid && locationPermissionOn !== null) {
      init();
    }
  }, [user.openid, address, locationPermissionOn]);

  return (
    <MiddleContentHeader
      title="关注"
      className={styles.wrapper}
      loading={loading}
      withFooter={false}
    >
      <Grid columns={2} gap={15}>
        {followingTechs.map((techuser: TechUser, index) => (
          <Grid.Item key={index}>
            <Card className={styles.tech_item_card}>
              <div className={styles.tech_item_card_content}>
                {/* todo 删掉border，把照片背景换掉 */}
                <Image
                  src={techuser.photo_work || techuser.headimgurl}
                  width={110}
                  height={110}
                  fit="fill"
                  style={{ borderRadius: "50%" }}
                />
                <div className={styles.line_1}>
                  <div className={styles.name}>{techuser.user_nickname}</div>
                  <Button
                    color="primary"
                    size="mini"
                    onClick={() => {
                      navigate(`/${baseUrl}/tech/${techuser.user_id}`);
                    }}
                  >
                    立即预约
                  </Button>
                </div>
                <div className={styles.line_2}>
                  <ReserveTag techuser={techuser} />
                  <div>
                    <EnvironmentOutline
                      color="var(--adm-color-weak)"
                      fontSize={14}
                    />
                    <span className={styles.distance}>
                      {techuser.distance.toFixed(2)}km
                    </span>
                  </div>
                </div>
              </div>
              <FollowedTech techuser={techuser} />
            </Card>
          </Grid.Item>
        ))}
      </Grid>
    </MiddleContentHeader>
  );
};
export default FollowsContainer;

const FollowedTech = ({ techuser }) => {
  const { follow, followed } = useTechFollow(techuser);
  return (
    <div
      className={styles.follow_icon}
      onClick={() => {
        follow();
      }}
    >
      {followed ? (
        <HeartFill fontSize={18} color={"#f85959"} />
      ) : (
        <HeartOutline fontSize={18} color={"var(--adm-color-weak)"} />
      )}
    </div>
  );
};
