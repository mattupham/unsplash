import { NextApiRequest, NextApiResponse } from "next";
import { createApi, Orientation, SearchOrderBy } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || "",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { orderBy, orientation } = req.query;

      const response = await unsplashApi.search.getPhotos({
        query: "nature",
        page: 1,
        perPage: 6,
        orderBy: orderBy as SearchOrderBy,
        orientation: orientation as Orientation,
      });

      res.status(200).json(response?.response?.results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch photos from Unsplash" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
