// src/app/(app)/playground/page.tsx
"use client";

import Link from "next/link";

export default function PlaygroundPage() {
  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-semibold">Component Playground</h1>

      <p className="text-sm text-slate-600">
        This section is used to test and validate reusable UI components before
        integrating them into real application pages.
      </p>

      <div className="space-y-3">
        <h2 className="text-lg font-medium">Available Playgrounds</h2>

        <ul className="list-disc pl-5 space-y-2">
          <li>
            <Link
              href="/playground/date"
              className="text-sky-600 hover:underline"
            >
              Date Components (DatePicker, DateRange, DateTime)
            </Link>
          </li>
          <li>
            <Link
              href="/playground/select"
              className="text-sky-600 hover:underline"
            >
              Select / Dropdown Components
            </Link>
          </li>

          {/* Future playgrounds */}
          {/* 
          <li>
            <Link href="/playground/grid">DataGrid</Link>
          </li>
          <li>
            <Link href="/playground/form">Form Controls</Link>
          </li>
          */}
        </ul>
      </div>
    </div>
  );
}
