import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      res.status(200).json({ min: 1, max: 100 });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
}
