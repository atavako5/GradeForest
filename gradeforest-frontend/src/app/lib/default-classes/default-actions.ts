import { Actions } from '../models/Actions.model';

export class DefaultActions implements Actions {
  edit: boolean = false;
  add: boolean = false;
  delete: boolean = false;
  resolve_edit: boolean = false;
  resolve_add: boolean = false;
  resolve_delete: boolean = false;
  edit_parent: boolean = false;
}
