import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const fakeToken = Math.random().toString(36).substr(2);
      localStorage.setItem("token", fakeToken);
      setToken(fakeToken, user);
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-8">
      <input
        className="w-full p-2 border rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
