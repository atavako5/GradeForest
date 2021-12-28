import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  AfterContentInit,
} from '@angular/core';
import { CurrentItemService } from '../shared/tree-item-viewer.service';
import { Item } from 'interfaces/item';
import { CurrentListService } from '../shared/current-list.service';
import { ItemTypes } from 'interfaces/item-types';
import { AngularTreeGridComponent } from 'angular-tree-grid';
import { List } from 'interfaces/list';
import { ListService } from '../shared/list.service';
import { take } from 'rxjs/operators';
import { IncludeTypes } from 'interfaces/include-types';
import { WhatIfService } from '../shared/what-if.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TreeComponent implements OnInit {
  ngOnInit(): void {
    this.currentListService.currentData.subscribe((list) => {
      console.log(list)
      if (this.currentList?._id != list?._id && this.angularGrid) {
        this.angularGrid.deSelectAll();
      }
      if (this.currentList != list){
        this.currentList = list;
      }
      if (this.angularGrid) {
        this.angularGrid.ngOnChanges();
      }
      if(this.selectedData){
        this.disableAdd = this.selectedData.type == ItemTypes.Item || this.selectedData.type == ItemTypes.Unknown
      }
   
    });
  
    this.whatIfService.currentData.subscribe(value=>{
      if (value == false){
        if(this.currentList?._id){
          this.listService.getList(this.currentList._id).subscribe((list:List)=>{
            this.currentList = list
            this.currentListService.setData(this.currentList)
          })
        }
      }
    })
  }
  constructor(
    private currentListService: CurrentListService,
    private listService: ListService,
    private treeItemViewerService: CurrentItemService,
    private whatIfService: WhatIfService
  ) {}


  @ViewChild('angularGrid')
  angularGrid!: AngularTreeGridComponent;
  currentList!: List | undefined;
  selectedData!: Item;
  public disableAdd: boolean = true
  configs: any = {
    id_field: 'id',
    parent_id_field: 'parent',
    parent_display_field: 'name',
    actions: {},
    css: {
      // Optional
      expand_class: 'fa fa-caret-right',
      collapse_class: 'fa fa-caret-down',
      table_class: 'tree-table',
      row_selection_class: 'selected-row'
    },
    columns: [
      {
        name: 'name',
        header: 'Name',
      },
      {
        name: 'include',
        header: 'Include Item?',
      },
      {
        name: 'type',
        header: 'Type',
      },

      {
        name: 'weight',
        header: 'Weight',
        renderer: function(value: number) {
          return value + '%';
        }
      },
      {
        name: 'mark',
        header: 'Mark',
        renderer: function(value: number) {
          return value + '%';
        }
      },
      {
        name: 'gpa',
        header: 'GPA',
        
      },
      {
        name: 'remaingWeight',
        header: 'Weight Remaining',
        renderer: function(value: number) {
          return value + '%';
        }
      },
    ],
  };
  onSelect(event: any) {
    console.log(event.event)
    this.selectedData = event.data;
    this.treeItemViewerService.setData(this.selectedData);
    this.disableAdd = this.selectedData.type == ItemTypes.Item || this.selectedData.type == ItemTypes.Unknown
  }
  updateList() {
    if (this.currentList) {
      this.listService.updateList(this.currentList)?.subscribe();
      this.currentListService.setData(this.currentList)
      this.angularGrid.ngOnChanges();
    }
  }
  onAdd() {
    if (this.currentList) {
      this.currentList.lastIndex++;
      if (this.selectedData) {
        this.currentList.items.push({
          type: ItemTypes.Unknown,
          name: ``,
          weight: 0,
          mark: 0,
          gpa: 0,
          id: this.currentList.lastIndex,
          parent: this.selectedData.id,
          include: IncludeTypes.Include,
          remaingWeight: 0
        });
      } else {
        this.currentList.items.push({
          type: ItemTypes.Unknown,
          name: ``,
          weight: 0,
          mark: 0,
          gpa: 0,
          id: this.currentList.lastIndex,
          parent: 0,
          include: IncludeTypes.Include,
          remaingWeight: 0
        });
      }
      this.updateList();
    }
  }
  onAddClass() {
    if (this.currentList) {
      this.currentList.lastIndex++;
      this.currentList.items.push({
        type: ItemTypes.Class,
        name: ``,
        weight: 0,
        mark: 0,
        gpa: 0,
        id: this.currentList.lastIndex,
        parent: 0,
        include: IncludeTypes.Include,
        remaingWeight: 0
      });
      this.updateList();
    }
  }
}
