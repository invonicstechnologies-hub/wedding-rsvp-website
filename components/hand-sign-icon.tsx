// A subtle hand/sign language motif - representing the "I Love You" sign (ILY)
// This is the American Sign Language gesture combining I, L, and Y

export function HandSignIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="I Love You in Sign Language"
    >
      {/* Palm */}
      <path d="M12 22c-4 0-7-3-7-7V9c0-1 .5-2 1.5-2s1.5 1 1.5 2v4" />
      {/* Thumb extended */}
      <path d="M6 15V9c0-1-.5-2-1.5-2S3 8 3 9v3c0 1 .5 2.5 2 3.5" />
      {/* Index finger extended */}
      <path d="M8 11V4c0-1 .5-2 1.5-2s1.5 1 1.5 2v7" />
      {/* Middle finger folded */}
      <path d="M11 11V5c0-1 .5-1.5 1.5-1.5s1.5.5 1.5 1.5v3" />
      {/* Pinky extended */}
      <path d="M17 11V4c0-1 .5-2 1.5-2s1.5 1 1.5 2v6c0 4-3 10-8 10" />
      {/* Ring finger folded - connects to palm */}
      <path d="M14 8V6c0-.5.5-1 1-1s1 .5 1 1v2" />
    </svg>
  )
}

// Alternative simpler heart-hands icon for variety
export function HeartHandsIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Heart formed by hands"
    >
      {/* Left hand forming half heart */}
      <path d="M7 11c-1.5 0-3 1-3 3 0 4 5 6 8 9" />
      <path d="M4 14c0-2 1.5-4 4-4 1 0 2 .5 2.5 1.5" />
      {/* Right hand forming half heart */}
      <path d="M17 11c1.5 0 3 1 3 3 0 4-5 6-8 9" />
      <path d="M20 14c0-2-1.5-4-4-4-1 0-2 .5-2.5 1.5" />
      {/* Heart top */}
      <path d="M12 11V8" />
    </svg>
  )
}
