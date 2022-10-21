import { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import Link from "next/link";
import { ProductDetails } from "../../components/Product";

import { serialize } from "next-mdx-remote/serialize";

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
          id: data.id,
          title: data.title,
          thumbnailAlt: data.title,
          thumbnailUrl: data.image,
          description: data.description,
          longDescription: data.longDescription,
          rating: data.rating.rate,
        }}
      />
    </div>
  );
};

export default ProductIdPage;

//SSG
export const getStaticPaths = async () => {
  const res = await fetch("https://naszsklep-api.vercel.app/api/products");
  const data: StoreApiResponse[] = await res.json();

  return {
    paths: data.map((product) => {
      return { params: { productId: product.id.toString() } };
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

  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${params.productId}`
  );

  const data: StoreApiResponse | null = await res.json();

  if (!data) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: { ...data, longDescription: await serialize(data.longDescription) },
    },
  };
};

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  longDescription: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type InferGetStaticPathsType<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? R
  : never;
