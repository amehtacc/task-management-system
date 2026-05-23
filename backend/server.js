import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
// import morgan from "morgan";

import connectDB from "./src/config/db.js";
import createAdmin from "./src/utils/createAdmin.js";

import authRoutes from "./src/routes/auth.routes.js";
import taskRoutes from "./src/routes/task.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";

dotenv.config();

connectDB();
createAdmin();

const app = express();

app.use(
  cors({
    origin:
      "https://task-management-0526.netlify.app",

    credentials: true
  })
);

app.use(express.json());

app.use(cookieParser());

// app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Management API Running"
  });
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});