import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  AfterContentInit,
} from '@angular/core';
import { TreeItemViewerService } from '../shared/tree-item-viewer.service';
import { Item } from 'interfaces/item';
import { CurrentListService } from '../shared/current-list.service';
import { ItemTypes } from 'interfaces/item-types';
import { AngularTreeGridComponent } from 'angular-tree-grid';
import { List } from 'interfaces/list';
import { ListService } from '../shared/list.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TreeComponent implements OnInit {
  
  ngOnInit(): void {
    this.currentListService.currentData.subscribe((list) => {
      if (this.currentList?._id != list?._id && this.angularGrid){
        this.angularGrid.deSelectAll()
      }
      this.currentList = list
      if(this.angularGrid){
        this.angularGrid.ngOnChanges()
      }
     
    });
  }
  constructor(private currentListService: CurrentListService, private listService: ListService, private treeItemViewerService:TreeItemViewerService) {}

  @ViewChild('angularGrid')
  angularGrid!: AngularTreeGridComponent;
  currentList!: List|undefined;
  selectedData!: Item;

  configs: any = {
    id_field: 'id',
    parent_id_field: 'parent',
    parent_display_field: 'name',
    actions: {},
    css: {
      // Optional
      expand_class: 'fa fa-caret-right',
      collapse_class: 'fa fa-caret-down',
    },
    columns: [
      {
        name: 'type',
        header: 'Type',
      },
      {
        name: 'name',
        header: 'Name',
      },
      {
        name: 'weight',
        header: 'Weight',
        renderer: function (value: number) {
          if (value < 0){
            return "";
          }else{
            return value;
          }
         
        },
      },
      {
        name: 'mark',
        header: 'Mark',
        renderer: function (value: number) {
          if (value < 0){
            return "";
          }else{
            return value + '%';
          }
          
        },
      },
      {
        name: 'gpa',
        header: 'GPA',
        renderer: function (value: number) {
          if (value < 0){
            return "";
          }else{
            return value;
          }
         
        }
      },
    ],
  };
  onSelect(event:any){
    this.selectedData = event.data;
    this.treeItemViewerService.setData(this.selectedData)
  }
  updateList(){
    if (this.currentList){
      this.listService.updateList(this.currentList).subscribe()
      this.angularGrid.ngOnChanges()
    }
  }
  onAdd() {
    if (this.currentList){
      this.currentList.lastIndex++
      if (this.selectedData){
        this.currentList.items.push({type:ItemTypes.Unknown,name:`${ItemTypes.Unknown} item`,weight: 0,mark:0,gpa:0,id:this.currentList.lastIndex,parent: this.selectedData.id})
      }else{
        this.currentList.items.push({type:ItemTypes.Unknown,name:`${ItemTypes.Unknown} item`,weight: 0,mark:0,gpa:0,id:this.currentList.lastIndex,parent: 0})
      }
      this.updateList()
    }


  }
  onAddClass(){
    if (this.currentList){
      this.currentList.lastIndex++
      this.currentList.items.push({type:ItemTypes.Class,name:`${ItemTypes.Class} item`,weight: 0,mark:0,gpa:0,id: this.currentList.lastIndex,parent: 0})
      this.updateList()

    }

    
  }
}
