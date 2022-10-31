import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type MDXResult = MDXRemoteSerializeResult<Record<string, unknown>>;

export const externalLinkRegex = "@https|http|ftp|mailto|file";
