import Head from "next/head"

export default function Analytics() {
	return (
		<>
			<Head>
				<title>Analytics Report | IT Ticketing</title>
				<meta
					name="description"
					content="View analytics insights for your IT department"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta
					property="og:title"
					content="Analytics Report | IT Ticketing"
				/>
				<meta
					property="og:description"
					content="View analytics insights for your IT department"
				/>
				<meta
					property="og:image"
					content="https://it-ticketing.vercel.app/it_department.png"
				/>
			</Head>
			Analytics
		</>
	)
}
