import type { ReactNode } from "react";
import type { ServerFunctionClient } from "payload";

import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";

/* Payload admin CSS — REQUIRED for the admin UI to render properly */
import "@payloadcms/next/css";

/* Itaicy brand overrides (colors, typography, elevation tokens) */
import "./custom.scss";

import config from "../../payload.config";
import { importMap } from "./admin/importMap";

export default function Layout({ children }: { children: ReactNode }) {
  const serverFunction: ServerFunctionClient = async (args) => {
    "use server";
    return handleServerFunctions({
      ...args,
      config,
      importMap,
    });
  };

  return RootLayout({
    children,
    config,
    importMap,
    serverFunction,
  });
}
