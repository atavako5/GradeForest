import { Configs } from '../models/Configs.model';
import { Actions } from '../models/Actions.model';
import { Column } from '../models/Column.model';
import { Subgrid } from '../models/Subgrid.model';
import { DefaultActions } from './default-actions';
import { DefaultColumn } from './default-column';
import { DefaultCssClass } from './default-css-class';
import { DefaultSubgrid } from './default-subgrid';

export class DefaultConfigs implements Configs {
  css: DefaultCssClass = new DefaultCssClass();
  columns: Column[] = [new DefaultColumn()];
  actions: Actions = new DefaultActions();
  subgrid_config: Subgrid = new DefaultSubgrid();
  parent_id_field = 'parent';
  parent_display_field = 'parent';
  id_field = 'id';
  data_loading_text = 'Loading...';
  filter = false;
  multi_select = false;
  show_parent_on_edit = true;
  show_summary_row = false;
  subgrid = false;
  load_children_on_expand = false;
  action_column_width = '60px';
  row_class_function = (data: any) => true;
  row_edit_function = (data: any) => true;
  row_delete_function = (data: any) => true;
}
