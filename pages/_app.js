import '../styles/globals.css'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import configureStore from '../store/configureStore'

const store = configureStore()

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Toaster position="top-right" />
			<Component {...pageProps} />
		</Provider>
	)
}

export default MyApp
