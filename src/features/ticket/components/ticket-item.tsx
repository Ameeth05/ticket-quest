import { Prisma } from "@prisma/client";
import {
  LucideMoreVertical,
  LucidePencil,
  SquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import Comments from "@/features/comment/components/comments";
import { CommentWithMetadata } from "@/features/comment/types";
import { cn } from "@/lib/utils";
import { ticketEditPath, ticketPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";
import { TICKET_ICONS } from "../constants";
import TicketMoreMenu from "./ticket-more-menu";

type TicketItemProps = {
  ticket: Prisma.TicketGetPayload<{
    include: {
      user: {
        select: {
          username: true;
        };
      };
    };
  }>;
  isDetail?: boolean;
  paginatedComments?: {
    list: CommentWithMetadata[];
    metadata: { count: number; hasNextPage: boolean };
  };
};

export default async function TicketItem({
  ticket,
  isDetail,
  paginatedComments,
}: TicketItemProps) {
  const { user } = await getAuth();
  const isTicketOwner = isOwner(user, ticket);

  const detailButton = (
    <Button asChild size="icon" variant="outline">
      <Link prefetch href={ticketPath(ticket.id)}>
        <SquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  const editButton = isTicketOwner ? (
    <Button asChild size="icon" variant="outline">
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  ) : null;

  // const deleteButton = (
  //   // One way of using action
  //   // <form
  //   //   action={async () => {
  //   //     "use server";
  //   //     deleteTicket(ticket.id);
  //   //   }}
  //   // >

  //   <form action={deleteTicket.bind(null, ticket.id)}>
  //     <Button variant="outline" size="icon">
  //       <LucideTrash className="h-4 w-4" />
  //     </Button>
  //   </form>
  // );

  const moreMenu = isTicketOwner ? (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  ) : null;

  return (
    <div
      className={cn("w-full flex flex-col gap-y-4", {
        "max-w-[420px]": !isDetail,
        "max-w-[580px]": isDetail,
      })}
    >
      <div className="flex gap-x-2">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex gap-x-2">
              <span>{TICKET_ICONS[ticket.status]}</span>
              <span className={"font-bold truncate"}>{ticket.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span
              className={cn("whitespace-break-spaces", {
                "line-clamp-3": !isDetail,
              })}
            >
              {ticket.content}
            </span>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {ticket.deadline} by {ticket.user.username}
            </p>
            <p className="text-sm text-muted-foreground">
              {toCurrencyFromCent(ticket.bounty)}
            </p>
          </CardFooter>
        </Card>
        <div className="flex flex-col gap-y-1">
          {isDetail ? (
            <>
              {editButton}
              {moreMenu}
            </>
          ) : (
            <>
              {detailButton}
              {editButton}
            </>
          )}
        </div>
      </div>
      {isDetail ? (
        // We are using suspense here so that when the ticket is laoded first, it can be displayed even before comments are loaded. As a suspense fallback, we are rendering a skeleton while the comments are bieng fetched. In the individual ticket page initially we were first fetching ticket and then we are fetching the comments. This is called waterfall/sequential execution of get request. That is why suspense is required here.

        // Later on we changed from sequential data fetching (first ticket and then comments) to parallel data fetching by fetching both the ticket and comments on the main ticket page by using await promise.all, instead of awaiting each request (ticket and commets) sequentially. The suspense code below might not be required if we are fetching data parallelly, but it is still being used for educational purposes so that when I come back later on I understand how suspense is bieng used.

        <Suspense
          fallback={
            <div className="flex flex-col gap-y-4">
              <Skeleton className="h-[250px] w-full" />
              <Skeleton className="h-[80px] ml-8 " />
              <Skeleton className="h-[80px] ml-8 " />
            </div>
          }
        >
          <Comments
            ticketId={ticket.id}
            paginatedComments={paginatedComments}
          />
        </Suspense>
      ) : null}
    </div>
  );
}
