import { nanoid, createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('toDoList'))
  ? JSON.parse(localStorage.getItem('toDoList'))
  : {
      todos: [],
    };

// const initialState = {
//   todos: [],
// };

const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = { id: nanoid(), text: action.payload.text };
      state.todos.push(todo);
      localStorage.setItem('toDoList', JSON.stringify(state))
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      localStorage.setItem('toDoList', JSON.stringify(state))
    },
    clearTodo:(state) =>{
      state.todos.splice(0)
      localStorage.setItem('toDoList', JSON.stringify(state))
    },
    editTodo:(state, action)=>{
      const editTodoIndex = state.todos.findIndex((item)=>{
        return item.id === action.payload.id
      })
      state.todos.splice(editTodoIndex,1,action.payload)
      localStorage.setItem('toDoList', JSON.stringify(state))
    }
  },
});

export const { addTodo, clearTodo, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
