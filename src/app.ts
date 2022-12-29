import cors from "cors";
import express from "express";
import morgan from "morgan";
import config from "./config";

// import "./models/task.models";
// import "./models/user.models";

import indexRoutes from "./routes/index.routes";
import tasksRoutes from "./routes/task.routes";
import usersRoutes from "./routes/user.routes";

const app = express();

// settings
app.set("PORT", config.port);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", indexRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);

export default app;
