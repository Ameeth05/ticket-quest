// import { getTicket } from "@/features/ticket/queries/get-ticket";

// export async function GET(
//   _request: Request,
//   { params }: { params: Promise<{ ticketId: string }> }
// ) {
//   const { ticketId } = await params;
//   const ticket = await getTicket(ticketId);

//   return Response.json(ticket);
// }


import { getTickets } from "@/features/ticket/queries/get-tickets";
import { searchParamsCache } from "@/features/ticket/search-params-types";


export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const untypedSearchParams = Object.fromEntries(searchParams);
  const typedSearchParams = searchParamsCache.parse(untypedSearchParams);

  const { list, metadata } = await getTickets(undefined, typedSearchParams);

  return Response.json({ list, metadata });
}