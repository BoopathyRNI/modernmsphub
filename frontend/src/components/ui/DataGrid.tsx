//src/components/ui/DataGrid.tsx
"use client";

import { useState, useMemo, useRef } from "react";
import Pagination from "./Pagination";
import { GridColumn, SortState } from "./grid.types";

interface DataGridProps<T> {
  columns: GridColumn<T>[];
  rows: T[];
  pageSize?: number;
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

  /** 🔑 column widths (px) */
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

  const resizingRef = useRef<{
    key: string;
    startX: number;
    startWidth: number;
  } | null>(null);

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

    setColumnWidths(prev => ({
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
                    onChange={toggleAllOnPage}
                  />
                </th>
              )}

              {columns.map((col, idx) => {
                const width =
                  columnWidths[String(col.key)] ??
                  (col.width ? parseInt(col.width) : undefined);

                return (
                  <th
                    key={String(col.key)}
                    style={width ? { width } : undefined}
                    onClick={() => col.sortable && toggleSort(col.key)}
                    className={`
                      relative px-4 py-2 text-left font-semibold text-slate-700
                      ${col.sortable ? "cursor-pointer select-none" : ""}
                      ${idx !== columns.length - 1 ? "border-r border-slate-300" : ""}
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

                    {/* 🔧 Resize handle */}
                    <div
                      onMouseDown={e => startResize(e, String(col.key))}
                      className="absolute top-0 right-0 h-full w-1 cursor-col-resize hover:bg-sky-400"
                    />
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {pagedRows.map(row => {
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
                      key={String(col.key)}
                      style={
                        columnWidths[String(col.key)]
                          ? { width: columnWidths[String(col.key)] }
                          : undefined
                      }
                      className={`
                        px-4 py-2 text-slate-700 truncate
                        ${idx !== columns.length - 1 ? "border-r border-slate-200" : ""}
                      `}
                    >
                      {col.render ? col.render(row) : String(row[col.key])}
                    </td>
                  ))}
                </tr>
              );
            })}

            {pagedRows.length === 0 && (
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

      <div className="border-t border-slate-200 p-2">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}


