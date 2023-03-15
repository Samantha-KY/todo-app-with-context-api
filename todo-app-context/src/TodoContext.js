import { createContext, useState } from "react";
import { nanoid } from "nanoid";

export const AppContext = createContext(null)

export const TodoProvider = ({children}) => {
  const [todos, setTodos] = useState([]);

  const addTodos = (task) => {
    const todo = { id: nanoid(), task, completed: false };
    setTodos((prevTodos) => {
      const newTodo = [todo, ...prevTodos];
      return newTodo;
    });
    console.log(todos)
  }

  const complete = (todoId) => {
    setTodos(prev => {
      const updatedTask = prev.map((x) => x.id === todoId ? { ...x, completed: !x.completed } : x);
      return updatedTask;
    });
  }

  const deleteTodos = (todoId) => {
    setTodos(prev => {
      const deleteTask = prev.filter((x) => x.id !== todoId);
      return deleteTask;
    });
  }

  const editTask = (todoId, task) => {
    setTodos(prev => { 
      const editTask = prev.map((x) => x.id === todoId ? {...x, task } : x)
      return editTask;
  })
  }

  return (
    <AppContext.Provider value={{todos,addTodos, complete, deleteTodos, editTask}}>{children}</AppContext.Provider>
  )

}
