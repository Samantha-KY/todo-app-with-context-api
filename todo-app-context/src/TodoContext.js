import { createContext, useState } from "react";
import { nanoid } from "nanoid";

export const AppContext = createContext(null)

export const TodoProvider = ({children}) => {
  const [todos, setTodos] = useState([]);

  const addTodos = (task) => {
    const todo = { id: nanoid(), task, completed: false };
    setTodos((prevTodos) => {
      const newTodos = [todo, ...prevTodos];
      return newTodos;
    });
  }

  const complete = (todoId) => {
    setTodos(prev => {
      const updatedTask = prev.map((task) => task.id === todoId ? { ...task, completed: !task.completed } : task);
      return updatedTask;
    });
  }

  const deleteTodos = (todoId) => {
    setTodos(prev => {
      const deleteTask = prev.filter((task) => task.id !== todoId);
      return deleteTask;
    });
  }

  const editTask = (todoId, task) => {
    setTodos(prev => { 
      const editTask = prev.map((task) => task.id === todoId ? {...task, task } : task)
      return editTask;
  })
  }

  return (
    <AppContext.Provider value={{todos,addTodos, complete, deleteTodos, editTask}}>{children}</AppContext.Provider>
  )

}
