// src/api/todos.js

export const fetchTodos = (filters = {}) => {
  return new Promise((resolve) => {
    let todos = JSON.parse(localStorage.getItem("todos") || "[]");

    // Apply filters (status, search, category, tags)
    if (filters.search) {
      todos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.status) {
      todos = todos.filter((todo) => todo.status === filters.status);
    }

    if (filters.categoryId) {
      todos = todos.filter((todo) => todo.categoryId === filters.categoryId);
    }

    if (filters.tagIds && filters.tagIds.length > 0) {
      todos = todos.filter((todo) =>
        filters.tagIds.every((tagId) => todo.tagIds.includes(tagId))
      );
    }

    resolve(todos);
  });
};

export const createTodo = (todoData) => {
  return new Promise((resolve) => {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    const newTodo = { ...todoData, id: Date.now(), createdAt: new Date() };
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    resolve(newTodo);
  });
};

export const updateTodo = (id, todoData) => {
  return new Promise((resolve, reject) => {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) return reject(new Error("Todo not found"));

    todos[index] = { ...todos[index], ...todoData };
    localStorage.setItem("todos", JSON.stringify(todos));
    resolve(todos[index]);
  });
};

export const deleteTodo = (id) => {
  return new Promise((resolve) => {
    let todos = JSON.parse(localStorage.getItem("todos") || "[]");
    todos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(todos));
    resolve({ success: true });
  });
};
