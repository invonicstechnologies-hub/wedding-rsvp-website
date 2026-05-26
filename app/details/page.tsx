'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, Calendar, Heart, Gift, Camera, Church } from 'lucide-react'
import { HandSignIcon, HeartHandsIcon } from '@/components/hand-sign-icon'
import { SimpleLeaf } from '@/components/leaf-decoration'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function DetailsPage() {
  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-16">
        <motion.div {...fadeInUp}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <SimpleLeaf className="w-6 h-6 text-sage/60 rotate-[-30deg]" />
            <HandSignIcon className="w-8 h-8 text-terracotta/70" />
            <SimpleLeaf className="w-6 h-6 text-sage/60 rotate-[30deg] scale-x-[-1]" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-brown mb-4">
            Wedding Details
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            All the information you need for our special day — where hearts speak in every language
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        {/* Ceremony & Reception */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Ceremony */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-warm-white rounded-lg shadow-lg p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center">
                <Church className="w-5 h-5 text-terracotta" />
              </div>
              <h2 className="font-serif text-2xl text-brown">Ceremony</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-sage mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-brown">Monday, September 21, 2026</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-sage mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-brown">2:00 PM</p>
                  <p className="text-sm">Please arrive 15 minutes early</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sage mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-brown">Grace Community Church</p>
                  <p className="text-sm">1234 Faith Avenue</p>
                  <p className="text-sm">Nashville, TN 37203</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-sage">
                <HandSignIcon className="w-4 h-4" />
                <span>Sign language interpretation provided</span>
              </div>
            </div>
          </motion.div>

          {/* Reception */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-warm-white rounded-lg shadow-lg p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-sage/10 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-sage" />
              </div>
              <h2 className="font-serif text-2xl text-brown">Reception</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-terracotta mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-brown">Same Day</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-terracotta mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-brown">4:00 PM - 10:00 PM</p>
                  <p className="text-sm">Cocktail hour begins at 4:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-terracotta mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-brown">Rustic Barn at Meadow Creek</p>
                  <p className="text-sm">5678 Country Road</p>
                  <p className="text-sm">Nashville, TN 37215</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground italic">
                Dinner, dancing, and fellowship to follow
              </p>
            </div>
          </motion.div>
        </div>

        {/* Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-warm-white rounded-lg shadow-lg p-6 md:p-8"
        >
          <h2 className="font-serif text-2xl text-brown mb-6 text-center">Schedule of Events</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[22px] top-2 bottom-2 w-0.5 bg-border md:left-1/2 md:-translate-x-0.5" />
            
            {[
              { time: '1:45 PM', event: 'Guest Arrival', description: 'Seating begins at the church' },
              { time: '2:00 PM', event: 'Ceremony', description: 'Union of Manu & Anne in Christ' },
              { time: '3:00 PM', event: 'Photos', description: 'Family and wedding party photos' },
              { time: '4:00 PM', event: 'Cocktail Hour', description: 'Appetizers and refreshments' },
              { time: '5:30 PM', event: 'Dinner', description: 'Blessing and seated dinner' },
              { time: '7:00 PM', event: 'First Dance & Toasts', description: 'Celebrating the couple' },
              { time: '7:30 PM', event: 'Dancing & Fellowship', description: 'Join us on the dance floor' },
              { time: '10:00 PM', event: 'Farewell', description: 'Send off the newlyweds' },
            ].map((item, index) => (
              <div key={index} className="relative flex items-start gap-4 pb-6 last:pb-0 md:justify-center">
                <div className="w-11 h-11 rounded-full bg-cream border-2 border-terracotta flex items-center justify-center z-10 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <span className="text-xs font-medium text-terracotta">{index + 1}</span>
                </div>
                <div className={`flex-1 md:w-[calc(50%-40px)] ${index % 2 === 0 ? 'md:pr-12 md:text-right md:mr-auto md:ml-0' : 'md:pl-12 md:ml-auto md:mr-0'}`}>
                  <p className="font-medium text-terracotta">{item.time}</p>
                  <p className="font-serif text-lg text-brown">{item.event}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Dress Code */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-warm-white rounded-lg shadow-lg p-6"
          >
            <h3 className="font-serif text-xl text-brown mb-3">Attire</h3>
            <p className="text-muted-foreground mb-2">
              <span className="font-medium text-brown">Garden Formal</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Think elegant but comfortable — the reception includes an outdoor barn setting. Ladies, consider wedge heels for grass areas.
            </p>
            <div className="mt-3 flex items-center gap-2 text-sm text-sage">
              <SimpleLeaf className="w-4 h-4" />
              <span>Earthy tones encouraged</span>
            </div>
          </motion.div>

          {/* Registry */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-warm-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <Gift className="w-5 h-5 text-terracotta" />
              <h3 className="font-serif text-xl text-brown">Registry</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Your presence is our greatest gift. For those who wish to bless us further, we&apos;ve registered at:
            </p>
            <div className="space-y-2">
              <a href="#" className="block px-4 py-2 border border-border rounded-md text-center text-brown hover:border-terracotta transition-colors">
                Zola Registry
              </a>
              <a href="#" className="block px-4 py-2 border border-border rounded-md text-center text-brown hover:border-terracotta transition-colors">
                Amazon Wedding
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-3 italic text-center">
              Contributions to our mission fund are also welcome
            </p>
          </motion.div>
        </div>

        {/* Photo Sharing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-sage/10 rounded-lg p-6 border border-sage/20 text-center"
        >
          <Camera className="w-8 h-8 text-sage mx-auto mb-3" />
          <h3 className="font-serif text-xl text-brown mb-2">Share Your Photos</h3>
          <p className="text-muted-foreground text-sm mb-3">
            We&apos;d love to see the day through your eyes! Share your photos using:
          </p>
          <p className="font-medium text-terracotta text-lg">#ManuAndAnne2026</p>
          <p className="text-xs text-muted-foreground mt-2">
            Unplugged ceremony — please silence devices during the service
          </p>
        </motion.div>

        {/* Our Story Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-warm-white rounded-lg shadow-lg p-6 md:p-8 text-center"
        >
          <HeartHandsIcon className="w-10 h-10 text-terracotta/60 mx-auto mb-4" />
          <h3 className="font-serif text-2xl text-brown mb-3">Our Story</h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            From mission fields to spoken words and signed promises, God has woven our stories together in the most beautiful way. We met serving at a deaf ministry outreach and discovered that love truly speaks in every language.
          </p>
          <p className="text-sm text-sage mt-4 italic">
            &ldquo;For where two or three gather in my name, there am I with them.&rdquo; — Matthew 18:20
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center pt-8"
        >
          <p className="text-muted-foreground mb-4">Ready to join us?</p>
          <Link
            href="/rsvp"
            className="inline-block px-8 py-3 bg-terracotta text-warm-white font-medium rounded-md hover:bg-terracotta/90 transition-colors shadow-lg shadow-terracotta/20"
          >
            RSVP Now
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-8 bg-brown text-warm-white/80 text-center">
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
