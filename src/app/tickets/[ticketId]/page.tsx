import { initialTickets } from "@/data";

export default async function Page({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = await params;

  const ticket = initialTickets.find((ticket) => ticket.id === ticketId);

  if (!ticket) {
    return <p>{`Ticket ${ticketId} not found`}</p>
  }
  return (
    <div>
      <h2 className = "text-lg">{ticket.title}</h2>
      <p className = "text-sm">{ticket.content}</p>
    </div>
  )
}
