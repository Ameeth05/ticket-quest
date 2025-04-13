"use client";

import { useQueryStates } from "nuqs";
import { sortOptions, sortParser } from "../search-params-types";
import SortSelect, { SortSelectOption } from "./sort-select";

type TicketSortSelectProps = {
  options: SortSelectOption[];
};

const TicketSortSelect = ({ options }: TicketSortSelectProps) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  return <SortSelect value={sort} onChange={setSort} options={options} />;
};

export { TicketSortSelect };
