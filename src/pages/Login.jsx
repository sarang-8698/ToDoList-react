import { Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <LoginForm />

        {/* 🔽 Register Link */}
        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
