import { Tabs } from "antd-mobile";
import MiddleContentTab from "@/components/layout/MiddleContentTab";
import styles from "./style.module.less";
import OrderList from "./OrderList";
const tabItems = [
  { key: "1", title: "全部订单" },
  { key: "2", title: "进行中" },
  { key: "3", title: "待评价" },
  { key: "4", title: "已完成" },
  { key: "5", title: "已取消" },
];
const OrderContainer = () => {
  // const dispatch = useAppDispatch();
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const init = async () => {
  //     // await dispatch(getOrders(user.openid));
  //     setLoading(false);
  //   };
  //   init();
  //   // return () => {
  //   //   dispatch(clearOrders());
  //   // };
  // }, [dispatch]);

  return (
    <MiddleContentTab className={styles.order_container_wrapper}>
      <Tabs defaultActiveKey="1">
        {tabItems.map((item: any) => {
          return (
            <Tabs.Tab title={item.title} key={item.key}>
              {/* @ts-ignore */}
              {/* {filterOrders.length === 0 && !loading && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <Empty description="暂无订单" />
                </div>
              )} */}
              <div className={styles.order_list_wrapper}>
                {/* {filterOrders.map((order: any, index: any) => (
                  <OrderListItem
                    order={order}
                    key={index}
                    turnToDetail={turnToDetail}
                  />
                ))} */}
                <OrderList tabTitle={item.title} />
              </div>
            </Tabs.Tab>
          );
        })}
      </Tabs>
    </MiddleContentTab>
  );
};

export default OrderContainer;
