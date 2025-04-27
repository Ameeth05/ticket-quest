"use server";

import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

export const getComments = async (ticketId: string, cursor?: string) => {
  // Parse the cursor string to an object if present
  const parsedCursor = cursor
    ? (JSON.parse(cursor) as { id: string; createdAt: number })
    : undefined;
  const { user } = await getAuth();

  const where = {
    ticketId,
  };

  const take = 2;

  // eslint-disable-next-line prefer-const
  let [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      cursor: parsedCursor
        ? { id: parsedCursor.id, createdAt: new Date(parsedCursor.createdAt) }
        : undefined,
      skip: cursor ? 1 : 0,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      // skip,
      take: take + 1,
      orderBy: [{ id: "desc" }, { createdAt: "desc" }],
    }),
    prisma.comment.count({
      where,
    }),
  ]);

  const hasNextPage = comments.length > take;

  comments = hasNextPage ? comments.slice(0, -1) : comments;

  const lastComment = comments.at(-1);

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      count,
      hasNextPage,
      cursor: lastComment
        ? {
            id: lastComment.id,
            createdAt: lastComment.createdAt.valueOf(),
          }
        : undefined,
    },
  };
};
