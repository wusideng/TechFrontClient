import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import BlockA from "@/components/common/BlockA";
import { useAppSelector } from "@/store";
import styles from "./style.module.less";
import CouponItem from "./CouponItem";
import { Empty } from "antd-mobile";

const Page = () => {
  const { coupons } = useAppSelector((state) => state.order);
  return (
    <MiddleContentHeader title={"尚达元.优惠券"} withFooter={false}>
      <div className={styles.wrapper}>
        <div className={styles.title}>我的优惠券</div>
        <div className={styles.coupon_content_list}>
          {coupons.length > 0 ? (
            coupons.map((coupon, index) => {
              return <CouponItem key={index} coupon={coupon} />;
            })
          ) : (
            <div className={styles.empty_wrapper}>
              <Empty description="暂无优惠券" />
            </div>
          )}
        </div>
      </div>
    </MiddleContentHeader>
  );
};

export default Page;
