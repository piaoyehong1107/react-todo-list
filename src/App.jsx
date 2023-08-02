import "./styles.css"
import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"

export default function App() {
  
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })
  // useState checking localStorage,getting the value is it exist, or just return emtpy [].

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos]) 
  // Everytime the value in todos change, run the function localStorage and store them.

  function addTodo(title) { 
     setTodos(currentTodos => {
          return [
            ...currentTodos,
            {
              id: crypto.randomUUID(),
              title,
              completed: false
            }
          ]
        })
  }
    
  function toggleTodo(id, complete) { 
    // console.log(id, complete)
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return{...todo, completed: complete}
        }
        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )
}