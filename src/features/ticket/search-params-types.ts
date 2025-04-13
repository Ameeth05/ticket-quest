//the following is replaced with nuqs libraby. There is nothing wrong with this approach, but nuqs provide more automated/generic way to define the type

// export type SearchParamsProps = {
//   search: string | undefined;
//   sort: string | undefined;
// };

import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  search: parseAsString.withDefault(""),
  sort: parseAsString.withDefault("newest"),
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
