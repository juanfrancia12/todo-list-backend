import { Request, Response } from "express";
import { TaskModel } from "../models/task.models";
import { UserModel } from "../models/user.models";

export async function getTasks(_req: Request, res: Response) {
  try {
    const tasks = await TaskModel.findAll({
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: ["codeUser", "name", "lastname"]
        },
      ],
      order: [["id", "DESC"]],
    });
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createTask(req: Request, res: Response) {
  try {
    const { ...rest } = req.body;

    const newTask = await TaskModel.create({
      ...rest,
    });

    res.json(newTask);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export const updateTask = async (req: Request, res: Response) => {
  const { codeTask } = req.params;
  try {
    const task = await TaskModel.findOne({
      where: { codeTask },
    });

    if (!task) return res.status(500).json({ message: 'No existe la tarea' });

    task.set(req.body);

    await task.save();

    return res.json(task);

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export async function getTask(req: Request, res: Response) {
  const { codeTask } = req.params;
  try {
    const task = await TaskModel.findOne({
      where: { codeTask },
    });

    if (!task) return res.status(500).json({ message: 'No existe la tarea' });

    return res.json(task);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteTask(req: Request, res: Response) {
  const { codeTask } = req.params;
  try {
    await TaskModel.destroy({
      where: { codeTask },
    });

    return res.sendStatus(204);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getTaskUser(req: Request, res: Response) {
  const { codeUser } = req.params;
  try {
    const task = await TaskModel.findAll({
      where: { codeUser },
    });

    if (!task) return res.status(500).json({ message: 'No existe tareas de este usuario' });

    return res.json(task);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
