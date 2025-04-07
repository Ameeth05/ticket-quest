import { notFound } from "next/navigation";
import TicketItem from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";

export default async function Page({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = await params;

  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }
  return (
    <>
      <div className="flex justify-center w-full animate-fade-in-from-top">
        <TicketItem ticket={ticket} isDetail={true} />
      </div>
      {/* <RedirectToast /> */}
    </>
  );
}
