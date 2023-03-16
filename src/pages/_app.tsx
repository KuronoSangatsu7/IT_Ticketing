import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import Layout from "@/components/Layout"
import { Cairo, Open_Sans } from "next/font/google"

const cairo = Cairo({ subsets: ["latin"] })
const open_sans = Open_Sans({ subsets: ["latin"] })

const theme = extendTheme({
	fonts: {
		heading: open_sans.style.fontFamily,
		body: cairo.style.fontFamily,
	},
	shadows: {
		gray: "0px 0px 10px 10px rgba(179, 179, 179, 0.2);",
	},
	colors: {
		lighterBlue: "#697295",
		darkBlue: "#131a4e",
		darkerBlue: "#000069",
		backgroundGray: "#f0f1f5",
		activeItem: "#717694",
	},
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
