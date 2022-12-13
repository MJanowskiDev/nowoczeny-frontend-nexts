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
  const { mutate, status } = useAddToNewsletterMutation();
  return <NewsletterFormView onSubmit={mutate} status={status} />;
};

interface NewsletterFormViewProps {
  onSubmit: (formData: NewsletterFormData) => void;
  status: "error" | "idle" | "loading" | "success";
}

export const NewsletterFormView = ({
  onSubmit,
  status,
}: NewsletterFormViewProps) => {
  const { register, handleSubmit } = useForm<NewsletterFormData>({
    resolver: yupResolver(newsletterFormSchema),
  });

  const doSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <>
      {status === "loading" && <p>Is loading</p>}
      {status === "error" && <p>Is error</p>}
      {status === "success" && <p>isSuccess</p>}

      <form onSubmit={doSubmit}>
        <div>
          <label className="mb-1 block text-sm text-gray-600" htmlFor="email">
            E-mail
          </label>

          <input
            className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
            type="email"
            id="email"
            placeholder="Enter your e-mail"
            data-testid="email-newsletter-input"
            {...register("email")}
          />
        </div>

        <button
          className="block w-full rounded-lg bg-black p-2.5 text-sm text-white"
          type="submit"
          data-testid="email-newsletter-submit"
        >
          Subscribe
        </button>
      </form>
    </>
  );
};
