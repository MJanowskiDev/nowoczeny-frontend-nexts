import Image from "next/image";
import Link from "next/link";
import { Rating } from "./Rating";

import ReactMarkdown from "react-markdown";
import { NextSeo } from "next-seo";

interface ProductDetails {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
}

type ProductListItem = Pick<
  ProductDetails,
  "title" | "thumbnailAlt" | "thumbnailUrl" | "id"
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
        <ReactMarkdown className="p-4">{data.longDescription}</ReactMarkdown>
      </article>
      <Rating rating={data.rating} />
    </div>
  );
};

interface ProductListItemProps {
  data: ProductListItem;
}
export const ProductListItem = ({ data }: ProductListItemProps) => {
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
      <Link href={`/products/${data.id}/`}>
        <a>
          <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
        </a>
      </Link>
    </div>
  );
};
