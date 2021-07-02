import axios from 'axios'
import nextConfig from 'next/config'
import { createAction } from '@reduxjs/toolkit'
const { serverRuntimeConfig, publicRuntimeConfig } = nextConfig()

// Actions
export const apiCallBegan = createAction('api/callBegan')
export const apiCallSuccess = createAction('api/callSuccess')
export const apiCallFailed = createAction('api/callFailed')

const api =
	({ dispatch }) =>
	(next) =>
	async (action) => {
		if (action.type !== apiCallBegan.type) return next(action)

		const { url, method, data, onStart, onSuccess, onError } = action.payload

		if (onStart) dispatch({ type: onStart })
		next(action)

		try {
			const response = await axios.request({
				baseURL: publicRuntimeConfig.API_URL,
				url,
				method,
				data,
			})

			dispatch(apiCallSuccess(response.data.content))
			if (onSuccess) dispatch({ type: onSuccess, payload: response.data.content })
		} catch (error) {
			dispatch(apiCallFailed(error.message))
			if (onError) dispatch({ type: onError, payload: error.message })
		}
	}

export default api
