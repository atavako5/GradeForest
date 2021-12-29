import * as mongoose from "mongoose";
import { List } from "../interfaces/list";
import { Item } from "../interfaces/item";

export const ListSchema = new mongoose.Schema<List>({
  user_id: String,
  name: String,
  items: Array<Item>(),
  lastIndex: { type: Number, default: 1 },
});
