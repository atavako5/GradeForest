import { Item } from "./item";

export interface List {
    _id?:string,
    user_id:string,
    name: string,
    items: Item[],
    lastIndex: number
  }  