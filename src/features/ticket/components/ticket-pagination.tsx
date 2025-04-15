"use client";

import { useQueryStates } from "nuqs";
import Pagination from "@/components/pagination";
import { paginationOptions, paginationParser } from "../search-params-types";

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

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetadata={paginatedTicketMetadata}
    />
  );
}
