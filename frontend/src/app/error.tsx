"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 🔥 Developer logging (replace later with Sentry / AppInsights)
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6">
      <h1 className="text-2xl font-semibold text-slate-800 mb-2">
        Something went wrong
      </h1>

      <p className="text-slate-600 mb-4 text-center max-w-md">
        An unexpected error occurred. Please try again or contact support
        if the problem persists.
      </p>

      {/* 🔐 Dev-only details */}
      {process.env.NODE_ENV === "development" && (
        <pre className="bg-slate-900 text-slate-100 p-4 rounded text-xs max-w-xl overflow-auto mb-4">
          {error.message}
        </pre>
      )}

      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 rounded bg-sky-600 text-white text-sm hover:bg-sky-700"
        >
          Try again
        </button>

        <button
          onClick={() => window.location.href = "/dashboard"}
          className="px-4 py-2 rounded border border-slate-300 text-sm"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
