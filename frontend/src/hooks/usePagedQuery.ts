// src/hooks/usePagedQuery.ts
"use client";

import { useState } from "react";

export function usePagedQuery(defaultPageSize = 5) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchText, setSearchText] = useState("");

  return {
    page,
    pageSize,
    totalRecords,
    searchText,

    setPage,

    setPageSize: (size: number) => {
      setPageSize(size);
      setPage(1);
    },

    setSearchText: (text: string) => {
      setSearchText(text);
      setPage(1);
    },

    setTotalRecords,
  };
}
