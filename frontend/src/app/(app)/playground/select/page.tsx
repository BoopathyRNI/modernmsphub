// src/app/(app)/playground/select/page.tsx;

"use client";

import { useState } from "react";
import { Select } from "@/components/ui/select";

export default function SelectPlaygroundPage() {
  const [status, setStatus] = useState<string | undefined>();

  return (
    <div className="space-y-6 max-w-sm">
      <h1 className="text-2xl font-semibold">Select Component</h1>

      <Select
        value={status}
        onChange={setStatus}
        placeholder="Select status"
        options={[
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
          { label: "Suspended", value: "suspended" },
        ]}
      />

      {status && (
        <div className="text-sm text-slate-600">
          Selected value: <strong>{status}</strong>
        </div>
      )}
    </div>
  );
}
