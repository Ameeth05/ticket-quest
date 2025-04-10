import { notFound } from "next/navigation";
import CardCompact from "@/components/card-compact";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type TicketEditProps = {
  params: Promise<{
    ticketId: string;
  }>;
};
export default async function Page({ params }: TicketEditProps) {
  const { user } = await getAuth();
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  const isTicketOwener = isOwner(user, ticket);

  if (!ticket || !isTicketOwener) {
    return notFound();
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Edit Ticket"
        description="Edit your ticket"
        content={<TicketUpsertForm ticket={ticket} />}
        className="w-full max-w-[420px] animate-fade-in-from-top"
      />
    </div>
  );
}
