import { Component, OnInit, Input } from '@angular/core';
import { DefaultColumn } from 'src/app/lib/default-classes/default-column';
import { Column } from '../../../../../models/Column.model';

@Component({
  selector: 'db-tree-cell-view',
  templateUrl: './tree-cell-view.component.html',
  styleUrls: ['./tree-cell-view.component.scss'],
})
export class TreeCellViewComponent implements OnInit {
  @Input()
  column: Column = new DefaultColumn();

  @Input()
  row_data: any;

  constructor() {}

  ngOnInit() {}
}
