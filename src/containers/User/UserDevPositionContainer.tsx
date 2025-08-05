import React, { useEffect } from "react";
import { Card, Image, Radio, Space } from "antd-mobile";

import { cityAdmin } from "@/util/config";
import MiddleContentTab from "@/components/layout/MiddleContentTab";
import { setMockCity } from "@/store/slices/addressSlice";
import { useAppDispatch, useAppSelector } from "@/store";

const UserDevPositionContainer = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { address, mockcity } = useAppSelector((state) => state.address);
  useEffect(() => {}, [dispatch]);

  function setUserCityHandler(value: any) {
    dispatch(setMockCity(value));
  }
  return (
    <MiddleContentTab>
      <Card className="card-style background-primary">
        <div className="userHeader">
          <div className="photo">
            <Image src={user.headimgurl} width={100} height={100} fit="fill" />
          </div>
          <div className="control">
            <p>{user.user_nickname}</p>
            <p>联系方式:{user.user_phone}</p>
            <p>所在城市:{mockcity ? mockcity : address?.city}</p>
          </div>
        </div>
      </Card>
      <Card title="城市选择">
        <Radio.Group onChange={setUserCityHandler}>
          <Space direction="vertical">
            {cityAdmin[user.openid].map((city: any, index: any) => (
              <Radio block value={city} key={index}>
                {city}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Card>
    </MiddleContentTab>
  );
};

export default UserDevPositionContainer;
