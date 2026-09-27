import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function SpaceGalaxyBackground({ phase, onInitialRotationComplete }) {
  // Mouse / Touch Parallax Coordinates (-0.5 to +0.5)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Spring physics for smooth opposite direction parallax drift
  const smoothX = useSpring(0, { stiffness: 90, damping: 25 });
  const smoothY = useSpring(0, { stiffness: 90, damping: 25 });

  useEffect(() => {
    // Initial sequence timer trigger
    const revealTimer = setTimeout(() => {
      if (onInitialRotationComplete) {
        onInitialRotationComplete();
      }
    }, 500);

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const normX = e.clientX / innerWidth - 0.5;
      const normY = e.clientY / innerHeight - 0.5;
      setMousePos({ x: normX, y: normY });
      smoothX.set(-normX * 25); // Subtle shift in OPPOSITE direction of cursor without clipping
      smoothY.set(-normY * 25);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const { innerWidth, innerHeight } = window;
        const normX = touch.clientX / innerWidth - 0.5;
        const normY = touch.clientY / innerHeight - 0.5;
        setMousePos({ x: normX, y: normY });
        smoothX.set(-normX * 25);
        smoothY.set(-normY * 25);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      clearTimeout(revealTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onInitialRotationComplete, smoothX, smoothY]);

  // Node coordinates matching graphic intersections for left (purple) and right (cyan)
  const pulsingNodes = [
    { top: '15%', left: '16%', color: '#F355DA', shadow: 'rgba(243, 85, 218, 0.9)', delay: '0s' },
    { top: '32%', left: '8%', color: '#F355DA', shadow: 'rgba(243, 85, 218, 0.9)', delay: '1s' },
    { top: '48%', left: '7%', color: '#F355DA', shadow: 'rgba(243, 85, 218, 0.9)', delay: '2s' },
    { top: '72%', left: '24%', color: '#F355DA', shadow: 'rgba(243, 85, 218, 0.9)', delay: '0.5s' },
    { top: '12%', right: '16%', color: '#00F2FE', shadow: 'rgba(0, 242, 254, 0.9)', delay: '1.5s' },
    { top: '28%', right: '10%', color: '#00F2FE', shadow: 'rgba(0, 242, 254, 0.9)', delay: '2.5s' },
    { top: '47%', right: '8%', color: '#00F2FE', shadow: 'rgba(0, 242, 254, 0.9)', delay: '0.8s' },
    { top: '70%', right: '20%', color: '#00F2FE', shadow: 'rgba(0, 242, 254, 0.9)', delay: '1.8s' },
  ];

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden bg-[#020208]">
      
      {/* 1 & 2. FIXED PARALLAX BACKGROUND GRAPHIC (HIGH CONTRAST & BRIGHTNESS, UNCLIPPED OBJECT-FILL) */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          scale: 1.03, // Optimal buffer without cropping edge network lines!
          rotateX: -mousePos.y * 4,
          rotateY: mousePos.x * 4,
        }}
        transition={{ type: 'spring', stiffness: 90, damping: 25 }}
        className="absolute inset-0 w-full h-full flex items-center justify-center [transform-style:preserve-3d]"
      >
        {/* BACKGROUND NETWORK IMAGE GRAPHIC - HIGH CONTRAST & UNCLIPPED FIT */}
        <img
          src="/multiverse_nodes.png"
          alt="Multiverse Network Background"
          className="w-full h-full object-fill select-none filter brightness-125 contrast-125 saturate-125"
        />

        {/* HIGH-VIBRANCY SVG NEON VECTOR LINES FOR 100% VISIBLE NETWORK CONNECTIONS */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80 z-10">
          <defs>
            <linearGradient id="purpleGlowLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F355DA" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="cyanGlowLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glowBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* LEFT NEON-PURPLE NETWORK LINES */}
          <path d="M 0 50 L 160 150 L 80 320 L 70 480 L 240 720 L 0 900" stroke="url(#purpleGlowLine)" strokeWidth="2" fill="none" filter="url(#glowBlur)" />
          <path d="M 160 150 L 70 480 M 80 320 L 240 720" stroke="#F355DA" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="4 4" fill="none" />

          {/* RIGHT ELECTRIC-CYAN NETWORK LINES */}
          <path d="M 100% 50 L calc(100% - 160px) 120 L calc(100% - 100px) 280 L calc(100% - 80px) 470 L calc(100% - 200px) 700 L 100% 900" stroke="url(#cyanGlowLine)" strokeWidth="2" fill="none" filter="url(#glowBlur)" />
          <path d="M calc(100% - 160px) 120 L calc(100% - 80px) 470 M calc(100% - 100px) 280 L calc(100% - 200px) 700" stroke="#00F2FE" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="4 4" fill="none" />
        </svg>

        {/* 3. PULSING MULTIVERSE NODES OVERLAY (BRIGHT PULSING INTERSECTIONS) */}
        {pulsingNodes.map((node, i) => (
          <div
            key={i}
            style={{
              top: node.top,
              left: node.left,
              right: node.right,
              animationDelay: node.delay,
            }}
            className="absolute w-5 h-5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-multiverse-pulse pointer-events-none z-20"
          >
            <div
              style={{
                backgroundColor: node.color,
                boxShadow: `0 0 30px 10px ${node.shadow}`,
              }}
              className="w-full h-full rounded-full"
            />
          </div>
        ))}
      </motion.div>

    </div>
  );
}
