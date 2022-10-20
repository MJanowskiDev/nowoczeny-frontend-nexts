import ReactMarkdown from "react-markdown";
import Link from "next/link";

export const NextMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, ...props }) => {
          if (!href) {
            return <a {...props}></a>;
          } else {
            return (
              <Link href={href}>
                <a {...props}></a>
              </Link>
            );
          }
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
