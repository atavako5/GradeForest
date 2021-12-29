import { Injectable } from '@angular/core';
import { CumulativeGrade } from 'interfaces/cumulativeGrade';
import { IncludeTypes } from 'interfaces/include-types';
import { Item } from 'interfaces/item';
import { ItemTypes } from 'interfaces/item-types';
import { List } from 'interfaces/list';
import * as _ from 'lodash';
import { DefaultGPARules } from '../default-gpa-rules';

interface TreeItem {
  item: Item;
  index: number;
  parentIndex: number;
  unknownChildrenCounter: number;
  childNodes: TreeItem[];
}

@Injectable({
  providedIn: 'root',
})
export class ForestService {
  constructor() {}

  private myGradeTree: Map<number, TreeItem> = new Map();
  private myGradeList!: List;

  private removeArrayFromArray(array: Item[], arrayToBeRemoved: Item[]) {
    return _.difference(array, arrayToBeRemoved);
  }

  public pruneTree(list: List, item: Item): List {
    var allBranches = this.getAllDecendentItems(list, item);
    var myNewList = list;
    myNewList.items = this.removeArrayFromArray(list.items, allBranches);
    return myNewList;
  }

  public cumulateGrades(list: List): CumulativeGrade {
    var cumulativeGrade: CumulativeGrade = {
      cumulativeGPA: 0,
      cumulativeGrade: 0,
      GPAScale: 0,
    };

    if (list) {
      var cumulativeMark = 0;
      var cumulativeWeight = 0;
      list.items.forEach((item) => {
        if (item.parent === 0) {
          cumulativeMark += item.mark * item.weight;
          cumulativeWeight += item.weight;
        }
      });
      console.log(cumulativeMark + cumulativeWeight);
      cumulativeMark = cumulativeMark / cumulativeWeight;
      cumulativeGrade.cumulativeGrade = cumulativeMark;
      cumulativeGrade.GPAScale = 4; /// TODO
      cumulativeGrade.cumulativeGPA = this.gradePointToGPA(cumulativeMark);
    }
    return cumulativeGrade;
  }

  public whatIfIGet(list: List, item: Item, grade: number): List {
    list.lastIndex++;
    var remainingGradeItem: Item = {
      id: list.lastIndex,
      type: ItemTypes.Item,
      include: IncludeTypes.Include,
      name: `Remaining grade for ${item.name}`,
      mark: grade,
      weight: item.remaingWeight,
      gpa: 0,
      parent: item.id,
      remaingWeight: 0,
    };
    list.items.push(remainingGradeItem);
    return this.updateTree(list);
  }

  public iWantToGet(list: List, item: Item, grade: number): List {
    list.lastIndex++;
    if (item.remaingWeight <= 0) {
      return list;
    }

    var remainingGrade =
      ((grade - ((100 - item.remaingWeight) / 100) * item.mark) * 100) /
      item.remaingWeight;

    var remainingGradeItem: Item = {
      id: list.lastIndex,
      type: ItemTypes.Item,
      include: IncludeTypes.Include,
      name: `You got this for ${item.name}`,
      mark: _.ceil(remainingGrade, 1),
      weight: item.remaingWeight,
      gpa: 0,
      parent: item.id,
      remaingWeight: 0,
    };
    list.items.unshift(remainingGradeItem);
    return this.updateTree(list);
  }

  public updateTree(list: List): List {
    this.myGradeList = list;
    this.myGradeTree = this.createGradeTree(list.items);
    this.myGradeTree.forEach((item) => {
      if (item.item.parent == 0) {
        this.processMarks(item);
      }
    });
    return this.myGradeList;
  }

  private getImmediateItems(
    list: List,
    item: Item,
    descending: boolean
  ): Item[] {
    var items: Item[] = [];
    list.items.forEach((i) => {
      if (descending && i.parent === item.id) {
        items.push(i);
      } else if (!descending && i.id === item.parent) {
        items.push(i);
      }
    });
    return items;
  }

