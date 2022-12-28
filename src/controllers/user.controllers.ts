import { Request, Response } from "express";
import { UserModel } from "../models/user.models";

export async function getUsers(_req: Request, res: Response) {
  try {
    const users = await UserModel.findAll({
      order: [["id", "DESC"]],
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createUser(req: Request, res: Response) {
  const { email, ...rest } = req.body;

  try {
    const URI_REX = email.match(/^([^@]*)@/);
    const URI = URI_REX ? "@" + URI_REX[1] : null;

    const newUser = await UserModel.create({
      ...rest,
      email,
      uri: URI,
    });

    res.json(newUser);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const { codeUser } = req.params;
  try {
    const user = await UserModel.findOne({
      where: { codeUser },
    });

    if (!user) return res.status(500).json({ message: 'No existe el usuario' });

    user.set(req.body);

    await user.save();

    return res.json(user);

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export async function getUser(req: Request, res: Response) {
  const { codeUser } = req.params;
  try {
    const user = await UserModel.findOne({
      where: { codeUser },
    });

    if (!user) return res.status(500).json({ message: 'No existe el usuario' });

    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { codeUser } = req.params;
  try {
    await UserModel.destroy({
      where: { codeUser },
    });

    return res.sendStatus(204);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}