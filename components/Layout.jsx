import Head from 'next/head'

export default function Layout({ children, title }) {
	return (
		<>
			<Head>
				<title>{title ? `${title} - NextJS with Redux` : 'NextJS with Redux'}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content="NextJS with Redux" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{children}
		</>
	)
}
