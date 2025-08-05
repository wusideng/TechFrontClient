import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import { useAppDispatch, useAppSelector } from "@/store";
import TechListWrapper from "@/containers/Tech/TechContainer/TechListWrapper";
const ProductTechListContainer = () => {
  const { products } = useAppSelector((state) => state.product);
  return (
    <MiddleContentHeader title={"尚达元"} withFooter={false}>
      <TechListWrapper products={products} />
    </MiddleContentHeader>
  );
};

export default ProductTechListContainer;
