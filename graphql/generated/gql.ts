/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "query GetProductsList {\n  products {\n    id\n    slug\n    name\n    price\n    images(first: 1) {\n      url\n    }\n  }\n}\n\nquery GetProductDetailsBySlug($slug: String) {\n  products(where: {slug: $slug}) {\n    slug\n    name\n    price\n    description\n    images(first: 1) {\n      url\n    }\n  }\n}\n\nquery GetProductsSlugs {\n  products {\n    slug\n  }\n}": types.GetProductsListDocument,
};

export function graphql(source: "query GetProductsList {\n  products {\n    id\n    slug\n    name\n    price\n    images(first: 1) {\n      url\n    }\n  }\n}\n\nquery GetProductDetailsBySlug($slug: String) {\n  products(where: {slug: $slug}) {\n    slug\n    name\n    price\n    description\n    images(first: 1) {\n      url\n    }\n  }\n}\n\nquery GetProductsSlugs {\n  products {\n    slug\n  }\n}"): (typeof documents)["query GetProductsList {\n  products {\n    id\n    slug\n    name\n    price\n    images(first: 1) {\n      url\n    }\n  }\n}\n\nquery GetProductDetailsBySlug($slug: String) {\n  products(where: {slug: $slug}) {\n    slug\n    name\n    price\n    description\n    images(first: 1) {\n      url\n    }\n  }\n}\n\nquery GetProductsSlugs {\n  products {\n    slug\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;