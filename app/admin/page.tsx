'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  Download,
  Filter,
  HandMetal,
  Utensils,
  Mail
} from 'lucide-react'
import { HandSignIcon } from '@/components/hand-sign-icon'

// Mock RSVP data - in a real app, this would come from a database
const mockRSVPs = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', attending: 'yes', guests: 2, meal: 'Chicken', signInterpreter: true, submittedAt: '2026-06-15', message: 'So excited for you both!' },
  { id: 2, name: 'Michael Chen', email: 'mchen@email.com', attending: 'yes', guests: 1, meal: 'Vegetarian', signInterpreter: false, submittedAt: '2026-06-14', message: '' },
  { id: 3, name: 'Emily Davis', email: 'emily.d@email.com', attending: 'no', guests: 0, meal: '', signInterpreter: false, submittedAt: '2026-06-13', message: 'Will be thinking of you!' },
  { id: 4, name: 'James Wilson', email: 'jwilson@email.com', attending: 'yes', guests: 3, meal: 'Fish', signInterpreter: false, submittedAt: '2026-06-12', message: 'Congratulations!' },
  { id: 5, name: 'Amanda Roberts', email: 'aroberts@email.com', attending: 'yes', guests: 2, meal: 'Chicken', signInterpreter: true, submittedAt: '2026-06-11', message: '' },
  { id: 6, name: 'David Kim', email: 'dkim@email.com', attending: 'pending', guests: 0, meal: '', signInterpreter: false, submittedAt: '', message: '' },
  { id: 7, name: 'Rachel Martinez', email: 'rmartinez@email.com', attending: 'yes', guests: 1, meal: 'Vegetarian', signInterpreter: false, submittedAt: '2026-06-10', message: 'Can\'t wait!' },
  { id: 8, name: 'Thomas Brown', email: 'tbrown@email.com', attending: 'no', guests: 0, meal: '', signInterpreter: false, submittedAt: '2026-06-09', message: 'Sorry to miss it' },
]

