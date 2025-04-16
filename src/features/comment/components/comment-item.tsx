import { Card } from "@/components/ui/card";
import { CommentWithMetadata } from "../types";

type CommentItemProps = {
  comment: CommentWithMetadata;
};

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <Card className="flex-1 flex flex-col p-4 gap-y-1">
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          {comment.user?.username ?? "Deleted User"}
        </p>
        <p className="text-sm text-muted-foreground">
          {comment.createdAt.toLocaleString()}
        </p>
      </div>
      <p className="whitespace-pre-line">{comment.content}</p>
    </Card>
  );
}
