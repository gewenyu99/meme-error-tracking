'use client'
import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
}

export default function ParticlesPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Particle[]>([])
  const animationRef = useRef<number | undefined>(undefined)

  const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff0080', '#8000ff']

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Create new particles at mouse position
      const newParticles: Particle[] = []
      for (let i = 0; i < 3; i++) {
        newParticles.push({
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          size: Math.random() * 4 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1,
          maxLife: Math.random() * 100 + 50
        })
      }
      setParticles(prev => [...prev, ...newParticles])
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.1, // gravity
            life: particle.life + 1
          }))
          .filter(particle => particle.life < particle.maxLife)
      )

      // Draw particles
      particles.forEach(particle => {
        const alpha = 1 - (particle.life / particle.maxLife)
        ctx.globalAlpha = alpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 1

      // Draw connections between nearby particles
      particles.forEach((particle1, i) => {
        particles.slice(i + 1).forEach(particle2 => {
          const dx = particle1.x - particle2.x
          const dy = particle1.y - particle2.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            const alpha = (1 - distance / 100) * 0.3
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle1.x, particle1.y)
            ctx.lineTo(particle2.x, particle2.y)
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [particles, colors])

  return (
    <div className="relative min-h-screen bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ cursor: 'none' }}
      />
      
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-4xl font-bold text-white mb-4">Particle System</h1>
        <p className="text-gray-300 max-w-md">
          Move your mouse around to create beautiful particle trails. 
          Each particle has its own physics and connects to nearby particles.
        </p>
        <div className="mt-4 text-sm text-gray-400">
          Particles: {particles.length}
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-10 text-right">
        <div className="text-white text-lg font-semibold">
          Interactive Particles
        </div>
        <div className="text-gray-400 text-sm mt-2">
          Mouse position: ({mousePosition.x}, {mousePosition.y})
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
            className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-xs rounded transition-colors"
          >
            Throw Error
          </button>
          
          <button
            onClick={() => {
              try {
                throw new Error('Custom particle system error!')
              } catch (error) {
                throw error
              }
            }}
            className="px-3 py-1 bg-orange-600 hover:bg-orange-500 text-white text-xs rounded transition-colors"
          >
            Custom Error
          </button>
        </div>
      </div>
    </div>
  )
} 