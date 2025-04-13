import { Suspense } from "react";
import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import TicketList from "@/features/ticket/components/ticket-list";
import { SearchParamsProps } from "@/features/ticket/search-params-types";

type HomeProps = {
  searchParams: Promise<SearchParamsProps>
};

export default async function Home({ searchParams }: HomeProps) {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="All Tickets"
        description="Tickets by everyone at one place"
      />
      <Suspense fallback={<Spinner />}>
        <TicketList searchParams={ await searchParams} />
      </Suspense>
    </div>
  );
}
