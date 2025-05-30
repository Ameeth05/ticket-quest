import Placeholder from "@/components/placeholder";
import { getTickets } from "../queries/get-tickets";
import { ParsedSearchParams } from "../search-params-types";
// import SearchInput from "./search-input";
// import SortSelect from "./sort-select";
import TicketItem from "./ticket-item";
import TicketPaginations from "./ticket-pagination";
import { TicketSearchInput } from "./ticket-search-input";
import { TicketSortSelect } from "./ticket-sort-select";

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

export default async function TicketList({
  userId,
  searchParams,
}: TicketListProps) {
  const { list: tickets, metadata: ticketMetadata } = await getTickets(
    userId,
    searchParams
  );
  return (
    <div className="flex-1 w-full flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      <div className="w-full max-w-[420px] flex gap-x-2">
        <TicketSearchInput placeholder="Search tickets ..." />
        <TicketSortSelect
          options={[
            { label: "Newest", sortKey: "createdAt", sortValue: "desc" },
            { label: "Bounty", sortKey: "bounty", sortValue: "desc" },
            { label: "Title", sortKey: "title", sortValue: "asc" },
          ]}
        />
      </div>
      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}

      <div className="w-full max-w-[420px] gap-x-2">
        <TicketPaginations paginatedTicketMetadata={ticketMetadata} />
      </div>
    </div>
  );
}
