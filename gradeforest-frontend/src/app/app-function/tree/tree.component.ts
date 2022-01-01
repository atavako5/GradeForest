import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  AfterContentInit,
  HostListener,
} from '@angular/core';
import { CurrentItemService } from '../../helpers/services/tree-item-viewer.service';
import { Item } from 'interfaces/item';
import { CurrentListService } from '../../helpers/services/current-list.service';
import { ItemTypes } from 'interfaces/item-types';
import { AngularTreeGridComponent } from '../../lib/angular-tree-grid.component';
import { List } from 'interfaces/list';
import { ListService } from '../../api/services/list.service';
import { take } from 'rxjs/operators';
import { IncludeTypes } from 'interfaces/include-types';
import { WhatIfService } from '../../helpers/services/what-if.service';
import { CumulativeGradeService } from 'src/app/helpers/services/cumulative-grade.service';
import { ForestService } from 'src/app/helpers/services/forest.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TreeComponent implements OnInit {
  @ViewChild('angularGrid')
  angularGrid!: AngularTreeGridComponent;
  currentList!: List | undefined;
  selectedData!: Item;
  public disableAdd: boolean = true;
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
      row_selection_class: 'background-color-accent',
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
        renderer: function (value: number) {
          return value + '%';
        },
      },
      {
        name: 'mark',
        header: 'Mark',
        renderer: function (value: number) {
          return value + '%';
        },
      },
      {
        name: 'gpa',
        header: 'GPA',
      },
      {
        name: 'remaingWeight',
        header: 'Weight Remaining',
        renderer: function (value: number) {
          return value + '%';
        },
      },
    ],
  };

  ngOnInit(): void {
    this.currentListService.currentData.subscribe((list) => {
      if (this.currentList?._id != list?._id && this.angularGrid) {
        console.log(
          'list ids are not equal:',
          this.currentList?._id,
          '!=',
          list?._id
        );
        this.angularGrid.deSelectAll();
      }
      if (this.currentList != list) {
        this.currentList = list;
      }
      if (this.angularGrid) {
        this.angularGrid.ngOnChanges();
      }
      if (this.selectedData) {
        this.disableAdd =
          this.selectedData.type == ItemTypes.Item ||
          this.selectedData.type == ItemTypes.Unknown;
      }
      if (list) {
        console.log('Updated the cumulative average');

        this.cumulativeGradeService.setData(
          this.forestService.cumulateGrades(list)
        );
      }
    });

    this.whatIfService.pressedWhatIfButtonObserver.subscribe(() => {
      this.rowSelect();
    });
    this.whatIfService.currentWhatIfMode.subscribe((value) => {
      if (value == false) {
        if (this.currentList?._id) {
          this.listService
            .getList(this.currentList._id)
            .subscribe((list: List) => {
              this.currentList = list;
              this.currentListService.setData(this.currentList);
            });
        }
      }
    });
  }

  constructor(
    private currentListService: CurrentListService,
    private listService: ListService,
    private currentItemService: CurrentItemService,
    private whatIfService: WhatIfService,
    private cumulativeGradeService: CumulativeGradeService,
    private forestService: ForestService
  ) { }

  onSelect(event: any) {
    this.selectedData = event.data;
    this.currentItemService.setData(this.selectedData);
    this.disableAdd =
      this.selectedData.type == ItemTypes.Item ||
      this.selectedData.type == ItemTypes.Unknown;
  }
  rowSelect() {
    if (this.currentList && this.angularGrid && this.selectedData) {
      this.angularGrid.expandRow(this.selectedData.id);
      this.angularGrid.selectOne(this.currentList.lastIndex);
      this.currentItemService.setData(
        this.currentList.items.find(
          (item) => item.id == this.currentList?.lastIndex
        )
      );
    }
  }

  updateList() {
    if (this.currentList) {
      this.currentList = this.forestService.updateTree(this.currentList);
      this.listService.updateList(this.currentList)?.subscribe();
      this.currentListService.setData(this.currentList);
      this.angularGrid.ngOnChanges();
      this.rowSelect();

      var selectedData = this.currentList.items.find(
        (item) => item.id === this.currentList?.lastIndex
      );
      if (selectedData) {
        this.selectedData = selectedData;
        this.currentItemService.setData(this.selectedData);
      }
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
          remaingWeight: 0,
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
          remaingWeight: 0,
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
        remaingWeight: 0,
      });
      this.updateList();
    }
  }
}
