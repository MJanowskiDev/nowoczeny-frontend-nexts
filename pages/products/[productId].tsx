import { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import Link from "next/link";
import { ProductDetails } from "../../components/Product";

import { serialize } from "next-mdx-remote/serialize";
import { gql } from "@apollo/client";
import { apolloClient } from "../../graphql/apolloClient";

const ProductIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Not found...</div>;
  }

  return (
    <div>
      <Link href={"/products"}>
        <a>Go back</a>
      </Link>
      <ProductDetails
        data={{
          id: data.slug,
          title: data.name,
          thumbnailAlt: data.name,
          thumbnailUrl: data.images[0].url,
          description: "",
          longDescription: data.description,
          rating: 5,
        }}
      />
    </div>
  );
};

export default ProductIdPage;

//SSG
export const getStaticPaths = async () => {
  const query = gql`
    query GetProductsSlugs {
      products {
        slug
      }
    }
  `;

  const { data } = await apolloClient.query<GetProductsSlugsResponse>({
    query,
  });

  return {
    paths: data.products.map((product) => {
      return { params: { productId: product.slug } };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ productId: string }>) => {
  if (!params?.productId) {
    return { props: {}, notFound: true };
  }

  const query = gql`
    query GetProductDetailsBySlug($slug: String) {
      products(where: { slug: $slug }) {
        slug
        name
        price
        description
        images(first: 1) {
          url
        }
      }
    }
  `;

  const { data } = await apolloClient.query<ProductBySlug>({
    variables: { slug: params.productId },
    query,
  });

  if (!data || !data.products[0]) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...data.products[0],
        description: await serialize(data.products[0].description),
      },
    },
  };
};

interface ProductBySlug {
  products: Product[];
}

interface Product {
  slug: string;
  name: string;
  price: number;
  description: string;
  images: { url: string }[];
}

interface GetProductsSlugsResponse {
  products: Product[];
}

interface Product {
  slug: string;
}

export type InferGetStaticPathsType<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? R
  : never;
