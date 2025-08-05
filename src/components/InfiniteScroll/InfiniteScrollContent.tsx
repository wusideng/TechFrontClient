import { DotLoading } from "antd-mobile";

const InfiniteScrollContent = ({
  hasMore,
  isEmpty,
}: {
  hasMore?: boolean;
  isEmpty?: boolean;
}) => {
  return (
    <>
      {hasMore ? (
        <>
          <span>正在加载</span>
          <DotLoading />
        </>
      ) : isEmpty ? null : (
        <span>没有数据了</span>
      )}
    </>
  );
};
export default InfiniteScrollContent;
