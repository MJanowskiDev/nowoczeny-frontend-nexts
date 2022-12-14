import { NextApiHandler } from "next";
import { Stripe } from "stripe";
import { apolloClient } from "../../graphql/apolloClient";
import {
  GetProductDetailsBySlugDocument,
  GetProductDetailsBySlugQuery,
  GetProductDetailsBySlugQueryVariables,
} from "../../graphql/generated/gql-types";

const checkoutHandler: NextApiHandler = async (req, res) => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    res.status(500).json({ messge: "Missing stripe secret key!" });
    return;
  }

  const body = req.body as {
    slug: string;
    count: number;
  }[];

  const productList = await Promise.all(
    body.map(async (cartItem) => {
      const product = await apolloClient.query<
        GetProductDetailsBySlugQuery,
        GetProductDetailsBySlugQueryVariables
      >({
        query: GetProductDetailsBySlugDocument,
        variables: { slug: cartItem.slug },
      });
      return {
        cartItem: { ...product.data.products[0] },
        count: cartItem.count,
      };
    })
  );

  const stripe = new Stripe(stripeKey, { apiVersion: "2022-11-15" });

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "pl",
    payment_method_types: ["p24", "card"],
    success_url:
      "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/checkout/cancel",
    line_items: productList.map((product) => {
      return {
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 15,
        },
        price_data: {
          currency: "PLN",
          unit_amount: product.cartItem.price,
          product_data: {
            name: product.cartItem.name,
            images: product.cartItem.images.map((i) => i.url),
            metadata: {
              id: product.cartItem.slug,
            },
          },
        },
        quantity: product.count,
      };
    }),
  });

  res.status(201).json({ session: stripeCheckoutSession });
};

export default checkoutHandler;
