export default async function Page({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = await params;
  return <h2>Ticket Page {ticketId}</h2>;
}
