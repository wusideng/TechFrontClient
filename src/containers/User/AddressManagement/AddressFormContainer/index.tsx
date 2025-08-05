import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Toast, Checkbox, Input } from "antd-mobile";
import { LocationFill } from "antd-mobile-icons";
import { baseUrl } from "@/util/config";
import {
  addUserAddress,
  setUserAddressFormData,
  updateUserAddress,
} from "@/store/slices/addressManagementSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import "./style.less";
import { POIformatted, UserAddress } from "@/types/AddressManagement";

const AddressFormContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ addressId?: string }>();
  const addressId = params.addressId;
  const { user } = useAppSelector((state) => state.user);

  const { UserAddressFormData, selectedPoi } = useAppSelector(
    (state) => state.addressManagement
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newUserAddressFormData = {
      ...UserAddressFormData,
      openid: user.openid,
      phone: user.user_phone,
    };
    dispatch(setUserAddressFormData(newUserAddressFormData));
  }, [user]);
  useEffect(() => {
    if (selectedPoi) {
      const newUserAddressFormData = {
        ...UserAddressFormData,
        ...selectedPoi,
      };
      dispatch(setUserAddressFormData(newUserAddressFormData));
    }
  }, [selectedPoi]);

  // 处理表单输入变化
  const handleInputChange = (field: any, value: any) => {
    const newUserAddressFormData = {
      ...UserAddressFormData,
      [field]: value,
    };
    dispatch(setUserAddressFormData(newUserAddressFormData));
  };

  // 处理复选框变化
  const handleCheckboxChange = (checked: boolean) => {
    const newUserAddressFormData = {
      ...UserAddressFormData,
      is_default: checked,
    };
    dispatch(setUserAddressFormData(newUserAddressFormData));
  };

  const validateForm = () => {
    const formData = UserAddressFormData;
    if (!formData.name?.trim()) {
      Toast.show({ content: "请输入姓名" });
      return false;
    }
    if (!formData.phone?.trim()) {
      Toast.show({ content: "请输入手机号码" });
      return false;
    }
    if (!formData.region?.trim()) {
      Toast.show({ content: "请选择所在地区" });
      return false;
    }
    if (!formData.detail_address?.trim()) {
      Toast.show({ content: "请输入详细地址" });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const newUserAddressFormData = {
      ...UserAddressFormData,
      address:
        UserAddressFormData.province +
        UserAddressFormData.city +
        UserAddressFormData.district +
        UserAddressFormData.street +
        UserAddressFormData.region +
        UserAddressFormData.detail_address,
    };

    try {
      if (addressId) {
        await dispatch(
          updateUserAddress({
            addressId: parseInt(addressId),
            address: newUserAddressFormData,
          })
        ).unwrap();
        Toast.show({
          icon: "success",
          content: "地址更新成功",
        });
      } else {
        await dispatch(addUserAddress(newUserAddressFormData)).unwrap();
        Toast.show({
          icon: "success",
          content: "地址添加成功",
        });
      }
      navigate(-1);
    } catch (error) {
      Toast.show({
        icon: "fail",
        content: addressId ? "地址更新失败" : "地址添加失败",
      });
    }
    setLoading(false);
  };

  const handleSelectAddressPOI = () => {
    // 保存当前表单数据到路由state
    navigate(`/${baseUrl}/user/address/selectpoi`);
  };
  return (
    <MiddleContentHeader
      title={addressId ? "编辑地址" : "新增地址"}
      className="address-form"
      loading={loading}
      withFooter={false}
    >
      <div className="form-container">
        <div className="form-item">
          <div className="form-label">姓名</div>
          <Input
            placeholder="请输入您的姓名"
            value={UserAddressFormData.name}
            onChange={(val) => handleInputChange("name", val)}
            {...({} as any)}
          />
        </div>

        <div className="form-item">
          <div className="form-label">手机号码</div>
          <Input
            placeholder="请输入手机号码"
            value={UserAddressFormData.phone}
            onChange={(val: any) => handleInputChange("phone", val)}
            readOnly
            {...({} as any)}
          />
        </div>

        <div className="form-item">
          <div className="form-label">所在地区</div>
          <div
            onClick={handleSelectAddressPOI}
            className="location-select-wrapper"
          >
            <Input
              placeholder="点击选择您的地址"
              value={UserAddressFormData.region}
              readOnly
              {...({} as any)}
            />
            <LocationFill fontSize={24} color="var(--adm-color-primary)" />
          </div>
        </div>

        <div className="form-item">
          <div className="form-label">详细地址</div>
          <Input
            placeholder="某酒店/某房间（某小区/某号）"
            value={UserAddressFormData.detail_address}
            onChange={(val: any) => handleInputChange("detail_address", val)}
            {...({} as any)}
          />
        </div>

        <div className="form-item default-address-item">
          <Checkbox
            checked={UserAddressFormData.is_default}
            onChange={handleCheckboxChange}
            style={{ "--icon-size": "16px", "--font-size": "16px" }}
            className="default-address-checkbox"
          >
            设为默认地址
          </Checkbox>
        </div>

        <div className="form-footer" style={{ marginTop: "24px" }}>
          <Button
            block
            color="primary"
            onClick={handleSubmit}
            loading={loading}
            className="save-address-btn"
          >
            保存地址
          </Button>
        </div>
      </div>
    </MiddleContentHeader>
  );
};

export default AddressFormContainer;
