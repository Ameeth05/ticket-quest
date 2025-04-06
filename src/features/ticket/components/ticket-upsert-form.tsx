"use client";

import { Ticket } from "@prisma/client";
import { useActionState, useRef } from "react";
import { DatePicker } from "@/components/date.picker";
import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fromCent } from "@/utils/currency";
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

  const datePickerImperativeHanlerRef = useRef<{
    reset: () => void;
  }>(null);

  const handleSucces = () => {
    datePickerImperativeHanlerRef.current?.reset();
  };

  return (
    <Form actionState={actionState} action={action} onSuccess={handleSucces}>
      {/* The following is the first option to pass the id through the form data or we can bind to the server actions.*/}
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

      <div className="flex gap-x-2 mb-1">
        <div className="w-1/2">
          <Label htmlFor="deadline">Deadline</Label>
          {/* 
            Apply the key to the DatePicker component to force it to re-initialize after form submission
            This maintains consistency with other form fields by:
            1. Not lifting state up (avoiding mixed controlled/uncontrolled pattern)
            2. Preserving the DatePicker's internal state management
            3. Using React's key mechanism to reset components when needed
          */}
          <DatePicker
            // key={actionState.timestamp}
            id="deadline"
            name="deadline"
            defaultValue={
              (actionState.payload?.get("deadline") as string) ??
              ticket?.deadline
            }
            imperativeHandleRef={datePickerImperativeHanlerRef}
          />
          <FieldError actionState={actionState} name="deadline" />
        </div>
        <div className="w-1/2">
          <Label htmlFor="bounty">Bounty ($)</Label>
          <Input
            id="bounty"
            name="bounty"
            type="number"
            step=".01"
            defaultValue={
              (actionState.payload?.get("bounty") as string) ??
              (ticket?.bounty ? fromCent(ticket.bounty) : "")
            }
          />
          <FieldError actionState={actionState} name="bounty" />
        </div>
      </div>

      <SubmitButton label={ticket ? "Edit" : "Create"} />

      {actionState.message}
    </Form>
  );
}
