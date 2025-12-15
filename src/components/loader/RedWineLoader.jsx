import React from 'react';

function RedWineLoader({ scale = 1 }) {
  return (
    <div
      className="flex items-center justify-center wine-shake"
      style={{ '--wine-scale': scale }}
    >
      <svg
        width="140"
        height="200"
        viewBox="0 0 140 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Wine mask */}
          <clipPath id="wineMask">
            <path d="M28 28h84c0 36-21 58-42 58S28 64 28 28z" />
          </clipPath>

          {/* Wine gradient */}
          <linearGradient id="wineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff5a5a" />
            <stop offset="55%" stopColor="#b11226" />
            <stop offset="100%" stopColor="#4a0911" />
          </linearGradient>

          {/* Wine glow */}
          <filter id="wineGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Glass tint gradient */}
          <linearGradient id="glassTint" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(180,170,200,0.55)" />
            <stop offset="40%" stopColor="rgba(180,170,200,0.18)" />
            <stop offset="100%" stopColor="rgba(180,170,200,0.05)" />
          </linearGradient>

          {/* Glass highlight */}
          <linearGradient id="glassHighlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="35%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* 🟣 Glass body (colored & thin) */}
        <path
          d="M22 22h96c0 48-24 76-48 76S22 70 22 22z"
          stroke="rgba(200,190,220,0.85)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="url(#glassTint)"
        />

        {/* ✨ Glass highlight */}
        <path
          d="M34 28c0 38 16 62 36 66"
          stroke="url(#glassHighlight)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* 🍷 Wine */}
        <g clipPath="url(#wineMask)">
          <rect
            x="28"
            y="28"
            width="84"
            height="58"
            rx="6"
            fill="url(#wineGradient)"
            filter="url(#wineGlow)"
            className="wine-fill-rect"
          />
        </g>

        {/* Stem */}
        <line
          x1="70"
          y1="102"
          x2="70"
          y2="158"
          stroke="rgba(200,190,220,0.75)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Base */}
        <line
          x1="44"
          y1="158"
          x2="96"
          y2="158"
          stroke="rgba(200,190,220,0.75)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      <style>
        {`
          /* 🍷 Wine fill */
          .wine-fill-rect {
            transform-origin: 70px 86px;
            animation: wineFill 3.6s cubic-bezier(0.45, 0, 0.2, 1) infinite;
          }

          @keyframes wineFill {
            0% {
              transform: scaleY(0);
              opacity: 0.55;
            }
            65% {
              transform: scaleY(1);
              opacity: 1;
            }
            100% {
              transform: scaleY(0);
              opacity: 0.55;
            }
          }

          /* 🫧 Strong cinematic shake */
          .wine-shake {
            transform-origin: 50% 88%;
            animation: glassShake 4.4s cubic-bezier(0.6, 0, 0.2, 1) infinite;
          }

          @keyframes glassShake {
            0% {
              transform: scale(var(--wine-scale, 1)) rotate(0deg);
            }
            18% {
              transform: scale(var(--wine-scale, 1)) rotate(3.2deg) translate(4px, -1px);
            }
            36% {
              transform: scale(var(--wine-scale, 1)) rotate(-3.8deg) translate(-5px, 1px);
            }
            54% {
              transform: scale(var(--wine-scale, 1)) rotate(2.6deg) translate(3px, -1px);
            }
            72% {
              transform: scale(var(--wine-scale, 1)) rotate(-1.6deg) translate(-2px, 0.5px);
            }
            100% {
              transform: scale(var(--wine-scale, 1)) rotate(0deg);
            }
          }
        `}
      </style>
    </div>
  );
}

export default RedWineLoader;
