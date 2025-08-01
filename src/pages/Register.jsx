import RegisterForm from "../components/forms/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
