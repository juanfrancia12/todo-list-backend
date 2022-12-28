import { Router } from "express";
import { updateUser, deleteUser, getUsers, getUser, createUser, loginUser } from "../controllers/user.controllers";

const router = Router();

router.post("/login", loginUser);
router.post("/register", createUser);

router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
