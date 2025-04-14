import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../search-params-types";

export const getTickets = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams
) => {
  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive" as const,
    },
  };
  const take = searchParams.size;
  const skip = searchParams.size * searchParams.page;

  return await prisma.ticket.findMany({
    where,
    skip,
    take,
    orderBy: {
      // ...(searchParams.sort === "newest" && { createdAt: "desc" }),
      // ...(searchParams.sort === "bounty" && { bounty: "desc" }),
      [searchParams.sortKey]: searchParams.sortValue,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};
