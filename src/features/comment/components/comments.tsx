"use client";

import CardCompact from "@/components/card-compact";
import { CommentWithMetadata } from "../types";
import CommentCreateForm from "./comment-create-form";
import CommentDeleteButton from "./comment-delete-button";
import CommentItem from "./comment-item";

type CommentsProps = {
  ticketId: string;
  comments?: CommentWithMetadata[];
};

export default function Comments({ ticketId, comments = [] }: CommentsProps) {
  // const comments = await getComments(ticketId);
  // const { user } = await getAuth();

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={<CommentCreateForm ticketId={ticketId} />}
      />
      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            button={[
              // ...(isOwner(user, comment)
              ...(comment.isOwner
                ? [<CommentDeleteButton key="0" id={comment.id} />]
                : []),
            ]}
          />
        ))}
      </div>
    </>
  );
}
