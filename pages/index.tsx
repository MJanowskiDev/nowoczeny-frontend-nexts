import { Main } from "../components/Main";
import { useQuery, gql } from "@apollo/client";

const query = gql`
  query GetProductsList {
    products {
      id
      slug
      name
      price
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(query);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occured {JSON.stringify(error)}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Main>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Main>
    </div>
  );
};

export default Home;
