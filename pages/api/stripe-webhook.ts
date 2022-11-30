import { NextApiHandler } from "next";
import { StripeWebhookEvents } from "../../stripeEvents";

const stripeWebhook: NextApiHandler = (req, res) => {
  console.log("stripe Weebhok:", req);

  const event = req.body as StripeWebhookEvents;

  switch (event.type) {
    case "checkout.session.completed":
      console.log("CURRENCY:", event.data.object.currency);
  }

  res.status(204).end();
};

export default stripeWebhook;
