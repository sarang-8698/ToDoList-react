// ✅ 1. TodoForm.jsx
import { useState } from "react";
import { useTodos } from "../../contexts/TodoContext";

const categories = [
  { id: "work", name: "Work" },
  { id: "personal", name: "Personal" },
];
const statusC = [
  { id: "completed", name: "Completed" },
  { id: "pending", name: "Pending" },
];
const tags = [
  { id: "urgent", name: "Urgent" },
  { id: "home", name: "Home" },
  { id: "office", name: "Office" },
];

const getFormattedDate = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${day}-${month}-${year}`;
};

const TodoForm = ({ onTodoAdded }) => {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tagIds, setTagIds] = useState([]);
  const [status, setStatus] = useState("");
  const { addTodo } = useTodos();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !categoryId || !status) return;

    const newTodo = {
      id: Date.now(),
      title,
      categoryId,
      tagIds,
      category: categories.find((c) => c.id === categoryId),
      status: statusC.find((c) => c.id === status),
      tags: tags.filter((t) => tagIds.includes(t.id)),
      dueDate: getFormattedDate(),
    };

    addTodo(newTodo);

    setTitle("");
    setCategoryId("");
    setTagIds([]);
    setStatus("");

    if (onTodoAdded) onTodoAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 max-w-md mx-auto my-6">
      <input
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Todo Title"
        required
      />

      <select
        className="w-full border p-2 rounded"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select
        className="w-full border p-2 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
      >
        <option value="">Select Status</option>
        {statusC.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <label key={tag.id} className="flex items-center space-x-1">
            <input
              type="checkbox"
              checked={tagIds.includes(tag.id)}
              onChange={() =>
                setTagIds((prev) =>
                  prev.includes(tag.id)
                    ? prev.filter((id) => id !== tag.id)
                    : [...prev, tag.id]
                )
              }
            />
            <span>{tag.name}</span>
          </label>
        ))}
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        type="submit"
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;