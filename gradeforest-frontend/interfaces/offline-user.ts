import { GPARule } from './gpa-rule';
import { List } from './list';

export interface OfflineUser {
    _id: string;
    lastIndexList: number;
    lists: Map<number, List>;
}
