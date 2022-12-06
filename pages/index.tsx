import { useQuery, gql } from "@apollo/client";
import { NewsletterForm } from "../components/NewsletterForm";
import { apolloClient } from "../graphql/apolloClient";
import {
  CreateProductReviewDocument,
  CreateProductReviewMutation,
  CreateProductReviewMutationVariables,
  GetProductsListQueryVariables,
  GetProductsSlugsQueryVariables,
  CreateOrderMutationDocument,
  CreateOrderMutationMutation,
  CreateOrderMutationMutationVariables,

  // useCreateProductReviewMutation,
} from "../graphql/generated/gql-types";

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

  // const [createReview, createReviewResult] = useCreateProductReviewMutation();
  // const addReviewHook = () => {
  //   createReview({
  //     variables: {
  //       review: {
  //         headline: "First review sent from next app",
  //         name: "MJ",
  //         email: "mj@mj.mj",
  //         content: "Another review content",
  //         rating: 4,
  //       },
  //     },
  //   });
  // };

  const addReview = async () => {
    const data = await apolloClient.mutate<
      CreateProductReviewMutation,
      CreateProductReviewMutationVariables
    >({
      mutation: CreateProductReviewDocument,
      variables: {
        review: {
          headline: "First review sent from next app",
          name: "MJ",
          email: "mj@mj.mj",
          content: "Another review content",
          rating: 4,
        },
      },
    });

    console.log(data);
  };

  const addProduct = async () => {
    // const data = await apolloClient.mutate<
    //   CreateOrderMutationMutation,
    //   CreateOrderMutationMutationVariables
    // >({
    //   mutation: CreateOrderMutationDocument,
    //   variables: {
    //     order: {
    //       email: "mail@mail.pl",
    //       total: 2039,
    //       stripeCheckoutId: "!!stripe-checkout-id!!",
    //       orderItems: {
    //         create: [
    //           {
    //             quantity: 7,
    //             total: 35,
    //             product: {
    //               connect: {
    //                 id: "ckdu49mfc0h070102jgprxnj0",
    //               },
    //             },
    //           },
    //           {
    //             quantity: 1,
    //             total: 5,
    //             product: {
    //               connect: {
    //                 id: "ckdu48unc0gzq0158mbzvyzg3",
    //               },
    //             },
    //           },
    //           {
    //             quantity: 1,
    //             total: 1999,
    //             product: {
    //               connect: {
    //                 id: "ckdu44mn40gxh010405uwgbtw",
    //               },
    //             },
    //           },
    //         ],
    //       },
    //     },
    //   },
    // });

    console.log(data);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occured {JSON.stringify(error)}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen gap-6">
      <div>
        <h1>Newsletter form</h1>
        <NewsletterForm />
      </div>
      <div className="text-xl font-bold">Add review query</div>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={addReview}
      >
        Add review
      </button>

      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={addProduct}
      >
        Add order
      </button>
      <div>
        <div className="text-xl font-bold">Add review query</div>
        {/* <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addReviewHook}
        >
          Add review using hook
        </button> */}
        {/* <pre>{JSON.stringify(createReviewResult.data, null, 2)}</pre> */}
      </div>
      <div className="text-xl font-bold">Get product list JSON</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Home;
