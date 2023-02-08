import React from "react";
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ErrorBoundary from "../components/ErrorBoundary";

import '../styles/globals.scss';
import { Provider } from "mobx-react";
import { RootStore } from "../system/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      structuralSharing: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Test app</title>
          <meta name="description" content="test app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
