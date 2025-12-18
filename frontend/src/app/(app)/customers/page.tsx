//src/app/(app).customers/page.tsx

"use client";

import { useEffect, useState } from "react";
import DataGrid from "@/components/ui/grid/DataGrid";
import { GridColumn } from "@/components/ui/grid/grid.types";

import { useConfirm } from "@/components/ui/confirm/useConfirm";
import { useToast } from "@/components/ui/toast/useToast";
import { handleApiError } from "@/lib/api/handleApiError";
import { usePagedQuery } from "@/hooks/usePagedQuery";

import { Dialog, DialogFooter } from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { FormField } from "@/components/ui/form";

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

  /* ---------- Dialog state ---------- */

  const [openAdd, setOpenAdd] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [salesRep, setSalesRep] = useState("");
  const [status, setStatus] = useState<string | undefined>();

  const [errors, setErrors] = useState<{
    companyName?: string;
    displayName?: string;
    status?: string;
  }>({});

  /* ---------- Data (mock, stateful) ---------- */

  const [allRows, setAllRows] = useState<CustomerRow[]>([
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
  ]);

  /* ---------- Grid paging ---------- */

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
   * Search + pagination
   * ---------------------------------- */

  useEffect(() => {
    loadCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, searchText, allRows]);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const filtered = !searchText.trim()
        ? allRows
        : allRows.filter((row) => {
            const term = searchText.toLowerCase();
            return searchFields.some(({ key }) =>
              String(row[key]).toLowerCase().includes(term)
            );
          });

      setTotalRecords(filtered.length);

      const start = (page - 1) * pageSize;
      setRows(filtered.slice(start, start + pageSize));
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
      message: `Are you sure you want to delete ${row.companyName}?`,
      confirmText: "Delete",
      cancelText: "Cancel",
      danger: true,
    });

    if (!confirmed) return;

    setAllRows((prev) => prev.filter((r) => r.id !== row.id));
    toast.success("Customer deleted successfully");
  };

  /* ----------------------------------
   * Validation + Save
   * ---------------------------------- */

  const validateForm = () => {
    const nextErrors: typeof errors = {};

    if (!companyName.trim())
      nextErrors.companyName = "Company name is required";

    if (!displayName.trim())
      nextErrors.displayName = "Display name is required";

    if (!status) nextErrors.status = "Status is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const newCustomer: CustomerRow = {
      id: Date.now(),
      companyName,
      displayName,
      salesRep,
      status: status!,
      createdOn: new Date().toLocaleDateString(),
    };

    setAllRows((prev) => [newCustomer, ...prev]);

    // reset form + errors
    setCompanyName("");
    setDisplayName("");
    setSalesRep("");
    setStatus(undefined);
    setErrors({});

    setOpenAdd(false);
    toast.success("Customer added successfully");
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
      <div className="max-w-sm">
        <label className="block text-xs font-medium text-slate-600 mb-1">
          Search
        </label>

        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setPage(1);
          }}
          placeholder={placeholderText}
          className="w-full h-9 px-3 rounded border border-slate-300 text-sm
                     focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>

      {/* ➕ Add */}
      <div className="flex justify-end">
        <button
          onClick={() => setOpenAdd(true)}
          className="h-9 px-4 rounded bg-sky-600 text-white text-sm hover:bg-sky-700"
        >
          + Add Customer
        </button>
      </div>

      {/* 📊 Grid */}
      <DataGrid
        columns={columns}
        rows={rows}
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
      />

      {/* ➕ Add Dialog */}
      <Dialog
        open={openAdd}
        title="Add Customer"
        onClose={() => setOpenAdd(false)}
      >
        <div className="space-y-3">
          <FormField label="Company Name" required error={errors.companyName}>
            <input
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                setErrors((prev) => ({ ...prev, companyName: undefined }));
              }}
              className="w-full h-9 px-3 border border-slate-300 rounded"
            />
          </FormField>

          <FormField label="Display Name" required error={errors.displayName}>
            <input
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
                setErrors((prev) => ({ ...prev, displayName: undefined }));
              }}
              className="w-full h-9 px-3 border border-slate-300 rounded"
            />
          </FormField>

          <FormField label="Sales Rep Name">
            <input
              value={salesRep}
              onChange={(e) => setSalesRep(e.target.value)}
              className="w-full h-9 px-3 border border-slate-300 rounded"
            />
          </FormField>

          <FormField label="Status" required error={errors.status}>
            <Select
              value={status}
              onChange={(v) => {
                setStatus(v);
                setErrors((prev) => ({ ...prev, status: undefined }));
              }}
              options={[
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
              ]}
            />
          </FormField>
        </div>

        <DialogFooter onCancel={() => setOpenAdd(false)} onSave={handleSave} />
      </Dialog>

      {loading && (
        <div className="text-sm text-slate-500">Loading customers…</div>
      )}
    </div>
  );
}
