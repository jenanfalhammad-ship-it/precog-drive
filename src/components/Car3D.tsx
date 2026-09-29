export function Car3D({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: 1200 }}
      aria-label="JDRI smart truck"
    >
      <div
        className="animate-float relative"
        style={{
          transform: "rotateX(18deg) rotateY(-22deg) rotateZ(-3deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <svg
          viewBox="0 0 700 340"
          className="w-full drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)]"
          role="img"
        >
          <defs>
            <linearGradient id="truckBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--teal-glow)" />
              <stop offset="55%" stopColor="var(--teal)" />
              <stop offset="100%" stopColor="var(--navy)" />
            </linearGradient>
            <linearGradient id="truckCab" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b9fff1" />
              <stop offset="100%" stopColor="var(--teal)" />
            </linearGradient>
            <linearGradient id="truckGlass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--navy-deep)" stopOpacity="0.4" />
            </linearGradient>
            <radialGradient id="truckWheel" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#3a3a45" />
              <stop offset="70%" stopColor="#111" />
              <stop offset="100%" stopColor="#000" />
            </radialGradient>
            <linearGradient id="truckHighlight" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="50%" stopColor="#fff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <filter id="truckGlow">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>
          <ellipse cx="350" cy="307" rx="270" ry="15" fill="#000" opacity="0.35" />
          {/* semi-trailer */}
          <path
            d="M55 205 L75 105 Q82 88 105 88 L380 88 Q400 88 408 108 L425 205 Z"
            fill="url(#truckBody)"
            stroke="var(--silver)"
            strokeWidth="1.5"
          />
          <path
            d="M76 104 L386 104 L397 178 L67 178 Z"
            fill="none"
            stroke="var(--silver)"
            strokeWidth="1"
            opacity="0.5"
          />
          <path
            d="M88 124 L386 124 M80 151 L395 151"
            stroke="var(--silver)"
            strokeWidth="1"
            opacity="0.3"
          />
          {/* cab */}
          <path
            d="M405 205 L417 105 Q420 78 448 68 L550 68 Q575 72 596 103 L642 169 Q654 184 650 218 L626 252 L414 252 Z"
            fill="url(#truckCab)"
            stroke="var(--silver)"
            strokeWidth="1.5"
          />
          <path
            d="M440 103 Q442 83 459 80 L535 80 Q552 83 567 103 L593 139 L435 139 Z"
            fill="url(#truckGlass)"
            opacity="0.9"
          />
          <line
            x1="515"
            y1="80"
            x2="515"
            y2="139"
            stroke="var(--silver)"
            strokeWidth="1"
            opacity="0.65"
          />
          <path
            d="M74 196 Q170 177 390 184 Q525 188 635 205"
            stroke="url(#truckHighlight)"
            strokeWidth="4"
            fill="none"
            opacity="0.7"
          />
          <ellipse
            cx="634"
            cy="178"
            rx="18"
            ry="9"
            fill="var(--teal-glow)"
            opacity="0.9"
            filter="url(#truckGlow)"
          />
          <ellipse cx="634" cy="178" rx="9" ry="4" fill="#fff" />
          <rect
            x="100"
            y="208"
            width="300"
            height="3"
            rx="1.5"
            fill="var(--teal-glow)"
            opacity="0.65"
          >
            <animate attributeName="x" from="80" to="390" dur="2.4s" repeatCount="indefinite" />
          </rect>
          {[
            { cx: 145, cy: 260 },
            { cx: 335, cy: 260 },
            { cx: 535, cy: 260 },
          ].map(({ cx, cy }) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r="43" fill="url(#truckWheel)" />
              <circle cx={cx} cy={cy} r="20" fill="#1a1a22" stroke="var(--teal)" strokeWidth="2" />
              <circle cx={cx} cy={cy} r="6" fill="var(--silver)" />
            </g>
          ))}
          <text
            x="180"
            y="145"
            fill="white"
            opacity="0.8"
            fontSize="18"
            fontFamily="Space Grotesk"
            letterSpacing="4"
          >
            JDRI
          </text>
        </svg>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ transform: "rotateX(75deg)" }}>
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
