// src/components/ui/grid/DataGrid.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import Pagination from "@/components/ui/grid/Pagination";
import { GridColumn, SortState } from "./grid.types";

interface PaginationProps {
  page: number;
  pageSize: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

interface DataGridProps<T> {
  columns: GridColumn<T>[];
  rows: T[];
  selectable?: boolean;
  pagination?: PaginationProps;
  onSelectionChange?: (selectedIds: Array<string | number>) => void;
}

/** 🔑 Type guard to identify data columns */
function hasKey<T>(
  col: GridColumn<T>
): col is Extract<GridColumn<T>, { key: keyof T }> {
  return "key" in col;
}

export default function DataGrid<T extends { id: string | number }>({
  columns,
  rows,
  selectable = false,
  pagination,
  onSelectionChange,
}: DataGridProps<T>) {
  const [sort, setSort] = useState<SortState<T>>(null);
  const [selected, setSelected] = useState<Set<string | number>>(new Set());

  /** Column widths */
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const resizingRef = useRef<{
    key: string;
    startX: number;
    startWidth: number;
  } | null>(null);

  /* ---------- Sorting ---------- */

  const sortedRows = useMemo(() => {
    if (!sort) return rows;

    const { key, direction } = sort;

    return [...rows].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      return direction === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [rows, sort]);

  const toggleSort = (key: keyof T) => {
    pagination?.onPageChange(1); // reset to first page on sort
    setSort((prev) =>
      prev?.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  /* ---------- Selection ---------- */

  const toggleRow = (id: string | number) => {
    const copy = new Set(selected);
    copy.has(id) ? copy.delete(id) : copy.add(id);
    setSelected(copy);
    onSelectionChange?.(Array.from(copy));
  };

  const toggleAll = () => {
    const copy = new Set(selected);
    const rowIds = sortedRows.map((r) => r.id);
    const allSelected = rowIds.every((id) => copy.has(id));

    rowIds.forEach((id) => (allSelected ? copy.delete(id) : copy.add(id)));

    setSelected(copy);
    onSelectionChange?.(Array.from(copy));
  };

  const allChecked =
    selectable &&
    sortedRows.length > 0 &&
    sortedRows.every((r) => selected.has(r.id));

  /* ---------- Column resize ---------- */

  const startResize = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    e.stopPropagation();

    const th = (e.target as HTMLElement).parentElement as HTMLElement;
    const startWidth = th.offsetWidth;

    resizingRef.current = {
      key,
      startX: e.clientX,
      startWidth,
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", stopResize);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!resizingRef.current) return;

    const { key, startX, startWidth } = resizingRef.current;
    const delta = e.clientX - startX;

    setColumnWidths((prev) => ({
      ...prev,
      [key]: Math.max(60, startWidth + delta),
    }));
  };

  const stopResize = () => {
    resizingRef.current = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", stopResize);
  };

  /* ---------- Render ---------- */

  return (
    <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm border-collapse table-fixed">
          <thead className="sticky top-0 z-10 bg-slate-100 border-b border-slate-300">
            <tr>
              {selectable && (
                <th className="w-10 px-3 py-2 text-center border-r border-slate-300">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                  />
                </th>
              )}

              {columns.map((col, idx) => {
                const width = hasKey(col)
                  ? columnWidths[String(col.key)]
                  : undefined;

                return (
                  <th
                    key={hasKey(col) ? String(col.key) : `action-${idx}`}
                    style={width ? { width } : undefined}
                    onClick={() => {
                      if (!hasKey(col) || !col.sortable) return;
                      toggleSort(col.key);
                    }}
                    className={`
                      relative px-4 py-2 text-left font-semibold text-slate-700
                      ${
                        hasKey(col) && col.sortable
                          ? "cursor-pointer select-none"
                          : ""
                      }
                      ${
                        idx !== columns.length - 1
                          ? "border-r border-slate-300"
                          : ""
                      }
                    `}
                  >
                    <div className="flex items-center gap-1">
                      {col.header}
                      {hasKey(col) && sort?.key === col.key && (
                        <span className="text-xs">
                          {sort.direction === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </div>

                    {hasKey(col) && (
                      <div
                        onMouseDown={(e) => startResize(e, String(col.key))}
                        className="absolute top-0 right-0 h-full w-1 cursor-col-resize hover:bg-sky-400"
                      />
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {sortedRows.map((row) => {
              const isSelected = selected.has(row.id);
              return (
                <tr
                  key={row.id}
                  className={`
                    border-b border-slate-200
                    hover:bg-sky-50
                    ${isSelected ? "bg-sky-100" : ""}
                  `}
                >
                  {selectable && (
                    <td className="px-3 py-2 text-center border-r border-slate-200">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(row.id)}
                      />
                    </td>
                  )}

                  {columns.map((col, idx) => (
                    <td
                      key={hasKey(col) ? String(col.key) : `action-${idx}`}
                      style={
                        hasKey(col) && columnWidths[String(col.key)]
                          ? { width: columnWidths[String(col.key)] }
                          : undefined
                      }
                      className={`
                        px-4 py-2 text-slate-700 truncate
                        ${
                          idx !== columns.length - 1
                            ? "border-r border-slate-200"
                            : ""
                        }
                      `}
                    >
                      {col.render
                        ? col.render(row)
                        : hasKey(col)
                        ? String(row[col.key])
                        : null}
                    </td>
                  ))}
                </tr>
              );
            })}

            {sortedRows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="text-center py-8 text-slate-500"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="border-t border-slate-200 p-2">
          <Pagination
            page={pagination.page}
            pageSize={pagination.pageSize}
            totalRecords={pagination.totalRecords}
            onPageChange={pagination.onPageChange}
            onPageSizeChange={pagination.onPageSizeChange}
          />
        </div>
      )}
    </div>
  );
}
