'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface FloatingBotanicalProps {
  position: 'left' | 'right'
  top?: string
  className?: string
}

export function FloatingBotanical({ position, top = '20%', className = '' }: FloatingBotanicalProps) {
  const prefersReducedMotion = useReducedMotion()
  
  const positionStyles = position === 'left' 
    ? 'left-0 -translate-x-1/3' 
    : 'right-0 translate-x-1/3'

  return (
    <motion.div
      className={`absolute pointer-events-none ${positionStyles} ${className}`}
      style={{ top }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        rotate: prefersReducedMotion ? 0 : 360 
      }}
      transition={{ 
        opacity: { duration: 1 },
        rotate: { 
          duration: 30, 
          repeat: Infinity, 
          ease: 'linear' 
        } 
      }}
    >
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        fill="none"
        className="opacity-[0.05]"
      >
        {/* Large decorative botanical */}
        <circle cx="150" cy="150" r="100" stroke="#7D9B76" strokeWidth="2" />
        <circle cx="150" cy="150" r="80" stroke="#7D9B76" strokeWidth="1" />
        
        {/* Radiating leaves */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 150 150)`}>
            <path
              d="M150 50 C160 80, 170 100, 150 130 C130 100, 140 80, 150 50"
              fill="#7D9B76"
            />
          </g>
        ))}
        
        {/* Center flower */}
        <circle cx="150" cy="150" r="30" fill="#C1714F" fillOpacity="0.5" />
        <circle cx="150" cy="150" r="15" fill="#5C3D2E" fillOpacity="0.5" />
      </svg>
    </motion.div>
  )
}

export function FloatingBotanicalsBackground() {
  const prefersReducedMotion = useReducedMotion()
  
  if (prefersReducedMotion) return null
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <FloatingBotanical position="left" top="10%" />
      <FloatingBotanical position="right" top="40%" />
      <FloatingBotanical position="left" top="70%" />
    </div>
  )
}
