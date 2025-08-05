import { Checkbox, Image } from "antd-mobile";
import styles from "./style.module.less";

const HorizontalListProduct = ({
  product,
  checked,
  setCheckedProduct,
}: any) => {
  return (
    <div className={styles.product} onClick={() => setCheckedProduct(product)}>
      <Image
        src={product.photo_intro}
        width={50}
        height={50}
        fit="cover"
        style={{ borderRadius: "50%" }}
      />
      <Checkbox
        checked={checked}
        className={
          styles.product_checked +
          " " +
          (checked ? styles.checked : styles.unchecked)
        }
      />
      <span className={styles.name}>{product.product_name}</span>
    </div>
  );
};

export default HorizontalListProduct;
