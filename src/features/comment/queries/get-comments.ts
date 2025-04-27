"use server";

import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

export const getComments = async (ticketId: string, cursor?: string) => {
  const { user } = await getAuth();

  const where = {
    ticketId,
    id: {
      lt: cursor
    }
    // createdAt: {
    //   lt: cursor ? new Date(cursor) : undefined,
    // },
  };

  // const skip = offset ?? 0;
  const take = 2;

  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      // skip,
      take,
      orderBy: {
        id: "desc",
      },
    }),
    prisma.comment.count({
      where,
    }),
  ]);

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      count,
      hasNextPage: true,
      // hasNextPage: count > skip + take,
      cursor: comments.at(-1)?.createdAt.valueOf(),
    },
  };
};
