import React, { useEffect, useState } from "react";
import TodoFrom from "./TodoFrom";
import TodoItem from "./TodoItem";
import { TodoProvider } from "../Context/TodoContext";
import EmptyPage from "./EmptyPage";

function Body() {
  const [todos, setTodos] = useState([]);
  const [showTodo, setShowTodo] = useState(false);
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  useEffect (() => {
    if(todos.length === 0) {
      setShowTodo(false);
    }
  },[todos])

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);



  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      {" "}
      {todos.length === 0 && !showTodo ? (
        <EmptyPage onClick={setShowTodo}/>
      ) : (
        <div class="mx-auto flex h-full min-h-screen w-full max-w-full flex-col items-start justify-start px-4 py-28 text-center md:max-w-5xl">
          <div class="flex w-full flex-col gap-5">
            <ul class="divide-y-[1px] divide-white border-[1px] border-white p-0">
              <TodoFrom />
              {todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))}
            </ul>
          </div>
        </div>
      )}
    </TodoProvider>
  );
}

export default Body;
