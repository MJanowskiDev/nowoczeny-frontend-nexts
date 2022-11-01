import { gql } from "@apollo/client";
import { InferGetStaticPropsType } from "next";
import { ProductListItem } from "../components/Product";
import { apolloClient } from "../graphql/apolloClient";

import {
  GetProductsListDocument,
  GetProductsListQuery,
} from "../graphql/generated/graphql";

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ul className="grid  gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {data.products.map((product) => {
        return (
          <li key={product.slug} className="shadow-xl border-2">
            <ProductListItem
              data={{
                id: product.slug,
                title: product.name,
                thumbnailAlt: product.name,
                thumbnailUrl: product.images[0].url,
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

//SSG
export const getStaticProps = async () => {
  const query = gql`
    query GetProductsList {
      products {
        id
        slug
        name
        price
        images(first: 1) {
          url
        }
      }
    }
  `;

  const { data } = await apolloClient.query<GetProductsListQuery>({ query });

  return {
    props: {
      data,
    },
  };
};

interface GetProductsListResponse {
  products: Product[];
}

interface Product {
  slug: string;
  name: string;
  price: number;
  images: { url: string }[];
}

export default ProductsPage;
