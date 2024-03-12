import React, { useState } from "react";
import './Todo.css'
import { addTodo, removeTodo, clearTodo, editTodo } from "../features/Todo/todoSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Todo() {
  const [input, setInput] = useState({
    id: false,
    text: "",
  });
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);

  // console.log(todos, "sdsdsd");
  const handleTodoSubmit = (e) => {
    e.preventDefault();
    if (input.text.length > 0) {
      if(input.id){
        dispatch(editTodo(input))
        setInput({
          id: false,
          text: "",
        });
      }
      else{
        dispatch(addTodo(input));
      setInput({
        id: false,
        text: "",
      });
      }
    } else {
      toast.error("Enter the Activity first!");
    }
  };

  return (
    <>
      <h2 className="text-center my-4"> Todo App</h2>
      <div className="container my-4 d-flex justify-content-center ">
        <form onSubmit={handleTodoSubmit} className="row g-3">
          <div className="col-auto">
            <input
              type="text"
              className="form-control input"
              value={input.text}
              onChange={(e) =>
                setInput((previousState) => {
                  return {
                    ...previousState,
                    text: e.target.value,
                  };
                })
              }
              id="todoInput"
              placeholder="Enter activity"
            />
          </div>
          <div className="col-auto">
            {input.id ? (
              <>
                <button type="submit" className="btn btn-warning mb-3">
                  Edit
                </button>
              </>
            ) : (
              <>
                <button type="submit" className="btn btn-primary mb-3">
                  Add to Todo
                </button>
              </>
            )}
          </div>
        </form>
      </div>
      <div className="text-center h-50">
        <p>
          <b>Todo Lists</b>
        </p>
        {todos.length === 0 ? (
          <div className="text-center mt-3">
            <p>No activities to show.</p>
          </div>
        ) : (
          <div style={{ maxWidth: "600px" }} className="container">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`rounded todo-item-container col container overflow-auto g-3  m-auto p-3 justify-content-between my-2 d-flex ${input.id ===todo.id?'selected':''}`}
                style={{ backgroundColor: "darkblue", color: "white" }}
              >
                <p>{todo.text}</p>
                <div>
                  <button
                    type="submit"
                    className="btn btn-warning mx-3 mb-3 align-self-end"
                    onClick={() => {
                      setInput({ id: todo.id, text: todo.text });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger mb-3 align-self-end"
                    onClick={() => {
                      dispatch(removeTodo(todo));
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="text-center">
              <button
                className="m-3 btn btn-danger"
                onClick={() => {
                  dispatch(clearTodo());
                }}
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Todo;
