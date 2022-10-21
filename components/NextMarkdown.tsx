import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";

import { MDXResult } from "../utils";

export const NextMarkdown = ({ children }: { children: MDXResult }) => {
  return (
    <MDXRemote
      {...children}
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
    ></MDXRemote>
  );
};
