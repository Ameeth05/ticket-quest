//import { useEffect, useState } from "react";
import { Suspense } from "react";
import CardCompact from "@/components/card-compact";
// import { ErrorBoundary } from "react-error-boundary";
import Heading from "@/components/heading";
// import RedirectToast from "@/components/redirect-toast";
// import Placeholder from "@/components/placeholder";
import Spinner from "@/components/spinner";
import { getAuth } from "@/features/auth/queries/get-auth";
import TicketList from "@/features/ticket/components/ticket-list";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import { SearchParamsProps } from "@/features/ticket/search-params-types";
// import { Ticket } from "@/features/ticket/types";

// the following expression forces the page to be dynamic. For some reason next.js consideres this page to be static meaning it is built during build time and the content in the page wouldnt change irresepctive of data fetching happening on this page. Apparently this not the best practice
// export const dynamic = "force-dynamic";

// Revalidate this page every 30 seconds to ensure fresh data is served.
// This ensures that the page content is updated periodically without requiring a full rebuild. The page however is still considered a static page.
// This is called Time-based cache part of Incremental Static Regenaration (ISR)
//export const revalidate = 30;

type TicketsPageProps = {
  searchParams: Promise<SearchParamsProps>;
};

export default async function Page({ searchParams }: TicketsPageProps) {
  // The following code is commented as it mimics client side data fetching making this a client component. However, all this code can be commented by making this component a server components and directly fetching data from the server making it easier for the developers to fetch data with lesser code and state management
  // const [tickets, setTickets] = useState<Ticket[]>([]);

  // useEffect(() => {
  //   const fetchTickets = async () => {
  //     const result = await getTickets();

  //     setTickets(result);
  //   };

  //   fetchTickets();
  // }, []);

  const { user } = await getAuth();

  return (
    <>
      <div className="flex-1 flex flex-col gap-y-8">
        <Heading
          title="MY Tickets"
          description="All your tickets at one place"
        />

        <CardCompact
          title="Create Ticket"
          description="A new ticket will be created"
          content={<TicketUpsertForm />}
          className="w-full max-w-[420px] self-center"
        />

        {/* <ErrorBoundary fallback={<Placeholder label="Something went Wrong!" />}> */}
        <Suspense fallback={<Spinner />}>
          <TicketList searchParams={await searchParams} userId={user?.id} />
        </Suspense>
        {/* </ErrorBoundary> */}
      </div>
      {/* <RedirectToast /> */}
    </>
  );
}
