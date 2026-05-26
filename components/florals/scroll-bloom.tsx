'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface ScrollBloomProps {
  className?: string
  color?: 'terracotta' | 'sage' | 'cream'
  size?: number
  delay?: number
}

const colorMap = {
  terracotta: '#C1714F',
  sage: '#7D9B76',
  cream: '#FAF6EF',
}

export function ScrollBloom({ 
  className = '', 
  color = 'terracotta', 
  size = 24,
  delay = 0 
}: ScrollBloomProps) {
  const prefersReducedMotion = useReducedMotion()
  const fillColor = colorMap[color]

  return (
    <motion.div
      className={`inline-block ${className}`}
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      whileInView={{ 
        scale: 1, 
        rotate: prefersReducedMotion ? 0 : 360, 
        opacity: 1 
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: prefersReducedMotion ? 0 : 0.8, 
        delay: prefersReducedMotion ? 0 : delay,
        ease: 'easeOut' 
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {/* Flower petals */}
        <ellipse cx="12" cy="6" rx="3" ry="5" fill={fillColor} fillOpacity="0.8" />
        <ellipse cx="12" cy="18" rx="3" ry="5" fill={fillColor} fillOpacity="0.8" />
        <ellipse cx="6" cy="12" rx="5" ry="3" fill={fillColor} fillOpacity="0.8" />
        <ellipse cx="18" cy="12" rx="5" ry="3" fill={fillColor} fillOpacity="0.8" />
        {/* Center */}
        <circle cx="12" cy="12" r="3" fill="#5C3D2E" />
      </svg>
    </motion.div>
  )
}

export function ScrollBloomDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-8 ${className}`}>
      <ScrollBloom color="sage" size={16} delay={0} />
      <ScrollBloom color="terracotta" size={24} delay={0.1} />
      <ScrollBloom color="sage" size={16} delay={0.2} />
    </div>
  )
}
