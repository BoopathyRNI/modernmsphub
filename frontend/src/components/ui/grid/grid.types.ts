// src/components/ui/grid/grid.types.ts

export type GridColumn<T> =
  | {
      /** Normal data column */
      key: keyof T;
      header: string;
      sortable?: boolean;
      render?: (row: T) => React.ReactNode;
      width?: string;
    }
  | {
      /** Action / computed column */
      key?: never;
      header: string;
      sortable?: boolean;
      render: (row: T) => React.ReactNode;
      width?: string;
    };

export type SortState<T> = {
  key: keyof T;
  direction: "asc" | "desc";
} | null;

/** Optional checkbox support */
export interface GridSelection<T> {
  enabled?: boolean;
  getRowId: (row: T) => string;
}
