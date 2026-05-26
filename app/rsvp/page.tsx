'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HandSignIcon } from '@/components/hand-sign-icon'
import { SimpleLeaf } from '@/components/leaf-decoration'
import { Check } from 'lucide-react'

export default function RSVPPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: '',
    guests: '1',
    mealPreference: '',
    dietaryRestrictions: '',
    signLanguageInterpreter: false,
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to a database
    console.log('RSVP submitted:', formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-warm-white rounded-lg shadow-lg p-8 md:p-12 text-center"
          >
            <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-sage" />
            </div>
            <h2 className="font-serif text-3xl text-brown mb-4">Thank You!</h2>
            <p className="text-muted-foreground mb-2">
              Your RSVP has been received. We&apos;re so grateful you&apos;ll be joining us!
            </p>
            <p className="text-sm text-muted-foreground italic mt-6">
              &ldquo;Every good and perfect gift is from above&rdquo; — James 1:17
            </p>
            <HandSignIcon className="w-8 h-8 text-terracotta/50 mx-auto mt-6" />
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <SimpleLeaf className="w-6 h-6 text-sage/60 rotate-[-30deg]" />
            <HandSignIcon className="w-8 h-8 text-terracotta/70" />
            <SimpleLeaf className="w-6 h-6 text-sage/60 rotate-[30deg] scale-x-[-1]" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-brown mb-4">
            Kindly Respond
          </h1>
          <p className="text-muted-foreground">
            Please let us know if you&apos;ll be joining us to celebrate
          </p>
          <p className="text-sm text-sage mt-2 italic">
            RSVP by August 21, 2026
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-warm-white rounded-lg shadow-lg p-6 md:p-8 space-y-6"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-brown mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-md bg-cream/50 focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-colors"
              placeholder="Your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-brown mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-md bg-cream/50 focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-colors"
              placeholder="your@email.com"
            />
          </div>

          {/* Attending */}
          <div>
            <label className="block text-sm font-medium text-brown mb-3">
              Will you be attending? *
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              {[
                { value: 'yes', label: 'Joyfully Accept' },
                { value: 'no', label: 'Regretfully Decline' },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex-1 flex items-center justify-center px-4 py-3 border-2 rounded-md cursor-pointer transition-all ${
                    formData.attending === option.value
                      ? 'border-terracotta bg-terracotta/10 text-terracotta'
                      : 'border-border hover:border-terracotta/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value={option.value}
                    checked={formData.attending === option.value}
                    onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                    className="sr-only"
                    required
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Conditional fields when attending */}
          {formData.attending === 'yes' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-6"
            >
              {/* Number of Guests */}
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-brown mb-2">
                  Number of Guests (including yourself)
                </label>
                <select
                  id="guests"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-md bg-cream/50 focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-colors"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              {/* Meal Preference */}
              <div>
                <label className="block text-sm font-medium text-brown mb-3">
                  Meal Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['Chicken', 'Fish', 'Vegetarian'].map((meal) => (
                    <label
                      key={meal}
                      className={`flex items-center justify-center px-4 py-3 border-2 rounded-md cursor-pointer transition-all ${
                        formData.mealPreference === meal
                          ? 'border-sage bg-sage/10 text-sage'
                          : 'border-border hover:border-sage/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="meal"
                        value={meal}
                        checked={formData.mealPreference === meal}
                        onChange={(e) => setFormData({ ...formData, mealPreference: e.target.value })}
                        className="sr-only"
                      />
                      <span>{meal}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Dietary Restrictions */}
              <div>
                <label htmlFor="dietary" className="block text-sm font-medium text-brown mb-2">
                  Dietary Restrictions or Allergies
                </label>
                <input
                  type="text"
                  id="dietary"
                  value={formData.dietaryRestrictions}
                  onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-md bg-cream/50 focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-colors"
                  placeholder="Please list any allergies or restrictions"
                />
              </div>

              {/* Sign Language Interpreter */}
              <div className="bg-sage/10 rounded-md p-4 border border-sage/20">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.signLanguageInterpreter}
                    onChange={(e) => setFormData({ ...formData, signLanguageInterpreter: e.target.checked })}
                    className="mt-1 w-5 h-5 text-terracotta border-border rounded focus:ring-terracotta"
                  />
                  <div>
                    <span className="font-medium text-brown flex items-center gap-2">
                      <HandSignIcon className="w-5 h-5 text-sage" />
                      Sign Language Interpretation
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      Our ceremony will include sign language interpretation. Check this box if you&apos;d prefer seating with a clear view of the interpreter.
                    </p>
                  </div>
                </label>
              </div>
            </motion.div>
          )}

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-brown mb-2">
              Message for the Couple (Optional)
            </label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-md bg-cream/50 focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta transition-colors resize-none"
              placeholder="Share your well wishes..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-terracotta text-warm-white font-medium rounded-md hover:bg-terracotta/90 transition-colors shadow-lg shadow-terracotta/20"
          >
            Submit RSVP
          </button>
        </motion.form>

        {/* Footer Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-8 italic"
        >
          &ldquo;Let us not love with words or speech but with actions and in truth.&rdquo; — 1 John 3:18
        </motion.p>
      </div>
    </div>
  )
}
