const Filters = ({ onChange }) => {
  const handleInput = (key, value) => {
    onChange((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-wrap gap-3 items-center my-4">
      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by title..."
        onChange={(e) => handleInput("search", e.target.value.toLowerCase())}
        className="border p-2 rounded w-full sm:w-auto"
      />

      {/* ✅ Status Filter */}
      <select
        onChange={(e) => handleInput("status", e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Statuses</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>

      {/* 📅 Due Date */}
      <input
        type="date"
        onChange={(e) => handleInput("dueDate", e.target.value)}
        className="border p-2 rounded"
      />

      {/* 📁 Category Filter */}
      <select
        onChange={(e) => handleInput("category", e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Categories</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        {/* You can replace with dynamic categories if needed */}
      </select>

      {/* 🏷️ Tags */}
      <input
        type="text"
        placeholder="Tags (comma separated)"
        onChange={(e) => {
          const tags = e.target.value
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter(Boolean);
          handleInput("tags", tags);
        }}
        className="border p-2 rounded w-full sm:w-auto"
      />
    </div>
  );
};

export default Filters;
