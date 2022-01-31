import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Header } from "components/Header";
import type { AppProps } from "next/app";
import Head from "next/head";
import nprogress from "nprogress";
import React, { useEffect } from "react";
import "styles/globals.css";

nprogress.configure({ showSpinner: false, speed: 500, minimum: 0.25 });

const themeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const theme = extendTheme({ colors: themeConfig });

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        nprogress.done();
    });

    return (
        <ChakraProvider resetCSS={false} theme={theme}>
            <Head>
                <title>日々の技術学習録</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
