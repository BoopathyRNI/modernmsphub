"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6">
      <h1 className="text-3xl font-semibold text-slate-800 mb-2">
        Page not found
      </h1>

      <p className="text-slate-600 mb-6 text-center max-w-md">
        The page you are looking for doesn&apos;t exist or may have been moved.
      </p>

      <button
        onClick={() => router.push("/dashboard")}
        className="px-4 py-2 rounded bg-sky-600 text-white text-sm hover:bg-sky-700"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
