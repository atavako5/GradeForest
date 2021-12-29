import { Component, OnInit, Input } from '@angular/core';
import { DefaultColumn } from 'src/app/lib/default-classes/default-column';
import { Column } from '../../../../../../models/Column.model';
import { DefaultEditor } from '../default-editor.component';

@Component({
  selector: 'db-tree-cell-editor',
  templateUrl: './tree-cell-editor.component.html',
  styleUrls: ['./tree-cell-editor.component.scss'],
})
export class TreeCellEditorComponent extends DefaultEditor implements OnInit {
  @Input()
  cell_value: string = '';

  @Input()
  row_data: any;

  @Input()
  column!: Column;

  @Input()
  expandable_column!: boolean;

  constructor() {
    super();
  }

  ngOnInit() {}
}
