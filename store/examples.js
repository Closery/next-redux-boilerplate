import { createSlice, createSelector } from '@reduxjs/toolkit'
import { apiCallBegan } from './middleware/api'

const slice = createSlice({
	name: 'examples',
	initialState: {
		list: [],
		detail: {},
		loading: false,
		error: null,
		isDeleted: false,
	},
	reducers: {
		requestStarted: (examples, action) => {
			examples.loading = true
		},
		requestFailed: (examples, action) => {
			examples.loading = false
			examples.error = action.payload
		},
		examplesReceived: (examples, action) => {
			examples.list = action.payload
			examples.detail = {}
			examples.loading = false
			examples.error = null
			examples.isDeleted = false
		},
		exampleDetailReceived: (examples, action) => {
			examples.detail = action.payload
			examples.loading = false
			examples.error = null
			examples.isDeleted = false
		},
		exampleDetailFailed: (examples, action) => {
			examples.detail = {}
			examples.loading = false
			examples.error = action.payload
		},
		exampleCreated: (examples, action) => {
			examples.list.push(action.payload)
			examples.detail = {}
			examples.loading = false
			examples.error = null
		},
		exampleUpdated: (examples, action) => {
			const index = examples.list.findIndex((example) => example.id === action.payload.id)
			const example = examples.list[index]

			examples.list[index] = { ...example, ...action.payload }
			examples.detail = {}
			examples.loading = false
			examples.error = null
		},
		exampleRemoved: (examples, action) => {
			examples.list = examples.list.filter((example) => example.id !== action.payload.id)
			examples.isDeleted = true
			examples.detail = {}
			examples.loading = false
			examples.error = null
		},
	},
})

const {
	requestStarted,
	requestFailed,
	examplesReceived,
	exampleDetailReceived,
	exampleDetailFailed,
	exampleCreated,
	exampleUpdated,
	exampleRemoved,
} = slice.actions
export default slice.reducer

// Action Creators
const url = '/examples'

export const GET_ExampleList = () =>
	apiCallBegan({
		url,
		method: 'get',
		onStart: requestStarted.type,
		onError: requestFailed.type,
		onSuccess: examplesReceived.type,
		onSuccessMsg: 'All data fetched successfully',
	})

export const GET_ExampleDetail = (id) =>
	apiCallBegan({
		url: `${url}/${id}`,
		method: 'get',
		onStart: requestStarted.type,
		onError: exampleDetailFailed.type,
		onSuccess: exampleDetailReceived.type,
		onSuccessMsg: 'Data fetched successfully',
	})

export const POST_CreateExample = (example) =>
	apiCallBegan({
		url,
		method: 'post',
		data: example,
		onStart: requestStarted.type,
		onError: requestFailed.type,
		onSuccess: exampleCreated.type,
		onSuccessMsg: 'Data created successfully',
	})

export const PATCH_UpdateExample = (id, example) =>
	apiCallBegan({
		url: `${url}/${id}`,
		method: 'patch',
		data: example,
		onStart: requestStarted.type,
		onError: requestFailed.type,
		onSuccess: exampleUpdated.type,
		onSuccessMsg: 'Data updated successfully',
	})

export const DELETE_Example = (id) =>
	apiCallBegan({
		url: `${url}/${id}`,
		method: 'delete',
		onStart: requestStarted.type,
		onError: requestFailed.type,
		onSuccess: exampleRemoved.type,
		onSuccessMsg: 'Data deleted successfully',
	})

// Selector
export const getError = createSelector(
	(state) => state.entities.examples.error,
	(error) => error
)

export const getIsDeleted = createSelector(
	(state) => state.entities.examples.isDeleted,
	(isDeleted) => isDeleted
)

export const getLoadingState = createSelector(
	(state) => state.entities.examples.loading,
	(loading) => loading
)

export const getExampleList = createSelector(
	(state) => state.entities.examples.list,
	(list) => list
)

export const getExampleDetail = createSelector(
	(state) => state.entities.examples.detail,
	(detail) => detail
)
