import { useAppDispatch, useAppSelector } from "@/store";
import AddressTopBar from "@/components/address/AddressTopBar";
import { Empty, Grid, Radio } from "antd-mobile";
import { Products } from "@/types/Product";
import HorizontalListProduct from "@/components/product/HorizontalListProduct";
import { selectProduct } from "@/store/slices/productSlice";
import { useState } from "react";
import useGaodeAddress from "@/hooks/address/useGaodeAddress";
import TechList from "./TechList";

const TechListWrapper = ({
  products = null,
}: {
  products?: Products | null;
}) => {
  useGaodeAddress();
  const { address } = useAppSelector((state) => state.address);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.product);
  const [techuserName, setTechuserName] = useState("");
  const [orderBy, setOrderBy] = useState("disc");
  function searchTech(e: any) {
    switch (e) {
      case "1": //优选技师
        setOrderBy("rate");
        break;
      case "2": // 距离近
        setOrderBy("disc");
        break;
    }
  }

  const shouldLoadTech = () => {
    return address !== null && address !== undefined;
  };

  return (
    <>
      <AddressTopBar
        searchByName={(name) => {
          setTechuserName(name);
        }}
      />
      {products && (
        <div style={{ padding: "0 10px", marginTop: "-12px" }}>
          <div className="list-title" style={{ marginBottom: "10px" }}>
            项目分类
          </div>
          <div className="HorizProductList">
            {products.map((p, index) => (
              <HorizontalListProduct
                product={p}
                checked={p.product_id == product.product_id}
                setCheckedProduct={(p) => {
                  dispatch(selectProduct(p));
                }}
                key={index}
              />
            ))}
          </div>
        </div>
      )}
      <Grid columns={3} gap={8}>
        <Radio.Group defaultValue="2" onChange={searchTech}>
          <Grid.Item style={{ fontSize: "0.875rem", fontWeight: "bold" }}>
            推荐排序方案
          </Grid.Item>
          <Grid.Item>
            <Radio
              value="1"
              style={{ "--font-size": "14px", "--icon-size": "14px" }}
            >
              优选技师
            </Radio>
          </Grid.Item>
          <Grid.Item>
            <Radio
              value="2"
              style={{ "--font-size": "14px", "--icon-size": "14px" }}
            >
              距离最近
            </Radio>
          </Grid.Item>
        </Radio.Group>
      </Grid>
      {shouldLoadTech() ? (
        <TechList
          orderBy={orderBy}
          techuserName={techuserName}
          product={products && product ? product : null}
        />
      ) : (
        <Empty description="正在加载中..." />
      )}
    </>
  );
};
export default TechListWrapper;
