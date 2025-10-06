"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="p-8 font-sans">
      <h1>Next.js Sandbox Demos</h1>
      <p>
        Welcome to the demo collection. Explore the different React features and
        patterns below:
      </p>

      <div className="mt-8">
        <h2>🎯 Available Demos</h2>

        <div className="flex flex-col gap-6 mt-4">
          <div className="p-4 border border-gray-300 rounded-lg">
            <h3 className="m-0 mb-2">
              <Link
                href="/use-transition"
                className="no-underline text-blue-600 hover:text-blue-800"
              >
                UseTransition Demo →
              </Link>
            </h3>
          </div>

          <div className="p-4 border border-gray-300 rounded-lg">
            <h3 className="m-0 mb-2">
              <Link
                href="/use-transition/without"
                className="no-underline text-blue-600 hover:text-blue-800"
              >
                Without UseTransition Demo →
              </Link>
            </h3>
          </div>

          <div className="p-4 border border-gray-300 rounded-lg">
            <h3 className="m-0 mb-2">
              <Link
                href="/use-optimistic"
                className="no-underline text-blue-600 hover:text-blue-800"
              >
                useOptimistic →
              </Link>
            </h3>
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
