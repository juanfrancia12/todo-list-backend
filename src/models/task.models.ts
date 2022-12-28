import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import { StatusTask } from "../interfaces/enum";

export const TaskModel = sequelize.define(
  "task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codeTask: {
      type: DataTypes.STRING,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    picture: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: StatusTask.Pending
    },
  },
  {
    timestamps: true,
  }
);
