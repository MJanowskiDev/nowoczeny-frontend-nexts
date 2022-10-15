import { useQuery } from "react-query";
import { ProductDetails } from "../components/Product";

const getProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data: StoreApiResponse[] = await res.json();

  return data;
};
const ProductsPage = () => {
  const { data, isLoading, error } = useQuery("products", getProducts);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data || error) {
    return <div>Coś poszło nie tak</div>;
  }

  return (
    <ul className="grid  gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {data.map((product) => {
        return (
          <li key={product.id} className="shadow-xl border-2">
            <ProductDetails
              data={{
                id: product.id,
                description: product.description,
                title: product.title,
                thumbnailAlt: product.title,
                thumbnailUrl: product.image,
                rating: product.rating.rate,
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default ProductsPage;
