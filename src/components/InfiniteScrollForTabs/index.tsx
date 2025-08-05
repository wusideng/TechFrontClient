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
  pageNumber: number;
  setDataAction?: ({
    data,
    totalCount,
    pageNumber,
  }: {
    data: T[];
    totalCount: number | null;
    pageNumber: number;
  }) => void;
  loadMoreApi: LoadMoreDataApiType<T>;
  watchData?: any[] | null;
  totalCount: number | null;
  setTotalCount?: (totalCount: number | null) => void;
  emptyDescription: string | null;
  customIsEmpty?: boolean | null;
}
const InfiniteScrollLoader = <T,>({
  children,
  pageSize = 10,
  data,
  loadMoreApi,
  emptyDescription = null,
  setDataAction = null,
  totalCount = null,
  setTotalCount,
  pageNumber = 1,
  watchData = null,
  customIsEmpty = null,
}: InfiniteScrollLoaderProps<T>) => {
  //后端pageNumber需要第一页是1
  const isInitialMount = useRef(true);
  const hasMore = totalCount === null ? true : data.length < totalCount;

  const abortControllerRef = useRef(new AbortController());
  const loadMore = async () => {
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
    const dataFinal = [...data, ...dataNew] as T[];
    setDataAction({
      data: dataFinal,
      totalCount: totalCountFromRes,
      pageNumber: pageNumber + 1,
    });
  };
  const clearData = () => {
    setDataAction({
      data: [],
      totalCount: null,
      pageNumber: 1,
    });
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
    }, [watchData]);
  }
  const isEmpty =
    customIsEmpty !== null
      ? customIsEmpty
      : data.length === 0 && !hasMore && emptyDescription != null;
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
