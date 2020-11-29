export class ColumnDisplayToggleItem {
  colName: string;
  displayname: string;
  defaultToggled: boolean;

  constructor(colName: string, displayName: string, defaultToggled?: boolean) {
    this.colName = colName;
    this.displayname = displayName;
    if (defaultToggled) {
      this.defaultToggled = true;
    } else {
      this.defaultToggled = false;
    }
  }
}