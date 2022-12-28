import { Router } from "express";
import { updateUser, deleteUser, getUsers, getUser, createUser } from "../controllers/user.controllers";


const router = Router();

// Routes
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getUsers);
router.get("/:id", getUser);

export default router;
