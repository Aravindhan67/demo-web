import { useId } from 'react';
import professionalTeamImage from '../assets/professional_team.png';

type IllustrationProps = {
  className?: string;
};

function joinClassNames(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export function HomeHeroIllustration({ className }: IllustrationProps) {
  const id = useId().replace(/:/g, '');
  
  return (
    <svg
      className={joinClassNames('page-illustration', className)}
      viewBox="0 0 1100 800"
      width="1100"
      height="800"
      role="img"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Gradients for 3D Shapes */}
        <radialGradient id={`sphere-grad-1-${id}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="var(--orange-light)" />
          <stop offset="55%" stopColor="var(--orange)" />
          <stop offset="100%" stopColor="var(--orange-dark)" />
        </radialGradient>
        
        <radialGradient id={`sphere-grad-2-${id}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="var(--white)" />
          <stop offset="60%" stopColor="var(--orange-light)" />
          <stop offset="100%" stopColor="var(--orange)" />
        </radialGradient>

        <linearGradient id={`cylinder-body-grad-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--orange-light)" />
          <stop offset="40%" stopColor="var(--orange)" />
          <stop offset="100%" stopColor="var(--orange-dark)" />
        </linearGradient>

        <linearGradient id={`cylinder-top-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--orange-light)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--orange)" />
        </linearGradient>

        <linearGradient id={`block-top-grad-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--orange-light)" />
          <stop offset="100%" stopColor="var(--orange)" />
        </linearGradient>

        <linearGradient id={`block-left-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--orange)" />
          <stop offset="100%" stopColor="var(--orange-dark)" />
        </linearGradient>

        <linearGradient id={`block-right-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--orange-dark)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.8)" />
        </linearGradient>

        <linearGradient id={`torus-grad-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--orange)" />
          <stop offset="50%" stopColor="var(--orange-light)" />
          <stop offset="100%" stopColor="var(--orange-dark)" />
        </linearGradient>

        {/* Shadow filter */}
        <filter id={`shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="8" dy="24" stdDeviation="16" floodColor="#000000" floodOpacity="0.22" />
        </filter>

        <pattern id={`dot-grid-${id}`} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="16" cy="16" r="1.2" fill="var(--orange)" opacity="0.06" />
        </pattern>
      </defs>

      {/* Grid background */}
      <rect width="1100" height="800" rx="30" fill={`url(#dot-grid-${id})`} />

      {/* Floating 3D Shapes Group */}
      <g filter={`url(#shadow-${id})`}>
        {/* Torus / Ring in background */}
        <g transform="translate(300, 260) rotate(-25)">
          <ellipse cx="0" cy="0" rx="150" ry="70" stroke={`url(#torus-grad-${id})`} strokeWidth="44" fill="none" opacity="0.85" />
        </g>

        {/* Small floating spheres */}
        <circle cx="160" cy="180" r="28" fill={`url(#sphere-grad-2-${id})`} />
        <circle cx="860" cy="620" r="22" fill={`url(#sphere-grad-1-${id})`} />
        <circle cx="940" cy="200" r="32" fill={`url(#sphere-grad-2-${id})`} />

        {/* Diagonal Cylinder */}
        <g transform="translate(560, 400) rotate(35)">
          {/* Cylinder Body */}
          <rect x="-80" y="-220" width="160" height="440" fill={`url(#cylinder-body-grad-${id})`} />
          {/* Bottom Ellipse */}
          <ellipse cx="0" cy="220" rx="80" ry="30" fill={`url(#cylinder-body-grad-${id})`} />
          {/* Top Ellipse */}
          <ellipse cx="0" cy="-220" rx="80" ry="30" fill={`url(#cylinder-top-grad-${id})`} />
        </g>

        {/* Large Left Sphere */}
        <circle cx="280" cy="500" r="95" fill={`url(#sphere-grad-1-${id})`} />

        {/* Vertical cuboid / block */}
        <g transform="translate(740, 240)">
          {/* Top Face */}
          <path d="M 0,50 L 100,0 L 180,40 L 80,90 Z" fill={`url(#block-top-grad-${id})`} />
          {/* Left Face */}
          <path d="M 0,50 L 80,90 L 80,310 L 0,270 Z" fill={`url(#block-left-grad-${id})`} />
          {/* Right Face */}
          <path d="M 80,90 L 180,40 L 180,260 L 80,310 Z" fill={`url(#block-right-grad-${id})`} />
        </g>

        {/* Bottom Right Cone / Curved Shape */}
        <g transform="translate(850, 480) rotate(-15)">
          <path d="M -50,100 L 0,-60 L 50,100 Z" fill={`url(#cylinder-body-grad-${id})`} />
          <ellipse cx="0" cy="100" rx="50" ry="18" fill={`url(#cylinder-top-grad-${id})`} />
        </g>

        {/* Floating abstract small disks/decorations */}
        <ellipse cx="480" cy="160" rx="40" ry="15" fill="var(--orange-light)" opacity="0.6" transform="rotate(-10 480 160)" />
        <ellipse cx="220" cy="340" rx="30" ry="10" fill="var(--orange)" opacity="0.4" transform="rotate(15 220 340)" />
        <circle cx="680" cy="620" r="14" fill="var(--orange-light)" />
      </g>
    </svg>
  );
}

export function AboutHeroIllustration({ className }: IllustrationProps) {
  const id = useId().replace(/:/g, '');

  return (
    <svg
      className={joinClassNames('page-illustration', className)}
      viewBox="50 80 1100 750"
      width="1100"
      height="750"
      role="img"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--white)" />
          <stop offset="100%" stopColor="var(--card-bg)" />
        </linearGradient>
        
        <linearGradient id={`orange-glow-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--orange)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--orange)" stopOpacity="0" />
        </linearGradient>
        
        <linearGradient id={`card-dark-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--card-bg)" />
          <stop offset="100%" stopColor="var(--card-bg)" />
        </linearGradient>

        <linearGradient id={`card-light-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--orange)" stopOpacity="0.03" />
          <stop offset="100%" stopColor="var(--orange)" stopOpacity="0.01" />
        </linearGradient>
        
        <linearGradient id={`accent-orange-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--orange-light)" />
          <stop offset="100%" stopColor="var(--orange)" />
        </linearGradient>

        <filter id={`shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="15" floodColor="#000000" floodOpacity="0.12" />
        </filter>
        <filter id={`blur-glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <pattern id={`dot-grid-${id}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="1" fill="var(--orange)" opacity="0.06" />
        </pattern>
      </defs>


      <rect width="1200" height="900" rx="36" fill={`url(#dot-grid-${id})`} />
      
      {/* Background radial soft light */}
      <circle cx="600" cy="450" r="300" fill={`url(#orange-glow-${id})`} opacity="0.85" />
      <circle cx="950" cy="700" r="180" fill={`url(#orange-glow-${id})`} opacity="0.3" />

      {/* ── CENTRAL DATA & CREATIVE NODE WORK (Futuristic constellation) ── */}
      <g opacity="0.85" transform="translate(600, 450)">
        {/* Orbit paths */}
        <circle cx="0" cy="0" r="280" fill="none" stroke="rgba(var(--orange-rgb), 0.03)" strokeWidth="1" />
        <circle cx="0" cy="0" r="200" fill="none" stroke="rgba(var(--orange-rgb), 0.05)" strokeWidth="1.5" strokeDasharray="6 8" />
        <circle cx="0" cy="0" r="120" fill="none" stroke="rgba(var(--orange-rgb), 0.03)" strokeWidth="1" />
        
        {/* Connective node web */}
        <line x1="-120" y1="-70" x2="0" y2="-120" stroke="rgba(var(--orange-rgb), 0.18)" strokeWidth="1.5" />
        <line x1="0" y1="-120" x2="140" y2="-140" stroke="rgba(var(--orange-rgb), 0.08)" strokeWidth="1" />
        <line x1="140" y1="-140" x2="180" y2="80" stroke="rgba(var(--orange-rgb), 0.18)" strokeWidth="1.5" />
        <line x1="180" y1="80" x2="80" y2="180" stroke="rgba(var(--orange-rgb), 0.08)" strokeWidth="1" />
        <line x1="80" y1="180" x2="-120" y2="160" stroke="rgba(var(--orange-rgb), 0.18)" strokeWidth="1.5" />
        <line x1="-120" y1="160" x2="-120" y2="-70" stroke="rgba(var(--orange-rgb), 0.08)" strokeWidth="1" />
        
        {/* Lines connecting to center */}
        <line x1="0" y1="0" x2="-120" y2="-70" stroke="rgba(var(--orange-rgb), 0.12)" strokeWidth="1" strokeDasharray="3" />
        <line x1="0" y1="0" x2="140" y2="-140" stroke="rgba(var(--orange-rgb), 0.12)" strokeWidth="1" strokeDasharray="3" />
        <line x1="0" y1="0" x2="80" y2="180" stroke="rgba(var(--orange-rgb), 0.12)" strokeWidth="1" strokeDasharray="3" />
        
        {/* Center glowing sun */}
        <circle cx="0" cy="0" r="28" fill="rgba(var(--orange-rgb), 0.08)" />
        <circle cx="0" cy="0" r="14" fill={`url(#accent-orange-${id})`} filter={`url(#blur-glow-${id})`} />
        <circle cx="0" cy="0" r="6" fill="var(--card-bg)" />

        {/* Constellation Nodes */}
        <g transform="translate(-120 -70)">
          <circle cx="0" cy="0" r="9" fill="var(--card-bg)" stroke="var(--orange)" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="4" fill="var(--orange)" />
        </g>
        <g transform="translate(0 -120)">
          <circle cx="0" cy="0" r="7" fill="var(--card-bg)" stroke="rgba(var(--orange-rgb), 0.3)" strokeWidth="2" />
        </g>
        <g transform="translate(140 -140)">
          <circle cx="0" cy="0" r="10" fill="var(--card-bg)" stroke="var(--orange)" strokeWidth="2.5" filter={`url(#blur-glow-${id})`} />
          <circle cx="0" cy="0" r="4" fill="var(--orange)" />
        </g>
        <g transform="translate(180 80)">
          <circle cx="0" cy="0" r="8" fill="var(--card-bg)" stroke="rgba(var(--orange-rgb), 0.3)" strokeWidth="2" />
        </g>
        <g transform="translate(80 180)">
          <circle cx="0" cy="0" r="11" fill="var(--card-bg)" stroke="var(--orange)" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="5" fill="var(--orange)" />
        </g>
        <g transform="translate(-120 160)">
          <circle cx="0" cy="0" r="7" fill="var(--card-bg)" stroke="rgba(var(--orange-rgb), 0.3)" strokeWidth="2" />
        </g>
      </g>

      {/* ── FLOATING GLASS CARD 1: DESIGN SYSTEM (TOP LEFT) ── */}
      <g filter={`url(#shadow-${id})`} transform="translate(80 100)">
        <rect x="0" y="0" width="300" height="240" rx="20" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1.5" />
        <rect x="0" y="0" width="300" height="240" rx="20" fill={`url(#card-light-${id})`} />
        
        {/* Title */}
        <text x="24" y="38" fill="var(--black)" fontSize="14" fontWeight="800" letterSpacing="0.05em">DESIGN SYSTEMS</text>
        
        {/* Color swatches */}
        <g transform="translate(24, 60)">
          <rect x="0" y="0" width="48" height="48" rx="8" fill="var(--orange)" />
          <rect x="60" y="0" width="48" height="48" rx="8" fill="rgba(var(--orange-rgb), 0.6)" />
          <rect x="120" y="0" width="48" height="48" rx="8" fill="rgba(var(--orange-rgb), 0.3)" stroke="var(--card-border)" />
          <rect x="180" y="0" width="48" height="48" rx="8" fill="rgba(var(--orange-rgb), 0.1)" stroke="var(--card-border)" />
        </g>

        {/* UI element previews */}
        <g transform="translate(24, 134)">
          <rect x="0" y="0" width="252" height="36" rx="10" fill="rgba(var(--orange-rgb), 0.02)" stroke="var(--card-border)" strokeWidth="1" />
          <rect x="14" y="13" width="70" height="10" rx="5" fill="var(--orange)" />
          <rect x="200" y="11" width="38" height="14" rx="7" fill="rgba(var(--orange-rgb), 0.08)" />
          <circle cx="219" cy="18" r="3" fill="var(--orange)" />
        </g>

        <g transform="translate(24, 182)">
          <rect x="0" y="0" width="252" height="36" rx="10" fill="rgba(var(--orange-rgb), 0.02)" stroke="var(--card-border)" strokeWidth="1" />
          <circle cx="22" cy="18" r="8" fill="var(--black)" opacity="0.1" />
          <rect x="42" y="13" width="90" height="10" rx="5" fill="var(--black)" opacity="0.6" />
        </g>
      </g>

      {/* ── FLOATING GLASS CARD 2: ANALYTICS (TOP RIGHT) ── */}
      <g filter={`url(#shadow-${id})`} transform="translate(820 120)">
        <rect x="0" y="0" width="300" height="240" rx="20" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1.5" />
        <rect x="0" y="0" width="300" height="240" rx="20" fill={`url(#card-light-${id})`} />
        
        <text x="24" y="38" fill="var(--black)" fontSize="14" fontWeight="800" letterSpacing="0.05em">ANALYTICS & TECH</text>
        
        {/* Simple Bar charts */}
        <g transform="translate(24 70)">
          <text x="0" y="14" fill="var(--gray-600)" fontSize="10" fontWeight="700">UI/UX</text>
          <rect x="44" y="5" width="208" height="8" rx="4" fill="rgba(var(--orange-rgb), 0.06)" />
          <rect x="44" y="5" width="180" height="8" rx="4" fill="var(--orange)" />
        </g>

        <g transform="translate(24 115)">
          <text x="0" y="14" fill="var(--gray-600)" fontSize="10" fontWeight="700">DEV</text>
          <rect x="44" y="5" width="208" height="8" rx="4" fill="rgba(var(--orange-rgb), 0.06)" />
          <rect x="44" y="5" width="145" height="8" rx="4" fill="var(--orange)" />
        </g>

        <g transform="translate(24 160)">
          <text x="0" y="14" fill="var(--gray-600)" fontSize="10" fontWeight="700">SEO</text>
          <rect x="44" y="5" width="208" height="8" rx="4" fill="rgba(var(--orange-rgb), 0.06)" />
          <rect x="44" y="5" width="195" height="8" rx="4" fill="var(--orange)" />
        </g>
      </g>

      {/* ── FLOATING GLASS CARD 3: CODE INTEGRATION (BOTTOM LEFT) ── */}
      <g filter={`url(#shadow-${id})`} transform="translate(120 460)">
        <rect x="0" y="0" width="320" height="280" rx="22" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1.5" />
        <rect x="0" y="0" width="320" height="280" rx="22" fill={`url(#card-light-${id})`} />

        <text x="24" y="38" fill="var(--black)" fontSize="14" fontWeight="800" letterSpacing="0.05em">CODE INTEGRATION</text>
        
        {/* Mock HTML/React code blocks */}
        <g transform="translate(24 65)" fontFamily="monospace" fontSize="11" fontWeight="600">
          <text x="0" y="15" fill="var(--orange)">&lt;<tspan fill="rgba(var(--orange-rgb), 0.7)">CreativeStudio</tspan>&gt;</text>
          
          <text x="20" y="40" fill="var(--orange)">const<tspan fill="var(--black)"> team</tspan> = <tspan fill="rgba(var(--orange-rgb), 0.6)">&apos;youth&apos;</tspan>;</text>
          <text x="20" y="65" fill="var(--orange)">const<tspan fill="var(--black)"> goal</tspan> = <tspan fill="rgba(var(--orange-rgb), 0.6)">&apos;impact&apos;</tspan>;</text>
          
          <text x="20" y="95" fill="var(--black)">dispatch(&#123;</text>
          <text x="40" y="120" fill="var(--orange)">type:<tspan fill="rgba(var(--orange-rgb), 0.6)"> &apos;INNOVATE&apos;</tspan>,</text>
          <text x="40" y="145" fill="var(--orange)">payload: <tspan fill="var(--black)">team</tspan></text>
          <text x="20" y="170" fill="var(--black)">&#125;);</text>
          
          <text x="0" y="195" fill="var(--orange)">&lt;/<tspan fill="rgba(var(--orange-rgb), 0.7)">CreativeStudio</tspan>&gt;</text>
        </g>
        
        <circle cx="280" cy="240" r="14" fill="var(--orange)" />
        <path d="M 275 240 L 285 240 M 280 235 L 280 245" fill="none" stroke="var(--card-bg)" strokeWidth="2.5" />
      </g>

      {/* ── FLOATING GLASS CARD 4: PROCESS FLOW (BOTTOM RIGHT) ── */}
      <g filter={`url(#shadow-${id})`} transform="translate(760 480)">
        <rect x="0" y="0" width="360" height="260" rx="22" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1.5" />
        <rect x="0" y="0" width="360" height="260" rx="22" fill={`url(#card-light-${id})`} />

        <text x="24" y="38" fill="var(--black)" fontSize="14" fontWeight="800" letterSpacing="0.05em">USER JOURNEY MAP</text>

        {/* Dotted connection pathway */}
        <path d="M 50 140 Q 120 70, 180 140 T 310 140" fill="none" stroke="rgba(var(--orange-rgb), 0.08)" strokeWidth="4" strokeDasharray="4 6" />
        <path d="M 50 140 Q 120 70, 180 140 T 310 140" fill="none" stroke="var(--orange)" strokeWidth="1.5" />
        
        {/* Connection Milestones */}
        <g transform="translate(50 140)">
          <circle cx="0" cy="0" r="16" fill="var(--card-bg)" stroke="var(--orange)" strokeWidth="2" />
          <circle cx="0" cy="0" r="6" fill="var(--orange)" />
          <rect x="-30" y="24" width="60" height="8" rx="4" fill="var(--black)" opacity="0.1" />
        </g>

        <g transform="translate(180 140)">
          <circle cx="0" cy="0" r="16" fill="var(--card-bg)" stroke="rgba(var(--orange-rgb), 0.3)" strokeWidth="2" />
          <circle cx="0" cy="0" r="6" fill="rgba(var(--orange-rgb), 0.4)" />
          <rect x="-30" y="24" width="60" height="8" rx="4" fill="var(--black)" opacity="0.05" />
        </g>

        <g transform="translate(310 140)">
          <circle cx="0" cy="0" r="18" fill="var(--card-bg)" stroke="var(--orange)" strokeWidth="2" filter={`url(#blur-glow-${id})`} />
          <circle cx="0" cy="0" r="6" fill="var(--orange)" />
          <rect x="-30" y="24" width="60" height="8" rx="4" fill="var(--orange)" />
        </g>
      </g>
    </svg>
  );
}

export function CultureIllustration({ className }: IllustrationProps) {
  const id = useId().replace(/:/g, '');

  return (
    <svg
      className={joinClassNames('page-illustration', className)}
      viewBox="70 80 1060 770"
      width="1060"
      height="770"
      role="img"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Background Gradients */}
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--white)" />
          <stop offset="100%" stopColor="var(--card-bg)" />
        </linearGradient>
        
        <linearGradient id={`accent-orange-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--orange-light)" />
          <stop offset="100%" stopColor="var(--orange)" />
        </linearGradient>
        
        <linearGradient id={`panel-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--card-bg)" />
          <stop offset="100%" stopColor="var(--card-bg)" />
        </linearGradient>

        <filter id={`shadow-${id}`} x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="18" stdDeviation="15" floodColor="#000000" floodOpacity="0.1" />
        </filter>
        
        <pattern id={`dot-grid-${id}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="1.2" fill="var(--orange)" opacity="0.06" />
        </pattern>
      </defs>


      <rect width="1200" height="900" rx="36" fill={`url(#dot-grid-${id})`} />
      
      {/* Background circles */}
      <circle cx="150" cy="150" r="140" fill="var(--white)" opacity="0.6" />
      <circle cx="1020" cy="720" r="200" fill="var(--orange)" opacity="0.04" />

      {/* ── LEFT PANEL: IDEAS & CREATIVE MOODBOARD ── */}
      <g filter={`url(#shadow-${id})`} transform="translate(100 120)">
        <rect x="0" y="0" width="460" height="660" rx="26" fill={`url(#panel-grad-${id})`} stroke="var(--card-border)" strokeWidth="1.5" />
        
        {/* Header */}
        <rect x="0" y="0" width="460" height="64" rx="26" fill="rgba(var(--orange-rgb), 0.05)" opacity="0.7" />
        <rect x="28" y="22" width="130" height="20" rx="10" fill="var(--orange)" opacity="0.1" />
        <circle cx="410" cy="32" r="12" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1" />
        
        {/* Board content - Mock sticky notes & polaroids */}
        {/* Notes 1 */}
        <g transform="translate(28 90)">
          <rect x="0" y="0" width="180" height="160" rx="14" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1" />
          <rect x="18" y="18" width="144" height="90" rx="8" fill="rgba(var(--orange-rgb), 0.03)" />
          {/* Mock drawings */}
          <path d="M 40 76 Q 80 40, 110 76 T 140 60" fill="none" stroke="var(--orange)" strokeWidth="2.5" />
          <circle cx="80" cy="50" r="4" fill="var(--orange)" />
          <circle cx="110" cy="76" r="3" fill="var(--orange)" />
          
          <rect x="18" y="124" width="90" height="10" rx="5" fill="var(--black)" opacity="0.7" />
          <rect x="18" y="140" width="55" height="8" rx="4" fill="var(--black)" opacity="0.3" />
        </g>
        
        {/* Notes 2 (Sleek card note) */}
        <g transform="translate(236 90)">
          <rect x="0" y="0" width="196" height="180" rx="14" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1" />
          <path d="M 0 0 L 196 0 L 196 150 L 166 180 L 0 180 Z" fill="var(--card-bg)" />
          <path d="M 166 150 L 196 150 L 166 180 Z" fill="rgba(var(--orange-rgb), 0.05)" stroke="var(--card-border)" strokeWidth="1" />
          <text x="24" y="40" fill="var(--orange)" fontSize="14" fontWeight="800">CULTURE</text>
          <rect x="24" y="65" width="148" height="8" rx="4" fill="var(--orange)" opacity="0.2" />
          <rect x="24" y="85" width="148" height="8" rx="4" fill="var(--orange)" opacity="0.2" />
          <rect x="24" y="105" width="110" height="8" rx="4" fill="var(--orange)" opacity="0.2" />
          
          <rect x="24" y="142" width="60" height="16" rx="8" fill="var(--orange)" />
          <text x="54" y="154" fill="var(--card-bg)" fontSize="9" fontWeight="800" textAnchor="middle">CORE</text>
        </g>

        {/* Wireframe layouts mockup */}
        <g transform="translate(28 280)">
          <rect x="0" y="0" width="404" height="240" rx="16" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1.5" />
          <rect x="18" y="18" width="140" height="204" rx="10" fill="rgba(var(--orange-rgb), 0.02)" stroke="var(--card-border)" strokeWidth="1" />
          <circle cx="88" cy="70" r="22" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1" />
          <rect x="38" y="115" width="100" height="12" rx="6" fill="var(--black)" opacity="0.5" />
          <rect x="38" y="140" width="70" height="8" rx="4" fill="var(--black)" opacity="0.3" />
          <rect x="38" y="174" width="100" height="26" rx="13" fill="var(--orange)" />

          {/* Right section inside layout mockup */}
          <rect x="178" y="18" width="208" height="46" rx="10" fill="rgba(var(--orange-rgb), 0.02)" />
          <rect x="178" y="76" width="208" height="46" rx="10" fill="rgba(var(--orange-rgb), 0.02)" />
          <rect x="178" y="134" width="208" height="46" rx="10" fill="rgba(var(--orange-rgb), 0.02)" />
          <rect x="178" y="192" width="208" height="30" rx="10" fill="rgba(var(--orange-rgb), 0.02)" />
        </g>
        
        {/* Floating communication tags */}
        <g transform="translate(28 550)">
          <rect x="0" y="0" width="120" height="36" rx="18" fill="rgba(var(--orange-rgb), 0.04)" stroke="rgba(var(--orange-rgb), 0.1)" strokeWidth="1" />
          <text x="60" y="22" fill="var(--orange)" fontSize="12" fontWeight="700" textAnchor="middle">#Innovation</text>

          <rect x="132" y="0" width="110" height="36" rx="18" fill="rgba(var(--orange-rgb), 0.04)" stroke="rgba(var(--orange-rgb), 0.1)" strokeWidth="1" />
          <text x="187" y="22" fill="var(--orange)" fontSize="12" fontWeight="700" textAnchor="middle">#UX-Design</text>
          
          <rect x="254" y="0" width="122" height="36" rx="18" fill="rgba(var(--orange-rgb), 0.04)" stroke="rgba(var(--orange-rgb), 0.1)" strokeWidth="1" />
          <text x="315" y="22" fill="var(--orange)" fontSize="12" fontWeight="700" textAnchor="middle">#YouthPower</text>
        </g>
      </g>

      {/* ── RIGHT PANEL: DIGITAL WORKSHOP (TOP RIGHT) ── */}
      <g filter={`url(#shadow-${id})`} transform="translate(600 120)">
        <rect x="0" y="0" width="500" height="380" rx="26" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1.5" />
        
        {/* Stat visualization */}
        <rect x="28" y="32" width="444" height="84" rx="18" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1" />
        <circle cx="70" cy="74" r="26" fill="rgba(var(--orange-rgb), 0.05)" />
        <path d="M 60 74 L 67 81 L 80 68" fill="none" stroke="var(--orange)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        
        <rect x="114" y="52" width="200" height="16" rx="8" fill="var(--black)" opacity="0.8" />
        <rect x="114" y="78" width="130" height="10" rx="5" fill="var(--black)" opacity="0.3" />

        {/* Abstract vector graphics network */}
        <g transform="translate(28, 148)">
          <rect x="0" y="0" width="444" height="200" rx="18" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1" />
          
          {/* Waves graph */}
          <path d="M 28 150 Q 100 80, 180 130 T 320 60 T 416 110" fill="none" stroke="rgba(var(--orange-rgb), 0.04)" strokeWidth="8" strokeLinecap="round" />
          <path d="M 28 150 Q 100 80, 180 130 T 320 60 T 416 110" fill="none" stroke="var(--orange)" strokeWidth="3.5" strokeLinecap="round" />
          
          {/* Flow connections */}
          <circle cx="180" cy="130" r="10" fill="var(--card-bg)" stroke="var(--orange)" strokeWidth="2.5" />
          <circle cx="180" cy="130" r="4" fill="var(--orange)" />
          <circle cx="320" cy="60" r="10" fill="var(--card-bg)" stroke="var(--orange)" strokeWidth="2.5" />
          <circle cx="320" cy="60" r="4" fill="var(--orange)" />
        </g>
      </g>

      {/* ── BOTTOM PANEL: WORKSPACE HIGHLIGHTS (BOTTOM RIGHT) ── */}
      <g filter={`url(#shadow-${id})`} transform="translate(600 540)">
        <rect x="0" y="0" width="500" height="240" rx="26" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1.5" />
        
        {/* Dark theme glass indicators */}
        <circle cx="68" cy="70" r="28" fill="rgba(var(--orange-rgb), 0.08)" />
        {/* Simple outline leaf / energy icon */}
        <path d="M 68 52 C 78 52, 86 60, 86 70 C 86 80, 78 88, 68 88 C 58 88, 50 80, 50 70 Z M 50 70 C 50 60, 58 52, 68 52" fill="none" stroke="var(--orange)" strokeWidth="2.5" />
        
        <rect x="116" y="52" width="220" height="16" rx="8" fill="var(--black)" opacity="0.8" />
        <rect x="116" y="78" width="310" height="10" rx="5" fill="var(--black)" opacity="0.45" />
        <rect x="116" y="98" width="240" height="10" rx="5" fill="var(--black)" opacity="0.45" />

        {/* Minimal creative grid inside panel */}
        <g transform="translate(28 140)">
          <rect x="0" y="0" width="134" height="72" rx="14" fill="rgba(var(--orange-rgb), 0.02)" stroke="var(--card-border)" strokeWidth="1" />
          <rect x="14" y="22" width="106" height="10" rx="5" fill="var(--black)" opacity="0.7" />
          <rect x="14" y="42" width="60" height="8" rx="4" fill="var(--orange)" />
        </g>
        
        <g transform="translate(182 140)">
          <rect x="0" y="0" width="134" height="72" rx="14" fill="rgba(var(--orange-rgb), 0.02)" stroke="var(--card-border)" strokeWidth="1" />
          <rect x="14" y="22" width="106" height="10" rx="5" fill="var(--black)" opacity="0.7" />
          <rect x="14" y="42" width="75" height="8" rx="4" fill="var(--orange)" />
        </g>
        
        <g transform="translate(338 140)">
          <rect x="0" y="0" width="134" height="72" rx="14" fill="rgba(var(--orange-rgb), 0.02)" stroke="var(--card-border)" strokeWidth="1" />
          <rect x="14" y="22" width="106" height="10" rx="5" fill="var(--black)" opacity="0.7" />
          <rect x="14" y="42" width="50" height="8" rx="4" fill="var(--orange)" />
        </g>
      </g>
    </svg>
  );
}

export function TeamIllustration({ className }: IllustrationProps) {
  return (
    <img 
      src={professionalTeamImage} 
      alt="Professional Team collaborating" 
      className={className} 
      style={{ maxWidth: '100%', height: 'auto', display: 'block' }} 
    />
  );
}
