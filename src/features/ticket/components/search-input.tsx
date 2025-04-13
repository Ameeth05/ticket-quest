"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";

type SearchInputProps = {
  placeholder: string;
};

export default function SearchInput({ placeholder }: SearchInputProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    //useDebouncedCallback is usd because whenever a user types something in the input field, the request in only bieng made when the user stops for 250ms (the second argunemt for useDebouncedCallback)
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = event.target.value;
      const params = new URLSearchParams(searchParams);

      if (searchValue) {
        params.set("search", searchValue);
      } else {
        params.delete("search");
      }

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    250
  );

  return <Input placeholder={placeholder} onChange={handleSearch} />;
}
