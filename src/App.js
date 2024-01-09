import "./App.css";
import { ToastContainer } from "react-toastify";
import Todo from "./components/Todo";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Todo />
    </>
  );
}

export default App;