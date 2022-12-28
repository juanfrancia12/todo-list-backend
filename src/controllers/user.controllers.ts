import { compareSync, hashSync } from "bcrypt";
import { Request, Response } from "express";
import { expiresIn, JWT_ROUNDS, SECRET_KEY } from "../config";
import { UserModel } from "../models/user.models";
import jwt from "jsonwebtoken";

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  UserModel.findOne({
    where: {
      email,
    },
  }).then((user: any) => {
    if (!user) res.status(404).json({ msg: "Usuario con este correo no encontrado" });

    if (!compareSync(password, user.password)) return res.status(401).json({ msg: "Contraseña incorrecta" });

    const token = jwt.sign({ user }, SECRET_KEY as string, {
      expiresIn: expiresIn,
    });

    res.json({
      user,
      token,
    });
    return
  }

  ).catch((err: any) => {
    res.status(500).json({ msg: "error", err });
    return;
  });

}

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
  const { email, password, ...rest } = req.body;

  try {
    const URI_REX = email.match(/^([^@]*)@/);
    const URI = URI_REX ? "@" + URI_REX[1] : null;

    const passwordHash = hashSync(
      password,
      Number.parseInt(JWT_ROUNDS as string)
    );

    UserModel.create({
      ...rest,
      email,
      password: passwordHash,
      uri: URI,
    })
      .then((user: any) => {
        const token = jwt.sign({ user }, SECRET_KEY as string, {
          expiresIn: expiresIn,
        });

        res.json({
          user,
          token: token,
        });
      })
      .catch((err: any) => {
        res.status(500).json(err);
      });

  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function updateUser(req: Request, res: Response) {
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