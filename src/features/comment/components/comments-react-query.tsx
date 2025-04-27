"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import CardCompact from "@/components/card-compact";
import { Button } from "@/components/ui/button";
import { PaginatedData } from "@/types/pagination";
import { getComments } from "../queries/get-comments";
import { CommentWithMetadata } from "../types";
import CommentCreateForm from "./comment-create-form";
import CommentDeleteButton from "./comment-delete-button";
import CommentItem from "./comment-item";

type CommentsProps = {
  ticketId: string;
  paginatedComments?: PaginatedData<CommentWithMetadata>;
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
  const queryKey = ["comments", ticketId];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage
          ? JSON.stringify(lastPage.metadata.cursor)
          : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [undefined],
      },
    });

  const comments = data.pages.flatMap((page) => page.list);

  // const [metadata, setMetadata] = useState(paginatedComments.metadata);
  // const [comments, setComments] = useState(paginatedComments.list);

  const queryClient = useQueryClient();

  const handleMore = () => {
    fetchNextPage();
    
    // const morePaginatedComments = await getComments(ticketId, metadata.cursor);
    // const moreComments = morePaginatedComments.list;
    // setComments([...comments, ...moreComments]);
    // setMetadata(morePaginatedComments.metadata);
  };

  const handleDeleteComment = () => {
    // refetch(); refect can also be used to refetch the comments but it will not update the cache. This will cause result in stale comments data if comments are being used in other components.
    queryClient.invalidateQueries({ queryKey });
    // setComments((prevComments) =>
    //   prevComments.filter((prevComment) => prevComment.id !== id)
    // );
  };

  const handleCreateComment = () => {
    // refetch();
    queryClient.invalidateQueries({ queryKey });
    // setComments((prevComments) => [comment, ...prevComments]);
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
        {hasNextPage && (
          <Button
            onClick={handleMore}
            variant="ghost"
            disabled={isFetchingNextPage}
          >
            More
          </Button>
        )}
      </div>
    </>
  );
}