type FilterType = 'all' | 'attending' | 'declined' | 'pending'

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')

  // Calculate stats
  const stats = {
    total: mockRSVPs.length,
    attending: mockRSVPs.filter(r => r.attending === 'yes').length,
    declined: mockRSVPs.filter(r => r.attending === 'no').length,
    pending: mockRSVPs.filter(r => r.attending === 'pending').length,
    totalGuests: mockRSVPs.filter(r => r.attending === 'yes').reduce((sum, r) => sum + r.guests, 0),
    needInterpreter: mockRSVPs.filter(r => r.signInterpreter).length,
    mealCounts: {
      chicken: mockRSVPs.filter(r => r.meal === 'Chicken').length,
      fish: mockRSVPs.filter(r => r.meal === 'Fish').length,
      vegetarian: mockRSVPs.filter(r => r.meal === 'Vegetarian').length,
    }
  }

  // Filter RSVPs
  const filteredRSVPs = mockRSVPs.filter(rsvp => {
    const matchesSearch = rsvp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rsvp.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || 
                         (filter === 'attending' && rsvp.attending === 'yes') ||
                         (filter === 'declined' && rsvp.attending === 'no') ||
                         (filter === 'pending' && rsvp.attending === 'pending')
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-cream py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <HandSignIcon className="w-8 h-8 text-terracotta" />
            <h1 className="font-serif text-3xl md:text-4xl text-brown">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">Manage RSVPs for Manu & Anne&apos;s Wedding</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8"
        >
          <StatCard 
            icon={<Users className="w-5 h-5" />}
            label="Total Invited"
            value={stats.total}
            color="brown"
          />
          <StatCard 
            icon={<CheckCircle className="w-5 h-5" />}
            label="Attending"
            value={stats.attending}
            color="sage"
          />
          <StatCard 
            icon={<XCircle className="w-5 h-5" />}
            label="Declined"
            value={stats.declined}
            color="terracotta"
          />
          <StatCard 
            icon={<Clock className="w-5 h-5" />}
            label="Pending"
            value={stats.pending}
            color="muted"
          />
          <StatCard 
            icon={<Users className="w-5 h-5" />}
            label="Total Guests"
            value={stats.totalGuests}
            color="sage"
          />
          <StatCard 
            icon={<HandMetal className="w-5 h-5" />}
            label="Need Interpreter"
            value={stats.needInterpreter}
            color="terracotta"
          />
        </motion.div>

        {/* Meal Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-warm-white rounded-lg shadow-lg p-4 md:p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Utensils className="w-5 h-5 text-terracotta" />
            <h2 className="font-serif text-xl text-brown">Meal Preferences</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-cream rounded-md">
              <p className="text-2xl font-serif text-terracotta">{stats.mealCounts.chicken}</p>
              <p className="text-sm text-muted-foreground">Chicken</p>
            </div>
            <div className="text-center p-3 bg-cream rounded-md">
              <p className="text-2xl font-serif text-sage">{stats.mealCounts.fish}</p>
              <p className="text-sm text-muted-foreground">Fish</p>
            </div>
            <div className="text-center p-3 bg-cream rounded-md">
              <p className="text-2xl font-serif text-brown">{stats.mealCounts.vegetarian}</p>
              <p className="text-sm text-muted-foreground">Vegetarian</p>
            </div>
          </div>
        </motion.div>

        {/* RSVP List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-warm-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* List Header */}
          <div className="p-4 md:p-6 border-b border-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="font-serif text-xl text-brown">RSVP Responses</h2>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-border rounded-md bg-cream/50 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                  />
                </div>

                {/* Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as FilterType)}
                    className="pl-9 pr-8 py-2 border border-border rounded-md bg-cream/50 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                  >
                    <option value="all">All Responses</option>
                    <option value="attending">Attending</option>
                    <option value="declined">Declined</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                {/* Export */}
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-sage text-warm-white rounded-md hover:bg-sage/90 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cream/50 text-sm text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Guest</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium">Guests</th>
                  <th className="text-left px-4 py-3 font-medium">Meal</th>
                  <th className="text-left px-4 py-3 font-medium">Interpreter</th>
                  <th className="text-left px-4 py-3 font-medium">Date</th>
                  <th className="text-left px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredRSVPs.map((rsvp) => (
                  <tr key={rsvp.id} className="hover:bg-cream/30 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-brown">{rsvp.name}</p>
                        <p className="text-sm text-muted-foreground">{rsvp.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={rsvp.attending} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      {rsvp.attending === 'yes' ? rsvp.guests : '-'}
                    </td>
                    <td className="px-4 py-4">
                      {rsvp.meal || '-'}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {rsvp.signInterpreter ? (
                        <HandSignIcon className="w-5 h-5 text-sage inline-block" />
                      ) : '-'}
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      {rsvp.submittedAt || 'Not submitted'}
                    </td>
                    <td className="px-4 py-4">
                      <button className="p-2 hover:bg-cream rounded-md transition-colors" title="Send email">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredRSVPs.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No RSVPs match your search criteria
              </div>
            )}
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-8 italic"
        >
          &ldquo;Serve one another humbly in love.&rdquo; — Galatians 5:13
        </motion.p>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, color }: { 
  icon: React.ReactNode
  label: string
  value: number
  color: 'brown' | 'sage' | 'terracotta' | 'muted'
}) {
  const colorClasses = {
    brown: 'text-brown bg-brown/10',
    sage: 'text-sage bg-sage/10',
    terracotta: 'text-terracotta bg-terracotta/10',
    muted: 'text-muted-foreground bg-muted',
  }

  return (
    <div className="bg-warm-white rounded-lg shadow p-4">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${colorClasses[color]}`}>
        {icon}
      </div>
      <p className="text-2xl font-serif text-brown">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    yes: { label: 'Attending', className: 'bg-sage/20 text-sage' },
    no: { label: 'Declined', className: 'bg-terracotta/20 text-terracotta' },
    pending: { label: 'Pending', className: 'bg-muted text-muted-foreground' },
  }

  const { label, className } = config[status as keyof typeof config] || config.pending

  return (
    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}
