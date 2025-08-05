import { Card, Image, Tabs } from "antd-mobile";
import { Product } from "@/types/Product";
import styles from "./style.module.less";
import CustomClockIcon from "@/components/icons/CustomClockIcon";
import WhyUs from "./WhyUs";
import { productBaseSales } from "@/util/utils";

const ProductDetail = ({ product }: { product: Product }) => {
  return (
    <div className={styles.wrapper}>
      <Image src={product.photo_intro} height={270} fit="cover" />
      <div className={styles.content_wrapper}>
        <Card className={styles.product_card}>
          <div className={styles.product_card_content}>
            <div className={styles.part_1}>
              <div className={styles.product_summary}>
                <div className={styles.product_name}>
                  {product.product_name}
                </div>
                <div className={styles.product_price}>
                  ¥：{product.price_current}
                </div>
                <div className={styles.duration_line}>
                  <div className={styles.duration}>
                    <CustomClockIcon size={"14px"} />
                    <span>{product.duration}</span>
                  </div>
                  <div>
                    已售
                    {productBaseSales[product.product_name] +
                      product.order_count}
                  </div>
                </div>
              </div>
            </div>
            <Tabs className={styles.tabs}>
              <Tabs.Tab title="项目介绍" key="1">
                <div>
                  <div className={styles.product_detail_desc}>
                    <div className={styles.title}>项目说明</div>
                    <div className={styles.product_detail_desc_content}>
                      <div className={styles.product_detail_desc_content_part}>
                        <div className={styles.sub_title}>【项目特色】</div>
                        <div>{product.introduction}</div>
                      </div>
                      {product.photo_detail1 && (
                        <div style={{ padding: "0 12px" }}>
                          <Image
                            src={product.photo_detail1}
                            style={{ borderRadius: 15 }}
                          />
                        </div>
                      )}
                      <div className={styles.product_detail_desc_content_part}>
                        <div className={styles.sub_title}>【按摩部位】</div>
                        <div>{product.body_parts}</div>
                      </div>
                      <div className={styles.product_detail_desc_content_part}>
                        <div className={styles.sub_title}>【包含物料】</div>
                        <div>{product.consumables}</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.forbidden_desc}>
                    <div className={styles.title}>禁忌说明</div>
                    <div className={styles.forbidden_desc_line}>
                      <Dot />
                      <span className={styles.text}>
                        皮肤病，皮肤破损者(如瘟瘆，疤瘆，脓肿蜂窝组织炎，烧伤，烫伤者)禁用。
                      </span>
                    </div>
                    <div className={styles.forbidden_desc_line}>
                      <Dot />
                      <span className={styles.text}>
                        骨折复位稳定，开放性的骨折人体，内有金属固定物禁用。
                      </span>
                    </div>
                    <div className={styles.forbidden_desc_line}>
                      <Dot />
                      <span className={styles.text}>
                        感染性疾病，如骨结核，骨髓炎禁用。
                      </span>
                    </div>
                    <div className={styles.forbidden_desc_line}>
                      <Dot />
                      <span className={styles.text}>
                        内科危重的病人，如严重的心脏病，各种恶性肿瘤，急腹症，急性阑尾炎，宫外孕，胰腺炎等禁用。
                      </span>
                    </div>
                    <div className={styles.forbidden_desc_line}>
                      <Dot />
                      <span className={styles.text}>
                        过饱过饥(饭后半小时不宜做按摩)。
                      </span>
                    </div>
                  </div>
                  <WhyUs />
                </div>
              </Tabs.Tab>
              <Tabs.Tab title="下单须知" key="2">
                <div style={{ fontSize: 14 }}>
                  <div className={styles.title_in_tab}>下单前请仔细阅读</div>
                  <p>
                    <Dot />
                    <span>
                      尚达元平台技师所提供的推拿按摩服务仅为舒缓保健性质，不具有医疗效果，不能替代正规医疗。若您需要疾病治疗，请前往正规医疗机构就诊。平台不为严重心脏病患者、孕妇及行动不便需特殊护理的人群提供服务，以确保顾客安全和服务质量。
                    </span>
                  </p>
                  <p>
                    <Dot />
                    <span>
                      尚达元平台技师专注提供专业规范的推拿按摩服务。如客户提出不合理要求或有不当行为，技师有权拒绝服务，并可能采取法律手段维护自身权益。
                    </span>
                  </p>
                  <p>
                    <Dot />
                    <span>
                      尚达元平台严禁任何形式的私下交易行为。为保障您的合法权益和人身安全，所有服务必须通过平台正规渠道下单支付。若您选择与技师私下交易，平台将不对因此产生的任何纠纷承担责任。
                    </span>
                  </p>
                  <p>
                    <Dot />
                    <span>
                      尚达元平台不接受向未成年人提供任何服务或产品，并保留取消此类订单的权利。
                    </span>
                  </p>
                  <div className={styles.title_in_tab}>订单取消规则：</div>
                  <p>
                    <Dot />
                    <span>
                      当您选择网约车/出租车方式下单时，若技师尚未启程，您取消订单可获全额退款；若技师已经出发，您需要承担相应的交通费用。
                    </span>
                  </p>
                  <p>
                    <Dot />
                    <span>
                      无论您选择何种交通方式（公交/地铁/出租车/网约车），若技师已抵达服务地点，您因个人因素（如"对技师外貌不满"、"突发事件"等）取消订单，平台将在扣除技师往返交通费后，按服务费的70%退还您的费用，另扣30%作为违约金。
                    </span>
                  </p>
                  <p>
                    <Dot />
                    <span>
                      若您选定技师并完成下单，技师已与您确认服务时间和地点并开始出发，您此时取消订单需承担该订单的全部交通费用。
                    </span>
                  </p>
                  <p>
                    <Dot />
                    <span>
                      技师到达约定服务地点后，若无法联系到您，将等候20分钟；20分钟后仍未能联系上，技师将离开且系统自动取消订单。此情况下，您需承担相应交通费用及50元空单补偿费。
                    </span>
                  </p>
                  <p>
                    <Dot />
                    <span>
                      若您选择公交/地铁下单方式，技师出发后20分钟内您取消订单，需支付30元空单费；若技师出发20分钟后您才取消，则需支付80元空单误工费。
                    </span>
                  </p>
                  <p>
                    <Dot />
                    <span>
                      当技师已到达服务地点并开始提供服务后，若您因个人原因要求提前结束服务，需支付100%的服务费用。
                    </span>
                  </p>
                  <div className={styles.title_in_tab}>评价订单</div>
                  <p>
                    在您的订单成功显示"服务完成"后，您有7天时间可点击【评价】为此次服务体验提供反馈。若超过7天未评价，系统将自动视为您对本次服务满意并默认好评，同时评价功能将不再开放。
                  </p>
                  <div>
                    衷心感谢每位用户对尚达元平台的信任与青睐，您的支持是我们不断前行的动力。
                  </div>
                </div>
              </Tabs.Tab>
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
const Dot = () => {
  return (
    <div className={styles.dot_container}>
      <span className={styles.dot}></span>
    </div>
  );
};
