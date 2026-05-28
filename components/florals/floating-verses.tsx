'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface FloatConfig {
  xKeyframes: number[]
  yKeyframes: number[]
  rotateKeyframes: number[]
  duration: number
  initialX: number
  initialY: number
}

interface VerseData {
  verse: string
  reference: string
  variant: 'terracotta' | 'sage'
}

function useVerseColors(variant: 'terracotta' | 'sage') {
  const bgColor = variant === 'terracotta' 
    ? 'rgba(193, 113, 79, 0.12)' 
    : 'rgba(125, 155, 118, 0.12)'
  const borderColor = variant === 'terracotta'
    ? 'rgba(193, 113, 79, 0.25)'
    : 'rgba(125, 155, 118, 0.25)'
  const textColor = variant === 'terracotta'
    ? '#C1714F'
    : '#5C3D2E'
  const referenceColor = variant === 'terracotta'
    ? 'rgba(193, 113, 79, 0.7)'
    : 'rgba(125, 155, 118, 0.85)'
  return { bgColor, borderColor, textColor, referenceColor }
}

/** Desktop-only: absolutely positioned, floating animation */
function DesktopFloatingVerse({ verse, reference, variant, floatConfig }: VerseData & { floatConfig: FloatConfig }) {
  const prefersReducedMotion = useReducedMotion()
  const { bgColor, borderColor, textColor, referenceColor } = useVerseColors(variant)

  return (
    <motion.div
      className="hidden md:flex absolute pointer-events-auto cursor-default select-none z-[5]"
      style={{
        left: `${floatConfig.initialX}%`,
        top: `${floatConfig.initialY}%`,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={prefersReducedMotion ? { opacity: 0.8 } : {
        opacity: [0, 0.75, 0.85, 0.75, 0.8, 0.75],
        x: floatConfig.xKeyframes,
        y: floatConfig.yKeyframes,
        rotate: floatConfig.rotateKeyframes,
      }}
      transition={prefersReducedMotion ? { duration: 1 } : {
        duration: floatConfig.duration,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
        delay: 1.5,
      }}
      whileHover={{ 
        scale: 1.05, 
        opacity: 1,
        transition: { duration: 0.3 } 
      }}
    >
      <div
        className="flex flex-col items-center gap-1 px-6 py-3 rounded-full backdrop-blur-sm"
        style={{
          background: bgColor,
          border: `1px solid ${borderColor}`,
          boxShadow: '0 4px 20px rgba(92, 61, 46, 0.06)',
        }}
      >
        <span
          className="font-serif italic text-sm tracking-wide whitespace-nowrap"
          style={{ color: textColor }}
        >
          &ldquo;{verse}&rdquo;
        </span>
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: referenceColor }}
        >
          — {reference}
        </span>
      </div>
    </motion.div>
  )
}

/** Mobile-only: inline pill with subtle pulse */
function MobileVersePill({ verse, reference, variant }: VerseData) {
  const prefersReducedMotion = useReducedMotion()
  const { bgColor, borderColor, textColor, referenceColor } = useVerseColors(variant)

  return (
    <motion.div
      animate={prefersReducedMotion ? {} : {
        scale: [1, 1.02, 1],
        opacity: [0.75, 0.9, 0.75],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div
        className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-full backdrop-blur-sm"
        style={{
          background: bgColor,
          border: `1px solid ${borderColor}`,
          boxShadow: '0 4px 16px rgba(92, 61, 46, 0.06)',
        }}
      >
        <span
          className="font-serif italic text-[11px] sm:text-xs tracking-wide whitespace-nowrap"
          style={{ color: textColor }}
        >
          &ldquo;{verse}&rdquo;
        </span>
        <span
          className="text-[9px] sm:text-[10px] tracking-widest uppercase"
          style={{ color: referenceColor }}
        >
          — {reference}
        </span>
      </div>
    </motion.div>
  )
}

const VERSES: VerseData[] = [
  { verse: 'Two are better than one', reference: 'Ecclesiastes 4:9', variant: 'terracotta' },
  { verse: 'Love never fails', reference: '1 Corinthians 13:8', variant: 'sage' },
]

const FLOAT_CONFIGS: FloatConfig[] = [
  {
    xKeyframes: [0, 15, -10, 20, -5, 0],
    yKeyframes: [0, -12, 8, -15, 5, 0],
    rotateKeyframes: [-2, 1, -1.5, 2, -1, -2],
    duration: 18,
    initialX: 5,
    initialY: 18,
  },
  {
    xKeyframes: [0, -18, 12, -8, 15, 0],
    yKeyframes: [0, 10, -8, 12, -6, 0],
    rotateKeyframes: [1, -1.5, 2, -2, 1.5, 1],
    duration: 22,
    initialX: 62,
    initialY: 72,
  },
]

/** Desktop floating verses — absolute positioned in hero section */
export function FloatingScriptureVerses() {
  return (
    <>
      {VERSES.map((v, i) => (
        <DesktopFloatingVerse key={v.reference} {...v} floatConfig={FLOAT_CONFIGS[i]} />
      ))}
    </>
  )
}

/** Mobile stacked verses — inline in the page flow */
export function MobileScriptureVerses() {
  return (
    <motion.div
      className="flex md:hidden flex-col items-center gap-2 mb-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      {VERSES.map((v) => (
        <MobileVersePill key={v.reference} {...v} />
      ))}
    </motion.div>
  )
}
