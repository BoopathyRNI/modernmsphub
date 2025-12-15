"use client";

import { useState, useMemo } from "react";
import Pagination from "./Pagination";
import { GridColumn, SortState } from "./grid.types";

interface DataGridProps<T> {
  columns: GridColumn<T>[];
  rows: T[];
  pageSize?: number;

  /** Optional selection */
  selectable?: boolean;
  onSelectionChange?: (selectedIds: Array<string | number>) => void;
}

export default function DataGrid<T extends { id: string | number }>({
  columns,
  rows,
  pageSize = 5,
  selectable = false,
  onSelectionChange,
}: DataGridProps<T>) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortState<T>>(null);
  const [selected, setSelected] = useState<Set<string | number>>(new Set());

  /* ---------- Sorting ---------- */

  const sortedRows = useMemo(() => {
    if (!sort) return rows;

    return [...rows].sort((a, b) => {
      const aVal = a[sort.key];
      const bVal = b[sort.key];

      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      return sort.direction === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [rows, sort]);

  /* ---------- Pagination ---------- */

  const totalPages = Math.ceil(sortedRows.length / pageSize);

  const pagedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedRows.slice(start, start + pageSize);
  }, [sortedRows, page, pageSize]);

  const toggleSort = (key: keyof T) => {
    setPage(1);
    setSort(prev =>
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

  const toggleAllOnPage = () => {
    const copy = new Set(selected);
    const pageIds = pagedRows.map(r => r.id);
    const allSelected = pageIds.every(id => copy.has(id));

    pageIds.forEach(id =>
      allSelected ? copy.delete(id) : copy.add(id)
    );

    setSelected(copy);
    onSelectionChange?.(Array.from(copy));
  };

  const allChecked =
    selectable &&
    pagedRows.length > 0 &&
    pagedRows.every(r => selected.has(r.id));

  /* ---------- Render ---------- */

  return (
    <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-sky-100 text-slate-700 border-b-2 border-slate-200">
          <tr>
            {selectable && (
              <th className="px-3 py-2 w-10 text-center border-r border-slate-200">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={toggleAllOnPage}
                />
              </th>
            )}

            {columns.map((col, idx) => (
              <th
                key={String(col.key)}
                style={{ width: col.width }}
                onClick={() => col.sortable && toggleSort(col.key)}
                className={`
                  px-4 py-2 text-left font-semibold
                  ${col.sortable ? "cursor-pointer select-none" : ""}
                  ${idx !== columns.length - 1 ? "border-r border-slate-200" : ""}
                `}
              >
                <div className="flex items-center gap-1">
                  {col.header}
                  {sort?.key === col.key && (
                    <span className="text-xs">
                      {sort.direction === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {pagedRows.map(row => (
            <tr
              key={row.id}
              className="border-b border-slate-200 hover:bg-slate-50"
            >
              {selectable && (
                <td className="px-3 py-2 text-center border-r border-slate-200">
                  <input
                    type="checkbox"
                    checked={selected.has(row.id)}
                    onChange={() => toggleRow(row.id)}
                  />
                </td>
              )}

              {columns.map((col, idx) => (
                <td
                  key={String(col.key)}
                  className={`
                    px-4 py-2 text-slate-700
                    ${idx !== columns.length - 1 ? "border-r border-slate-200" : ""}
                  `}
                >
                  {col.render ? col.render(row) : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}

          {pagedRows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="text-center py-6 text-slate-500"
              >
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
