export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="circleClip">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
      <g clipPath="url(#circleClip)">
        {/* Sky / Sun rays background */}
        <rect width="100" height="50" fill="#f48c42" />
        {/* Sun rays */}
        <path d="M80 50 L0 0 M80 50 L20 0 M80 50 L40 0 M80 50 L60 0 M80 50 L80 0 M80 50 L100 0 M80 50 L100 20 M80 50 L100 40" stroke="#ffffff" strokeWidth="2" />
        {/* Sun */}
        <circle cx="80" cy="50" r="15" fill="#f4d03f" />
        
        {/* Waves */}
        <path d="M0 50 Q 25 40 50 55 T 100 50 L 100 100 L 0 100 Z" fill="#76b5c5" />
        <path d="M0 65 Q 25 55 50 70 T 100 65 L 100 100 L 0 100 Z" fill="#a3e4d7" />
        <path d="M0 80 Q 25 70 50 85 T 100 80 L 100 100 L 0 100 Z" fill="#76b5c5" />
      </g>
    </svg>
  );
}
