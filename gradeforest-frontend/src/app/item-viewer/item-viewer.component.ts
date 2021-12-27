import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from 'interfaces/item';
import { ItemTypes } from 'interfaces/item-types';
import { List } from 'interfaces/list';
import * as _ from 'lodash';
import { CurrentListService } from '../shared/current-list.service';
import { ForestService } from '../shared/forest.service';
import { ListService } from '../shared/list.service';
import { TreeItemViewerService } from '../shared/tree-item-viewer.service';

@Component({
  selector: 'app-item-viewer',
  templateUrl: './item-viewer.component.html',
  styleUrls: ['./item-viewer.component.scss'],
})
export class ItemViewerComponent implements OnInit {
  breakpoint!: number;

  constructor(private TreeItemViewerService: TreeItemViewerService, private currentListService: CurrentListService, private listService: ListService, private forestService: ForestService) {}

  data: Item|undefined;
  itemTypes: string[] = [];
  currentList!: List| undefined;
  // Helper
  StringIsNumber = (value: any) => isNaN(Number(value)) === false;

  itemEditForm = new FormGroup({
    selectedItemTypeFormControl: new FormControl(''),
    nameFormControl:  new FormControl(''),
    weightFormControl: new FormControl(0, [Validators.required, Validators.nullValidator, Validators.pattern("^[0-9][0-9]?$|^100$")]),
    markFormControl: new FormControl(0, [Validators.required, Validators.nullValidator, Validators.pattern("^[0-9][0-9]?$|^100$")]),
  })


  // Turn enum into array
  ToArray(enumme: any) {
    return Object.keys(enumme)
      .map((key) => enumme[key]);
  }
  updateItemEditForm(){
    if (this.data){
    this.itemEditForm.get("selectedItemTypeFormControl")?.setValue(this.data.type)
    this.itemEditForm.get("nameFormControl")?.setValue(this.data.name)
    this.itemEditForm.get("weightFormControl")?.setValue(this.data.weight)
    this.itemEditForm.get("markFormControl")?.setValue(this.data.mark)
    }
  }
  ngOnInit(): void {
    this.TreeItemViewerService.currentData.subscribe((data) => {
      this.data = data
      this.updateItemEditForm()
    });
    this.currentListService.currentData.subscribe((list)=>{
      
      if (this.currentList?._id != list?._id){
        this.data = undefined
      }
      this.currentList = list
      this.updateItemEditForm()
    })

    

    this.itemTypes = this.ToArray(ItemTypes)
    const index = this.itemTypes.indexOf(ItemTypes.Unknown);
    if (index > -1) {
      this.itemTypes.splice(index, 1);
    }

    
    this.breakpoint = window.innerWidth <= 700 ? 1 : 3;
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 700 ? 1 : 3;
  }

  updateList(){
    this.currentListService.setData(this.currentList)
    if (this.currentList)
    this.listService.updateList(this.currentList).subscribe()
  }
  onSubmit() {
    if(this.data){
      this.data.name = this.itemEditForm.value["nameFormControl"]
      this.data.mark = this.itemEditForm.value["markFormControl"]
      this.data.weight = this.itemEditForm.value["weightFormControl"]
      this.data.type = this.itemEditForm.value["selectedItemTypeFormControl"]
  
      if (this.currentList)
      this.currentList.items = _.map(this.currentList.items, (a: Item) => {
        return a.id == this.data?.id ? this.data : a;
      });
  
      this.updateList()
    }

    
    
  }

  

  onDelete() {
    if (this.currentList && this.data)
    this.currentList = this.forestService.pruneTree(this.currentList, this.data)
    this.updateList()

  }
}