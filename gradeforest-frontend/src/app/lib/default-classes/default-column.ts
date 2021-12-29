import { Column } from '../models/Column.model';

export class DefaultColumn implements Column {
  header: string = '';
  name: string = '';
  css_class: string = '';
  sorted: number = 0;
  sort_type = 0;
  sortable = false;
  editable: Boolean = false;
  filter: Boolean = true;
  hidden: Boolean = false;
  width: string = '';
  renderer?: any;
  header_renderer?: any;
  type: string = '';
  component?: any;
  editor?: any;
  on_component_init?: any;
  case_sensitive_filter: Boolean = false;
  summary_renderer?: any;
}
