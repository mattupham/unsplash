import { Input } from "@/components/ui/input";

import { Pagination } from "@/components/Pagination";

import { Grid } from "@/components/Grid";
import { Select } from "@/components/Select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ColorId, SearchOrderBy } from "unsplash-js";

const inter = Inter({ subsets: ["latin"] });

export const DEFAULTS: {
  page: number;
  orderBy: SearchOrderBy;
  color: ColorId;
} = {
  page: 1,
  orderBy: "latest",
  color: "black",
};

const sortOptions: { value: SearchOrderBy; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "relevant", label: "Relevant" },
  { value: "editorial", label: "Editorial" },
];

const filterOptions: { value: ColorId; label: string }[] = [
  { value: "black", label: "Black" },
  { value: "black_and_white", label: "Black and White" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "magenta", label: "Magenta" },
  { value: "orange", label: "Orange" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "teal", label: "Teal" },
  { value: "white", label: "White" },
  { value: "yellow", label: "Yellow" },
];

export default function Home() {
  const router = useRouter();

  const {
    page = DEFAULTS.page,
    orderBy = DEFAULTS.orderBy,
    color = DEFAULTS.color,
  } = router.query;

  // Update the URL query params on first render
  useEffect(() => {
    router.replace(
      {
        pathname: router.pathname,
        query: {
          page: page || DEFAULTS.page,
          orderBy: orderBy || DEFAULTS.orderBy,
          color: color || DEFAULTS.color,
        },
      },
      undefined,
      { shallow: true }
    );
  }, []);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchString, setSearchString] = useState<string>("");

  const fetchImages = async () => {
    const response = await axios.get(
      `/api/unsplash?query=${searchQuery}&orderBy=${orderBy}&color=${color}&page=${page}`
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["images", searchQuery, orderBy, color, page],
    queryFn: fetchImages,
    enabled: !!searchQuery,
  });

  console.log("data: ", data);

  const handlePaginationChange = (newPage: number) => {
    router.push(
      {
        pathname: router.pathname,
        // page should not be less than 1
        query: { ...router.query, page: Math.max(newPage, 1) },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleSelectChange = (value: string, key: "orderBy" | "color") => {
    router.replace(
      { pathname: location.pathname, query: { ...router.query, [key]: value } },
      undefined,
      { shallow: true }
    );
  };

  return (
    <main
      className={`flex flex-col items-center justify-between p-24 md:p-12 mx-auto max-w-4xl gap-2 ${inter.className}`}
    >
      <h1 className="text-4xl font-bold py-8 text-center">Unsplash Gallery</h1>
      <form
        className="flex flex-col gap-2 w-full md:w-1/2"
        onSubmit={(e) => {
          e.preventDefault();
          setSearchQuery(searchString);
        }}
      >
        <div className="flex justify-between gap-2 w-full">
          <Input
            type="text"
            placeholder="Search photos..."
            className="flex-grow"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </div>

        <div className="flex justify-between gap-1 w-full">
          <Select
            selectedValue={orderBy as string}
            placeholder="Sort"
            options={sortOptions}
            onValueChange={(value) => handleSelectChange(value, "orderBy")}
          />

          <Select
            selectedValue={color as string}
            placeholder="Filter"
            options={filterOptions}
            onValueChange={(value) => handleSelectChange(value, "color")}
          />
        </div>
      </form>

      <div className="flex flex-col justify-between">
        <div className="flex items-center justify-center min-h-[500px]">
          {error ? (
            <div className="flex justify-center items-center h-full">
              <p>Error fetching images</p>
            </div>
          ) : isLoading ? (
            <Grid>
              {Array.from({ length: 6 }, (_, index) => (
                <Skeleton key={index} className="h-52 w-52" />
              ))}
            </Grid>
          ) : data === undefined ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-lg font-semibold">Please search for a photo</p>
            </div>
          ) : data?.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-lg font-semibold">No Photos found</p>
            </div>
          ) : (
            <Grid>
              {data?.map(
                (image: {
                  id: string;
                  alt_description: string;
                  urls: { thumb: string };
                }) => (
                  <div key={image.id} className="w-52 h-52 relative">
                    <Image
                      alt={image.alt_description}
                      layout="fill"
                      objectFit="contain"
                      src={image.urls.thumb}
                    />
                  </div>
                )
              )}
            </Grid>
          )}
        </div>
      </div>
      {!error && (
        <Pagination
          page={parseInt(page as string, 10)}
          handleChange={handlePaginationChange}
          hasMoreResults={!isLoading && data?.length > 0}
        />
      )}
    </main>
  );
}
