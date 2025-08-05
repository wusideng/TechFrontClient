//@ts-ignore
import userPolicyContent from "@/generated/用户服务协议";

const UserAgreementContainer = () => {
  return <div dangerouslySetInnerHTML={{ __html: userPolicyContent }} />;
};
export default UserAgreementContainer;
