import { useNavigate, useLocation } from "react-router-dom";
import orderStatusCodeDict from "@/lib/statusCodeDict.json";
import { Toast } from "antd-mobile";
import { updateOrderPayment } from "@/store/slices/orderSlice";
import { baseUrl } from "@/util/config";
import { useAppDispatch } from "@/store";
const clientStatusCodeDict = orderStatusCodeDict.client;
interface UpdateOrderParams {
  order_id: number;
  payment_status: string;
  payment_status_code: string;
  coupon_id?: number;
}

const usePay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const payHandler = async (
    payContent: any,
    payApi: (payContent: any) => Promise<any>,
    couponId: number = null
  ) => {
    // let payApi;
    // if (is_continue) {
    //   payApi = continueToPayApi;
    // } else {
    //   payApi = createOrderWxPayApi;
    // }
    try {
      const result = await startPay(payContent, payApi);
      if (result.errorMsg) {
        Toast.show({ content: result.errorMsg });
        return;
      }
      if (result.success) {
        const orderStatus = result.orderStatus;
        console.log("支付成功:", orderStatus.order_id);
        const clientStatusObj = clientStatusCodeDict.paid;
        const update_order: UpdateOrderParams = {
          order_id: orderStatus.order_id,
          payment_status: clientStatusObj.text,
          payment_status_code: clientStatusObj.code,
        };
        if (couponId) {
          update_order.coupon_id = couponId;
        }
        await dispatch(updateOrderPayment(update_order));

        Toast.show({
          icon: "success",
          content: "支付完成！",
        });
      } else {
        //支付失败
        const orderStatus = result.orderStatus;
        if (orderStatus) {
          console.log("支付失败:", orderStatus.order_id);
          const clientStatusObj = clientStatusCodeDict.payment_failed;
          const update_order: UpdateOrderParams = {
            order_id: orderStatus.order_id,
            payment_status: clientStatusObj.text,
            payment_status_code: clientStatusObj.code,
          };
          await dispatch(updateOrderPayment(update_order));
        }
        Toast.show({
          icon: "fail",
          content: "支付失败",
        });
      }
    } catch (error) {
      console.error("支付失败:", error);
      Toast.show({
        icon: "fail",
        content: "支付失败",
      });
    }
    // 无论成功失败都执行相同的导航逻辑
    if (location.pathname == `/${baseUrl}/order`) {
      //使用下面方法刷新当前页面
      navigate("/temp-route");
      setTimeout(() => {
        navigate(`/${baseUrl}/order`, { replace: true });
      }, 0);
    } else {
      navigate(`/${baseUrl}/order`, { replace: true });
    }
  };

  return payHandler;
};
export const startPay = (
  payContent: any,
  payApi: (paycontent: any) => Promise<any>
): Promise<{
  success: boolean;
  // prepaySuccess: boolean;
  orderStatus?: any;
  errorMsg?: string | null;
  error?: any;
}> => {
  return new Promise(async (resolve) => {
    let orderStatus;
    try {
      //预支付
      orderStatus = await payApi(payContent);
      if (orderStatus?.error) {
        // Toast.show({
        //   content: orderStatus.error,
        // });
        return resolve({
          success: false,
          // prepaySuccess: false,
          // error: orderStatus.error,
          errorMsg: orderStatus.error,
        });
      }

      console.log("预支付成功:", orderStatus);

      // 创建一个Promise来处理支付过程
      const processPayment = async () => {
        try {
          await initiatePayment(orderStatus);
          return { success: true, orderStatus };
        } catch (error) {
          console.log("支付调用失败:", error);
          return {
            success: false,
            orderStatus,
            error,
            // errorMsg: "支付失败",
          };
        }
      };

      // 检查 WeixinJSBridge 是否已准备好
      // @ts-ignore
      if (typeof WeixinJSBridge === "undefined") {
        document.addEventListener("WeixinJSBridgeReady", async () => {
          const result = await processPayment();
          resolve(result);
        });
      } else {
        console.log("WeixinJSBridge has 逻辑");
        const result = await processPayment();
        resolve(result);
      }
    } catch (error) {
      console.log("支付失败:", error.message);
      resolve({
        // prePaySuccess: false,
        success: false,
        orderStatus,
        error: error.message,
      });
    }
  });
};

export const initiatePayment = (data: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    WeixinJSBridge.invoke(
      "getBrandWCPayRequest",
      {
        appId: data.appId,
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: "MD5",
        paySign: data.paySign,
      },
      (res: any) => {
        if (res.err_msg === "get_brand_wcpay_request:ok") {
          resolve();
        } else {
          reject(new Error(res.err_msg));
        }
      }
    );
  });
};
export default usePay;
