// src/api/auth.js

export const register = (userData) => {
  return new Promise((resolve, reject) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const userExists = users.some((u) => u.email === userData.email);
    if (userExists) {
      return reject(new Error("User already exists"));
    }

    const newUser = {
      ...userData,
      id: Date.now(),
      createdAt: new Date(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const token = btoa(`${newUser.email}:${newUser.password}`);
    localStorage.setItem("authToken", token);
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    resolve({ user: newUser, token });
  });
};

export const login = (credentials) => {
  return new Promise((resolve, reject) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const found = users.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (!found) {
      return reject(new Error("Invalid email or password"));
    }

    const token = btoa(`${credentials.email}:${credentials.password}`);
    localStorage.setItem("authToken", token);
    localStorage.setItem("currentUser", JSON.stringify(found));

    resolve({ user: found, token });
  });
};
