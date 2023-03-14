import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import Layout from "@/components/Layout"
import { Cairo, Open_Sans } from "@next/font/google"

const cairo = Cairo({ subsets: ["latin"] })
const open_sans = Open_Sans({subsets: ['latin']})

const theme = extendTheme({
	fonts: {
		heading: open_sans.style.fontFamily,
		body: cairo.style.fontFamily,
	},
	shadows: {
		gray: '10px 0px 10px 0px rgba(179, 179, 179, 0.2);'
	}
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ChakraProvider>
	)
}
