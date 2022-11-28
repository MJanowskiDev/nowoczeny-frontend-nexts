import { NextApiHandler } from "next";

const stripeWebhook: NextApiHandler = (req, res) => {
  console.log("stripe Weebhok:", req.body);

  res.status(204).end();
};

export default stripeWebhook;
