import { Ticket } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateTicket } from "../actions/update-ticket";

export default function TicketUpdateForm({ ticket }: { ticket: Ticket }) {
  return (
    <form
      action={updateTicket.bind(null, ticket.id)}
      className="flex flex-col gap-3"
    >
      {/* The following is the first option to pass the id through the form data or we can bind to the server actions*/}
      {/* <Input name="id" type="hidden" defaultValue={ticket.id} /> */}
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" type="text" defaultValue={ticket.title} />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={ticket.content} />

      <Button type="submit">Update</Button>
    </form>
  );
}
