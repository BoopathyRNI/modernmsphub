//src/app/(app)/customers/page.tsx
"use client";

import { useMemo, useState } from "react";
import DataGrid from "@/components/ui/grid/DataGrid";
import { GridColumn } from "@/components/ui/grid/grid.types";

type CustomerRow = {
  id: number;
  companyName: string;
  displayName: string;
  salesRep: string;
  createdOn: string;
  status: string;
};

const columns: GridColumn<CustomerRow>[] = [
  { key: "companyName", header: "Company Name", sortable: true },
  { key: "displayName", header: "Display Name", sortable: true },
  { key: "salesRep", header: "Sales Rep Name" },
  { key: "createdOn", header: "Created On", sortable: true },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <span className="px-2 py-1 text-xs rounded bg-green-500 text-white">
        {row.status}
      </span>
    ),
  },
];

const rows: CustomerRow[] = [
  {
    id: 1,
    companyName: "Kia Motors",
    displayName: "Kim Jordan",
    salesRep: "Mark Wood",
    createdOn: "7/23/2025",
    status: "Active",
  },
  {
    id: 2,
    companyName: "Ford Motors",
    displayName: "Jordan Ford",
    salesRep: "Kristian Chery",
    createdOn: "8/15/2025",
    status: "Active",
  },
];

type SearchField<T> = {
  key: keyof T;
  label: string;
};

const searchFields: SearchField<CustomerRow>[] = [
  { key: "companyName", label: "Company Name" },
  { key: "displayName", label: "Display Name" },
];

export default function CustomersPage() {
  const [searchText, setSearchText] = useState("");

  const filteredRows = useMemo(() => {
    if (!searchText.trim()) return rows;

    const term = searchText.toLowerCase();

    return rows.filter((row) =>
      searchFields.some(({ key }) => {
        const value = row[key];
        return value != null && String(value).toLowerCase().includes(term);
      })
    );
  }, [rows, searchText]);

  const placeholderText =
    "Search with " + searchFields.map((f) => f.label).join(", ");

  return (
    <div className="space-y-4">
      {/* 🔍 Search box */}
      <div className="max-w-sm relative">
        <label className="block text-xs font-medium text-slate-600 mb-1">
          Search
        </label>

        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={placeholderText}
          className="w-full h-9 px-3 pr-8 rounded border border-slate-300 text-sm
                     focus:outline-none focus:ring-1 focus:ring-sky-500"
        />

        {/* ❌ Clear button */}
        {searchText && (
          <button
            type="button"
            onClick={() => setSearchText("")}
            className="absolute right-2 top-[26px] text-slate-400 hover:text-slate-600"
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* 📊 Grid */}
      <DataGrid
        columns={columns}
        rows={filteredRows}
        selectable
        onSelectionChange={(ids) => console.log("Selected:", ids)}
      />
    </div>
  );
}
