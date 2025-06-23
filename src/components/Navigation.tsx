'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [activePage, setActivePage] = useState('home')

  const navItems = [
    { name: 'home', path: '/', label: 'Home' },
    { name: 'particles', path: '/particles', label: 'Particles' },
    { name: 'matrix', path: '/matrix', label: 'Matrix' },
    { name: 'audio', path: '/audio', label: 'Audio Visualizer' },
    { name: '3d', path: '/3d', label: '3D Cube' },
    { name: 'glitch', path: '/glitch', label: 'Glitch Effect' },
    { name: 'game', path: '/game', label: 'Mini Game' },
    { name: 'errors', path: '/errors', label: 'Error Demo' }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setActivePage(item.name)}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-cyan-400 ${
                  activePage === item.name ? 'text-cyan-400' : 'text-gray-300'
                }`}
              >
                {item.label}
                {activePage === item.name && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
} 