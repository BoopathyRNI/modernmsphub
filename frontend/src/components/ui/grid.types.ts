export type GridColumn<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  width?: string;
};

export type SortState<T> = {
  key: keyof T;
  direction: "asc" | "desc";
} | null;
/** NEW – optional checkbox support */
export interface GridSelection<T> {
  enabled?: boolean;
  getRowId: (row: T) => string;
}