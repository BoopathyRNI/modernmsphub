"use client";

import DataGrid from "@/components/ui/DataGrid";
import { GridColumn } from "@/components/ui/grid.types";

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
    render: row => (
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
    createdOn: "23 July 2025",
    status: "Active",
  },
];

export default function CustomersPage() {
 return (
  <DataGrid
    columns={columns}
    rows={rows}
    selectable
    onSelectionChange={ids => console.log("Selected:", ids)}
  />
);

}
