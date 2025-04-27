"use client";

import { useState } from "react";
import CardCompact from "@/components/card-compact";
import { Button } from "@/components/ui/button";
import { getComments } from "../queries/get-comments";
import { CommentWithMetadata } from "../types";
import CommentCreateForm from "./comment-create-form";
import CommentDeleteButton from "./comment-delete-button";
import CommentItem from "./comment-item";

type CommentsProps = {
  ticketId: string;
  paginatedComments?: {
    list: CommentWithMetadata[];
    metadata: { count: number; hasNextPage: boolean; cursor?: number };
  };
};

export default function Comments({
  ticketId,
  paginatedComments = {
    list: [],
    metadata: { count: 0, hasNextPage: true, cursor: undefined },
  },
}: CommentsProps) {
  // const comments = await getComments(ticketId);
  // const { user } = await getAuth();

  const [comments, setComments] = useState(paginatedComments.list);
  const [metadata, setMetadata] = useState(paginatedComments.metadata);

  const handleMore = async () => {
    const morePaginatedComments = await getComments(ticketId, metadata.cursor);
    const moreComments = morePaginatedComments.list;

    setComments([...comments, ...moreComments]);
    setMetadata(morePaginatedComments.metadata);
  };

  const handleDeleteComment = (id: string) => {
    setComments((prevComments) =>
      prevComments.filter((prevComment) => prevComment.id !== id)
    );
  };

  const handleCreateComment = (comment: CommentWithMetadata) => {
    setComments((prevComments) => [comment, ...prevComments]);
  };

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={
          <CommentCreateForm
            ticketId={ticketId}
            onCreateComment={handleCreateComment}
          />
        } // Component composition
      />

      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            button={[
              // ...(isOwner(user, comment)
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      key="0"
                      id={comment.id}
                      onDeleteComment={handleDeleteComment}
                    />,
                  ]
                : []),
            ]}
          />
        ))}
      </div>

      <div className="flex flex-col justify-center ml-8">
        {metadata.hasNextPage && (
          <Button onClick={handleMore} variant="ghost">
            More
          </Button>
        )}
      </div>
    </>
  );
}
