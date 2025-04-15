import { PaginatedTicketMetadataProps } from "@/features/ticket/components/ticket-pagination";
import { Button } from "./ui/button";

type PageAndSize = {
  page: number;
  size: number;
};
type PaginationProps = {
  pagination: PageAndSize;
  onPagination: (pagination: PageAndSize) => void;
  paginatedMetadata: PaginatedTicketMetadataProps;
};
export default function Pagination({
  pagination,
  onPagination,
  paginatedMetadata: { count, hasNextPage },
}: PaginationProps) {
  const startOffset = pagination.page * pagination.size + 1;
  const endOffset = startOffset - 1 + pagination.size;
  const actualEndOffset = Math.min(endOffset, count);

  const label = `${startOffset} - ${actualEndOffset} of ${count} Tickets`;

  const handleNextPage = () => {
    onPagination({
      ...pagination,
      page: pagination.page + 1,
    });
  };
  const handlePreviousPage = () => {
    onPagination({
      ...pagination,
      page: pagination.page - 1,
    });
  };

  const previousButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={pagination.page < 1}
      onClick={handlePreviousPage}
    >
      Previous
    </Button>
  );
  const nextButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={!hasNextPage}
      onClick={handleNextPage}
    >
      Next
    </Button>
  );

  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex gap-x-2">
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
}
