// src/api/categories.js

export const fetchCategories = () => {
  return new Promise((resolve) => {
    const data = JSON.parse(localStorage.getItem("categories") || "[]");
    resolve(data);
  });
};

export const createCategory = (category) => {
  return new Promise((resolve) => {
    const categories = JSON.parse(localStorage.getItem("categories") || "[]");
    const newCategory = { ...category, id: Date.now() };
    categories.push(newCategory);
    localStorage.setItem("categories", JSON.stringify(categories));
    resolve(newCategory);
  });
};
