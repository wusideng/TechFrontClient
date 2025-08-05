import { getUserAddresses } from "@/store/slices/addressManagementSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { baseUrl } from "@/util/config";
import { Empty, List } from "antd-mobile";
import React, { memo, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LocationFill, SetOutline } from "antd-mobile-icons";
import { UserAddress } from "@/types/AddressManagement";
import { setGaodeAddress } from "@/store/slices/addressSlice";
const AddressManagementList = memo(() => {
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const { addresses } = useAppSelector((state) => state.addressManagement);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddressList();
  }, [user.openid]);
  const fetchAddressList = async () => {
    setLoading(true);
    try {
      await dispatch(getUserAddresses(user.openid));
    } catch (error) {
      console.error("获取地址列表失败:", error);
    }
    setLoading(false);
  };
  const renderAddressList = () => {
    if (loading) {
      //@ts-ignore
      return <Empty>正在加载服务地址...</Empty>;
    }
    if (addresses.length == 0) {
      return <Empty description="暂无服务地址" />;
    }
    const slicedAddresses = addresses.slice(0, 4);
    return slicedAddresses.map((address: UserAddress, index: number) => {
      return (
        <List.Item
          key={index}
          title={
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <LocationFill fontSize={20} color="var(--adm-color-primary)" />
              <span style={{ fontWeight: "bold", color: "black" }}>
                {address.region}
              </span>
            </div>
          }
          arrowIcon={false}
          description={address.street}
          onClick={() => {
            dispatch(setGaodeAddress(address));
            navigate(-1);
          }}
        />
      );
    });
  };

  return <List header={<Header />}>{renderAddressList()}</List>;
});
export default AddressManagementList;
const Header = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>我的服务地址</div>
      <div
        style={{ display: "flex", alignItems: "center", gap: 5 }}
        onClick={() => {
          navigate(`/${baseUrl}/user/address`);
        }}
      >
        <SetOutline fontSize={20} color="var(--adm-color-secondary)" />{" "}
        <span
          style={{ color: "var(--adm-color-primary)", fontWeight: "normal" }}
        >
          地址管理
        </span>
      </div>
    </div>
  );
};
