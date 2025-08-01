import { useState } from "react";
import { useTodos } from "../../contexts/TodoContext";

const TodoCard = ({ todo }) => {
  const { title, category, tags = [], status, dueDate, id } = todo;
  const { updateTodo, deleteTodo, categories = [], tags: allTags = [] } = useTodos();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: title || "",
    category: category || null,
    tags: tags || [],
    status: status || "",
    dueDate: dueDate || "",
  });

  const toggleTag = (tag) => {
    const exists = editData.tags.find((t) => t.id === tag.id);
    const updatedTags = exists
      ? editData.tags.filter((t) => t.id !== tag.id)
      : [...editData.tags, tag];

    setEditData({ ...editData, tags: updatedTags });
  };

  const handleSave = () => {
    updateTodo(id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ title, category, tags, status, dueDate });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      const selected = categories.find((c) => c.id === value);
      setEditData({ ...editData, category: selected || null });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  return (
    <div className="border p-4 rounded shadow hover:shadow-md transition duration-200">
      {!isEditing ? (
        <>
          <h3 className="font-bold text-lg text-gray-800">{title}</h3>

          {category?.name && (
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Category:</span> {category.name}
            </p>
          )}

          {dueDate && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Due:</span> {dueDate}
            </p>
          )}

          {status && (
  <p className="text-sm mt-1">
    <span className="font-medium">Status:</span>{" "}
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs ${
        status.id === "completed"
          ? "bg-green-200 text-green-800"
          : "bg-yellow-200 text-yellow-800"
      }`}
    >
      {status.name}
    </span>
  </p>
)}


          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(id)}
              className="text-red-600 text-sm"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
            placeholder="Title"
          />

          <select
            name="category"
            value={editData.category?.id || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="dueDate"
            value={editData.dueDate}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
            placeholder="Due Date (dd-mm-yyyy)"
          />

          <select
            name="status"
            value={editData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <div className="mb-2">
            <p className="text-sm font-medium mb-1">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <label key={tag.id} className="text-xs flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={!!editData.tags.find((t) => t.id === tag.id)}
                    onChange={() => toggleTag(tag)}
                  />
                  {tag.name}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 px-3 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoCard;
