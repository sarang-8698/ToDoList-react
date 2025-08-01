import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import TodoForm from "../components/forms/TodoForm";
import TodoList from "../components/todos/TodoList";
import Filters from "../components/todos/Filters";
import { useTodos } from "../contexts/TodoContext";
import useDebounce from "../hooks/useDebounce";

const Dashboard = () => {
  const { todos, loadTodos } = useTodos();

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    dueDate: "",
    category: "",
    tags: [],
  });

  const debouncedFilters = useDebounce(filters, 500);

  useEffect(() => {
    loadTodos(debouncedFilters);
  }, [debouncedFilters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo Dashboard</h1>

        <TodoForm onTodoAdded={() => loadTodos()} />

        <Filters onChange={setFilters} />

        <TodoList todos={todos} />
      </div>
    </div>
  );
};

export default Dashboard;
