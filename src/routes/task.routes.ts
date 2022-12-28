import { Router } from "express";
import { createTask, updateTask, deleteTask, getTasks, getTask, getTaskUser } from "../controllers/task.controllers";


const router = Router();

// Routes
router.get("/", getTasks);
router.get("/:codeTask", getTask);
router.get("/user/:codeUser", getTaskUser);
router.post("/", createTask);
router.put("/:codeTask", updateTask);
router.delete("/:codeTask", deleteTask);

export default router;
