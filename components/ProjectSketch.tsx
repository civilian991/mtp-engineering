'use client'

import React from 'react'

interface ProjectSketchProps {
  variant: number // 1-20+ for different unique sketches
  className?: string
}

export default function ProjectSketch({ variant, className = '' }: ProjectSketchProps) {
  const sketches: { [key: number]: React.ReactElement } = {
    1: ( // Modern Tower
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect x="160" y="50" width="80" height="200" fill="url(#grad1)" stroke="#C9A646" strokeWidth="1.5" opacity="0.7"/>
        {[...Array(8)].map((_, i) => (
          <g key={i}>
            <rect x="170" y={60 + i * 24} width="25" height="18" fill="none" stroke="#C9A646" strokeWidth="0.6" opacity="0.5"/>
            <rect x="205" y={60 + i * 24} width="25" height="18" fill="none" stroke="#C9A646" strokeWidth="0.6" opacity="0.5"/>
          </g>
        ))}
        <line x1="180" y1="50" x2="220" y2="30" stroke="#C9A646" strokeWidth="1" opacity="0.6"/>
      </svg>
    ),

    2: ( // Hospital Cross
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <rect x="100" y="100" width="200" height="150" fill="url(#grad2)" stroke="#C9A646" strokeWidth="1.5" opacity="0.7"/>
        <rect x="185" y="60" width="30" height="15" fill="#C9A646" opacity="0.7"/>
        <rect x="195" y="50" width="10" height="35" fill="#C9A646" opacity="0.7"/>
        {[...Array(4)].map((_, row) =>
          [...Array(5)].map((_, col) => (
            <rect key={`${row}-${col}`} x={115 + col * 32} y={110 + row * 32} width="18" height="24" fill="none" stroke="#C9A646" strokeWidth="0.7" opacity="0.4"/>
          ))
        )}
      </svg>
    ),

    3: ( // Bridge Arc
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path d="M 60 200 Q 200 80 340 200" fill="none" stroke="#C9A646" strokeWidth="2" opacity="0.7"/>
        <path d="M 60 210 Q 200 90 340 210" fill="url(#grad3)"/>
        {[80, 120, 160, 200, 240, 280, 320].map((x) => (
          <line key={x} x1={x} y1={200 - Math.abs(200 - x) * 0.8} x2={x} y2="200" stroke="#C9A646" strokeWidth="0.5" opacity="0.4"/>
        ))}
        <rect x="100" y="200" width="12" height="60" fill="#C9A646" opacity="0.4"/>
        <rect x="288" y="200" width="12" height="60" fill="#C9A646" opacity="0.4"/>
      </svg>
    ),

    4: ( // Dome Building
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="90" rx="70" ry="35" fill="url(#grad4)" stroke="#C9A646" strokeWidth="1.5" opacity="0.7"/>
        <rect x="110" y="90" width="180" height="160" fill="url(#grad4)" stroke="#C9A646" strokeWidth="1.5" opacity="0.7"/>
        {[130, 170, 210, 250, 270].map((x) => (
          <rect key={x} x={x} y="110" width="10" height="140" fill="none" stroke="#C9A646" strokeWidth="1" opacity="0.5"/>
        ))}
      </svg>
    ),

    5: ( // Factory Smoke
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect x="80" y="150" width="90" height="100" fill="url(#grad5)" stroke="#C9A646" strokeWidth="1.5" opacity="0.7"/>
        <rect x="190" y="120" width="70" height="130" fill="url(#grad5)" stroke="#C9A646" strokeWidth="1.5" opacity="0.7"/>
        <rect x="120" y="80" width="18" height="70" fill="none" stroke="#C9A646" strokeWidth="1.2" opacity="0.6"/>
        <rect x="215" y="60" width="18" height="60" fill="none" stroke="#C9A646" strokeWidth="1.2" opacity="0.6"/>
        <path d="M 129 75 Q 120 60 128 45 Q 118 35 128 20" fill="none" stroke="#C9A646" strokeWidth="0.8" opacity="0.3"/>
        <path d="M 224 55 Q 215 40 223 25 Q 213 15 223 5" fill="none" stroke="#C9A646" strokeWidth="0.8" opacity="0.3"/>
      </svg>
    ),

    6: ( // Glass Facade
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <rect x="130" y="70" width="140" height="180" fill="url(#grad6)" stroke="#C9A646" strokeWidth="1.5" opacity="0.7"/>
        {[...Array(6)].map((_, row) =>
          [...Array(2)].map((_, col) => (
            <rect key={`${row}-${col}`} x={145 + col * 60} y={85 + row * 28} width="45" height="22" fill="none" stroke="#C9A646" strokeWidth="0.6" opacity="0.5"/>
          ))
        )}
        <rect x="170" y="225" width="60" height="25" fill="#C9A646" opacity="0.3"/>
        <polygon points="120,225 280,225 270,215 130,215" fill="none" stroke="#C9A646" strokeWidth="1" opacity="0.5"/>
      </svg>
    ),

    7: ( // Residential Tower
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad7" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.07" />
          </linearGradient>
        </defs>
        <rect x="150" y="60" width="100" height="190" fill="url(#grad7)" stroke="#C9A646" strokeWidth="1.5" opacity="0.7"/>
        {[...Array(7)].map((_, row) =>
          [...Array(2)].map((_, col) => (
            <rect key={`${row}-${col}`} x={160 + col * 45} y={75 + row * 25} width="35" height="18" fill="none" stroke="#C9A646" strokeWidth="0.7" opacity="0.5"/>
          ))
        )}
        <rect x="185" y="235" width="30" height="15" fill="#C9A646" opacity="0.4"/>
      </svg>
    ),

    8: ( // Airport Terminal
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad8" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <polygon points="70,170 200,100 330,170 330,240 70,240" fill="url(#grad8)" stroke="#C9A646" strokeWidth="1.5" opacity="0.7"/>
        <rect x="290" y="110" width="25" height="70" fill="none" stroke="#C9A646" strokeWidth="1.2" opacity="0.6"/>
        <rect x="282" y="95" width="41" height="15" fill="#C9A646" opacity="0.5"/>
        {[...Array(5)].map((_, i) => (
          <rect key={i} x={90 + i * 45} y={185} width="28" height="35" fill="none" stroke="#C9A646" strokeWidth="0.7" opacity="0.4"/>
        ))}
      </svg>
    ),

    9: ( // Construction Crane
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad9" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <rect x="100" y="180" width="180" height="70" fill="url(#grad9)" stroke="#C9A646" strokeWidth="1.5" opacity="0.6"/>
        <rect x="190" y="100" width="8" height="80" fill="none" stroke="#C9A646" strokeWidth="1.2" opacity="0.7"/>
        <line x1="150" y1="100" x2="310" y2="100" stroke="#C9A646" strokeWidth="1.5" opacity="0.7"/>
        <line x1="194" y1="100" x2="170" y2="130" stroke="#C9A646" strokeWidth="1" opacity="0.6"/>
        <rect x="165" y="130" width="10" height="15" fill="none" stroke="#C9A646" strokeWidth="0.8" opacity="0.5"/>
        {[...Array(3)].map((_, i) => (
          <circle key={i} cx={240 + i * 25} cy="100" r="3" fill="none" stroke="#C9A646" strokeWidth="0.6" opacity="0.4"/>
        ))}
      </svg>
    ),

    10: ( // Pyramid Structure
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad10" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <polygon points="200,60 90,240 310,240" fill="url(#grad10)" stroke="#C9A646" strokeWidth="1.5" opacity="0.7"/>
        {[...Array(6)].map((_, i) => (
          <line key={i} x1={200} y1={60 + i * 30} x2={110 + i * 20} y2={240} stroke="#C9A646" strokeWidth="0.5" opacity="0.3"/>
        ))}
        {[...Array(6)].map((_, i) => (
          <line key={i} x1={200} y1={60 + i * 30} x2={290 - i * 20} y2={240} stroke="#C9A646" strokeWidth="0.5" opacity="0.3"/>
        ))}
      </svg>
    ),

    11: ( // Arch Gateway
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad11" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path d="M 80 250 L 80 100 Q 200 30 320 100 L 320 250" fill="url(#grad11)" stroke="#C9A646" strokeWidth="1.5" opacity="0.7"/>
        <path d="M 130 250 L 130 150 Q 200 100 270 150 L 270 250" fill="none" stroke="#C9A646" strokeWidth="1.2" opacity="0.6"/>
        {[...Array(8)].map((_, i) => (
          <line key={i} x1={90 + i * 28} y1="250" x2={90 + i * 28} y2="240" stroke="#C9A646" strokeWidth="0.8" opacity="0.4"/>
        ))}
      </svg>
    ),

    12: ( // Water Tower
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad12" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="100" rx="50" ry="20" fill="url(#grad12)" stroke="#C9A646" strokeWidth="1.2" opacity="0.7"/>
        <rect x="175" y="100" width="50" height="60" fill="url(#grad12)" stroke="#C9A646" strokeWidth="1.2" opacity="0.7"/>
        <ellipse cx="200" cy="160" rx="50" ry="20" fill="none" stroke="#C9A646" strokeWidth="1.2" opacity="0.7"/>
        <line x1="185" y1="160" x2="175" y2="250" stroke="#C9A646" strokeWidth="2" opacity="0.6"/>
        <line x1="215" y1="160" x2="225" y2="250" stroke="#C9A646" strokeWidth="2" opacity="0.6"/>
        <line x1="175" y1="250" x2="225" y2="250" stroke="#C9A646" strokeWidth="2" opacity="0.6"/>
      </svg>
    ),

    13: ( // Wind Turbine
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad13" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <line x1="200" y1="250" x2="200" y2="100" stroke="#C9A646" strokeWidth="2.5" opacity="0.7"/>
        <circle cx="200" cy="100" r="8" fill="#C9A646" opacity="0.6"/>
        <ellipse cx="200" cy="60" rx="8" ry="40" fill="url(#grad13)" stroke="#C9A646" strokeWidth="0.8" opacity="0.7" transform="rotate(0 200 100)"/>
        <ellipse cx="200" cy="60" rx="8" ry="40" fill="url(#grad13)" stroke="#C9A646" strokeWidth="0.8" opacity="0.7" transform="rotate(120 200 100)"/>
        <ellipse cx="200" cy="60" rx="8" ry="40" fill="url(#grad13)" stroke="#C9A646" strokeWidth="0.8" opacity="0.7" transform="rotate(240 200 100)"/>
        <rect x="190" y="250" width="20" height="5" fill="#C9A646" opacity="0.5"/>
      </svg>
    ),

    14: ( // Stadium Bowl
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad14" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.07" />
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="200" rx="120" ry="50" fill="url(#grad14)" stroke="#C9A646" strokeWidth="1.5" opacity="0.7"/>
        <path d="M 80 200 L 100 150 L 300 150 L 320 200" fill="none" stroke="#C9A646" strokeWidth="1.2" opacity="0.6"/>
        {[...Array(12)].map((_, i) => (
          <line key={i} x1={90 + i * 20} y1={200 - i * 3} x2={90 + i * 20} y2={150} stroke="#C9A646" strokeWidth="0.6" opacity="0.4"/>
        ))}
        <rect x="180" y="130" width="40" height="20" fill="none" stroke="#C9A646" strokeWidth="1" opacity="0.5"/>
      </svg>
    ),

    15: ( // Solar Panels
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad15" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {[...Array(3)].map((_, row) =>
          [...Array(4)].map((_, col) => (
            <g key={`${row}-${col}`}>
              <rect
                x={90 + col * 55}
                y={120 + row * 50}
                width="45"
                height="35"
                fill="url(#grad15)"
                stroke="#C9A646"
                strokeWidth="1"
                opacity="0.6"
                transform={`rotate(-15 ${112.5 + col * 55} ${137.5 + row * 50})`}
              />
              <line
                x1={90 + col * 55}
                y1={137.5 + row * 50}
                x2={135 + col * 55}
                y2={137.5 + row * 50}
                stroke="#C9A646"
                strokeWidth="0.5"
                opacity="0.4"
                transform={`rotate(-15 ${112.5 + col * 55} ${137.5 + row * 50})`}
              />
            </g>
          ))
        )}
      </svg>
    ),

    16: ( // Lighthouse
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad16" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <polygon points="180,250 170,200 170,80 230,80 230,200 220,250" fill="url(#grad16)" stroke="#C9A646" strokeWidth="1.5" opacity="0.7"/>
        <rect x="165" y="70" width="70" height="15" fill="#C9A646" opacity="0.6"/>
        {[...Array(5)].map((_, i) => (
          <line key={i} x1="170" y1={100 + i * 30} x2="230" y2={100 + i * 30} stroke="#C9A646" strokeWidth="0.8" opacity="0.4"/>
        ))}
        <circle cx="200" cy="62" r="8" fill="none" stroke="#C9A646" strokeWidth="1.2" opacity="0.7"/>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line key={angle} x1="200" y1="62" x2={200 + 15 * Math.cos(angle * Math.PI / 180)} y2={62 + 15 * Math.sin(angle * Math.PI / 180)} stroke="#C9A646" strokeWidth="0.4" opacity="0.3"/>
        ))}
      </svg>
    ),

    17: ( // Suspension Cables
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad17" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect x="90" y="50" width="12" height="200" fill="none" stroke="#C9A646" strokeWidth="1.5" opacity="0.7"/>
        <rect x="298" y="50" width="12" height="200" fill="none" stroke="#C9A646" strokeWidth="1.5" opacity="0.7"/>
        <path d="M 96 70 Q 200 150 304 70" fill="none" stroke="#C9A646" strokeWidth="1.2" opacity="0.6"/>
        {[...Array(15)].map((_, i) => {
          const x = 110 + i * 13
          const y = 70 + Math.pow((x - 200) / 104, 2) * 80
          return <line key={i} x1={x} y1={y} x2={x} y2="200" stroke="#C9A646" strokeWidth="0.5" opacity="0.4"/>
        })}
        <rect x="70" y="200" width="260" height="8" fill="url(#grad17)" stroke="#C9A646" strokeWidth="1" opacity="0.6"/>
      </svg>
    ),

    18: ( // Minaret
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad18" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.07" />
          </linearGradient>
        </defs>
        <rect x="175" y="100" width="50" height="150" fill="url(#grad18)" stroke="#C9A646" strokeWidth="1.5" opacity="0.7"/>
        <polygon points="200,40 180,70 220,70" fill="url(#grad18)" stroke="#C9A646" strokeWidth="1.2" opacity="0.7"/>
        <rect x="170" y="70" width="60" height="10" fill="#C9A646" opacity="0.5"/>
        <rect x="170" y="90" width="60" height="10" fill="#C9A646" opacity="0.5"/>
        {[...Array(3)].map((_, i) => (
          <circle key={i} cx="200" cy={120 + i * 40} r="15" fill="none" stroke="#C9A646" strokeWidth="0.8" opacity="0.5"/>
        ))}
        <polygon points="160,250 175,100 225,100 240,250" fill="none" stroke="#C9A646" strokeWidth="1" opacity="0.4"/>
      </svg>
    ),

    19: ( // Data Center
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad19" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect x="100" y="100" width="200" height="150" fill="url(#grad19)" stroke="#C9A646" strokeWidth="1.5" opacity="0.7"/>
        {[...Array(5)].map((_, i) => (
          <g key={i}>
            <rect x="120" y={120 + i * 25} width="160" height="18" fill="none" stroke="#C9A646" strokeWidth="0.8" opacity="0.5"/>
            {[...Array(8)].map((_, j) => (
              <circle key={j} cx={130 + j * 20} cy={129 + i * 25} r="2" fill="#C9A646" opacity="0.4"/>
            ))}
          </g>
        ))}
        {[...Array(4)].map((_, i) => (
          <rect key={i} x={110 + i * 45} y="80" width="35" height="15" fill="none" stroke="#C9A646" strokeWidth="0.8" opacity="0.5"/>
        ))}
      </svg>
    ),

    20: ( // Antenna Array
      <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad20" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A646" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#C9A646" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        {[...Array(5)].map((_, i) => (
          <g key={i}>
            <line x1={110 + i * 40} y1="250" x2={110 + i * 40} y2={150 - i * 15} stroke="#C9A646" strokeWidth="1.5" opacity="0.6"/>
            <circle cx={110 + i * 40} cy={150 - i * 15} r="6" fill="#C9A646" opacity="0.5"/>
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <line
                key={angle}
                x1={110 + i * 40}
                y1={150 - i * 15}
                x2={110 + i * 40 + 12 * Math.cos(angle * Math.PI / 180)}
                y2={150 - i * 15 + 12 * Math.sin(angle * Math.PI / 180)}
                stroke="#C9A646"
                strokeWidth="0.5"
                opacity="0.4"
              />
            ))}
          </g>
        ))}
        <rect x="80" y="250" width="240" height="5" fill="url(#grad20)" stroke="#C9A646" strokeWidth="1" opacity="0.6"/>
      </svg>
    ),
  }

  return sketches[variant] || sketches[1]
}
