import { combineReducers } from '@reduxjs/toolkit'
import examplesReducer from './examples'

export default combineReducers({
	examples: examplesReducer,
})
