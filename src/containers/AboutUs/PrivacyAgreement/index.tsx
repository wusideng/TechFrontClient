//@ts-ignore
import privacyPolicyContent from "@/generated/隐私政策.ts";

const PrivacyAgreementContainer = () => {
  return <div dangerouslySetInnerHTML={{ __html: privacyPolicyContent }} />;
};
export default PrivacyAgreementContainer;
