import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some((user) => user.email === form.email);
    if (userExists) {
      alert("User already registered with this email");
      return;
    }

    const newUser = { ...form, id: Date.now() };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-8">
      <input
        className="w-full p-2 border rounded"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="w-full p-2 border rounded"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
