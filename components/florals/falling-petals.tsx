'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Petal {
  id: number
  size: number
  left: number
  delay: number
  duration: number
  rotation: number
  drift: number
  opacity: number
  color: string
}

const colors = ['#C1714F', '#7D9B76', '#FAF6EF']

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 12 + 8, // 8-20px
    left: Math.random() * 100, // 0-100%
    delay: Math.random() * 5, // 0-5s delay
    duration: Math.random() * 6 + 4, // 4-10s
    rotation: Math.random() * 360,
    drift: (Math.random() - 0.5) * 100, // -50 to 50px drift
    opacity: Math.random() * 0.5 + 0.4, // 0.4-0.9
    color: colors[Math.floor(Math.random() * colors.length)],
  }))
}

export function FallingPetals({ count = 24 }: { count?: number }) {
  const prefersReducedMotion = useReducedMotion()
  const [petals, setPetals] = useState<Petal[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setPetals(generatePetals(count))
    setMounted(true)
  }, [count])

  if (prefersReducedMotion || !mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute -top-8"
          style={{ left: `${petal.left}%` }}
          initial={{ y: -20, x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: ['0vh', '105vh'],
            x: [0, petal.drift, petal.drift * 0.5, petal.drift * 1.2],
            rotate: [0, petal.rotation, petal.rotation * 2],
            opacity: [0, petal.opacity, petal.opacity, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.2}
            viewBox="0 0 20 24"
            fill={petal.color}
          >
            {/* Petal shape */}
            <path d="M10 0 C15 6, 18 12, 10 24 C2 12, 5 6, 10 0 Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
