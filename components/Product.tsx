import { Rating } from "./Rating";
interface ProductProps {
  data: {
    title: string;
    description: string;
    thumbnailUrl: string;
    thumbnailAlt: string;
    rating: number;
  };
}
export const Product = ({ data }: ProductProps) => {
  return (
    <div>
      <img src={data.thumbnailUrl} alt={data.thumbnailAlt}></img>
      <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
      <p className="p-4">{data.description}</p>
      <Rating rating={data.rating} />
    </div>
  );
};