  private getAllDecendentItems(list: List, item: Item): Item[] {
    var itemList: Item[] = [item];
    var returnList: Item[] = [item];
    var mySet = new Set();
    mySet.add(item.id);

    while (itemList.length > 0) {
      var dequeuedItem = itemList.shift();
      if (dequeuedItem) {
        var adjacent = this.getImmediateItems(list, dequeuedItem, true);
        adjacent.forEach((i) => {
          if (!mySet.has(i.id)) {
            mySet.add(i.id);
            itemList.push(i);
            returnList.push(i);
          }
        });
      }
    }

    return returnList;
  }

  private add<K, V>(map: Map<K, V>, key: K, value: V) {
    if (map.has(key)) {
      throw new TypeError('Key ' + key + ' already exists!');
    } else {
      map.set(key, value);
    }
  }

  private createGradeTree(dataset: Item[]): Map<number, TreeItem> {
    const hashTable: Map<number, TreeItem> = new Map<number, TreeItem>();
    dataset.forEach((aItem: Item, index: number) =>
      this.add(hashTable, aItem.id, {
        item: aItem,
        childNodes: [],
        unknownChildrenCounter: 0,
        index: index,
        parentIndex: 0,
      })
    );
    const dataTree: TreeItem[] = [];
    dataset.forEach((aItem) => {
      if (aItem.parent != 0) {
        var t = hashTable.get(aItem.id);
        if (t) {
          t.parentIndex = hashTable.get(aItem.parent)?.index || 0;
          hashTable.get(aItem.parent)?.childNodes.push(t);
          if (t.item.type === ItemTypes.Unknown) {
            var itemParent = hashTable.get(aItem.parent);
            if (itemParent) {
              itemParent.unknownChildrenCounter++;
              hashTable.set(itemParent.item.id, itemParent);
            }
          }
        }
      } else {
        var t = hashTable.get(aItem.id);
        if (t) {
          dataTree.push(t);
        }
      }
    });
    return hashTable;
  }

  private processItem(treeItem: TreeItem) {
    var updatedGrade = 0;
    var updatedWeight = 0;
    var updatedGPA = 0;
    if (treeItem.childNodes) {
      treeItem.childNodes.forEach((i) => {
        var unknownChildrenLogic = !(
          i.item.type != ItemTypes.Item &&
          i.childNodes.length - i.unknownChildrenCounter === 0
        );

        if (unknownChildrenLogic) {
          console.log(
            'name: ',

            i.item.type,
            'Unknown Children Counter',
            i.unknownChildrenCounter,
            'child nodes length',
            i.childNodes.length
          );
        }

        if (
          i.item.type != ItemTypes.Unknown &&
          unknownChildrenLogic &&
          i.item.include == IncludeTypes.Include
        ) {
          var currentItemGPA = this.gradePointToGPA(i.item.mark);
          i.item.gpa = currentItemGPA;
          this.myGradeTree.set(i.item.id, i);
          updatedGPA += currentItemGPA * (i.item.weight / 100);
          updatedGrade += i.item.mark * (i.item.weight / 100);
          updatedWeight += i.item.weight / 100;
        }
      });
      if (updatedWeight != 0) {
        updatedGrade = _.round(updatedGrade / updatedWeight, 2);
        updatedGPA = _.round(updatedGPA / updatedWeight, 2);
      }

      treeItem.item.mark = updatedGrade;
      treeItem.item.gpa = updatedGPA;
      treeItem.item.remaingWeight = 100 * (1 - updatedWeight);
      this.myGradeTree.set(treeItem.item.id, treeItem);
    }
  }

  private processMarks(treeItem: TreeItem) {
    if (treeItem.childNodes.length > 0) {
      // non leaf node
      treeItem.childNodes.forEach((i) => {
        this.processMarks(i);
      });
      this.processItem(treeItem);
    } else {
      var parent = this.myGradeTree.get(treeItem.item.parent);
      if (parent) {
        this.processItem(parent);
      }
    }
  }

  private gradePointToGPA(grade: number): number {
    grade = _.round(grade);

    var defaultRules = new DefaultGPARules().DefaultRules;
    var correspondingGPA = 0;
    for (var i = 0; i < defaultRules.length; i++) {
      if (grade >= defaultRules[i].gradeGreaterThan) {
        correspondingGPA = defaultRules[i].correspondingGPA;
        break;
      }
    }

    return correspondingGPA;
  }
}
