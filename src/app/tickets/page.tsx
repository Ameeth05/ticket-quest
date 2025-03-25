//import { useEffect, useState } from "react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Heading from "@/components/heading";
import Placeholder from "@/components/placeholder";
import Spinner from "@/components/spinner";
import TicketList from "@/features/ticket/components/ticket-list";
// import { Ticket } from "@/features/ticket/types";

export default async function Page() {
  // The following code is commented as it mimics client side data fetching making this a client component. However, all this code can be commented by making this component a server components and directly fetching data from the server making it easier for the developers to fetch data with lesser code and state management
  // const [tickets, setTickets] = useState<Ticket[]>([]);

  // useEffect(() => {
  //   const fetchTickets = async () => {
  //     const result = await getTickets();

  //     setTickets(result);
  //   };

  //   fetchTickets();
  // }, []);

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />
      <ErrorBoundary fallback={<Placeholder label="Something went Wrong!" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList></TicketList>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
