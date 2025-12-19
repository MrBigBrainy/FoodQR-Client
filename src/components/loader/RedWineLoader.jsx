import React from 'react';

function RedWineLoader({ scale = 1 }) {
  return (
    <div
      className="flex items-center justify-center p-4"
      style={{ transform: `scale(${scale})` }}
    >
      <svg
        width="100"
        height="160"
        viewBox="0 0 100 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <clipPath id="bowlClip">
            <path d="M10 10 H90 V50 C90 75 70 95 50 95 C30 95 10 75 10 50 V10 Z" />
          </clipPath>
        </defs>

        {/* Liquid */}
        <g clipPath="url(#bowlClip)">
          <rect
            x="0"
            y="100"
            width="100"
            height="100"
            fill="#c10007"
            className="wine-liquid"
          />
          {/* Bubbles/Foam effect (optional, keeping it simple for now) */}
        </g>

        {/* Glass Bowl Outline */}
        <path
          d="M10 10 H90 V50 C90 75 70 95 50 95 C30 95 10 75 10 50 V10 Z"
          stroke="black"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Stem */}
        <line
          x1="50"
          y1="95"
          x2="50"
          y2="145"
          stroke="black"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Base */}
        <line
          x1="25"
          y1="145"
          x2="75"
          y2="145"
          stroke="black"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>

      <style>
        {`
          .wine-liquid {
            animation: fillUp 2s ease-in-out infinite alternate;
            transform-origin: bottom;
          }

          @keyframes fillUp {
            0% {
              y: 100;
              height: 0;
            }
            100% {
              y: 30;
              height: 70;
            }
          }
        `}
      </style>
    </div>
  );
}

export default RedWineLoader;

