import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from 'interfaces/item';
import { ItemTypes } from 'interfaces/item-types';
import { List } from 'interfaces/list';
import { CurrentListService } from '../../helpers/services/current-list.service';
import { ForestService } from '../../helpers/services/forest.service';
import { CurrentItemService } from '../../helpers/services/tree-item-viewer.service';
import { WhatIfService } from '../../helpers/services/what-if.service';
import { WhatIfTypes } from 'interfaces/what-if-types';
import { ListService } from '../../api/services/list.service';

@Component({
  selector: 'app-what-if-i-get',
  templateUrl: './what-if-i-get.component.html',
  styleUrls: ['./what-if-i-get.component.scss'],
})
export class WhatIfIGetComponent implements OnInit {
  enabledType: string = ItemTypes.Class;
  selectedItem!: Item;
  tempList!: List | undefined;
  permList!: List;
  whatIfIGet = 'What if I get this for the rest? ';
  whatIfIWant = 'I want this grade, what do I need? ';
  IGet = WhatIfTypes.IGet;
  IWant = WhatIfTypes.IWant;
  markFormLabel: string = this.whatIfIGet;

  itemEditForm = new FormGroup({
    whatIfMode: new FormControl(false),
    whatIfType: new FormControl(''),
    markFormControl: new FormControl(0, [
      Validators.required,
      Validators.nullValidator,
      Validators.pattern(
        '^(0*([0-9]{1,3}(\\.[0-9]+)?)|\\.[0-9]+|1000(\\.0+$)?)$'
      ),
    ]),
  });

  constructor(
    private currentListService: CurrentListService,
    private currentItemService: CurrentItemService,
    private whatifService: WhatIfService,
    private forestService: ForestService,
    private listSerivce: ListService
  ) {}

  ngOnInit(): void {
    this.itemEditForm.get('whatIfType')?.setValue(WhatIfTypes.IGet);

    this.currentListService.currentData.subscribe((list) => {
      if (list) {
        if (this.itemEditForm.get('whatIfMode')?.value === true) {
          this.tempList = list;
        } else {
          this.permList = list;
        }
      }
    });

    this.itemEditForm.get('whatIfMode')?.valueChanges.subscribe((value) => {
      this.whatifService.setData(value);

      if (value === true) {
        if (!this.tempList) {
          this.tempList = this.permList;
        }
        this.currentListService.setData(this.tempList);
      } else {
        this.tempList = undefined;
        this.currentListService.setData(this.permList);
      }
    });

    this.itemEditForm.get('whatIfType')?.valueChanges.subscribe((value) => {
      if (value === WhatIfTypes.IGet) {
        this.markFormLabel = this.whatIfIGet;
      } else if (value === WhatIfTypes.IWant) {
        this.markFormLabel = this.whatIfIWant;
      }
    });

    this.currentItemService.currentData.subscribe((item) => {
      if (item) {
        this.selectedItem = item;
      }
    });
  }

  onSubmit() {
    if (this.itemEditForm.get('whatIfMode')?.value === true && this.tempList) {
      if (this.itemEditForm.get('whatIfType')?.value === WhatIfTypes.IGet) {
        this.currentListService.setData(
          this.forestService.whatIfIGet(
            this.tempList,
            this.selectedItem,
            this.itemEditForm.get('markFormControl')?.value
          )
        );
      } else if (
        this.itemEditForm.get('whatIfType')?.value === WhatIfTypes.IWant
      ) {
        this.currentListService.setData(
          this.forestService.iWantToGet(
            this.tempList,
            this.selectedItem,
            this.itemEditForm.get('markFormControl')?.value
          )
        );
      }
    }
  }

  onPermaSave() {
    if (this.tempList) {
      this.listSerivce.updateList(this.tempList, true)?.subscribe();
      this.permList = this.tempList;
      this.tempList = undefined;
      this.currentListService.setData(this.permList);
    }
  }
}
