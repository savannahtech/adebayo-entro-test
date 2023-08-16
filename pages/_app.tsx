// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import AppTheme from './theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={AppTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp;