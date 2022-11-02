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
  const { data } = await apolloClient.query<GetProductsListQuery>({
    query: GetProductsListDocument,
  });

  return {
    props: {
      data,
    },
  };
};

export default ProductsPage;
