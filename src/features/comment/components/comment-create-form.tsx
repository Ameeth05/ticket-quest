"use client";

import React, { useActionState } from "react";
import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/utils/to-action-state";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../actions/create-comment";
import { CommentWithMetadata } from "../types";

type CommentCreateFormProps = {
  ticketId: string;
  onCreateComment?: (comment: CommentWithMetadata) => void;
};

export default function CommentCreateForm({
  ticketId,
  onCreateComment,
}: CommentCreateFormProps) {
  const [actionState, createCommentAction] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE
  );

  const handleSuccess = (actionState: ActionState) => {
    onCreateComment?.(actionState.data as CommentWithMetadata);
  };
  return (
    <Form
      action={createCommentAction}
      actionState={actionState}
      onSuccess={handleSuccess}
    >
      <Textarea name="content" placeholder="What's on your mind ..." />
      <FieldError name="content" actionState={actionState} />

      <SubmitButton label="Comment" />
    </Form>
  );
}
