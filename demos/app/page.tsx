"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="p-8 font-sans">
      <h1>React 19 Demos</h1>
      <div className="mt-8">
        <div className="font-mono text-sm">
          <div className="mb-2">📁 demos/</div>
          <div className="ml-4">
            <div className="mb-1">📁 use-transition/</div>
            <div className="ml-4">
              <div>
                <Link
                  href="/use-transition"
                  className="text-blue-600 hover:underline"
                >
                  page.tsx
                </Link>
              </div>
              <div className="mb-1">📁 without/</div>
              <div className="ml-4">
                <Link
                  href="/use-transition/without"
                  className="text-blue-600 hover:underline"
                >
                  page.tsx
                </Link>
              </div>
            </div>

            <div className="mb-1">📁 use-optimistic/</div>
            <div className="ml-4 mb-2">
              <div>
                <Link
                  href="/use-optimistic"
                  className="text-blue-600 hover:underline"
                >
                  page.tsx
                </Link>
              </div>
            </div>

            <div className="mb-1">📁 use/</div>
            <div className="ml-4">
              <div>
                <Link href="/use" className="text-blue-600 hover:underline">
                  page.tsx
                </Link>
              </div>
              <div className="mb-1">📁 without/</div>
              <div className="ml-4">
                <Link
                  href="/use/without"
                  className="text-blue-600 hover:underline"
                >
                  page.tsx
                </Link>
              </div>
            </div>

            <div className="mb-1">📁 use-action-state/</div>
            <div className="ml-4">
              <div>
                <Link
                  href="/use-action-state"
                  className="text-blue-600 hover:underline"
                >
                  page.tsx
                </Link>
              </div>
              <div className="mb-1">📁 without/</div>
              <div className="ml-4">
                <Link
                  href="/use-action-state/without"
                  className="text-blue-600 hover:underline"
                >
                  page.tsx
                </Link>
              </div>
            </div>

            <div className="mb-1">📁 use-action-state-async/</div>
            <div className="ml-4">
              <div>
                <Link
                  href="/use-action-state-async"
                  className="text-blue-600 hover:underline"
                >
                  page.tsx
                </Link>
              </div>
              <div className="mb-1">📁 without/</div>
              <div className="ml-4">
                <Link
                  href="/use-action-state-async/without"
                  className="text-blue-600 hover:underline"
                >
                  page.tsx
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="m-0 mb-2">📝 About These Demos</h3>
          <p className="m-0 text-sm text-gray-600">
            This sandbox focuses on <strong>React Concurrent Features</strong>,
            specifically comparing different approaches to handling async
            operations and their impact on user experience.
          </p>
        </div>
      </div>
    </div>
  );
}
