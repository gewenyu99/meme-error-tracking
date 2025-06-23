'use client'
import { useEffect, useRef } from 'react'

interface MatrixColumn {
  x: number
  y: number
  speed: number
  chars: string[]
  currentChar: number
}

export default function MatrixPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?'
    const columns: MatrixColumn[] = []
    const fontSize = 14
    const columnWidth = fontSize

    // Initialize columns
    const initColumns = () => {
      columns.length = 0
      const numColumns = Math.floor(canvas.width / columnWidth)
      
      for (let i = 0; i < numColumns; i++) {
        columns.push({
          x: i * columnWidth,
          y: Math.random() * canvas.height,
          speed: Math.random() * 2 + 1,
          chars: Array.from({ length: Math.floor(Math.random() * 20) + 10 }, () => 
            chars[Math.floor(Math.random() * chars.length)]
          ),
          currentChar: 0
        })
      }
    }

    const animate = () => {
      // Create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw matrix rain
      columns.forEach(column => {
        // Draw the main character (bright green)
        ctx.fillStyle = '#00ff00'
        ctx.font = `${fontSize}px monospace`
        ctx.fillText(
          column.chars[column.currentChar],
          column.x,
          column.y
        )

        // Draw trailing characters (dimmer green)
        for (let i = 1; i < column.chars.length; i++) {
          const alpha = 1 - (i / column.chars.length)
          ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`
          ctx.fillText(
            column.chars[(column.currentChar + i) % column.chars.length],
            column.x,
            column.y - i * fontSize
          )
        }

        // Update column position
        column.y += column.speed
        if (column.y > canvas.height + column.chars.length * fontSize) {
          column.y = -column.chars.length * fontSize
          column.currentChar = Math.floor(Math.random() * column.chars.length)
          column.speed = Math.random() * 2 + 1
        }

        // Occasionally change characters
        if (Math.random() < 0.02) {
          column.currentChar = (column.currentChar + 1) % column.chars.length
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initColumns()
    animate()

    window.addEventListener('resize', () => {
      resizeCanvas()
      initColumns()
    })

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-4xl font-bold text-green-400 mb-4 font-mono">Matrix Rain</h1>
        <p className="text-green-300 max-w-md font-mono">
          The digital rain falls endlessly, a cascade of binary dreams and digital consciousness.
          Welcome to the Matrix.
        </p>
      </div>

      <div className="absolute bottom-8 right-8 z-10 text-right">
        <div className="text-green-400 text-lg font-semibold font-mono">
          SYSTEM ACTIVE
        </div>
        <div className="text-green-600 text-sm mt-2 font-mono">
          {new Date().toLocaleTimeString()}
        </div>
        
        {/* Error demo buttons */}
        <div className="mt-4 space-y-2">
          <button
            onClick={() => {
              try {
                // @ts-expect-error - Intentionally causing an error
                const result = undefinedVariable.someMethod()
                console.log(result)
              } catch (error) {
                throw error
              }
            }}
            className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-xs rounded transition-colors font-mono"
          >
            SYSTEM ERROR
          </button>
          
          <button
            onClick={() => {
              try {
                throw new Error('Matrix corruption detected!')
              } catch (error) {
                throw error
              }
            }}
            className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 text-white text-xs rounded transition-colors font-mono"
          >
            CORRUPTION
          </button>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
        <div className="text-green-400 text-6xl font-bold font-mono mb-4 animate-pulse">
          MATRIX
        </div>
        <div className="text-green-600 text-xl font-mono">
          Choose your reality
        </div>
      </div>
    </div>
  )
} 