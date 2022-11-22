import Image from "next/image";
import Link from "next/link";
import { Rating } from "./Rating";
import { NextMarkdown } from "./NextMarkdown";

import { NextSeo } from "next-seo";
import { MDXResult } from "../utils";
import { useCartState } from "./Cart/CartContext";

import { ProductReviewContainer } from "./Comments/ProductReviewContainer";

interface ProductDetails {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: MDXResult;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
}

type ProductListItem = Pick<
  ProductDetails,
  "title" | "thumbnailAlt" | "thumbnailUrl" | "id" | "slug"
>;

interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <div>
      <div className="bg-white p-4">
        <NextSeo
          title={data.title}
          description={data.description}
          canonical={`https://naszsklep.vercel.app/products/${data.id}`}
          openGraph={{
            url: `https://naszsklep.vercel.app/products/${data.id}`,
            title: data.title,
            description: data.description,
            images: [
              {
                url: data.thumbnailUrl,
                alt: data.thumbnailAlt,
                type: "image/jpeg",
              },
            ],
            site_name: "Nasz sklep",
          }}
        />
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          layout="responsive"
          width={16}
          height={9}
          objectFit="contain"
        />
      </div>
      <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
      <p className="p-4">{data.description}</p>
      <article className="prose p-4 lg:prose-xl">
        <NextMarkdown>{data.longDescription}</NextMarkdown>
      </article>
      <Rating rating={data.rating} />
      <ProductReviewContainer productSlug={data.slug} />
    </div>
  );
};

interface ProductListItemProps {
  data: ProductListItem;
}
export const ProductListItem = ({ data }: ProductListItemProps) => {
  const { addItem } = useCartState();
  const onAddToCartClickHandle = () => {
    addItem({ id: data.id.toString(), price: 5, title: data.title });
  };
  return (
    <div>
      <div className="bg-white p-4">
        <Image
          layout="responsive"
          width={16}
          height={9}
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          objectFit="contain"
        />
      </div>
      <div className="p-4 flex flex-col justify-between h-44 ">
        <Link href={`/products/${data.id}/`}>
          <a>
            <h2 className="text-3xl font-bold pb-2">{data.title}</h2>
          </a>
        </Link>
        <button
          onClick={onAddToCartClickHandle}
          className="w-full inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
