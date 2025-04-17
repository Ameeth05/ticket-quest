"use client";

import React, { useActionState } from "react";
import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../actions/create-comment";

type CommentCreateFormProps = {
  ticketId: string;
};

export default function CommentCreateForm({
  ticketId,
}: CommentCreateFormProps) {
  const [actionState, createCommentAction] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE
  );
  return (
    <Form action={createCommentAction} actionState={actionState}>
      <Textarea name="content" placeholder="What's on your mind ..." />
      <FieldError name="content" actionState={actionState} />

      <SubmitButton label="Comment" />
    </Form>
  );
}
