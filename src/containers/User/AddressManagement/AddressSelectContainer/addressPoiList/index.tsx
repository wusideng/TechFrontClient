import React from "react";
import { LocationFill } from "antd-mobile-icons";
import { POIformatted } from "@/types/AddressManagement";
import { Empty, List } from "antd-mobile";
import styles from "./style.module.less";
const AddressPoiList = ({
  pois,
  isSearchingPois,
  searchValue,
  handleSelectLocation,
  header,
}: {
  pois: POIformatted[];
  isSearchingPois: boolean;
  searchValue: string;
  handleSelectLocation: (poi: POIformatted) => void;
  header?: React.ReactNode | string;
}) => {
  return (
    <List header={header ? header : "附近地点"} className={styles.list}>
      {isSearchingPois ? (
        <List.Item style={{ fontSize: "14px", color: "var(--adm-color-weak)" }}>
          正在搜索...
        </List.Item>
      ) : pois.length === 0 && !isSearchingPois ? (
        <List.Item>
          {searchValue ? (
            <Empty description="未找到相关地址" />
          ) : (
            <Empty description="暂无附近地点" />
          )}
        </List.Item>
      ) : (
        pois.map((item: POIformatted, index) => (
          <List.Item
            key={index}
            title={
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                <LocationFill fontSize={20} color="var(--adm-color-primary)" />
                <span style={{ fontWeight: "bold", color: "black" }}>
                  {item.region}
                </span>
              </div>
            }
            arrowIcon={false}
            description={item.street}
            onClick={() => handleSelectLocation(item)}
          />
        ))
      )}
    </List>
  );
};
export default AddressPoiList;
