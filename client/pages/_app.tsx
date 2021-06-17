import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import theme from "../theme";
import { UserProvider } from "../utils/userContext";

function MyApp({ Component, pageProps }: any) {
  return (
    <UserProvider>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: false,
            initialColorMode: "dark",
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </UserProvider>
  );
}

export default MyApp;
