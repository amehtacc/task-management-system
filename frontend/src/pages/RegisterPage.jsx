import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../api/axios";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: ""
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await api.post(
        "/auth/register",
        formData
      );

      navigate("/login");
    } catch (error) {
      alert(
        error.response.data.message
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1
          className="text-2xl font-bold mb-6 text-center"
        >
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded"
        >
          Register
        </button>
        <p className="text-center mt-4">
          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-500 font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;