import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Toaster position="top-right" />
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
