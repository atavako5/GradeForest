import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { List } from 'interfaces/list';
import * as _ from 'lodash';
import { AddListDialogComponent } from '../../dialogs/add-list-dialog/add-list-dialog.component';
import { DeleteListDialogComponent } from '../../dialogs/delete-list-dialog/delete-list-dialog.component';
import { CurrentListService } from '../../helpers/services/current-list.service';
import { ListService } from '../../api/services/list.service';
import { MyAuthService } from '../../authentication/login/services/my-auth.service';
import { CurrentListsService } from 'src/app/helpers/services/current-lists.service';

export interface DialogData {
  listName: string;
}

@Component({
  selector: 'app-search-select-list',
  templateUrl: './search-select-list.component.html',
  styleUrls: ['./search-select-list.component.scss'],
})
export class SearchSelectListComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public myAuthService: MyAuthService,
    public listService: ListService,
    public currentListService: CurrentListService,
    public currentListsService: CurrentListsService
  ) { }

  data: List[] | undefined = [];
  dataName: string = 'My Lists';
  listName: any;
  initilized: boolean = false;

  selectedList = new FormControl();

  getLists(setSelectedList: () => void) {
    this.myAuthService.getProfileEmail((email) => {
      this.listService.getLists(email).subscribe((lists) => {
        this.data = lists;
        if (this.data) {
          this.currentListsService.setData(this.data)
        } else {
          this.currentListsService.setData(undefined)
        }
        setSelectedList();
        this.currentListService.setData(this.selectedList.value);
      });
    });
  }

  ngOnInit(): void {
    this.getLists(() => {
      if (this.data && !this.initilized) {
        this.initilized = true;
        this.selectedList.setValue(this.data[0]);
      }
    });
    this.selectedList.valueChanges.subscribe(() => {
      this.currentListService.setData(this.selectedList.value);
    });
  }

  openNewListDialog(): void {
    const dialogRef = this.dialog.open(AddListDialogComponent, {
      width: '250px',
      data: { listName: this.listName },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'Cancel') {
        return;
      }
      result = result.trim();
      this.myAuthService.getProfileEmail((email) => {
        this.listService
          .addList({
            user_id: email,
            name: result,
            items: [],
            lastIndex: 1,
            GPARules: [],
            cumulatedGrade: {
              cumulativeGrade: 0,
              cumulativeGPA: 0,
              GPAScale: 0,
              cumulativeLetter: "-"
            },
          })
          .subscribe((list) => {

            this.getLists(() => {
              this.selectedList.setValue(_.find(this.data, list));
            });
          });
      });
    });
  }

  deleteSelectedListDialog(): void {
    const dialogRef = this.dialog.open(DeleteListDialogComponent, {
      width: '250px',
      data: { listName: this.selectedList.value.name },
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'Cancel') {
        return;
      }
      result = result.trim();
      if (this.selectedList.value?._id) {
        this.listService.deleteList(this.selectedList.value._id).subscribe();
        this.getLists(() => {
          if (this.data) {
            this.selectedList.setValue(this.data[0]);
          } else {
            this.selectedList.setValue(undefined);
          }
        });
      }
    });
  }
}
