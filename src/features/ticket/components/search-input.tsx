"use client";

import { useQueryState } from "nuqs";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { searchParser } from "../search-params-types";

type SearchInputProps = {
  placeholder: string;
};

export default function SearchInput({ placeholder }: SearchInputProps) {
  //The following is just the raw manipulation of url to include query parameters. According to the instructor this implementation has a lot of raw boilerplate. To avoid this the instructor implented the same functionality with useQueryState from nuqs

  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

  // const handleSearch = useDebouncedCallback(
  //   //useDebouncedCallback is usd because whenever a user types something in the input field, the request in only bieng made when the user stops for 250ms (the second argunemt for useDebouncedCallback)
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const searchValue = event.target.value;
  //     const params = new URLSearchParams(searchParams);

  //     if (searchValue) {
  //       params.set("search", searchValue);
  //     } else {
  //       params.delete("search");
  //     }

  //     replace(`${pathname}?${params.toString()}`, { scroll: false });
  //   },
  //   250
  // );

  const [search, setSearch] = useQueryState("search", searchParser);

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    250
  );

  return (
    <Input
      defaultValue={search}
      placeholder={placeholder}
      onChange={handleSearch}
    />
  );
}
