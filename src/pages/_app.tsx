import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";

import theme from "~/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </ChakraProvider>
  );
}

export default MyApp;
