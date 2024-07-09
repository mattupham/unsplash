import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const PaginationComponent = ({
  page,
  handlePaginationChange,
}: {
  page: number;
  handlePaginationChange: (page: number) => void;
}) => (
  <Pagination className="mb-4">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious onClick={() => handlePaginationChange(page - 1)} />
      </PaginationItem>
      {[...Array(5)].map((_, i) => (
        <PaginationItem key={i}>
          <PaginationLink onClick={() => handlePaginationChange(i + 1)}>
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext
          onClick={() => handlePaginationChange((page || 0) + 1)}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);
