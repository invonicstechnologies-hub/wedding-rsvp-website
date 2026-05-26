'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { Countdown } from '@/components/countdown'
import { HandSignIcon, HeartHandsIcon } from '@/components/hand-sign-icon'
import { LeafDecoration } from '@/components/leaf-decoration'

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion()
  
  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: { opacity: 1, y: 0 }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
        delayChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  }
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Decorative elements */}
        <LeafDecoration className="absolute top-0 left-0 w-40 md:w-56 text-sage/30" position="left" />
        <LeafDecoration className="absolute top-0 right-0 w-40 md:w-56 text-sage/30" position="right" />
        
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235C3D2E' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <motion.div 
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Tagline */}
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-sage text-sm md:text-base tracking-widest uppercase mb-8"
          >
            A love story written by God
          </motion.p>

          {/* Names with decorative elements */}
          <motion.div variants={fadeInUp} transition={{ duration: 1 }}>
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-2">
              <HeartHandsIcon className="w-8 h-8 md:w-12 md:h-12 text-terracotta/60" />
              <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-brown tracking-wide">
                Manu
              </h1>
            </div>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center gap-4 my-4"
            >
              <div className="h-px w-20 md:w-32 bg-terracotta/40" />
              <span className="font-serif text-2xl md:text-3xl text-terracotta">&amp;</span>
              <div className="h-px w-20 md:w-32 bg-terracotta/40" />
            </motion.div>

            <div className="flex items-center justify-center gap-4 md:gap-6 mt-2">
              <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-brown tracking-wide">
                Anne
              </h1>
              <HeartHandsIcon className="w-8 h-8 md:w-12 md:h-12 text-terracotta/60" />
            </div>
          </motion.div>

          {/* Last name */}
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-muted-foreground text-lg md:text-xl mt-6 font-light tracking-widest uppercase"
          >
            James
          </motion.p>

          {/* Date */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="mt-12"
          >
            <p className="font-serif text-2xl md:text-4xl text-terracotta">
              September 21, 2026
            </p>
            <p className="text-muted-foreground mt-3 text-base md:text-lg">
              Grace Community Church &bull; Nashville, Tennessee
            </p>
          </motion.div>

          {/* Countdown */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="mt-16"
          >
            <Countdown targetDate="2026-09-21T14:00:00" />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="mt-14"
          >
            <Link
              href="/rsvp"
              className="inline-block px-10 py-4 bg-terracotta text-warm-white font-medium text-lg rounded-md hover:bg-brown transition-colors shadow-lg shadow-terracotta/20"
            >
              RSVP Now
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-sage/60"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom decorative leaves */}
        <LeafDecoration className="absolute bottom-0 left-0 w-48 md:w-72 text-sage/20" position="bottom-left" />
        <LeafDecoration className="absolute bottom-0 right-0 w-48 md:w-72 text-sage/20" position="bottom-right" />
      </section>

      {/* Our Story Section */}
      <section className="py-24 md:py-32 bg-warm-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center"
          >
            {/* Section header */}
            <motion.div variants={fadeInUp} transition={{ duration: 0.8 }} className="mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12 bg-terracotta/40" />
                <HandSignIcon className="w-8 h-8 text-terracotta/60" />
                <div className="h-px w-12 bg-terracotta/40" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-brown">Our Story</h2>
            </motion.div>

            {/* Story content */}
            <div className="space-y-8 text-foreground/80 text-lg md:text-xl leading-relaxed">
              <motion.p variants={fadeInUp} transition={{ duration: 0.8 }}>
                It began in a Bible study group, where two hearts found common ground in faith 
                and a shared calling to serve.
              </motion.p>

              <motion.p variants={fadeInUp} transition={{ duration: 0.8 }}>
                When Manu left for a month-long mission trip to Zambia, Anne was the only person 
                outside his family who checked in on him — every single day. Through prayers and 
                messages across continents, their friendship grew into something deeper.
              </motion.p>

              <motion.div 
                variants={fadeInUp} 
                transition={{ duration: 0.8 }}
                className="py-6"
              >
                <div className="flex items-center justify-center gap-3">
                  <HandSignIcon className="w-6 h-6 text-terracotta" />
                  <span className="text-terracotta font-serif text-xl italic">
                    He proposed via email — in Sign Language
                  </span>
                  <HandSignIcon className="w-6 h-6 text-terracotta" />
                </div>
              </motion.div>

              <motion.p variants={fadeInUp} transition={{ duration: 0.8 }}>
                Today, Manu and Anne serve together as missionaries, sharing the love of Christ 
                through both words and signs — reaching hearts that hear and hands that speak.
              </motion.p>
            </div>

            {/* Decorative divider */}
            <motion.div 
              variants={fadeInUp} 
              transition={{ duration: 0.8 }}
              className="mt-12 flex items-center justify-center gap-3"
            >
              <div className="h-px w-16 bg-sage/40" />
              <HeartHandsIcon className="w-6 h-6 text-sage/60" />
              <div className="h-px w-16 bg-sage/40" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Scripture Quote Section */}
      <section className="py-20 md:py-28 bg-sage/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} transition={{ duration: 0.8 }}>
              <HandSignIcon className="w-12 h-12 mx-auto text-terracotta/50 mb-8" />
            </motion.div>
            
            <motion.blockquote 
              variants={fadeInUp} 
              transition={{ duration: 0.8 }}
              className="font-serif text-2xl md:text-3xl lg:text-4xl text-brown leading-relaxed italic"
            >
              &ldquo;Two are better than one, because they have a good return for their labor: 
              If either of them falls down, one can help the other up.&rdquo;
            </motion.blockquote>
            
            <motion.cite 
              variants={fadeInUp} 
              transition={{ duration: 0.8 }}
              className="block mt-8 text-muted-foreground not-italic text-lg"
            >
              — Ecclesiastes 4:9-10
            </motion.cite>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h3 
              variants={fadeInUp} 
              transition={{ duration: 0.8 }}
              className="font-serif text-3xl md:text-4xl text-brown mb-6"
            >
              Join Us in Celebration
            </motion.h3>
            
            <motion.p 
              variants={fadeInUp} 
              transition={{ duration: 0.8 }}
              className="text-muted-foreground text-lg mb-10 leading-relaxed"
            >
              We would be honored to have you witness the beginning of our new chapter. 
              Please let us know if you can attend.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp} 
              transition={{ duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/rsvp"
                className="px-8 py-3 bg-terracotta text-warm-white font-medium rounded-md hover:bg-brown transition-colors shadow-lg shadow-terracotta/20"
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
          </motion.div>
        </div>
      </section>
    </div>
  )
}
