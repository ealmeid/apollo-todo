import { Html, Head, Main, NextScript } from "next/document";
import { fontSans } from "./_app";

import { cn } from "@/lib/utils";

export default function Document() {
  return (
    <Html lang="en" className={cn(fontSans.variable)}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
