import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GPARule } from 'interfaces/gpa-rule';
import { List } from 'interfaces/list';
import * as _ from 'lodash';
import { ListService } from 'src/app/api/services/list.service';
import { GpaRulesCopyDialogComponent } from 'src/app/dialogs/gpa-rules-copy-dialog/gpa-rules-copy-dialog.component';
import { GpaRulesDialogComponent } from 'src/app/dialogs/gpa-rules-dialog/gpa-rules-dialog.component';
import { DefaultGPARules } from 'src/app/helpers/default-gpa-rules';
import { CurrentListService } from 'src/app/helpers/services/current-list.service';
import { CurrentListsService } from 'src/app/helpers/services/current-lists.service';
import { GpaRulesService } from 'src/app/helpers/services/gpa-rules.service';


@Component({
  selector: 'app-gpa-rules',
  templateUrl: './gpa-rules.component.html',
  styleUrls: ['./gpa-rules.component.scss']
})
export class GpaRulesComponent implements OnInit {

  selectedList!: List;
  lists!: List[]
  constructor(public currentListService: CurrentListService, public dialog: MatDialog, public listService: ListService, public gpaRulesService: GpaRulesService, public currentListsService: CurrentListsService) { }

  ngOnInit(): void {
    this.currentListService.currentData.subscribe(list => {
      if (list) {
        this.selectedList = list;
      }
    })

    this.currentListsService.currentData.subscribe(lists => {
      if (lists) {
        this.lists = lists
      }
    })

  }

  openGPARulesDialog() {
    let gpaRules: GPARule[] = []
    if (this.selectedList.GPARules && this.selectedList.GPARules.length > 0) {
      gpaRules = this.selectedList.GPARules
    } else {
      gpaRules = new DefaultGPARules().DefaultRules
    }
    const dialogRef = this.dialog.open(GpaRulesDialogComponent, {
      data: { gpaRules: gpaRules },
    });

    dialogRef.afterClosed().subscribe((result: GPARule[] | string) => {
      if (!result || result.length <= 0 || result === "Cancel") {
        return;
      }
      let gpaRulesProper: GPARule[] = []
      try {
        result = result as GPARule[]
        result.forEach(rule => {
          gpaRulesProper.push({ gradeGreaterThan: parseFloat(rule.gradeGreaterThan.toString()), correspondingGPA: parseFloat(rule.correspondingGPA.toString()), correspondingLetter: rule.correspondingLetter })
        })

        this.selectedList.GPARules = gpaRulesProper;
        this.gpaRulesService.setData(this.selectedList.GPARules)
        this.currentListService.setData(this.selectedList)
        this.listService.updateList(
          this.selectedList, true
        )?.subscribe()
      } catch (error) {
        console.error("The GPA Rules were not properly formatted")
      }




    });
  }

  openGPARulesCopyDialog() {

    const dialogRef = this.dialog.open(GpaRulesCopyDialogComponent, {
      data: { lists: _.filter(this.lists, list => { return list._id != this.selectedList._id }) as List[] },
    });

    dialogRef.afterClosed().subscribe((listId: string) => {
      if (!listId || listId === "Cancel") {
        return;
      }
      try {
        var gpaRuleList = this.lists.find(list => list._id == listId);
        if (gpaRuleList) {
          this.selectedList.GPARules = gpaRuleList.GPARules;
          console.log(this.selectedList)

          this.listService.updateList(this.selectedList, true)?.subscribe(list => {
            console.log(list)
            this.currentListService.setData(list)
          })
        }
      } catch (error) {
        console.error("The GPA Rules were not properly formatted")
      }




    });
  }

}
