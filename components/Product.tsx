import Link from "next/link";
import { Rating } from "./Rating";

interface ProductDetails {
  id: number;
  title: string;
  description: string;
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
      <img src={data.thumbnailUrl} alt={data.thumbnailAlt}></img>
      <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
      <p className="p-4">{data.description}</p>
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
      <img src={data.thumbnailUrl} alt={data.thumbnailAlt}></img>
      <Link href={`/products/${data.id}/`}>
        <a>
          <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
        </a>
      </Link>
    </div>
  );
};
