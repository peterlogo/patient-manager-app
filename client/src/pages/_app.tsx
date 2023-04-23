import '@/styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { store } from '@/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Patient Manager</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <MantineProvider>
          <ModalsProvider>
            <Notifications />
            <Component {...pageProps} />
          </ModalsProvider>
        </MantineProvider>
      </Provider>
    </>
  );
}
