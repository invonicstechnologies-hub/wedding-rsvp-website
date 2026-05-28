'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { HandSignIcon } from '@/components/hand-sign-icon'

interface Scene {
  background: string
  caption: string
  showILY: boolean
}

const SCENES: Scene[] = [
  {
    background: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920&q=80&auto=format&fit=crop',
    caption: 'It started in a Bible study. Six friends, one table, one Word.',
    showILY: false,
  },
  {
    background: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&q=80&auto=format&fit=crop',
    caption: 'He left for Zambia. 40 million people in Kenya. Only Anne checked in.',
    showILY: false,
  },
  {
    background: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1920&q=80&auto=format&fit=crop',
    caption: 'She would travel from Nakuru to Nairobi for a weekend retreat — then go straight home.',
    showILY: false,
  },
  {
    background: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80&auto=format&fit=crop',
    caption: 'He proposed over an email. In Sign Language.',
    showILY: true,
  },
  {
    background: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80&auto=format&fit=crop',
    caption: 'Now they serve together — speaking love in words and in signs.',
    showILY: false,
  },
  {
    background: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80&auto=format&fit=crop',
    caption: 'This is a love story written by God.',
    showILY: false,
  },
]

const SCENE_DURATION = 3500

/* ------------------------------------------------------------------ */
/*  Falling petals scoped to the montage section                      */
/* ------------------------------------------------------------------ */
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

const petalColors = ['#C1714F', '#FBBF24', '#FAF6EF', '#D4A574', '#7D9B76']

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 10 + 6,
    left: Math.random() * 100,
    delay: Math.random() * 4,
    duration: Math.random() * 5 + 4,
    rotation: Math.random() * 360,
    drift: (Math.random() - 0.5) * 80,
    opacity: Math.random() * 0.35 + 0.15,
    color: petalColors[Math.floor(Math.random() * petalColors.length)],
  }))
}

function MontagePetals() {
  const prefersReducedMotion = useReducedMotion()
  const [petals, setPetals] = useState<Petal[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Fewer petals on mobile (via viewport width at mount time)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    setPetals(generatePetals(isMobile ? 8 : 16))
    setMounted(true)
  }, [])

  if (prefersReducedMotion || !mounted) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[15]" aria-hidden="true">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute -top-4"
          style={{ left: `${petal.left}%` }}
          initial={{ y: -10, x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: ['0%', '110%'],
            x: [0, petal.drift, petal.drift * 0.6, petal.drift * 1.1],
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
            <path d="M10 0 C15 6, 18 12, 10 24 C2 12, 5 6, 10 0 Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Typewriter caption                                                */
/* ------------------------------------------------------------------ */
function TypewriterCaption({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setDisplayedText('')
    setCurrentIndex(0)
  }, [text])

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text)
      return
    }
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 20)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, prefersReducedMotion])

  return (
    <span>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="inline-block w-[2px] h-[1em] bg-current ml-0.5 align-middle"
        />
      )}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Scene card                                                        */
