import { Button } from "./ui/button";

type PageAndSize = {
  page: number;
  size: number;
};
type PaginationProps = {
  pagination: PageAndSize;
  onPagination: (pagination: PageAndSize) => void;
};
export default function Pagination({
  pagination,
  onPagination,
}: PaginationProps) {
  const startOffset = pagination.page * pagination.size + 1;
  const endOffset = startOffset - 1 + pagination.size;

  const label = `${startOffset} - ${endOffset} of X`;

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
      disabled={false}
      onClick={handleNextPage}
    >
      Next
    </Button>
  );

  return (
    <div className="flex-row justify-between items-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex gap-x-2">
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
}
