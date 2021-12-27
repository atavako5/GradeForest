import { Injectable } from '@angular/core';
import { Item } from 'interfaces/item';
import { List } from 'interfaces/list';
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class ForestService {

  constructor() { }

  private removeArrayFromArray(array: Item[], arrayToBeRemoved: Item[]){
    return _.difference(array,arrayToBeRemoved);
  }

  pruneTree(list: List, item: Item): List{
    var allBranches = this.getAllDecendentItems(list,item)
    var myNewList = list
    myNewList.items =  this.removeArrayFromArray(list.items,allBranches)
    return myNewList
  }

   private getImmediateItems(list: List, item: Item, descending: boolean): Item[]{
    var items: Item[] = []
    list.items.forEach((i)=>{
      if (descending && i.parent === item.id){
        items.push(i)
      }else if (!descending && i.id === item.parent){
        items.push(i)
      }
    })
    return items;
  }

  private getAllDecendentItems(list: List, item: Item): Item[]{
    var itemList: Item[] = [item]
    var returnList: Item[] = [item]
    var mySet = new Set()
    mySet.add(item.id)

    while(itemList.length > 0){
      var dequeuedItem = itemList.shift()
      if (dequeuedItem){
        var adjacent = this.getImmediateItems(list, dequeuedItem, true)
        adjacent.forEach(i => {
          if (!mySet.has(i.id)){
            
            mySet.add(i.id)
            itemList.push(i)
            returnList.push(i)
          }
        });
      }
    }


    return returnList;
  }

}
