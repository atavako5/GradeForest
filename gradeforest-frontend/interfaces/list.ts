import { CumulativeGrade } from './cumulativeGrade';
import { GPARule } from './gpa-rule';
import { Item } from './item';

export interface List {
  _id?: string;
  user_id: string;
  name: string;
  items: Item[];
  lastIndex: number;
  cumulatedGrade: CumulativeGrade;
  GPARules: GPARule[];
}
