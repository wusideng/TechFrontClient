import moment from "moment";
import { Coupon } from "@/types/Coupon";
import styles from "./style.module.less";
import { Button, Toast } from "antd-mobile";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "@/util/config";
import { useAppDispatch, useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { setOrderCoupon } from "@/store/slices/orderSlice";

const CouponItem = ({ coupon }: { coupon: Coupon }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isOrderSelectCoupon =
    location.pathname === `/${baseUrl}/ordercreate/coupon`;
  const { newOrder } = useAppSelector((state) => state.order);
  const useCoupon = () => {
    if (isOrderSelectCoupon) {
      if (
        coupon.condition == 0 ||
        newOrder.product.price_current * newOrder.otherInfo.productCount >=
          coupon.condition
      ) {
        dispatch(
          setOrderCoupon({ amount: coupon.amount, couponId: coupon.coupon_id })
        );
        navigate(-1);
      } else {
        Toast.show({
          icon: "fail",
          content: `消费${coupon.condition}可用`,
        });
      }
    }
  };

  return (
    <div className={styles.coupon_item} onClick={() => useCoupon()}>
      <div className={styles.left}>
        <div className={styles.price}>{`¥${coupon.amount}`}</div>
        <div className={styles.expiration}>{`有效期至${moment(
          coupon.expiration_time
        ).format("YYYY-MM-DD")}`}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.right_line1}>{`${coupon.coupon_type}`}</div>
        <div className={styles.right_line2}>
          {coupon.condition == 0 ? "全场可用" : `满${coupon.condition}元可用`}
        </div>
      </div>
      {isOrderSelectCoupon && (
        <div className={styles.button_wrapper}>
          <Button color="primary" size="mini">
            立即使用
          </Button>
        </div>
      )}
    </div>
  );
};
export default CouponItem;
