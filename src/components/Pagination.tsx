import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationShadcn,
} from "@/components/ui/pagination";

interface PaginationProps {
  page: number;
  handleChange: (page: number) => void;
}

export const Pagination = ({
  page,
  handleChange,
}: PaginationProps & { hasMoreResults?: boolean }) => (
  <PaginationShadcn className="mb-4">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious onClick={() => handleChange(page - 1)} />
      </PaginationItem>
      {Array.from({ length: 3 }, (_, i) => i + Math.max(page - 1, 1)).map(
        (number) => (
          <PaginationItem key={number}>
            <PaginationLink
              onClick={() => handleChange(number)}
              isActive={number === page}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        )
      )}

      <>
        <PaginationItem>
          <PaginationNext onClick={() => handleChange(page + 1)} />
        </PaginationItem>
      </>
    </PaginationContent>
  </PaginationShadcn>
);
