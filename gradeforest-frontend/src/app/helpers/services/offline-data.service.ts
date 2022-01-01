import { Injectable } from '@angular/core';
import { List } from 'interfaces/list';
import { OfflineUser } from 'interfaces/offline-user';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DefaultOfflineUser } from '../default-offline-data';


@Injectable({
  providedIn: 'root'
})
export class OfflineDataService {

  private storageName = "offline-user"
  private data: OfflineUser = new DefaultOfflineUser();
  private dataObservable: BehaviorSubject<OfflineUser> = new BehaviorSubject<OfflineUser>(new DefaultOfflineUser());

  getLists(): Observable<List[]> {
    this.data = this.convertFromStringToData(localStorage.getItem(this.storageName) as string)
    this.dataObservable.next(this.data)
    this.updateLocalStorage()
    return this.dataObservable.pipe(map(data => {

      try {
        return Array.from(data.lists.values())
      } catch (err) {
        return []
      }

    }), take(1))


  }

  addList(list: List): Observable<List> {
    this.data.lastIndexList++;
    list._id = this.data.lastIndexList.toString()
    this.data.lists = this.data.lists.set(this.data.lastIndexList, list)
    this.dataObservable.next(this.data)
    this.updateLocalStorage()
    return this.dataObservable.pipe(map(data => {
      if (list._id) {
        return data.lists.get(parseInt(list._id)) as List
      } else {
        throw console.error("Can't find the list requested in the file");
      }
    }), take(1))
  }

  updateList(list: List): Observable<List> {
    if (list._id) {
      this.data.lists.set(parseInt(list._id), list)
      this.dataObservable.next(this.data)
      this.updateLocalStorage()
      return this.dataObservable.pipe(map(data => {
        if (list._id) {
          return data.lists.get(parseInt(list._id)) as List
        } else {
          throw console.error("Can't find the list requested in the file");
        }
      }), take(1))
    } else {
      throw console.error("List ID is undefined");

    }
  }

  getList(listId: string): Observable<List> {
    if (listId) {
      this.data = this.convertFromStringToData(localStorage.getItem(this.storageName) as string)
      this.dataObservable.next(this.data)
      this.updateLocalStorage()
      return this.dataObservable.pipe(
        map(data => {
          var list = data.lists.get(parseInt(listId));
          if (list) {
            return list;
          } else {
            throw console.error("List doesn't exist");

          }

        })
        , take(1))
    } else {
      throw console.error("List ID is undefined");

    }
  }

  deleteList(listId: string): Observable<unknown> {
    if (listId) {
      this.data.lists.delete(parseInt(listId))
      this.dataObservable.next(this.data)
      this.updateLocalStorage()
      return this.dataObservable.pipe(map(data => {
        return new Observable<unknown>()
      }), take(1))
    } else {
      throw console.error("List ID is undefined");

    }
  }


  downloadData() {
    this.downloadJson(this.convertToJson())

  }

  uploadData(file: File) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.data = this.convertFromStringToData(fileReader.result as string)
      this.dataObservable.next(this.data)
      this.updateLocalStorage()
    }
    fileReader.readAsText(file);


  }

  private downloadJson(myJson: string) {
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(myJson));
    element.setAttribute('download', "primer-server-task.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }

  private mapToObj(map: Map<number, List>) {
    var returnData: any = {}
    Array.from(map.keys()).forEach(key => {
      returnData[key] = map.get(key)
    })
    return returnData;
  };

  private convertToJson(): string {
    var storageData: any = JSON.parse(JSON.stringify(this.data))
    storageData.lists = this.mapToObj(this.data.lists as Map<number, List>)
    return JSON.stringify(storageData)
  }

  private updateLocalStorage() {

    localStorage.setItem(this.storageName, this.convertToJson())
  }
  private convertFromStringToData(data: string): OfflineUser {
    var convertedData = null
    let parsedData = JSON.parse(data);
    convertedData = parsedData as OfflineUser
    let map = new Map<number, List>()
    let lists = parsedData.lists as any

    Object.keys(lists).forEach(key => {
      map.set(parseInt(key), lists[key])
    })
    convertedData.lists = map
    return convertedData
  }
  constructor() {
    let data = localStorage.getItem(this.storageName)
    if (data) {
      this.data = this.convertFromStringToData(data)
      this.dataObservable.next(this.data)
    } else {
      this.data = new DefaultOfflineUser()
    }
  }
}
