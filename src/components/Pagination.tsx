import {
  PaginationContent,
  PaginationEllipsis,
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

export const Pagination = ({ page, handleChange }: PaginationProps) => (
  <PaginationShadcn className="mb-4">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious onClick={() => handleChange(page - 1)} />
      </PaginationItem>
      {[...Array(5)].map((_, i) => (
        <PaginationItem key={i}>
          <PaginationLink onClick={() => handleChange(i + 1)}>
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext onClick={() => handleChange((page || 0) + 1)} />
      </PaginationItem>
    </PaginationContent>
  </PaginationShadcn>
);
