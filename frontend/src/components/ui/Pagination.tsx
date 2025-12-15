"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
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
  );
}
