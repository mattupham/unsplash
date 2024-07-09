import { NextApiRequest, NextApiResponse } from "next";
import { ColorId, createApi, SearchOrderBy } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || "",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { query = "", orderBy, color, page = 1 } = req.query;

      const response = await unsplashApi.search.getPhotos({
        query: query as string,
        page: parseInt(page as string, 10),
        perPage: 6,
        orderBy: orderBy as SearchOrderBy,
        color: color as ColorId,
      });

      console.log("response", response.response?.results);

      res.status(200).json(response?.response?.results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch photos from Unsplash" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
