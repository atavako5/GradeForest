import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from 'interfaces/item';
import { ItemTypes } from 'interfaces/item-types';
import { List } from 'interfaces/list';
import { CurrentListService } from '../shared/current-list.service';
import { ForestService } from '../shared/forest.service';
import { CurrentItemService } from '../shared/tree-item-viewer.service';
import { WhatIfService } from '../shared/what-if.service';
import { WhatIfTypes } from 'interfaces/what-if-types';
import { ListService } from '../shared/list.service';

@Component({
  selector: 'app-what-if-i-get',
  templateUrl: './what-if-i-get.component.html',
  styleUrls: ['./what-if-i-get.component.scss']
})
export class WhatIfIGetComponent implements OnInit {

  enabledType: string = ItemTypes.Class
  selectedItem!: Item
  tempList!: List | undefined
  permList!: List
  whatIfIGet = "What if I get this for the rest? "
  whatIfIWant = "I want this grade, what do I need? "
  IGet = WhatIfTypes.IGet
  IWant = WhatIfTypes.IWant
  markFormLabel: string = this.whatIfIGet



  itemEditForm = new FormGroup({
    whatIfMode: new FormControl(false),
    whatIfType: new FormControl(''),
    markFormControl: new FormControl(0, [Validators.required, Validators.nullValidator, Validators.pattern("^(0*([0-9]{1,3}(\\.[0-9]+)?)|\\.[0-9]+|1000(\\.0+$)?)$")]),
  })




  constructor(private currentListService: CurrentListService, private currentItemService:CurrentItemService, private whatifService: WhatIfService, private forestService: ForestService, private listSerivce: ListService) { }

  ngOnInit(): void {
    this.itemEditForm.get("whatIfType")?.setValue(WhatIfTypes.IGet)
    this.currentListService.currentData.subscribe((list)=>{
      if (list){
        if (this.itemEditForm.get("whatIfMode")?.value === true){
          console.log("3. Im getting temp list")
          console.log("this is the perm list 0: ",this.permList)
          this.tempList = list;
          console.log("this is the perm list: ",this.permList)
        }else{
          console.log("5. Im getting perm list")
          this.permList = list;
        }
      }
    })


    this.itemEditForm.get("whatIfMode")?.valueChanges.subscribe((value)=>{
      
      this.whatifService.setData(value)
      if (value === true){
        console.log("1. Im in temp list")
        if (!this.tempList){
          console.log("2. Im in temp list 2 ")
          this.tempList = this.permList
        }
        console.log("this is the perm list: ",this.permList)
        this.currentListService.setData(this.tempList)
      }else{
        console.log("4. Im in perm list")
        this.tempList = undefined
        this.currentListService.setData(this.permList)
      }
    })

    this.itemEditForm.get("whatIfType")?.valueChanges.subscribe((value)=>{
      if (value === WhatIfTypes.IGet){
        this.markFormLabel = this.whatIfIGet
      }else if(value === WhatIfTypes.IWant){
        this.markFormLabel = this.whatIfIWant
      }
    })

    

    this.currentItemService.currentData.subscribe((item)=>{
      if (item){
        this.selectedItem = item
      }
    })

  }

  onSubmit(){
    if( this.itemEditForm.get("whatIfMode")?.value === true && this.tempList){
      if (this.itemEditForm.get("whatIfType")?.value === WhatIfTypes.IGet){
        this.currentListService.setData(this.forestService.whatIfIGet(this.tempList,this.selectedItem,this.itemEditForm.get("markFormControl")?.value))
      }else if  (this.itemEditForm.get("whatIfType")?.value === WhatIfTypes.IWant){
        this.currentListService.setData(this.forestService.IWantToGet(this.tempList,this.selectedItem,this.itemEditForm.get("markFormControl")?.value))
      }

    }
  }

  onPermaSave(){
    if(this.tempList){
      this.permList = this.tempList
      this.tempList = undefined
      this.listSerivce.updateList(this.permList,true)?.subscribe()
      this.currentListService.setData(this.permList)
    }
  
  }

}
