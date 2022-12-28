import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import { RoleUser } from "../interfaces/enum";
import { TaskModel } from "./task.models";

export const UserModel: any = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codeUser: {
      type: DataTypes.STRING,
      unique:true
    },
    name: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail:true
      }
    },
    password: {
      type: DataTypes.STRING,
    },
    uri: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: RoleUser.General,
    },
  },
  {
    timestamps: true,
  }
);

UserModel.hasMany(TaskModel, {
  foreignKey: "codeUser",
  sourceKey: "codeUser",
});

TaskModel.belongsTo(UserModel, {
  foreignKey: "codeUser",
  targetKey: "codeUser",

});
