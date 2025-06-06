"use client";

import { useQueryState, useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";
import Pagination from "@/components/pagination";
import {
  paginationOptions,
  paginationParser,
  searchParser,
} from "../search-params-types";

export type PaginatedTicketMetadataProps = {
  count: number;
  hasNextPage: boolean;
};
type TicketPaginations = {
  paginatedTicketMetadata: PaginatedTicketMetadataProps;
};

export default function TicketPaginations({
  paginatedTicketMetadata,
}: TicketPaginations) {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );
  const [search] = useQueryState("search", searchParser);
  const prevSearch = useRef(search);

  useEffect(() => {
    if (search === prevSearch.current) return;
    prevSearch.current = search;

    setPagination({ ...pagination, page: 0 });
  }, [pagination, search, setPagination]);

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetadata={paginatedTicketMetadata}
    />
  );
}
