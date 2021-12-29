import * as mongoose from "mongoose";
import { User } from "../interfaces/user";

export const UserSchema = new mongoose.Schema<User>({
  _id: String,
});
