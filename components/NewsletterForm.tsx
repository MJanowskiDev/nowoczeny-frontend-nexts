import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from "yup";

const useAddToNewsletterMutation = () => {
  return useMutation(
    "add-to-newsletter",
    async ({ email }: { email: string }) => {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    }
  );
};
const newsletterFormSchema = yup
  .object({
    email: yup.string().required().email(),
  })
  .required();

type NewsletterFormData = yup.InferType<typeof newsletterFormSchema>;

export const NewsletterForm = () => {
  const { register, setValue, handleSubmit, formState } =
    useForm<NewsletterFormData>({
      resolver: yupResolver(newsletterFormSchema),
    });

  const { mutate, isLoading, isSuccess, isError } =
    useAddToNewsletterMutation();
  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <>
      {isLoading && <p>Is loading</p>}
      {isError && <p>Is error</p>}
      {isSuccess && <p>isSuccess</p>}

      <form onSubmit={onSubmit}>
        <div>
          <label className="mb-1 block text-sm text-gray-600" htmlFor="email">
            E-mail
          </label>

          <input
            className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
            type="email"
            id="email"
            placeholder="Enter your e-mail"
            {...register("email")}
          />
        </div>

        <button
          className="block w-full rounded-lg bg-black p-2.5 text-sm text-white"
          type="submit"
        >
          Subscribe
        </button>
      </form>
    </>
  );
};
