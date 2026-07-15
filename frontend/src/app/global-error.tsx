"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[#F7F3EE] p-4">
        <div className="max-w-md text-center">
          <h1 className="font-heading text-xl font-medium text-[#1E2440]">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm text-[#6B6B6B]">
            {error.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={reset}
            className="mt-4 rounded-lg bg-[#C8664A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#B35A40]"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
