'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Countdown } from '@/components/countdown'
import { HandSignIcon, HeartHandsIcon } from '@/components/hand-sign-icon'
import { LeafDecoration } from '@/components/leaf-decoration'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Decorative elements */}
        <LeafDecoration className="absolute top-20 left-0 w-32 md:w-48 text-sage/30" position="left" />
        <LeafDecoration className="absolute top-20 right-0 w-32 md:w-48 text-sage/30" position="right" />
        
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235C3D2E' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Scripture-inspired intro */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sage text-sm md:text-base tracking-widest uppercase mb-6"
          >
            Two are better than one — Ecclesiastes 4:9
          </motion.p>

          {/* Names with decorative elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-4">
              <HeartHandsIcon className="w-8 h-8 md:w-10 md:h-10 text-terracotta/60" />
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brown">
                Manu
              </h1>
            </div>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center justify-center gap-4 my-4"
            >
              <div className="h-px w-16 md:w-24 bg-terracotta/40" />
              <HandSignIcon className="w-6 h-6 text-terracotta" />
              <div className="h-px w-16 md:w-24 bg-terracotta/40" />
            </motion.div>

            <div className="flex items-center justify-center gap-4 md:gap-6">
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brown">
                Anne
              </h1>
              <HeartHandsIcon className="w-8 h-8 md:w-10 md:h-10 text-terracotta/60" />
            </div>
          </motion.div>

          {/* Tagline - Words & Signs */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-muted-foreground text-lg md:text-xl mt-8 font-light"
          >
            Speaking love in words and signs
          </motion.p>

          {/* Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12"
          >
            <p className="font-serif text-2xl md:text-3xl text-terracotta">
              September 21, 2026
            </p>
            <p className="text-muted-foreground mt-2">
              Grace Community Church • Nashville, Tennessee
            </p>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16"
          >
            <Countdown targetDate="2026-09-21T14:00:00" />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/rsvp"
              className="px-8 py-3 bg-terracotta text-warm-white font-medium rounded-md hover:bg-terracotta/90 transition-colors shadow-lg shadow-terracotta/20"
            >
              RSVP Now
            </Link>
            <Link
              href="/details"
              className="px-8 py-3 border-2 border-sage text-sage font-medium rounded-md hover:bg-sage hover:text-warm-white transition-colors"
            >
              View Details
            </Link>
          </motion.div>
        </div>

        {/* Bottom decorative leaves */}
        <LeafDecoration className="absolute bottom-0 left-0 w-40 md:w-64 text-sage/20" position="bottom-left" />
        <LeafDecoration className="absolute bottom-0 right-0 w-40 md:w-64 text-sage/20" position="bottom-right" />
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <HandSignIcon className="w-12 h-12 mx-auto text-terracotta/50 mb-8" />
            <blockquote className="font-serif text-2xl md:text-3xl text-brown leading-relaxed italic">
              &ldquo;And now these three remain: faith, hope and love. But the greatest of these is love.&rdquo;
            </blockquote>
            <cite className="block mt-6 text-muted-foreground not-italic">
              — 1 Corinthians 13:13
            </cite>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-brown text-warm-white/80 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <HandSignIcon className="w-5 h-5" />
          <span className="font-serif text-lg">M & A</span>
          <HandSignIcon className="w-5 h-5" />
        </div>
        <p className="text-sm">September 21, 2026 • Nashville, TN</p>
      </footer>
    </div>
  )
}
