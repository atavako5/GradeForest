import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GPARule } from 'interfaces/gpa-rule';
import { DefaultGPARules } from 'src/app/helpers/default-gpa-rules';


export interface GpaRulesDialogData {
  gpaRules: GPARule[];
}

@Component({
  selector: 'app-gpa-rules-dialog',
  templateUrl: './gpa-rules-dialog.component.html',
  styleUrls: ['./gpa-rules-dialog.component.scss']
})
export class GpaRulesDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GpaRulesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GpaRulesDialogData) { }

  ngOnInit(): void {
    this.gpaRules = this.data.gpaRules
  }

  gpaRules: GPARule[] = new DefaultGPARules().DefaultRules

  configs: any = {
    height: '300px',
    filter: true,
    actions: {
      add: true,
      edit: true,
      delete: true
    },
    css: {
      table_class: 'fixed-header-table',
      row_selection_class: 'background-color-accent',
      add_class: 'fa fa-plus',
      edit_class: 'fa fa-pencil',
      delete_class: 'fa fa-trash',
      save_class: 'fa fa-save',
      cancel_class: 'fa fa-remove',
    },
    columns: [
      {
        name: 'gradeGreaterThan',
        header: 'For Marks Greater than...',
        editable: true,
        width: "200px"
      },
      {
        name: 'correspondingGPA',
        header: 'GPA',
        editable: true,
        width: "100px"
      },
      {
        name: 'correspondingLetter',
        header: 'Letter',
        editable: true,
        width: "100px"
      }]
  };

  onCancelClick(): void {
    this.dialogRef.close('Cancel');
  }

  onOKClick(): void {
    this.dialogRef.close(this.gpaRules);
  }
}
