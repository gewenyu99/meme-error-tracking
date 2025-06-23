'use client'
import { useState } from 'react'

export default function ErrorsPage() {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isErrorVisible, setIsErrorVisible] = useState(false)

  const throwReferenceError = () => {
    try {
      // @ts-expect-error - Intentionally causing a reference error
      const result = undefinedVariable.someMethod()
      console.log(result)
    } catch (error) {
      setErrorMessage(`ReferenceError: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setIsErrorVisible(true)
      setTimeout(() => setIsErrorVisible(false), 5000)
      throw error
    }
  }

  const throwTypeError = () => {
    try {
      // This will cause a runtime TypeError
      const obj = null
      // @ts-expect-error - Intentionally causing a type error
      obj.nonExistentMethod()
    } catch (error) {
      setErrorMessage(`TypeError: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setIsErrorVisible(true)
      setTimeout(() => setIsErrorVisible(false), 5000)
      throw error
    }
  }

  const throwRangeError = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const arr = new Array(-1) // This will throw a RangeError
    } catch (error) {
      setErrorMessage(`RangeError: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setIsErrorVisible(true)
      setTimeout(() => setIsErrorVisible(false), 5000)
      throw error
    }
  }

  const throwSyntaxError = () => {
    try {
      eval('const x = {;') // Invalid syntax
    } catch (error) {
      setErrorMessage(`SyntaxError: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setIsErrorVisible(true)
      setTimeout(() => setIsErrorVisible(false), 5000)
      throw error
    }
  }

  const throwCustomError = () => {
    try {
      throw new Error('This is a custom error message for demonstration purposes!')
    } catch (error) {
      setErrorMessage(`CustomError: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setIsErrorVisible(true)
      setTimeout(() => setIsErrorVisible(false), 5000)
      throw error
    }
  }

  const causeAsyncError = async () => {
    try {
      const response = await fetch('/api/non-existent-endpoint')
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      setErrorMessage(`AsyncError: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setIsErrorVisible(true)
      setTimeout(() => setIsErrorVisible(false), 5000)
      throw error
    }
  }

  const causeMemoryLeak = () => {
    try {
      const leakyArray: unknown[] = []
      for (let i = 0; i < 1000000; i++) {
        leakyArray.push(new Array(1000).fill('memory leak'))
      }
      setErrorMessage('MemoryLeak: Created a large array to simulate memory usage')
      setIsErrorVisible(true)
      setTimeout(() => setIsErrorVisible(false), 5000)
      throw new Error('Memory leak simulation completed')
    } catch (error) {
      setErrorMessage(`MemoryError: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setIsErrorVisible(true)
      setTimeout(() => setIsErrorVisible(false), 5000)
      throw error
    }
  }

  const causeInfiniteLoop = () => {
    setErrorMessage('InfiniteLoop: Starting an infinite loop (this will freeze the browser)')
    setIsErrorVisible(true)
    setTimeout(() => setIsErrorVisible(false), 5000)
    
    // This will actually cause the browser to freeze
    setTimeout(() => {
      while (true) {
        console.log('Infinite loop running...')
      }
    }, 1000)
  }

  const causeStackOverflow = () => {
    try {
      const recursiveFunction = (n: number): number => {
        return recursiveFunction(n + 1) + 1
      }
      recursiveFunction(0)
    } catch (error) {
      setErrorMessage(`StackOverflow: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setIsErrorVisible(true)
      setTimeout(() => setIsErrorVisible(false), 5000)
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-red-400 mb-8 text-center">Error Demo Zone</h1>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          This page demonstrates various types of JavaScript errors and exceptions. 
          Click the buttons below to trigger different types of errors.
        </p>

        {isErrorVisible && (
          <div className="mb-8 p-4 bg-red-900/50 border border-red-500 rounded-lg">
            <h3 className="text-red-400 font-semibold mb-2">Error Caught:</h3>
            <p className="text-red-200 font-mono text-sm">{errorMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={throwReferenceError}
            className="p-6 bg-red-800 hover:bg-red-700 rounded-lg border border-red-600 hover:border-red-500 transition-all duration-300 group"
          >
            <h3 className="text-lg font-semibold text-red-300 mb-2 group-hover:text-red-200">
              Reference Error
            </h3>
            <p className="text-red-400 text-sm">
              Access undefined variable
            </p>
          </button>

          <button
            onClick={throwTypeError}
            className="p-6 bg-orange-800 hover:bg-orange-700 rounded-lg border border-orange-600 hover:border-orange-500 transition-all duration-300 group"
          >
            <h3 className="text-lg font-semibold text-orange-300 mb-2 group-hover:text-orange-200">
              Type Error
            </h3>
            <p className="text-orange-400 text-sm">
              Call method on null
            </p>
          </button>

          <button
            onClick={throwRangeError}
            className="p-6 bg-yellow-800 hover:bg-yellow-700 rounded-lg border border-yellow-600 hover:border-yellow-500 transition-all duration-300 group"
          >
            <h3 className="text-lg font-semibold text-yellow-300 mb-2 group-hover:text-yellow-200">
              Range Error
            </h3>
            <p className="text-yellow-400 text-sm">
              Invalid array length
            </p>
          </button>

          <button
            onClick={throwSyntaxError}
            className="p-6 bg-green-800 hover:bg-green-700 rounded-lg border border-green-600 hover:border-green-500 transition-all duration-300 group"
          >
            <h3 className="text-lg font-semibold text-green-300 mb-2 group-hover:text-green-200">
              Syntax Error
            </h3>
            <p className="text-green-400 text-sm">
              Invalid JavaScript syntax
            </p>
          </button>

          <button
            onClick={throwCustomError}
            className="p-6 bg-blue-800 hover:bg-blue-700 rounded-lg border border-blue-600 hover:border-blue-500 transition-all duration-300 group"
          >
            <h3 className="text-lg font-semibold text-blue-300 mb-2 group-hover:text-blue-200">
              Custom Error
            </h3>
            <p className="text-blue-400 text-sm">
              Throw custom error message
            </p>
          </button>

          <button
            onClick={causeAsyncError}
            className="p-6 bg-purple-800 hover:bg-purple-700 rounded-lg border border-purple-600 hover:border-purple-500 transition-all duration-300 group"
          >
            <h3 className="text-lg font-semibold text-purple-300 mb-2 group-hover:text-purple-200">
              Async Error
            </h3>
            <p className="text-purple-400 text-sm">
              Failed API request
            </p>
          </button>

          <button
            onClick={causeMemoryLeak}
            className="p-6 bg-pink-800 hover:bg-pink-700 rounded-lg border border-pink-600 hover:border-pink-500 transition-all duration-300 group"
          >
            <h3 className="text-lg font-semibold text-pink-300 mb-2 group-hover:text-pink-200">
              Memory Leak
            </h3>
            <p className="text-pink-400 text-sm">
              Create large arrays
            </p>
          </button>

          <button
            onClick={causeStackOverflow}
            className="p-6 bg-indigo-800 hover:bg-indigo-700 rounded-lg border border-indigo-600 hover:border-indigo-500 transition-all duration-300 group"
          >
            <h3 className="text-lg font-semibold text-indigo-300 mb-2 group-hover:text-indigo-200">
              Stack Overflow
            </h3>
            <p className="text-indigo-400 text-sm">
              Infinite recursion
            </p>
          </button>

          <button
            onClick={causeInfiniteLoop}
            className="p-6 bg-red-900 hover:bg-red-800 rounded-lg border border-red-700 hover:border-red-600 transition-all duration-300 group"
          >
            <h3 className="text-lg font-semibold text-red-200 mb-2 group-hover:text-red-100">
              ⚠️ Infinite Loop
            </h3>
            <p className="text-red-300 text-sm">
              Will freeze browser
            </p>
          </button>
        </div>

        <div className="mt-12 p-6 bg-gray-800/50 rounded-lg border border-gray-600">
          <h3 className="text-xl font-semibold text-gray-300 mb-4">Error Handling Info</h3>
          <div className="text-gray-400 space-y-2 text-sm">
            <p>• All errors are caught and displayed above</p>
            <p>• Error messages auto-hide after 5 seconds</p>
            <p>• Some errors may cause browser performance issues</p>
            <p>• The infinite loop button will freeze your browser - use with caution!</p>
          </div>
        </div>
      </div>
    </div>
  )
} 