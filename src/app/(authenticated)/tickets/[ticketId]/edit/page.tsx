import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import CardCompact from "@/components/card-compact";
import { Separator } from "@/components/ui/separator";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { homePath, ticketPath } from "@/paths";

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
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: homePath() },
          { title: ticket.title, href: ticketPath(ticket.id) },
          { title: "Edit" },
        ]}
      />

      <Separator />
      <div className="flex-1 flex flex-col justify-center items-center">
        <CardCompact
          title="Edit Ticket"
          description="Edit your ticket"
          content={<TicketUpsertForm ticket={ticket} />}
          className="w-full max-w-[420px] animate-fade-in-from-top"
        />
      </div>
    </div>
  );
}
