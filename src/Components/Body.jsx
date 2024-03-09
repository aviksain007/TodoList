import React, { useEffect, useState } from "react";
import { TodoFrom, TodoItem, EmptyPage } from "./index.js";
import { TodoProvider } from "../Context/TodoContext";
import { v4 as uuidv4 } from "uuid";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getCurrentTime = () => {
  let date = new Date();
  let d = date.getDate();
  let m = months[date.getMonth()];
  let y = date.getFullYear();
  return d + " " + m + " " + y;
};

function Body() {
  const [todos, setTodos] = useState([]);
  const [showTodo, setShowTodo] = useState(false);
  const [todoType, setTodoType] = useState("AllTodos");

  const addTodo = (todo) => {
    let time = getCurrentTime();

    setTodos((prev) => [{ id: uuidv4(), date: time, ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    const { todoMsg } = todo;
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...todo, date: getCurrentTime() } : prevTodo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    if (todos.length === 0) {
      setShowTodo(false);
    }
  }, [todos]);

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
        <EmptyPage onClick={setShowTodo} />
      ) : (
        <div class="mx-auto flex h-full min-h-screen w-full max-w-full flex-col items-start justify-start px-4 py-28 text-center md:max-w-5xl">
          <div class="flex w-full flex-col gap-5">
            <div class="flex w-full flex-shrink-0 flex-wrap items-center justify-start gap-3 md:gap-6">
              <button
                onClick={() => setTodoType("AllTodos")}
                className={`${todoType === 'AllTodos' ? "border-[1px] border-[#565656] bg-[#232323]" : ""} px-3 py-2 text-sm font-semibold text-white hover:bg-[#232323] md:text-base`}
              >
                All todos
              </button>
              <button
                onClick={() => setTodoType("Pending")}
                className={`${todoType === 'Pending' ? "border-[1px] border-[#565656] bg-[#232323]" : ""} px-3 py-2 text-sm font-semibold text-white hover:bg-[#232323] md:text-base`}
              >
                Pending
              </button>
              <button
                onClick={() => setTodoType("Completed")}
                className={`${todoType === 'Completed' ? "border-[1px] border-[#565656] bg-[#232323]" : ""} px-3 py-2 text-sm font-semibold text-white hover:bg-[#232323] md:text-base`}
              >
                Completed
              </button>
            </div>
            <ul class="divide-y-[1px] divide-white border-[1px] border-white p-0">
              <TodoFrom />
              {todoType === "AllTodos"
                ? todos.map((todo) => (
                    <div key={todo.id} className="w-full">
                      <TodoItem todo={todo} />
                    </div>
                  ))
                : todoType === "Pending"
                ? todos.map((todo) =>
                    !todo.completed ? (
                      <div key={todo.id} className="w-full">
                        <TodoItem todo={todo} />
                      </div>
                    ) : null
                  )
                : todos.map((todo) =>
                    todo.completed ? (
                      <div key={todo.id} className="w-full">
                        <TodoItem todo={todo} />
                      </div>
                    ) : null
                  )}
            </ul>
          </div>
        </div>
      )}
    </TodoProvider>
  );
}

export default Body;
