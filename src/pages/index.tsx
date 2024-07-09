import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { Orientation, SearchOrderBy } from "unsplash-js";

const inter = Inter({ subsets: ["latin"] });

interface SelectDropdownProps {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}

const SelectDropdown = ({
  selectedValue,
  setSelectedValue,
  placeholder,
  options,
}: SelectDropdownProps) => (
  <Select value={selectedValue} onValueChange={setSelectedValue}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{placeholder} Options</SelectLabel>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default function Home() {
  const [selectedSort, setSelectedSort] = useState<SearchOrderBy>("latest");
  const [selectedFilter, setSelectedFilter] = useState<Orientation>("squarish");
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const sortOptions: { value: SearchOrderBy; label: string }[] = [
    { value: "latest", label: "Latest" },
    { value: "relevant", label: "Relevant" },
    { value: "editorial", label: "Editorial" },
  ];

  const filterOptions: { value: Orientation; label: string }[] = [
    { value: "landscape", label: "Landscape" },
    { value: "portrait", label: "Portrait" },
    { value: "squarish", label: "Squarish" },
  ];

  const fetchImages = async () => {
    const response = await axios.get(
      `/api/unsplash?query=${debouncedSearchQuery}&orderBy=${selectedSort}&orientation=${selectedFilter}&page=${page}`
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["images", debouncedSearchQuery, selectedSort, page],
    queryFn: fetchImages,
    enabled: debouncedSearchQuery.length > 0,
  });

  console.log("data: ", data);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 mx-auto max-w-4xl gap-2 ${inter.className}`}
    >
      <div className="flex flex-col gap-2 w-1/2">
        <Input
          type="text"
          placeholder="Search photos..."
          className="w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex justify-between gap-2 w-full">
          <SelectDropdown
            selectedValue={selectedSort}
            setSelectedValue={setSelectedSort}
            placeholder="Sort"
            options={sortOptions}
          />

          <SelectDropdown
            selectedValue={selectedFilter}
            setSelectedValue={setSelectedFilter}
            placeholder="Filter"
            options={filterOptions}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {isLoading ? (
          <>
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} className="h-[210px] w-[210px]" />
            ))}
          </>
        ) : error ? (
          <p>Error fetching images</p>
        ) : (
          data?.map((image) => (
            <Image
              key={image.id}
              alt={image.alt_description}
              width={400}
              height={400}
              src={image.urls.regular}
            />
          ))
        )}
      </div>

      <Pagination className="mb-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
