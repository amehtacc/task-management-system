import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../api/axios";

const AdminDashboardPage = () => {
  const navigate =
    useNavigate();

  const [analytics, setAnalytics] =
    useState({});

  const [users, setUsers] =
    useState([]);

  const [tasks, setTasks] =
    useState([]);

  const [activities, setActivities] =
    useState([]);

  const fetchAnalytics =
    async () => {
      try {
        const response =
          await api.get(
            "/admin/analytics"
          );

        setAnalytics(
          response.data.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  const fetchUsers = async () => {
    try {
      const response =
        await api.get(
          "/admin/users"
        );

      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response =
        await api.get(
          "/admin/tasks"
        );

      setTasks(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchActivities =
    async () => {
      try {
        const response =
          await api.get(
            "/admin/activities"
          );

        setActivities(
          response.data.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    fetchAnalytics();

    fetchUsers();

    fetchTasks();

    fetchActivities();
  }, []);

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

  const updateUserStatus =
    async (id, status) => {
      try {
        await api.patch(
          `/admin/users/${id}/status`,
          {
            status
          }
        );

        fetchUsers();
      } catch (error) {
        console.error(error);
      }
    };

  const deleteUser = async (
    id
  ) => {
    try {
      await api.delete(
        `/admin/users/${id}`
      );

      fetchUsers();

      fetchAnalytics();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-100 p-6"
    >
      <div
        className="max-w-7xl mx-auto"
      >
        <div
          className="flex justify-between items-center mb-8"
        >
          <h1
            className="text-3xl font-bold"
          >
            Admin Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {/* Analytics */}

        <div
          className="grid md:grid-cols-4 gap-4 mb-10"
        >
          <div
            className="bg-white p-5 rounded-lg shadow"
          >
            <h2
              className="text-gray-500"
            >
              Total Users
            </h2>

            <p
              className="text-3xl font-bold mt-2"
            >
              {
                analytics.totalUsers
              }
            </p>
          </div>

          <div
            className="bg-white p-5 rounded-lg shadow"
          >
            <h2
              className="text-gray-500"
            >
              Total Tasks
            </h2>

            <p
              className="text-3xl font-bold mt-2"
            >
              {
                analytics.totalTasks
              }
            </p>
          </div>

          <div
            className="bg-white p-5 rounded-lg shadow"
          >
            <h2
              className="text-gray-500"
            >
              Completed
            </h2>

            <p
              className="text-3xl font-bold mt-2 text-green-500"
            >
              {
                analytics.completedTasks
              }
            </p>
          </div>

          <div
            className="bg-white p-5 rounded-lg shadow"
          >
            <h2
              className="text-gray-500"
            >
              Pending
            </h2>

            <p
              className="text-3xl font-bold mt-2 text-yellow-500"
            >
              {
                analytics.pendingTasks
              }
            </p>
          </div>
        </div>

        {/* User Management */}

        <div
          className="bg-white rounded-lg shadow p-6 mb-10"
        >
          <h2
            className="text-2xl font-bold mb-5"
          >
            User Management
          </h2>

          <div
            className="overflow-x-auto"
          >
            <table
              className="w-full border"
            >
              <thead>
                <tr
                  className="bg-gray-200"
                >
                  <th
                    className="p-3 text-left"
                  >
                    Name
                  </th>

                  <th
                    className="p-3 text-left"
                  >
                    Email
                  </th>

                  <th
                    className="p-3 text-left"
                  >
                    Role
                  </th>

                  <th
                    className="p-3 text-left"
                  >
                    Status
                  </th>

                  <th
                    className="p-3 text-left"
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map(
                  (user) => (
                    <tr
                      key={
                        user._id
                      }
                      className="border-t"
                    >
                      <td
                        className="p-3"
                      >
                        {
                          user.name
                        }
                      </td>

                      <td
                        className="p-3"
                      >
                        {
                          user.email
                        }
                      </td>

                      <td
                        className="p-3"
                      >
                        {
                          user.role
                        }
                      </td>

                      <td
                        className="p-3"
                      >
                        {
                          user.status
                        }
                      </td>

                      <td
                        className="p-3 flex gap-2"
                      >
                        <button
                          onClick={() =>
                            updateUserStatus(
                              user._id,

                              user.status ===
                                "active"
                                ? "inactive"
                                : "active"
                            )
                          }
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Toggle
                        </button>

                        <button
                          onClick={() =>
                            deleteUser(
                              user._id
                            )
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Task Monitoring */}

        <div
          className="bg-white rounded-lg shadow p-6 mb-10"
        >
          <h2
            className="text-2xl font-bold mb-5"
          >
            Task Monitoring
          </h2>

          <div
            className="grid md:grid-cols-2 gap-4"
          >
            {tasks.map((task) => (
              <div
                key={task._id}
                className="border p-4 rounded"
              >
                <h3
                  className="text-xl font-bold"
                >
                  {task.title}
                </h3>

                <p
                  className="text-gray-600 mt-2"
                >
                  {
                    task.description
                  }
                </p>

                <div
                  className="flex justify-between mt-4"
                >
                  <span>
                    By:{" "}
                    {
                      task
                        .createdBy
                        ?.name
                    }
                  </span>

                  <span
                    className={`font-semibold ${
                      task.status ===
                      "completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Logs */}

        <div
          className="bg-white rounded-lg shadow p-6"
        >
          <h2
            className="text-2xl font-bold mb-5"
          >
            Activity Logs
          </h2>

          <div
            className="space-y-4"
          >
            {activities.map(
              (activity) => (
                <div
                  key={
                    activity._id
                  }
                  className="border-b pb-3"
                >
                  <p
                    className="font-semibold"
                  >
                    {
                      activity
                        .user?.name
                    }
                  </p>

                  <p
                    className="text-gray-600"
                  >
                    {
                      activity.action
                    }
                  </p>

                  <p
                    className="text-sm text-gray-500"
                  >
                    {
                      activity.details
                    }
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;