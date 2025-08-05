import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Empty, List, Toast } from "antd-mobile";
import { LocationFill, SetOutline, UndoOutline } from "antd-mobile-icons";

import CustomSearchBar from "@/components/common/CustomSearchBar";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import { POIformatted } from "@/types/AddressManagement";
import useGaodeAddress from "@/hooks/address/useGaodeAddress";
import AddressPoiList from "../AddressSelectContainer/addressPoiList";
import { setGaodeAddress } from "@/store/slices/addressSlice";
import AddressManagementList from "./AddressManagementList";
import styles from "./style.module.less";
import { useAppDispatch, useAppSelector } from "@/store";

const AddressModifyForTechContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    fetchNearbyLocations,
    pois,
    isSearchingPois,
    amapInitialized,
    isSearching,
    getCurrentLocation,
  }: {
    fetchNearbyLocations: (
      keyword?: string,
      lon?: number,
      lat?: number
    ) => void;
    amapInitialized: boolean;
    pois: POIformatted[];
    isSearching: boolean;
    isSearchingPois: boolean;
    getCurrentLocation: () => void;
  } = useGaodeAddress();
  const [searchValue, setSearchValue] = useState("");
  // 从 Redux 获取位置信息
  const { address } = useAppSelector((state) => state.address);

  const handleSelectLocation = (location: POIformatted) => {
    // 将选中的地址 dispatch 到 reducer
    dispatch(setGaodeAddress(location));
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
      loading={isSearching && !searchValue}
      title="选择地址"
      withFooter={false}
      className={styles.address_select_container}
    >
      <div className={styles.search_bar_container}>
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
      <List header={<Header getCurrentLocation={getCurrentLocation} />}>
        {address.region ? (
          <List.Item
            title={
              <div className={styles.list_title}>
                <LocationFill
                  fontSize={20}
                  color="var(--adm-color-secondary)"
                />
                <span>{address.region}</span>
              </div>
            }
            arrowIcon={false}
            description={address.street}
          />
        ) : (
          <Empty description="暂无当前位置" />
        )}
      </List>
      <AddressManagementList />
      <AddressPoiList
        pois={pois}
        searchValue={searchValue}
        isSearchingPois={isSearchingPois}
        handleSelectLocation={handleSelectLocation}
      />
    </MiddleContentHeader>
  );
};

export default AddressModifyForTechContainer;
const Header = ({ getCurrentLocation }: { getCurrentLocation: () => void }) => {
  return (
    <div className={styles.current_location_header}>
      <div className={styles.current_location_header_title}>当前位置</div>
      <div
        className={styles.refresh_current_location}
        onClick={() => {
          getCurrentLocation();
        }}
      >
        <UndoOutline fontSize={20} color="var(--adm-color-secondary)" />
        <span style={{ fontWeight: "normal" }}>刷新定位</span>
      </div>
    </div>
  );
};
