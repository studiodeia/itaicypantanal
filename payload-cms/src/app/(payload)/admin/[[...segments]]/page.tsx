import type { Metadata } from "next";

import { RootPage, generatePageMetadata } from "@payloadcms/next/views";

import config from "../../../../payload.config";
import { importMap } from "../importMap";

type Args = {
  params: Promise<{ segments?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page({ params, searchParams }: Args) {
  return RootPage({
    config,
    importMap,
    params: params as Promise<{ segments: string[] }>,
    searchParams: searchParams as Promise<{ [key: string]: string | string[] }>,
  });
}

export function generateMetadata({ params, searchParams }: Args): Promise<Metadata> {
  return generatePageMetadata({
    config,
    params: params as Promise<{ segments: string[] }>,
    searchParams: searchParams as Promise<{ [key: string]: string | string[] }>,
  });
}
