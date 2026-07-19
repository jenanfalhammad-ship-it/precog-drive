export function Car3D({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ perspective: 1200 }}>
      <div
        className="animate-float relative"
        style={{
          transform: "rotateX(18deg) rotateY(-22deg) rotateZ(-3deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <svg viewBox="0 0 640 320" className="w-full drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)]">
          <defs>
            <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--teal-glow)" />
              <stop offset="55%" stopColor="var(--teal)" />
              <stop offset="100%" stopColor="var(--navy)" />
            </linearGradient>
            <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--navy-deep)" stopOpacity="0.4" />
            </linearGradient>
            <radialGradient id="wheel" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#3a3a45" />
              <stop offset="70%" stopColor="#111" />
              <stop offset="100%" stopColor="#000" />
            </radialGradient>
            <linearGradient id="highlight" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="50%" stopColor="#fff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* shadow */}
          <ellipse cx="320" cy="290" rx="240" ry="14" fill="#000" opacity="0.35" />
          {/* body */}
          <path
            d="M60 220 Q80 140 200 130 L260 90 Q330 55 430 90 L500 130 Q580 145 590 220 L570 250 L80 250 Z"
            fill="url(#body)"
            stroke="var(--silver)"
            strokeWidth="1.5"
          />
          {/* windows */}
          <path
            d="M210 135 L270 95 Q330 65 420 95 L480 135 L440 155 L240 155 Z"
            fill="url(#glass)"
            opacity="0.85"
          />
          <line x1="330" y1="72" x2="330" y2="145" stroke="var(--silver)" strokeWidth="1" opacity="0.6" />
          {/* highlight sweep */}
          <path
            d="M75 210 Q80 175 200 165 L280 155 L560 175 Q580 195 585 215"
            stroke="url(#highlight)"
            strokeWidth="4"
            fill="none"
            opacity="0.7"
          />
          {/* headlight */}
          <ellipse cx="565" cy="185" rx="22" ry="10" fill="var(--teal-glow)" opacity="0.9" filter="url(#glow)" />
          <ellipse cx="565" cy="185" rx="10" ry="4" fill="#fff" />
          {/* wheels */}
          <circle cx="170" cy="255" r="42" fill="url(#wheel)" />
          <circle cx="170" cy="255" r="20" fill="#1a1a22" stroke="var(--teal)" strokeWidth="2" />
          <circle cx="170" cy="255" r="6" fill="var(--silver)" />
          <circle cx="480" cy="255" r="42" fill="url(#wheel)" />
          <circle cx="480" cy="255" r="20" fill="#1a1a22" stroke="var(--teal)" strokeWidth="2" />
          <circle cx="480" cy="255" r="6" fill="var(--silver)" />
          {/* scan line */}
          <rect x="80" y="225" width="490" height="2" fill="var(--teal-glow)" opacity="0.6">
            <animate attributeName="y" from="140" to="240" dur="2.4s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>
      {/* orbiting rings */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: "rotateX(75deg)" }}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border animate-pulse-glow"
          style={{
            width: "90%",
            height: "90%",
            borderColor: "color-mix(in oklab, var(--teal) 40%, transparent)",
          }}
        />
      </div>
    </div>
  );
}
