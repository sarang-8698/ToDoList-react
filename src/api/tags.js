// src/api/tags.js

export const fetchTags = () => {
  return new Promise((resolve) => {
    const data = JSON.parse(localStorage.getItem("tags") || "[]");
    resolve(data);
  });
};

export const createTag = (tag) => {
  return new Promise((resolve) => {
    const tags = JSON.parse(localStorage.getItem("tags") || "[]");
    const newTag = { ...tag, id: Date.now() };
    tags.push(newTag);
    localStorage.setItem("tags", JSON.stringify(tags));
    resolve(newTag);
  });
};
