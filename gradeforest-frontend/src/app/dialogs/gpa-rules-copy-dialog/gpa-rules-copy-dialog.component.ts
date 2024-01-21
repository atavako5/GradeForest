import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { List } from 'interfaces/list';

export interface GpaRulesCopyDialogData {
  lists: List[];
}

@Component({
  selector: 'app-gpa-rules-copy-dialog',
  templateUrl: './gpa-rules-copy-dialog.component.html',
  styleUrls: ['./gpa-rules-copy-dialog.component.scss']
})

export class GpaRulesCopyDialogComponent implements OnInit {

  data: List[] = [];
  listId: string = ""
  listName: any;

  selectedList = new UntypedFormControl();

  constructor(public dialogRef: MatDialogRef<GpaRulesCopyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public copyDialogData: GpaRulesCopyDialogData) { }

  ngOnInit(): void {
    this.data = this.copyDialogData.lists;
  }

  onCancelClick(): void {
    this.dialogRef.close('Cancel');
  }

  onOKClick(): void {
    this.dialogRef.close((this.selectedList.value as List)._id);
  }

}
