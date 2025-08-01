/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const TodoContext = createContext();

const DEFAULT_CATEGORIES = [
  { id: "personal", name: "Personal" },
  { id: "work", name: "Work" },
  { id: "shopping", name: "Shopping" },
];

const DEFAULT_TAGS = [
  { id: "urgent", name: "Urgent" },
  { id: "home", name: "Home" },
  { id: "office", name: "Office" },
];

const getLocalTodos = () => {
  const data = localStorage.getItem("todos");
  return data ? JSON.parse(data) : [];
};

const saveLocalTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTodos = (filters = {}) => {
    setLoading(true);
    let data = getLocalTodos();

    if (filters.search) {
      const search = filters.search.toLowerCase();
      data = data.filter((t) =>
        t.title?.toLowerCase().includes(search)
      );
    }

    if (filters.status) {
      data = data.filter(
        (t) => String(t.status || "").toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.category) {
      data = data.filter(
        (t) => t.category?.name?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      data = data.filter((t) =>
        t.tags?.some((tag) =>
          filters.tags.includes(tag.name.toLowerCase())
        )
      );
    }

    if (filters.dueDate) {
      const inputDate = filters.dueDate.split("-").reverse().join("-");
      data = data.filter((t) => t.dueDate === inputDate);
    }

    setTodos(data);
    setLoading(false);
  };

  const addTodo = (todo) => {
    const newTodo = {
      ...todo,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updatedTodos = [...getLocalTodos(), newTodo];
    saveLocalTodos(updatedTodos);
    setTodos(updatedTodos);
  };

  const updateTodo = (id, updatedFields) => {
    const updatedTodos = getLocalTodos().map((todo) =>
      todo.id === id ? { ...todo, ...updatedFields } : todo
    );
    saveLocalTodos(updatedTodos);
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = getLocalTodos().filter((todo) => todo.id !== id);
    saveLocalTodos(updatedTodos);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    loadTodos(); // initial load
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        loadTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        categories: DEFAULT_CATEGORIES,
        tags: DEFAULT_TAGS,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
