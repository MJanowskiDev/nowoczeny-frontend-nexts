import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return (
    <main className="flex-grow max-h-screen mx-auto max-w-5xl grid p-6 gap-6 sm:grid-cols-2">
      {children}
    </main>
  );
};
