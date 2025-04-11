import { getTickets } from "../queries/get-tickets";
import TicketItem from "./ticket-item";

type TicketListProps = {
  userId?: string;
};

export default async function TicketList({ userId }: TicketListProps) {
  const tickets = await getTickets(userId);
  return (
    <div className="flex-1 w-full flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
