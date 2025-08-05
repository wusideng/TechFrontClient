import React, { useState } from "react";
import { DownOutline, LocationFill } from "antd-mobile-icons";
import { POIformatted } from "@/types/AddressManagement";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "@/util/config";
import { Button, Input, SearchBar } from "antd-mobile";
import styles from "./style.module.less";
import { useAppSelector } from "@/store";

const AddressTopBar = ({
  searchByName,
}: {
  searchByName: (name: string) => void;
}) => {
  const { address } = useAppSelector((state) => state.address);
  const [searchValue, setSearchValue] = useState<string>("");
  const onSearchTechName = (val: string) => {
    searchByName(val);
  };

  const navigate = useNavigate();
  return (
    <div className={styles.address_top_bar}>
      <div
        className={styles.region_name_container}
        onClick={() => {
          navigate(`/${baseUrl}/address/modifyfortech`);
        }}
      >
        <div style={{ marginRight: "5px", flexShrink: 0 }}>
          <LocationFill color="var(--adm-color-primary)" fontSize={18} />
        </div>
        <span className={styles.region_name}>
          {address?.city || "定位中..."}
        </span>
        {address?.city && (
          <div>
            <DownOutline color="black" />
          </div>
        )}
      </div>
      <div className={styles.search_bar_wrapper}>
        <SearchBar
          placeholder="请输入技师名称"
          showCancelButton={true}
          className={styles.address_top_bar_search}
          onlyShowClearWhenFocus={true}
          onChange={(val) => {
            setSearchValue(val);
            if (val.length === 0) {
              searchByName("");
            }
          }}
          value={searchValue}
          onSearch={(val) => {
            onSearchTechName(val);
          }}
        />
      </div>
    </div>
  );
};
export default AddressTopBar;
