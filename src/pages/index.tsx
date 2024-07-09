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
import { Inter } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

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
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
    { value: "popular", label: "Popular" },
  ];

  const filterOptions = [
    { value: "landscape", label: "Landscape" },
    { value: "portrait", label: "Portrait" },
    { value: "squarish", label: "Squarish" },
  ];

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 mx-auto max-w-4xl gap-2 ${inter.className}`}
    >
      <div className="flex flex-col gap-2 w-1/2">
        <Input type="text" placeholder="Search photos..." className="w-full" />

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
        <Image
          alt="image"
          width={400}
          height={400}
          src="https://images.unsplash.com/photo-1720378042263-bd1a33156bbb?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Image
          alt="image"
          width={400}
          height={400}
          src="https://images.unsplash.com/photo-1720378042263-bd1a33156bbb?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Image
          alt="image"
          width={400}
          height={400}
          src="https://images.unsplash.com/photo-1720378042263-bd1a33156bbb?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Image
          alt="image"
          width={400}
          height={400}
          src="https://images.unsplash.com/photo-1720378042263-bd1a33156bbb?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Image
          alt="image"
          width={400}
          height={400}
          src="https://images.unsplash.com/photo-1720378042263-bd1a33156bbb?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Image
          alt="image"
          width={400}
          height={400}
          src="https://images.unsplash.com/photo-1720378042263-bd1a33156bbb?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Image
          alt="image"
          width={400}
          height={400}
          src="https://images.unsplash.com/photo-1720378042263-bd1a33156bbb?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Image
          alt="image"
          width={400}
          height={400}
          src="https://images.unsplash.com/photo-1720378042263-bd1a33156bbb?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Image
          alt="image"
          width={400}
          height={400}
          src="https://images.unsplash.com/photo-1720378042263-bd1a33156bbb?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
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
