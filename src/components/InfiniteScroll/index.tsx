import { Empty, InfiniteScroll } from "antd-mobile";
import InfiniteScrollContent from "./InfiniteScrollContent";
import React, { useEffect, useRef, useState } from "react";
import { LoadMoreDataApiType } from "@/types/InfiniteScroll";
import axios from "axios";

// 定义泛型组件
interface InfiniteScrollLoaderProps<T> {
  data: T[];
  children: React.ReactNode;
  pageSize?: number;
  setDataAction?: (dataFinal: T[]) => void;
  loadMoreApi: LoadMoreDataApiType<T>;
  watchData?: any[] | null;
  emptyDescription: string | null;
}
const InfiniteScrollLoader = <T,>({
  children,
  pageSize = 10,
  data,
  loadMoreApi,
  emptyDescription = null,
  setDataAction = null,
  watchData = null,
}: InfiniteScrollLoaderProps<T>) => {
  //后端pageNumber需要第一页是1
  const isInitialMount = useRef(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const abortControllerRef = useRef(new AbortController());
  const loadMore = async () => {
    const nextPageNumber = pageNumber + 1;
    setPageNumber(nextPageNumber);
    let res = null;
    try {
      res = await loadMoreApi(
        pageNumber,
        pageSize,
        abortControllerRef.current.signal
      );
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }
    }
    const { data: dataNew, totalCount: totalCountFromRes } = res;
    if (dataNew.length + data.length >= totalCountFromRes) {
      setHasMore(false);
    }
    const dataFinal = [...data, ...dataNew] as T[];
    setDataAction(dataFinal);
  };
  const clearData = () => {
    setDataAction([]);
  };
  useEffect(() => {
    return () => {
      abortControllerRef.current.abort();
      clearData();
    };
  }, []);
  if (watchData) {
    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }
      // 跳过初始加载
      clearData();
      setPageNumber(1);
      setHasMore(true);
    }, [watchData]);
  }
  const isEmpty = data.length === 0 && !hasMore && emptyDescription != null;
  return (
    <>
      {isEmpty ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Empty description={emptyDescription} />{" "}
        </div>
      ) : (
        children
      )}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
        <InfiniteScrollContent hasMore={hasMore} isEmpty={isEmpty} />
      </InfiniteScroll>
    </>
  );
};
const MemoizedInfiniteScrollLoader = React.memo(InfiniteScrollLoader);

export default MemoizedInfiniteScrollLoader;
