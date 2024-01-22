import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter as FontSans } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { createApolloClient } from "@/lib/apollo";
import { Toaster } from "@/components/ui/sonner";

import { NavBar } from "@/components";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  const client = createApolloClient();

  return (
    <ClerkProvider>
      <ApolloProvider client={client}>
        <main
          className={cn(
            "p-8 h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Toaster />
          <NavBar />
          <Component {...pageProps} />
        </main>
      </ApolloProvider>
    </ClerkProvider>
  );
}
