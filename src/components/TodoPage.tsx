"use client";
import { useState } from "react";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";

export default function TodoPage() {
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [idCounter, setIdCounter] = useState(1);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (text: string) => {
    setTodos([...todos, { id: idCounter, text, completed: false }]);
    setIdCounter(idCounter + 1);
  };
  const editTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo)));
  };
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  useCopilotReadable(
    {
      description: "The current list of user todos",
      value: todos.map((todo) => ({
        id: todo.id,
        text: todo.text,
        completed: todo.completed,
      })),
    },
    [todos]
  );

  useCopilotAction({
    name: "add_todo",
    description: "Add a todo",
    parameters: [{ name: "text", type: "string" }],
    handler: async ({ text }) => addTodo(text),
  });

  useCopilotAction({
    name: "edit_todo",
    description: "Edit a todo",
    parameters: [
      { name: "id", type: "number" },
      { name: "newText", type: "string" },
    ],
    handler: async ({ id, newText }) => editTodo(id, newText),
  });

  useCopilotAction({
    name: "delete_todo",
    description: "Delete a todo by ID",
    parameters: [{ name: "id", type: "number" }],
    handler: async ({ id }) => deleteTodo(id),
  });

  useCopilotAction({
    name: "toggle_todo",
    description: "Toggle a todo's completion state",
    parameters: [{ name: "id", type: "number" }],
    handler: async ({ id }) => toggleTodo(id),
  });

  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-4 text-white">ToDos List</h2>
      <hr className="border-white/20 my-6" />

      {/* Manual Add UI */}
      <div className="">
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="bg-white/20 p-4 rounded-xl text-white relative group hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={() => {
            if (newTodo.trim() !== "") {
              addTodo(newTodo.trim());
              setNewTodo("");
            }
          }}
          className="ml-2 p-4 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-all"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2 text-white">
        {todos.map((todo) => (
          <li key={todo.id} className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={todo.completed ? "line-through" : ""}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
