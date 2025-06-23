"use client"

import posthog from "posthog-js";
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    posthog.captureException(error);
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-800 flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-400 mb-4">⚠️</h1>
          <h2 className="text-4xl font-bold text-white mb-4">Something went wrong!</h2>
          <p className="text-gray-300 text-lg mb-8">
            An unexpected error occurred while rendering this page.
          </p>
        </div>

        <div className="bg-red-900/50 rounded-lg p-6 border border-red-600 mb-8">
          <h3 className="text-xl font-semibold text-red-300 mb-4">Error Details</h3>
          <div className="text-left">
            <div className="mb-4">
              <span className="text-red-400 font-semibold">Message:</span>
              <p className="text-red-200 font-mono text-sm mt-1 break-words">
                {error.message || 'Unknown error'}
              </p>
            </div>
            
            {error.digest && (
              <div className="mb-4">
                <span className="text-red-400 font-semibold">Error ID:</span>
                <p className="text-red-200 font-mono text-sm mt-1">
                  {error.digest}
                </p>
              </div>
            )}
            
            <div>
              <span className="text-red-400 font-semibold">Stack Trace:</span>
              <pre className="text-red-200 font-mono text-xs mt-1 overflow-auto max-h-32 bg-black/50 p-2 rounded">
                {error.stack || 'No stack trace available'}
              </pre>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors mr-4"
          >
            Try Again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-4 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
          >
            Go Home
          </button>
        </div>

        <div className="mt-8 text-gray-400 text-sm">
          <p>If this error persists, please check the browser console for more details.</p>
          <p className="mt-2">
            Error captured at: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
} 