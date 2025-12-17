// src/app/(app)/customers/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import DataGrid from "@/components/ui/grid/DataGrid";
import { GridColumn } from "@/components/ui/grid/grid.types";

import { useConfirm } from "@/components/ui/confirm/useConfirm";
import { useToast } from "@/components/ui/toast/useToast";
import { handleApiError } from "@/lib/api/handleApiError";
import { usePagedQuery } from "@/hooks/usePagedQuery";
// import { api } from "@/lib/api/apiClient"; // 🔜 use later

/* ----------------------------------
 * Types
 * ---------------------------------- */

type CustomerRow = {
  id: number;
  companyName: string;
  displayName: string;
  salesRep: string;
  createdOn: string;
  status: string;
};

type SearchField<T> = {
  key: keyof T;
  label: string;
};

/* ----------------------------------
 * Mock data (replace with API later)
 * ---------------------------------- */

const ALL_ROWS: CustomerRow[] = [
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
  {
    id: 3,
    companyName: "Tesla",
    displayName: "Elon Musk",
    salesRep: "Alex Ray",
    createdOn: "6/02/2025",
    status: "Inactive",
  },
  {
    id: 4,
    companyName: "BMW",
    displayName: "John Smith",
    salesRep: "Maria Hill",
    createdOn: "5/12/2025",
    status: "Active",
  },
  {
    id: 5,
    companyName: "Audi",
    displayName: "Robert Lang",
    salesRep: "Chris Evans",
    createdOn: "4/18/2025",
    status: "Active",
  },
  {
    id: 6,
    companyName: "Mercedes-Benz",
    displayName: "Sophia Brown",
    salesRep: "Natalie Portman",
    createdOn: "3/22/2025",
    status: "Inactive",
  },
  {
    id: 7,
    companyName: "Hyundai",
    displayName: "Arjun Kumar",
    salesRep: "Ravi Shankar",
    createdOn: "2/10/2025",
    status: "Active",
  },
  {
    id: 8,
    companyName: "Toyota",
    displayName: "Ken Watanabe",
    salesRep: "Yuki Tanaka",
    createdOn: "1/05/2025",
    status: "Active",
  },
  {
    id: 9,
    companyName: "Honda",
    displayName: "Michael Chen",
    salesRep: "Linda Park",
    createdOn: "12/15/2024",
    status: "Inactive",
  },
  {
    id: 10,
    companyName: "Volkswagen",
    displayName: "Oliver Stone",
    salesRep: "Emma Watson",
    createdOn: "11/02/2024",
    status: "Active",
  },
];

/* ----------------------------------
 * Search config
 * ---------------------------------- */

const searchFields: SearchField<CustomerRow>[] = [
  { key: "companyName", label: "Company Name" },
  { key: "displayName", label: "Display Name" },
];

/* ----------------------------------
 * Page
 * ---------------------------------- */

export default function CustomersPage() {
  /* ---------- Helpers ---------- */

  const confirm = useConfirm();
  const toast = useToast();

  /* ---------- Grid Paged Query ---------- */
  const {
    page,
    pageSize,
    totalRecords,
    searchText,
    setPage,
    setPageSize,
    setSearchText,
    setTotalRecords,
  } = usePagedQuery(5);

  const [rows, setRows] = useState<CustomerRow[]>([]);
  const [loading, setLoading] = useState(false);

  /* ----------------------------------
   * Search + pagination (server-style)
   * ---------------------------------- */

  useEffect(() => {
    loadCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, searchText]);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      // 🔁 TEMP: simulate server filtering
      const filtered = !searchText.trim()
        ? ALL_ROWS
        : ALL_ROWS.filter((row) => {
            const term = searchText.toLowerCase();
            return searchFields.some(({ key }) =>
              String(row[key]).toLowerCase().includes(term)
            );
          });

      setTotalRecords(filtered.length);

      const start = (page - 1) * pageSize;
      const paged = filtered.slice(start, start + pageSize);

      setRows(paged);

      // 🔜 REAL API VERSION (later)
      /*
      const res = await api.get("/customers", {
        params: { page, pageSize, searchText },
      });

      setRows(res.items);
      setTotalRecords(res.totalRecords);
      */
    } catch (err) {
      handleApiError(err, toast);
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------
   * Actions
   * ---------------------------------- */

  const handleDelete = async (row: CustomerRow) => {
    const confirmed = await confirm({
      title: "Delete customer",
      message: `Are you sure you want to delete ${row.companyName}? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      danger: true,
    });

    if (!confirmed) return;

    try {
      // await api.delete(`/customers/${row.id}`);
      toast.success("Customer deleted successfully");
    } catch (err) {
      handleApiError(err, toast);
    }
  };

  /* ----------------------------------
   * Columns
   * ---------------------------------- */

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
    {
      header: "Actions",
      render: (row) => (
        <button
          onClick={() => handleDelete(row)}
          className="text-red-600 text-sm hover:underline"
        >
          Delete
        </button>
      ),
    },
  ];

  /* ----------------------------------
   * Render
   * ---------------------------------- */

  const placeholderText =
    "Search with " + searchFields.map((f) => f.label).join(", ");

  return (
    <div className="space-y-4">
      {/* 🔍 Search */}
      <div className="max-w-sm relative">
        <label className="block text-xs font-medium text-slate-600 mb-1">
          Search
        </label>

        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setPage(1); // 🔑 reset page on search
          }}
          placeholder={placeholderText}
          className="w-full h-9 px-3 pr-8 rounded border border-slate-300 text-sm
                     focus:outline-none focus:ring-1 focus:ring-sky-500"
        />

        {searchText && (
          <button
            type="button"
            onClick={() => {
              setSearchText("");
              setPage(1);
            }}
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
        rows={rows}
        selectable
        pagination={{
          page,
          pageSize,
          totalRecords,
          onPageChange: setPage,
          onPageSizeChange: (size) => {
            setPageSize(size);
            setPage(1);
          },
        }}
        onSelectionChange={(ids) => console.log("Selected row ids:", ids)}
      />

      {loading && (
        <div className="text-sm text-slate-500">Loading customers…</div>
      )}
    </div>
  );
}
