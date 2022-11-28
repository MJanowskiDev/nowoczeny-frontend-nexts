import { useRouter } from "next/router";

const SuccessPage = () => {
  const { query } = useRouter();

  return (
    <div>
      <p>Success!</p>
      <div>{query.session_id}</div>
    </div>
  );
};

export default SuccessPage;
