import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../graphql/apolloClient";

import { Layout } from "../components/Layout";

import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import { CartStateContextProvider } from "../components/Cart/CartContext";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <CartStateContextProvider>
        <QueryClientProvider client={client}>
          <DefaultSeo {...SEO} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </CartStateContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
