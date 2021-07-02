import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import reducer from './reducer'
import logger from './middleware/logger'

export default function configureAppStore() {
	return configureStore({
		reducer,
		middleware: [...getDefaultMiddleware(), logger()],
	})
}
