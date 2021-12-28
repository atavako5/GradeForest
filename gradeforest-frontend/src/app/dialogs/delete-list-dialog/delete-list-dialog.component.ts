import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../app-function/search-select-list/search-select-list.component';

@Component({
  selector: 'app-delete-list-dialog',
  templateUrl: './delete-list-dialog.component.html',
  styleUrls: ['./delete-list-dialog.component.scss'],
})
export class DeleteListDialogComponent implements OnInit {
  ngOnInit(): void {}
  constructor(
    public dialogRef: MatDialogRef<DeleteListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onCancelClick(): void {
    this.dialogRef.close('Cancel');
  }

  onOKClick(): void {
    this.dialogRef.close(' ' + this.data.listName);
  }
}
