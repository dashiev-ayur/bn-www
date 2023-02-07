import { Provider } from "mobx-react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { store } from "../system/store";
import ErrorBoundary from "../components/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      structuralSharing: false,
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Head>
            <title>Test app</title>
            <meta name="description" content="test app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </Provider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
