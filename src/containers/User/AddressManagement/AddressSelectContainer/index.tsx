import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "antd-mobile";
import CustomSearchBar from "@/components/common/CustomSearchBar";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import { selectPoi } from "@/store/slices/addressManagementSlice";
import { POIformatted } from "@/types/AddressManagement";
import useGaodeAddress from "@/hooks/address/useGaodeAddress";
import AddressPoiList from "./addressPoiList";
import "./style.less";
import { useAppDispatch, useAppSelector } from "@/store";

const AddressSelectContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    fetchNearbyLocations,
    pois,
    isSearchingPois,
    amapInitialized,
  }: {
    fetchNearbyLocations: (
      keyword?: string,
      lon?: number,
      lat?: number
    ) => void;
    amapInitialized: boolean;
    pois: POIformatted[];
    isSearchingPois: boolean;
  } = useGaodeAddress();
  const [searchValue, setSearchValue] = useState("");
  // 从 Redux 获取位置信息
  const { address } = useAppSelector((state) => state.address);

  const handleSelectLocation = (location: POIformatted) => {
    // 将选中的地址 dispatch 到 reducer
    dispatch(selectPoi(location));
    // 返回上一页
    navigate(-1);
  };

  // 直接处理搜索，不需要额外的debounce（CustomSearchBar内部已有）
  const handleSearch = async (value: any) => {
    setSearchValue(value);

    if (!address?.lat || !address?.lon) {
      Toast.show({
        icon: "fail",
        content: "位置信息不可用",
      });
      return;
    }

    if (value) {
      fetchNearbyLocations(value);
    } else {
      fetchNearbyLocations();
    }
  };

  const handleCancel = () => {
    setSearchValue("");
    if (address?.lat && address?.lon) {
      fetchNearbyLocations();
    }
  };
  useEffect(() => {
    if (address?.lat && address?.lon && amapInitialized) {
      fetchNearbyLocations();
    }
  }, [address, amapInitialized]);
  return (
    <MiddleContentHeader
      title="选择地址"
      className="address-select-container"
      withFooter={false}
    >
      <div className="search-bar-container">
        <CustomSearchBar
          placeholder="搜索地点"
          defaultValue={searchValue}
          onSearch={handleSearch}
          onCancel={handleCancel}
          debounceTime={500}
          showCancelButton={(focus: any, value: any) =>
            value && value.length > 0
          }
        />
      </div>
      <AddressPoiList
        pois={pois}
        searchValue={searchValue}
        isSearchingPois={isSearchingPois}
        handleSelectLocation={handleSelectLocation}
      />
    </MiddleContentHeader>
  );
};

export default AddressSelectContainer;
