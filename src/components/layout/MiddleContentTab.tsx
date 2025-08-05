import React from "react";
import { Mask } from "antd-mobile";
import Loading from "@/components/common/Loading";
import FooterBar from "@/components/layout/FooterBar";
import { useAppSelector } from "@/store";

const MiddleContentTab = ({
  children,
  withFooter = true,
  loading = false,
  className = "",
  CustomFooter = null,
}: {
  children: React.ReactNode;
  withFooter?: boolean;
  loading?: boolean;
  className?: string;
  CustomFooter?: React.ReactNode | null;
}) => {
  const { loadingUser } = useAppSelector((state) => state.user);

  return (
    <div className="flex-col">
      <div className={`middleContent ${className}`}>
        <div className="content-area">
          {children}
          <Mask visible={loading || loadingUser} className="custom-mask">
            <Loading />
          </Mask>
        </div>
      </div>
      {withFooter && !CustomFooter && <FooterBar></FooterBar>}
      {CustomFooter}
    </div>
  );
};

export default MiddleContentTab;
