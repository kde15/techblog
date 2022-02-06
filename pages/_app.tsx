import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import nprogress from "nprogress";
import React, { useEffect, useState } from "react";
import { Header } from "~/components/Header";
import { Theme, useTheme } from "~/hooks/theme";
import "~/styles/globals.css";

nprogress.configure({ showSpinner: false, speed: 500, minimum: 0.25 });

function MyApp({ Component, pageProps }: AppProps) {
    const [theme, setTheme] = useState<Theme>("light");
    useTheme(theme);
    useEffect(() => {
        nprogress.done();
    });

    return (
        <ChakraProvider resetCSS={false}>
            <Head>
                <title>日々の技術学習録</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header theme={theme} setTheme={setTheme} />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
