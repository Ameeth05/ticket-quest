"use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortSelectOption = {
  label: string;
  sortKey: string;
  sortValue: string;
};

type SortObject = {
  sortKey: string;
  sortValue: string;
};

type SortSelectProps = {
  value: SortObject;
  onChange: (sort: SortObject) => void;
  options: SortSelectOption[];
};

export default function SortSelect({
  value,
  onChange,
  options,
}: SortSelectProps) {
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

  // const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  const handleSort = (compositeKey: string) => {
    // const sortValue = options.find(
    //   (option) => option.sortKey === sortKey
    // )?.sortValue;

    const [sortKey, sortValue] = compositeKey.split("_");
    onChange({
      sortKey,
      sortValue,
    });
  };

  return (
    <Select
      onValueChange={handleSort}
      defaultValue={value.sortKey + "_" + value.sortValue}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.sortKey + option.sortValue}
            value={option.sortKey + "_" + option.sortValue}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
