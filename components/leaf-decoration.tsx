// Decorative leaf/botanical elements for rustic theme

interface LeafDecorationProps {
  className?: string
  position?: 'left' | 'right' | 'bottom-left' | 'bottom-right'
}

export function LeafDecoration({ className = '', position = 'left' }: LeafDecorationProps) {
  const transforms = {
    'left': '',
    'right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)',
  }

  return (
    <svg
      viewBox="0 0 200 300"
      fill="currentColor"
      className={className}
      style={{ transform: transforms[position] }}
      aria-hidden="true"
    >
      {/* Main branch */}
      <path d="M100 0 Q95 100 90 150 Q85 200 95 250 Q100 280 100 300" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        opacity="0.6"
      />
      
      {/* Leaves on the branch */}
      <ellipse cx="70" cy="40" rx="25" ry="15" transform="rotate(-30 70 40)" opacity="0.4" />
      <ellipse cx="120" cy="70" rx="30" ry="18" transform="rotate(25 120 70)" opacity="0.5" />
      <ellipse cx="60" cy="100" rx="28" ry="16" transform="rotate(-35 60 100)" opacity="0.4" />
      <ellipse cx="130" cy="140" rx="32" ry="18" transform="rotate(30 130 140)" opacity="0.5" />
      <ellipse cx="55" cy="170" rx="26" ry="14" transform="rotate(-25 55 170)" opacity="0.3" />
      <ellipse cx="125" cy="210" rx="28" ry="16" transform="rotate(35 125 210)" opacity="0.4" />
      <ellipse cx="70" cy="250" rx="24" ry="14" transform="rotate(-20 70 250)" opacity="0.3" />
      
      {/* Small accent leaves */}
      <circle cx="85" cy="60" r="6" opacity="0.3" />
      <circle cx="110" cy="110" r="5" opacity="0.25" />
      <circle cx="80" cy="140" r="7" opacity="0.3" />
      <circle cx="115" cy="180" r="5" opacity="0.25" />
    </svg>
  )
}

// Simple leaf for inline use
export function SimpleLeaf({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
    </svg>
  )
}
