// src/components/ui/grid/Pagination.tsx
"use client";

interface PaginationProps {
  page: number;
  pageSize: number;
  totalRecords: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const DEFAULT_PAGE_SIZES = [5, 10, 25, 50];

export default function Pagination({
  page,
  pageSize,
  totalRecords,
  pageSizeOptions = DEFAULT_PAGE_SIZES,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Page size selector – ALWAYS visible */}
      <div className="flex items-center gap-2 text-sm">
        <span>Rows per page</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-8 rounded border border-slate-300 px-2"
        >
          {pageSizeOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Page navigation – hide only when single page */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(1)}
            disabled={page === 1}
            className="px-2 py-1 rounded hover:bg-slate-100 disabled:opacity-40"
          >
            «
          </button>

          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="px-2 py-1 rounded hover:bg-slate-100 disabled:opacity-40"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`h-8 w-8 rounded-full text-sm
                  ${
                    p === page
                      ? "bg-sky-600 text-white"
                      : "bg-slate-100 hover:bg-slate-200"
                  }`}
              >
                {p}
              </button>
            );
          })}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="px-2 py-1 rounded hover:bg-slate-100 disabled:opacity-40"
          >
            ›
          </button>

          <button
            onClick={() => onPageChange(totalPages)}
            disabled={page === totalPages}
            className="px-2 py-1 rounded hover:bg-slate-100 disabled:opacity-40"
          >
            »
          </button>
        </div>
      )}
    </div>
  );
}
