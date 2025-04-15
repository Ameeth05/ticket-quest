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

  // const tickets = await prisma.ticket.findMany({
  //   where,
  //   skip,
  //   take,
  //   orderBy: {
  //     // ...(searchParams.sort === "newest" && { createdAt: "desc" }),
  //     // ...(searchParams.sort === "bounty" && { bounty: "desc" }),
  //     [searchParams.sortKey]: searchParams.sortValue,
  //   },
  //   include: {
  //     user: {
  //       select: {
  //         username: true,
  //       },
  //     },
  //   },
  // });

  // const count = await prisma.ticket.count({
  //   where,
  // });

  // if prisma's transaction is used, if one query fails, automatically the other one's query's response is discarded

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
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
    }),
    prisma.ticket.count({
      where,
    }),
  ]);

  return {
    list: tickets,
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};
