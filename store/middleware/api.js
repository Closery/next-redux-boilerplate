import axios from 'axios'
import nextConfig from 'next/config'
import { createAction } from '@reduxjs/toolkit'
const { serverRuntimeConfig, publicRuntimeConfig } = nextConfig()
import toast from 'react-hot-toast'

// Actions
export const apiCallBegan = createAction('api/callBegan')
export const apiCallSuccess = createAction('api/callSuccess')
export const apiCallFailed = createAction('api/callFailed')

const api =
	({ dispatch }) =>
	(next) =>
	async (action) => {
		if (action.type !== apiCallBegan.type) return next(action)

		const {
			url,
			method,
			data,
			onStart,
			onSuccess,
			onSuccessMsg,
			onError,
			onErrorMsg,
			showLoadingToast = true,
			showToastOnSuccess = true,
			showToastOnError = true,
		} = action.payload

		if (onStart) dispatch({ type: onStart })
		next(action)

		var toastId
		if (showLoadingToast) {
			toastId = toast.loading('Processing...')
		}
		try {
			const response = await axios.request({
				baseURL: publicRuntimeConfig.API_URL,
				url,
				method,
				data,
			})

			if (toastId) toast.dismiss(toastId)
			dispatch(apiCallSuccess(response.data.content))

			if (onSuccess) dispatch({ type: onSuccess, payload: response.data.content })
			if (showToastOnSuccess) toast.success(onSuccessMsg ? onSuccessMsg : 'Operation successful!')
		} catch (error) {
			if (toastId) toast.dismiss(toastId)
			dispatch(apiCallFailed(error.message))

			if (onError) dispatch({ type: onError, payload: error.message })
			if (showToastOnError) toast.error(onErrorMsg ? onErrorMsg : error.message)
		}
	}

export default api
