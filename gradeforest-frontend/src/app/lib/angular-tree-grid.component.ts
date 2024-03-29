import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { Configs } from './models/Configs.model';
import { AngularTreeGridService } from './angular-tree-grid.service';
import { Column } from './models/Column.model';
import { Store } from './store/store';
import { DefaultConfigs } from './default-classes/default-config';
import { DefaultColumn } from './default-classes/default-column';

@Component({
  selector: 'db-angular-tree-grid',
  templateUrl: 'angular-tree-grid.component.html',
  styleUrls: ['./angular-tree-grid.component.scss'],
})
export class AngularTreeGridComponent implements OnChanges, OnInit {
  processed_data: any[] = [];
  expand_tracker: any = {};
  columns: Column[] = [];
  edit_tracker: any = {}; // Track Edit options.
  internal_configs: any = {
    show_add_row: false,
    show_parent_col: false,
    all_selected: false,
  };
  store = new Store(this.angularTreeGridService);

  @Input()
  data: any[] = [];

  @Input()
  configs!: DefaultConfigs;

  default_configs: Configs = new DefaultConfigs();
  default_column_config: Column = new DefaultColumn();

  @Output() cellclick: EventEmitter<any> = new EventEmitter();
  @Output() expand: EventEmitter<any> = new EventEmitter();
  @Output() collapse: EventEmitter<any> = new EventEmitter();
  @Output() rowselect: EventEmitter<any> = new EventEmitter();
  @Output() rowdeselect: EventEmitter<any> = new EventEmitter();
  @Output() rowselectall: EventEmitter<any> = new EventEmitter();
  @Output() rowdeselectall: EventEmitter<any> = new EventEmitter();
  @Output() rowadd: EventEmitter<any> = new EventEmitter();
  @Output() rowsave: EventEmitter<any> = new EventEmitter();
  @Output() rowdelete: EventEmitter<any> = new EventEmitter();

  constructor(private angularTreeGridService: AngularTreeGridService) {}

  ngOnInit() {
    if (!this.validateConfigs()) {
      return;
    }
    this.setDefaultConfigs();
    this.setColumnNames();
  }

  ngOnChanges() {
    if (!this.validateConfigs()) {
      return;
    }
    this.setDefaultConfigs();
    this.setColumnNames();
    this.store.processData(
      this.data,
      this.expand_tracker,
      this.configs,
      this.edit_tracker,
      this.internal_configs
    );
  }

  validateConfigs() {
    if (!this.data) {
      window.console.warn("data can't be empty!");
      return;
    }
    if (!this.configs) {
      window.console.warn("configs can't be empty!");
      return;
    }
    const element = this.data[0];
    let isValidated = true;

    if (!this.configs.id_field) {
      isValidated = false;
      window.console.error('id field is mandatory!');
    }

    if (!this.configs.parent_id_field && !this.configs.subgrid) {
      isValidated = false;
      window.console.error('parent_id field is mandatory!');
    }

    if (element && !element.hasOwnProperty(this.configs.id_field)) {
      isValidated = false;
      console.error("id_field doesn't exist!");
    }

    if (
      element &&
      !element.hasOwnProperty(this.configs.parent_id_field) &&
      !this.configs.subgrid &&
      !this.configs.load_children_on_expand
    ) {
      isValidated = false;
      console.error("parent_id_field doesn't exist!");
    }

    if (element && !element.hasOwnProperty(this.configs.parent_display_field)) {
      isValidated = false;
      console.error(
        "parent_display_field doesn't exist! Basically this field will be expanded."
      );
    }

    if (this.configs.subgrid && !this.configs.subgrid_config) {
      isValidated = false;
      console.error("subgrid_config doesn't exist!");
    }

    if (
      this.configs.subgrid &&
      this.configs.subgrid_config &&
      !this.configs.subgrid_config.id_field
    ) {
      isValidated = false;
      console.error("id_field of subgrid doesn't exist!");
    }

    if (
      this.configs.subgrid &&
      this.configs.subgrid_config &&
      !this.configs.subgrid_config.columns
    ) {
      isValidated = false;
      console.error("columns of subgrid doesn't exist!");
    }

    return isValidated;
  }

  setDefaultConfigs() {
    this.processed_data = [];
    this.configs = Object.assign({}, this.default_configs, this.configs);

    // Deep clone.
    this.configs.actions = Object.assign(
      {},
      this.default_configs.actions,
      this.configs.actions
    );
    this.configs.css = Object.assign(
      {},
      this.default_configs.css,
      this.configs.css
    );
    this.configs.subgrid_config = Object.assign(
      {},
      this.default_configs.subgrid_config,
      this.configs.subgrid_config
    );

    if (this.configs.subgrid) {
      this.configs.actions.add = false;
    }
  }

  setColumnNames() {
    this.columns = this.configs.columns ? this.configs.columns : [];

    // If columns doesn't exist in user's object.
    if (!this.configs.columns) {
      const column_keys = Object.keys(this.data[0]);

      // Insert Header and default configuration.
      column_keys.forEach((key) => {
        this.columns.push(
          Object.assign({ header: key, name: key }, this.default_column_config)
        );
      });
    } else {
      // Insert Header and default configuration.
      for (let i = 0; i < this.columns.length; i++) {
        this.columns[i] = Object.assign(
          {},
          this.default_column_config,
          this.columns[i]
        );
      }
    }
  }

  collapseAll() {
    this.angularTreeGridService.collapseAll(this.expand_tracker);
  }

  expandAll() {
    this.angularTreeGridService.expandAll(this.expand_tracker);
  }

  selectAll() {
    this.angularTreeGridService.selectAll(this.store.getDisplayData());
    this.internal_configs.all_selected = true;
  }

  selectOne(row_id: any) {
    this.angularTreeGridService.selectOne(
      this.store.getDisplayData(),
      this.configs,
      row_id
    );
  }

  deSelectAll() {
    this.angularTreeGridService.deSelectAll(this.store.getDisplayData());
    this.internal_configs.all_selected = false;
  }

  expandRow(row_id: any, suppress_event?: false) {
    this.angularTreeGridService.expandRow(
      row_id,
      this.expand_tracker,
      this.expand,
      suppress_event,
      this.configs,
      this.store.getDisplayData(),
      this.store
    );
  }

  collapseRow(row_id: any, suppress_event?: false) {
    this.angularTreeGridService.collapseRow(
      row_id,
      this.expand_tracker,
      this.collapse,
      suppress_event,
      this.configs,
      this.store.getDisplayData()
    );
  }

  disableRowSelection(row_id: any) {
    this.angularTreeGridService.disableRowSelection(
      this.store.getDisplayData(),
      this.configs,
      row_id
    );
  }

  enableRowSelection(row_id: any) {
    this.angularTreeGridService.enableRowSelection(
      this.store.getDisplayData(),
      this.configs,
      row_id
    );
  }

  disableRowExpand(row_id: any) {
    this.angularTreeGridService.disableRowExpand(
      this.store.getDisplayData(),
      this.configs,
      row_id
    );
  }

  enableRowExpand(row_id: any) {
    this.angularTreeGridService.enableRowExpand(
      this.store.getDisplayData(),
      this.configs,
      row_id
    );
  }
}
