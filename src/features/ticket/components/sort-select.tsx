"use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryStates } from "nuqs";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortOptions, sortParser } from "../search-params-types";

type Option = { label: string; sortKey: string; sortValue: string };

type SortSelectProps = {
  options: Option[];
};

export default function SortSelect({ options }: SortSelectProps) {
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

  // const handleSort = (value: string) => {
  //   const params = new URLSearchParams(searchParams);

  //   if (value === defaultValue) {
  //     params.delete("sort");
  //   } else if (value) {
  //     params.set("sort", value);
  //   } else {
  //     params.delete("sort");
  //   }

  //   replace(`${pathname}?${params.toString()}`, { scroll: false });
  // };

  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  const handleSort = (sortKey: string) => {
    const sortValue = options.find(
      (option) => option.sortKey === sortKey
    )?.sortValue;
    setSort({
      sortKey,
      sortValue,
    });
  };

  return (
    <Select onValueChange={handleSort} defaultValue={sort.sortKey}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.sortKey} value={option.sortKey}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
