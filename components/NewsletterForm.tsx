import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
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

  const onSubmit = handleSubmit(async (data) => {
    await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  });

  return (
    <>
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
