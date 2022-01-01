import { List } from "interfaces/list";
import { OfflineUser } from "interfaces/offline-user";
import { Observable } from "rxjs";

export class DefaultOfflineUser implements OfflineUser {
    _id: string = "Offline User";
    lastIndexList: number = 0;
    lists: Map<number, List> = new Map<number, List>();

}