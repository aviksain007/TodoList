import React from "react";
import { useState } from "react";
import { useTodo } from "../Context/TodoContext";

function TodoFrom() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();

    if (!todo) return;

    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <li class="flex w-full items-center justify-start">
      <input
        placeholder="Type to add a new todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        class="w-full bg-transparent p-4 text-white placeholder:text-gray-500 md:p-6"
      />
      <button
        onClick={add}
        class="bg-green-500 p-4 text-center text-black hover:bg-green-400 active:bg-green-600 md:p-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          class="h-8 w-8"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </li>
  );
}

export default TodoFrom;
