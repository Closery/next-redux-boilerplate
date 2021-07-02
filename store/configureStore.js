import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import reducer from './reducer'
import logger from './middleware/logger'
import api from './middleware/api'

export default function configureAppStore() {
	return configureStore({
		reducer,
		middleware: [...getDefaultMiddleware(), logger(), api],
	})
}
