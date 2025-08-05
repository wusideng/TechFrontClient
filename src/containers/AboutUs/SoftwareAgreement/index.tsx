//@ts-ignore
import softwarePolicyContent from "@/generated/软件使用许可协议.ts";

const SoftwareAgreementContainer = () => {
  return <div dangerouslySetInnerHTML={{ __html: softwarePolicyContent }} />;
};
export default SoftwareAgreementContainer;
