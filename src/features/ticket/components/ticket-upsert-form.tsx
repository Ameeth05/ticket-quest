"use client";

import { Ticket } from "@prisma/client";
import { useActionState } from "react";
import FieldError from "@/components/form/field-error";
import { useActionFeedback } from "@/components/form/hooks/use-action-feedback";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../actions/upsert-ticket";

type TicketUpsertProps = {
  ticket?: Ticket;
};

export default function TicketUpsertForm({ ticket }: TicketUpsertProps) {
  //It's worth noting that the useActionState hook is returning an array with three elements: the first element is the action state, the second element is the action function, and the third element is a boolean that indicates whether the action is pending. Therefore we can caompletelty replace useFormStatus hook with useActionState hook and still get the pending state of the form submission. Moreover, we dont have to create a component like we did for SubmitButton in oder to use "useFormStatus hook"

  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE
  );

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      console.log(actionState.message);
    },
    onError: ({ actionState }) => {
      console.log(actionState.message);
    },
  });

  return (
    <form action={action} className="flex flex-col gap-3">
      {/* The following is the first option to pass the id through the form data or we can bind to the server actions*/}
      {/* <Input name="id" type="hidden" defaultValue={ticket.id} /> */}
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
      />
      <FieldError actionState={actionState} name="title" />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
      />
      <FieldError actionState={actionState} name="content" />

      <SubmitButton label={ticket ? "Edit" : "Create"} />

      {actionState.message}
    </form>
  );
}
