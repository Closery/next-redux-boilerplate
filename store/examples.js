import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
	name: 'examples',
	initialState: {
		list: [],
		detail: {},
		loading: false,
		error: null,
		isDeleted: false,
	},
	reducers: {},
})

const {} = slice.actions
export default slice.reducer

// Action Creators
// Selector
