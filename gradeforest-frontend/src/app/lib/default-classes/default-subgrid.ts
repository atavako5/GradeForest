import { Column } from '../models/Column.model';
import { Subgrid } from '../models/Subgrid.model';

export class DefaultSubgrid implements Subgrid {
  id_field: string = 'id';
  show_summary_row: boolean = false;
  data_loading_text: string = 'Loading...';
  columns: Column[] = [];
}
