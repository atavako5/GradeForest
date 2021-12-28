import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IncludeTypes } from 'interfaces/include-types';
import { Item } from 'interfaces/item';
import { ItemTypes } from 'interfaces/item-types';
import { List } from 'interfaces/list';
import * as _ from 'lodash';
import { CurrentListService } from '../../helpers/services/current-list.service';
import { ForestService } from '../../helpers/services/forest.service';
import { ListService } from '../../api/services/list.service';
import { CurrentItemService } from '../../helpers/services/tree-item-viewer.service';

@Component({
  selector: 'app-item-viewer',
  templateUrl: './item-viewer.component.html',
  styleUrls: ['./item-viewer.component.scss'],
})
export class ItemViewerComponent implements OnInit {
  breakpoint!: number;

  constructor(
    private TreeItemViewerService: CurrentItemService,
    private currentListService: CurrentListService,
    private listService: ListService,
    private forestService: ForestService
  ) {}

  data: Item | undefined;
  itemTypes: string[] = [];
  includeTypes: string[] = [];
  currentList!: List | undefined;
  // Helper
  StringIsNumber = (value: any) => isNaN(Number(value)) === false;

  itemEditForm = new FormGroup({
    selectedItemTypeFormControl: new FormControl(''),
    selectedIncludeTypeFormControl: new FormControl(''),
    nameFormControl: new FormControl(''),
    weightFormControl: new FormControl(0, [
      Validators.required,
      Validators.nullValidator,
      Validators.pattern(
        '^(0*([0-9]{1,2}(\\.[0-9]+)?)|\\.[0-9]+|100(\\.0+$)?)$'
      ),
    ]),
    markFormControl: new FormControl(0, [
      Validators.required,
      Validators.nullValidator,
      Validators.pattern(
        '^(0*([0-9]{1,3}(\\.[0-9]+)?)|\\.[0-9]+|1000(\\.0+$)?)$'
      ),
    ]),
  });

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    console.log('Key Event', event.key);

    if (event.key == 'ArrowUp') {
      event.stopPropagation();
    } else if (event.key === 'ArrowDown') {
      event.stopPropagation();
    } else if (event.key === 'Delete') {
      event.stopPropagation();
      this.onDelete();
    }
  }

  // Turn enum into array
  ToArray(enumme: any) {
    return Object.keys(enumme).map((key) => enumme[key]);
  }
  updateItemEditForm() {
    if (this.data) {
      this.itemEditForm
        .get('selectedIncludeTypeFormControl')
        ?.setValue(this.data.include);
      this.itemEditForm
        .get('selectedItemTypeFormControl')
        ?.setValue(this.data.type);
      this.itemEditForm.get('nameFormControl')?.setValue(this.data.name);
      this.itemEditForm.get('weightFormControl')?.setValue(this.data.weight);
      this.itemEditForm.get('markFormControl')?.setValue(this.data.mark);
    }
  }
  ngOnInit(): void {
    this.TreeItemViewerService.currentData.subscribe((data) => {
      this.data = data;
      this.updateItemEditForm();
    });
    this.currentListService.currentData.subscribe((list) => {
      if (this.currentList?._id != list?._id) {
        this.data = undefined;
      }
      this.currentList = list;
      this.updateItemEditForm();
    });

    this.itemTypes = this.ToArray(ItemTypes);
    this.includeTypes = this.ToArray(IncludeTypes);
    const index = this.itemTypes.indexOf(ItemTypes.Unknown);
    if (index > -1) {
      this.itemTypes.splice(index, 1);
    }

    this.breakpoint = window.innerWidth <= 700 ? 1 : 3;
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 700 ? 1 : 3;
  }

  updateList() {
    this.currentListService.setData(this.currentList);
    if (this.currentList)
      this.listService.updateList(this.currentList)?.subscribe();
  }
  onSubmit() {
    if (this.data) {
      this.data.name = this.itemEditForm.value['nameFormControl'];
      this.data.mark = this.itemEditForm.value['markFormControl'];
      this.data.weight = this.itemEditForm.value['weightFormControl'];
      this.data.type = this.itemEditForm.value['selectedItemTypeFormControl'];
      this.data.include =
        this.itemEditForm.value['selectedIncludeTypeFormControl'];
      if (this.data.type == ItemTypes.Class) {
        this.data.parent = 0;
      }
      if (this.currentList) {
        this.currentList.items = _.map(this.currentList.items, (a: Item) => {
          return a.id == this.data?.id ? this.data : a;
        });
        this.currentList = this.forestService.updateTree(this.currentList);
        this.updateList();
      }
    }
  }

  onDelete() {
    if (this.currentList && this.data)
      this.currentList = this.forestService.pruneTree(
        this.currentList,
        this.data
      );
    this.updateList();
  }
}
