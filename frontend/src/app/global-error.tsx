"use client";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  //  Always log catastrophic errors
  console.error("Global error:", error);

  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6">
          <h1 className="text-2xl font-semibold text-slate-800 mb-2">
            Application error
          </h1>

          <p className="text-slate-600 mb-4 text-center max-w-md">
            We ran into a critical issue while loading the application.
            Please refresh the page or try again later.
          </p>

          {process.env.NODE_ENV === "development" && (
            <pre className="bg-slate-900 text-slate-100 p-4 rounded text-xs max-w-xl overflow-auto">
              {error.message}
            </pre>
          )}

          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 rounded bg-sky-600 text-white text-sm hover:bg-sky-700"
          >
            Reload application
          </button>
        </div>
      </body>
    </html>
  );
}
