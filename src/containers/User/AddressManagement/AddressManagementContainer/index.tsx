import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast, Button, Card, Modal } from "antd-mobile";
import {
  CheckCircleFill,
  DeleteOutline,
  EditSOutline,
  PhoneFill,
} from "antd-mobile-icons";
import { baseUrl } from "@/util/config";
import {
  getUserAddresses,
  deleteUserAddress,
  setUserAddressFormData,
  updateUserAddress,
} from "@/store/slices/addressManagementSlice";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import { ClientUser } from "@/types/ClientUser";
import { UserAddress } from "@/types/AddressManagement";
import styles from "./style.module.less";
import { setOrderAddress } from "@/store/slices/orderSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store";

const AddressManagementContainer = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { addresses } = useAppSelector(
    (state: RootState) => state.addressManagement
  );
  const previousPathname = location.state?.previousPathname;
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAddressList();
  }, []);

  const fetchAddressList = async () => {
    setLoading(true);
    try {
      await dispatch(getUserAddresses(user.openid));
    } catch (error) {
      Toast.show({
        icon: "fail",
        content: "获取地址列表失败",
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchAddressList();
  }, [dispatch]);

  const handleEditAddress = (addressId: number, address: UserAddress) => {
    dispatch(setUserAddressFormData(address));
    navigate(`/${baseUrl}/user/address/edit/${addressId}`);
  };
  const setDefaultAddress = async (addressId: number, address: UserAddress) => {
    const new_address = { ...address, is_default: true };
    setLoading(true);
    try {
      await dispatch(updateUserAddress({ addressId, address: new_address }));
      await fetchAddressList();
    } catch (error) {
      Toast.show({
        icon: "fail",
        content: "设置默认地址失败",
      });
    }
    setLoading(false);
  };

  const handleDeleteAddress = (addressId: any) => {
    Modal.confirm({
      content: "确定要删除这个地址吗？",
      onConfirm: async () => {
        try {
          await dispatch(deleteUserAddress(addressId));
          Toast.show({
            icon: "success",
            content: "地址删除成功",
          });
          fetchAddressList();
        } catch (error) {
          Toast.show({
            icon: "fail",
            content: "地址删除失败",
          });
        }
      },
    });
  };

  return (
    <>
      <MiddleContentHeader
        title="地址管理"
        className={styles.address_management_container}
        loading={loading}
        withFooter={false}
        CustomFooter={<CustomFooter />}
      >
        <div className={styles.address_list}>
          {addresses.map((address: UserAddress, index) => (
            <Card
              key={index}
              className={styles.address_item}
              onClick={() => {
                if (previousPathname == "order") {
                  dispatch(setOrderAddress(address));
                  navigate(-1);
                }
              }}
            >
              <div className={styles.address_item_content_wrapper}>
                <div className={styles.user_info_wrapper}>
                  <div className={styles.user_info}>
                    <span className={styles.name}>{address.name}</span>
                    <span className={styles.phone}>
                      <PhoneFill />
                      {address.phone.replace(
                        /(\d{3})(\d{4})(\d{4})/,
                        "$1****$3"
                      )}
                    </span>
                  </div>
                  <div className={styles.address}>
                    {address.region} {address.detail_address}
                  </div>
                  <div className={styles.street}>{address.street}</div>
                </div>

                <div className={styles.bottom_line_wrapper}>
                  {address.is_default ? (
                    <div className={styles.default_tag}>
                      <CheckCircleFill className={styles.icon} />
                      已设为默认
                    </div>
                  ) : (
                    <div
                      className={styles.default_tag_disabled}
                      onClick={(event: any) => {
                        if (!address.is_default) {
                          event.stopPropagation();
                        }
                        setDefaultAddress(address.id, address);
                      }}
                    >
                      <span className={styles.circle}></span>
                      <span>默认</span>
                    </div>
                  )}
                  <div className={styles.actions}>
                    <div className={styles.action}>
                      <EditSOutline
                        color="#6f6f6f"
                        fontSize={18}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleEditAddress(address.id, address);
                        }}
                      />
                    </div>
                    <div className={styles.action}>
                      <DeleteOutline
                        color="#6f6f6f"
                        fontSize={18}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDeleteAddress(address.id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </MiddleContentHeader>
    </>
  );
};

export default AddressManagementContainer;
const CustomFooter = () => {
  const navigate = useNavigate();
  const handleAddAddress = () => {
    navigate(`/${baseUrl}/user/address/add`, {
      state: { previousPathname: "addressmanagement" },
    });
  };
  return (
    <div className="bottom-button-fixed-wrapper">
      <div className="bottom-button-fixed">
        <Button
          block
          color="primary"
          className="single-button"
          onClick={handleAddAddress}
        >
          添加地址
        </Button>
      </div>
    </div>
  );
};
