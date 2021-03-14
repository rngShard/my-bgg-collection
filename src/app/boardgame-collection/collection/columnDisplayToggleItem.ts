export class ColumnDisplayToggleItem {
  colName: string;
  displayName: string;
  defaultToggled: boolean;

  constructor(colName: string, displayName: string, defaultToggled?: boolean) {
    this.colName = colName;
    this.displayName = displayName;
    if (defaultToggled) {
      this.defaultToggled = true;
    } else {
      this.defaultToggled = false;
    }
  }
}