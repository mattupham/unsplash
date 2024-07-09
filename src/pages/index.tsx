import { Input } from "@/components/ui/input";

import { Pagination } from "@/components/Pagination";

import { Select } from "@/components/Select";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Orientation, SearchOrderBy } from "unsplash-js";

const inter = Inter({ subsets: ["latin"] });

const DEFAULTS: {
  page: number;
  orderBy: SearchOrderBy;
  orientation: Orientation;
} = {
  page: 1,
  orderBy: "latest",
  orientation: "squarish",
};

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

export default function Home() {
  const router = useRouter();

  const {
    page = DEFAULTS.page,
    orderBy = DEFAULTS.orderBy,
    orientation = DEFAULTS.orientation,
  } = router.query;

  // Update the URL query params on first render
  useEffect(() => {
    router.replace(
      {
        pathname: router.pathname,
        query: {
          page: page || DEFAULTS.page,
          orderBy: orderBy || DEFAULTS.orderBy,
          orientation: orientation || DEFAULTS.orientation,
        },
      },
      undefined,
      { shallow: true }
    );
  }, []);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchImages = async () => {
    const response = await axios.get(
      `/api/unsplash?query=${debouncedSearchQuery}&orderBy=${orderBy}&orientation=${orientation}&page=${page}`
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["images", debouncedSearchQuery, orderBy, orientation, page],
    queryFn: fetchImages,
    enabled: debouncedSearchQuery.length > 0,
  });

  const handlePaginationChange = (newPage: number) => {
    router.push(
      { pathname: router.pathname, query: { page: newPage } },
      undefined,
      { shallow: true }
    );
  };

  const handleSelectChange = (
    value: string,
    key: "orderBy" | "orientation"
  ) => {
    router.replace(
      { pathname: location.pathname, query: { ...router.query, [key]: value } },
      undefined,
      { shallow: true }
    );
  };

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
          <Select
            selectedValue={orderBy as string}
            placeholder="Sort"
            options={sortOptions}
            onValueChange={(value) => handleSelectChange(value, "orderBy")}
          />

          <Select
            selectedValue={orientation as string}
            placeholder="Filter"
            options={filterOptions}
            onValueChange={(value) => handleSelectChange(value, "orientation")}
          />
        </div>
      </div>

      <div className="h-[500px] overflow-y-auto">
        {error ? (
          <p>Error fetching images</p>
        ) : isLoading ? (
          <div className="grid grid-cols-3 gap-4 mb-4">
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} className="h-[210px] w-[210px]" />
            ))}
          </div>
        ) : data === undefined ? (
          <div className="flex justify-center items-center w-full h-full">
            <p className="text-lg font-semibold text-gray-600">
              Please search for a photo
            </p>
          </div>
        ) : data?.length === 0 ? (
          <div className="flex justify-center items-center w-full h-full">
            <p className="text-lg font-semibold text-gray-600">
              No Photos found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 mb-4">
            {data?.map(
              (image: {
                id: string;
                alt_description: string;
                urls: { regular: string };
              }) => (
                <Image
                  key={image.id}
                  alt={image.alt_description}
                  width={400}
                  height={400}
                  src={image.urls.regular}
                />
              )
            )}
          </div>
        )}
      </div>

      {!error && data?.length > 0 && (
        <Pagination page={page} handleChange={handlePaginationChange} />
      )}
    </main>
  );
}
