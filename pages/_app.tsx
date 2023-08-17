// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react";
const AppTheme = extendTheme({
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
  },
});

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={AppTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp;