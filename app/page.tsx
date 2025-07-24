"use client";

import FilterButtons from "@/components/FilterButtons";
import TodoInput from "@/components/TodoInput";
import TodoItem from "@/components/TodoItem";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const HomePage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const editTodo = (id: number, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );

    toast.info("Todo updated")
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);

    toast.success("Todo added")
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    toast.error("Todo deleted")
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
        <TodoInput onAdd={addTodo} />
        <FilterButtons filter={filter} setFilter={setFilter} />
        <div
          className={`mt-4 pr-4 space-y-2 h-[302px] ${
            filteredTodos.length === 6
              ? "overflow-hidden overflow-y-scroll"
              : "overflow-auto"
          } `}
        >
          {filteredTodos.length === 0 ? (
            <p className="text-center text-gray-400">No tasks yet</p>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
