import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../api/axios";

import {
  useAuth
} from "../context/AuthContext";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const navigate =
    useNavigate();

  const { setUser } =
    useAuth();

  const [formData, setFormData] =
    useState({
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
      const response =
        await api.post(
          "/auth/login",
          formData
        );

      const user =
        response.data.data;

      setUser(user);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
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
          Login
        </h1>

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
          Login
        </button>
        <p className="text-center mt-4">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-500 font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;