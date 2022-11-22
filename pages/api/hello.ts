// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

type Data = {
  name: string;
};

const handler: NextApiHandler<Data> = (req, res) => {
  res.status(200).json({ name: "MJ" });
};

export default handler;
