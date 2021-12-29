import { Column } from 'angular-tree-grid/lib/models/Column.model';
import { Subgrid } from 'angular-tree-grid/lib/models/Subgrid.model';
import { DefaultColumn } from './default-column';

export class DefaultSubgrid implements Subgrid {
  id_field: string = 'id';
  show_summary_row: boolean = false;
  data_loading_text: string = 'Loading...';
  columns: Column[] = [];
}
