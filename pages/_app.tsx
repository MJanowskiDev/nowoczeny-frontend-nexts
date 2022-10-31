import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import { Layout } from "../components/Layout";

import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import { CartStateContextProvider } from "../components/Cart/CartContext";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartStateContextProvider>
      <QueryClientProvider client={client}>
        <DefaultSeo {...SEO} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </CartStateContextProvider>
  );
}

export default MyApp;
