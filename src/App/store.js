import {configureStore} from "@reduxjs/toolkit"
import todoReducer from "../features/Todo/todoSlice"
export const store=configureStore({
reducer:todoReducer
})