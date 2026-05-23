import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../api/axios";

const DashboardPage = () => {
  const navigate =
    useNavigate();

  const [tasks, setTasks] =
    useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      description: ""
    });

  const fetchTasks = async () => {
    try {
      const response =
        await api.get(
          "/tasks/my-tasks"
        );

      setTasks(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
        "/tasks",
        formData
      );

      setFormData({
        title: "",
        description: ""
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (
    id
  ) => {
    try {
      await api.delete(
        `/tasks/${id}`
      );

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleStatus = async (
    task
  ) => {
    try {
      await api.put(
        `/tasks/${task._id}`,
        {
          status:
            task.status ===
            "completed"
              ? "pending"
              : "completed"
        }
      );

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post(
        "/auth/logout"
      );

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-100 p-6"
    >
      <div
        className="max-w-5xl mx-auto"
      >
        <div
          className="flex justify-between items-center mb-6"
        >
          <h1
            className="text-3xl font-bold"
          >
            User Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow mb-8"
        >
          <h2
            className="text-xl font-semibold mb-4"
          >
            Create Task
          </h2>

          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <textarea
            name="description"
            placeholder="Task description"
            value={
              formData.description
            }
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded"
          >
            Create Task
          </button>
        </form>

        <div
          className="grid md:grid-cols-2 gap-4"
        >
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-5 rounded-lg shadow"
            >
              <div
                className="flex justify-between items-start"
              >
                <div>
                  <h2
                    className="text-xl font-bold"
                  >
                    {task.title}
                  </h2>

                  <p
                    className="text-gray-600 mt-2"
                  >
                    {
                      task.description
                    }
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded text-white ${
                    task.status ===
                    "completed"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              <div
                className="flex gap-3 mt-5"
              >
                <button
                  onClick={() =>
                    toggleStatus(
                      task
                    )
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Toggle Status
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      task._id
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;