/* ------------------------------------------------------------------ */
function SceneCard({
  scene,
  sceneIndex,
  isActive,
  onClick,
  progress,
}: {
  scene: Scene
  sceneIndex: number
  isActive: boolean
  onClick?: () => void
  progress?: number
}) {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl sm:rounded-2xl h-full ${
        isActive ? 'cursor-default' : 'cursor-pointer'
      }`}
      whileHover={!isActive ? { scale: 1.015 } : undefined}
      transition={{ layout: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-out"
        style={{
          backgroundImage: `url(${scene.background})`,
          transform: isActive ? 'scale(1.05)' : 'scale(1.15)',
        }}
      />

      {/* Warm amber/gold gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: isActive
            ? 'linear-gradient(160deg, rgba(92,61,46,0.72) 0%, rgba(193,113,79,0.5) 45%, rgba(180,130,60,0.58) 100%)'
            : 'linear-gradient(160deg, rgba(92,61,46,0.82) 0%, rgba(193,113,79,0.68) 45%, rgba(180,130,60,0.76) 100%)',
        }}
      />

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 25%, rgba(30,15,5,0.5) 100%)',
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-5 md:p-6 lg:p-8">
        {/* Scene counter — top-left */}
        <div className={`absolute top-3 left-3 sm:top-4 sm:left-4 md:top-5 md:left-5 ${
          isActive ? 'opacity-60' : 'opacity-40'
        }`}>
          <span className="font-sans text-[10px] sm:text-xs tracking-widest uppercase text-amber-200">
            {String(sceneIndex + 1).padStart(2, '0')} / {String(SCENES.length).padStart(2, '0')}
          </span>
        </div>

        {/* "Up next" badge — preview only */}
        {!isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5"
          >
            <span className="font-sans text-[9px] sm:text-[10px] md:text-xs tracking-widest uppercase text-amber-300/70 bg-black/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full backdrop-blur-sm">
              Up Next
            </span>
          </motion.div>
        )}

        {/* Caption */}
        {isActive ? (
          <div className="mb-1 sm:mb-2">
            <p className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-amber-50 leading-relaxed drop-shadow-lg">
              <TypewriterCaption text={scene.caption} />
            </p>

            {/* 🤟 on scene 4 */}
            {scene.showILY && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.5, duration: 0.6, ease: 'easeOut' }}
                className="mt-2 sm:mt-3 flex justify-start"
              >
                <span className="text-2xl sm:text-3xl md:text-4xl" role="img" aria-label="I Love You sign">🤟</span>
              </motion.div>
            )}
          </div>
        ) : (
          <p className="font-serif text-xs sm:text-sm md:text-base text-amber-100/80 leading-snug line-clamp-2 sm:line-clamp-3 drop-shadow">
            {scene.caption}
          </p>
        )}

        {/* Progress bar — active card only */}
        {isActive && progress !== undefined && (
          <div className="mt-2 sm:mt-3 h-[2px] w-full bg-amber-50/15 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* Hover ring on preview */}
      {!isActive && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl sm:rounded-2xl ring-1 ring-inset ring-amber-300/20" />
      )}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main section                                                      */
/* ------------------------------------------------------------------ */
export function HowItBegan() {
  const [currentScene, setCurrentScene] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const progressRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(Date.now())
  const prefersReducedMotion = useReducedMotion()

  const nextIndex = (currentScene + 1) % SCENES.length

  const goToScene = useCallback((index: number) => {
    setCurrentScene(index)
    setProgress(0)
    startTimeRef.current = Date.now()
  }, [])

  const nextScene = useCallback(() => {
    setCurrentScene(prev => (prev + 1) % SCENES.length)
    setProgress(0)
    startTimeRef.current = Date.now()
  }, [])

  // Auto-advance timer
  useEffect(() => {
    if (isPaused) return

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current
      const pct = Math.min(elapsed / SCENE_DURATION, 1)
      setProgress(pct)

      if (pct >= 1) {
        nextScene()
      } else {
        progressRef.current = requestAnimationFrame(animate)
      }
    }

    startTimeRef.current = Date.now()
    progressRef.current = requestAnimationFrame(animate)

    return () => {
      if (progressRef.current) cancelAnimationFrame(progressRef.current)
    }
  }, [currentScene, isPaused, nextScene])

  return (
    <section
      id="how-it-began"
      className="relative w-full bg-brown overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false)
        startTimeRef.current = Date.now() - progress * SCENE_DURATION
      }}
      // Also handle touch for mobile pause
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => {
        setTimeout(() => {
          setIsPaused(false)
          startTimeRef.current = Date.now() - progress * SCENE_DURATION
        }, 300)
      }}
    >
      {/* Falling petals scoped to this section */}
      <MontagePetals />

      {/* Film grain over entire section */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      {/* Content wrapper — mobile-first padding */}
      <div className="relative z-10 px-3 py-8 sm:px-5 sm:py-10 md:px-8 md:py-12 lg:px-12 lg:py-14">

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5 sm:mb-6 md:mb-8 lg:mb-10"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-3">
            <div className="h-px w-8 sm:w-10 md:w-12 bg-amber-300/40" />
            <HandSignIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-amber-300/60" />
            <div className="h-px w-8 sm:w-10 md:w-12 bg-amber-300/40" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-amber-50 drop-shadow-lg">
            How It Began
          </h2>
        </motion.div>

        {/* ===== Card grid ===== */}
        {/* Mobile: vertical stack.  md+: horizontal with 70/30 split */}
        <div
          className="flex flex-col gap-3 sm:gap-4 md:flex-row md:gap-5 lg:gap-6"
          style={{ minHeight: '50vh' }}
        >
          {/* Active card — majority */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`active-${currentScene}`}
              className="h-[52vh] sm:h-[55vh] md:h-auto md:flex-[3] min-w-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: prefersReducedMotion ? 0.2 : 0.45, ease: 'easeOut' }}
            >
              <SceneCard
                scene={SCENES[currentScene]}
                sceneIndex={currentScene}
                isActive={true}
                progress={progress}
              />
            </motion.div>
          </AnimatePresence>

          {/* Preview (next) card — smaller */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`preview-${nextIndex}`}
              className="h-[18vh] sm:h-[20vh] md:h-auto md:flex-[1] md:max-w-[30%] min-w-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: prefersReducedMotion ? 0.2 : 0.45, ease: 'easeOut', delay: 0.08 }}
            >
              <SceneCard
                scene={SCENES[nextIndex]}
                sceneIndex={nextIndex}
                isActive={false}
                onClick={() => goToScene(nextIndex)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel dots */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 mt-5 sm:mt-6 md:mt-8">
          {SCENES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToScene(index)}
              className="group relative p-1"
              aria-label={`Go to scene ${index + 1}`}
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  index === currentScene
                    ? 'w-6 sm:w-7 h-1.5 sm:h-2 bg-amber-300'
                    : index === nextIndex
                      ? 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-amber-300/50'
                      : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-amber-50/30 group-hover:bg-amber-50/60'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
