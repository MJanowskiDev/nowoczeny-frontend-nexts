import { ReactNode } from "react";

interface SubmitButtonProps {
  children: ReactNode;
}
export const SubmitButton = ({ children }: SubmitButtonProps) => {
  return (
    <button
      className="block w-full rounded-lg bg-blue-600 text-white font-bold text-lg  text-md p-2.5"
      type="submit"
    >
      {children}
    </button>
  );
};
