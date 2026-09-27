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
      smoothX.set(-normX * 25); // Subtle shift in OPPOSITE direction of cursor
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

  // HIGH-QUANTITY EDGE-CONSTRAINED NODES (NEON PURPLE LEFT, ELECTRIC CYAN RIGHT)
  const leftNodes = [
    { top: '8%', left: '12%', color: '#F355DA', shadow: 'rgba(243, 85, 218, 0.95)', delay: '0s', size: 5 },
    { top: '18%', left: '6%', color: '#F355DA', shadow: 'rgba(243, 85, 218, 0.85)', delay: '1s', size: 4 },
    { top: '28%', left: '14%', color: '#F355DA', shadow: 'rgba(243, 85, 218, 0.9)', delay: '1.5s', size: 5 },
    { top: '38%', left: '5%', color: '#F355DA', shadow: 'rgba(243, 85, 218, 0.8)', delay: '0.5s', size: 3.5 },
    { top: '50%', left: '11%', color: '#F355DA', shadow: 'rgba(243, 85, 218, 0.95)', delay: '2s', size: 6 },
    { top: '64%', left: '4%', color: '#F355DA', shadow: 'rgba(243, 85, 218, 0.85)', delay: '0.8s', size: 4 },
    { top: '76%', left: '15%', color: '#F355DA', shadow: 'rgba(243, 85, 218, 0.9)', delay: '2.5s', size: 5 },
    { top: '88%', left: '8%', color: '#F355DA', shadow: 'rgba(243, 85, 218, 0.8)', delay: '1.2s', size: 4 },
  ];

  const rightNodes = [
    { top: '10%', right: '12%', color: '#00F2FE', shadow: 'rgba(0, 242, 254, 0.95)', delay: '0.4s', size: 5 },
    { top: '22%', right: '5%', color: '#00F2FE', shadow: 'rgba(0, 242, 254, 0.85)', delay: '1.4s', size: 4 },
    { top: '34%', right: '15%', color: '#00F2FE', shadow: 'rgba(0, 242, 254, 0.9)', delay: '1.8s', size: 5.5 },
    { top: '46%', right: '6%', color: '#00F2FE', shadow: 'rgba(0, 242, 254, 0.8)', delay: '0.9s', size: 3.5 },
    { top: '58%', right: '13%', color: '#00F2FE', shadow: 'rgba(0, 242, 254, 0.95)', delay: '2.2s', size: 6 },
    { top: '72%', right: '4%', color: '#00F2FE', shadow: 'rgba(0, 242, 254, 0.85)', delay: '0.3s', size: 4 },
    { top: '84%', right: '14%', color: '#00F2FE', shadow: 'rgba(0, 242, 254, 0.9)', delay: '2.7s', size: 5 },
  ];

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#020208]">
      
      {/* 1 & 2. FIXED PARALLAX BACKGROUND GRAPHIC */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          scale: 1.02,
          rotateX: -mousePos.y * 3,
          rotateY: mousePos.x * 3,
        }}
        transition={{ type: 'spring', stiffness: 90, damping: 25 }}
        className="absolute inset-0 w-full h-full flex items-center justify-center [transform-style:preserve-3d]"
      >
        {/* BACKGROUND NETWORK IMAGE GRAPHIC */}
        <img
          src="/multiverse_nodes.png"
          alt="Multiverse Network Background"
          className="w-full h-full object-cover select-none filter brightness-105 contrast-110"
        />

        {/* SOFT CENTER SHADING MASK - CONSTRAINS SIDE LINES SO LENGTH IS SMALL & CENTER STAYS CLEAN */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,2,8,0.85)_0%,rgba(2,2,8,0.45)_55%,transparent_85%)] pointer-events-none" />

        {/* HIGH-QUANTITY SHADED SVG NETWORK LINES (COMPACT LENGTH NEAR EDGES) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-85 z-10">
          <defs>
            {/* GRADIENT SHADED STROKES */}
            <linearGradient id="purpleShadedLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F355DA" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="cyanShadedLine" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.1" />
            </linearGradient>

            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* LEFT NEON PURPLE COMPACT SHADED SEGMENT LINES */}
          <path d="M 0 60 L 12% 8% L 6% 18% L 14% 28% L 5% 38% L 11% 50% L 4% 64% L 15% 76% L 8% 88% L 0 94%" stroke="url(#purpleShadedLine)" strokeWidth="1.6" fill="none" filter="url(#softGlow)" />
          <path d="M 12% 8% L 14% 28% M 6% 18% L 5% 38% M 14% 28% L 11% 50% M 5% 38% L 4% 64% M 11% 50% L 15% 76% M 4% 64% L 8% 88%" stroke="#F355DA" strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="3 3" fill="none" />

          {/* RIGHT ELECTRIC CYAN COMPACT SHADED SEGMENT LINES */}
          <path d="M 100% 60 L calc(100% - 12%) 10% L calc(100% - 5%) 22% L calc(100% - 15%) 34% L calc(100% - 6%) 46% L calc(100% - 13%) 58% L calc(100% - 4%) 72% L calc(100% - 14%) 84% L 100% 94%" stroke="url(#cyanShadedLine)" strokeWidth="1.6" fill="none" filter="url(#softGlow)" />
          <path d="M calc(100% - 12%) 10% L calc(100% - 15%) 34% M calc(100% - 5%) 22% L calc(100% - 6%) 46% M calc(100% - 15%) 34% L calc(100% - 13%) 58% M calc(100% - 6%) 46% L calc(100% - 4%) 72% M calc(100% - 13%) 58% L calc(100% - 14%) 84%" stroke="#00F2FE" strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="3 3" fill="none" />
        </svg>

        {/* 3. HIGH QUANTITY PULSING MULTIVERSE NODES (LEFT PURPLE & RIGHT CYAN) */}
        {leftNodes.map((node, i) => (
          <div
            key={`left-${i}`}
            style={{
              top: node.top,
              left: node.left,
              width: `${node.size * 2}px`,
              height: `${node.size * 2}px`,
              animationDelay: node.delay,
            }}
            className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 animate-multiverse-pulse pointer-events-none z-20"
          >
            <div
              style={{
                backgroundColor: node.color,
                boxShadow: `0 0 16px 5px ${node.shadow}`,
              }}
              className="w-full h-full rounded-full"
            />
          </div>
        ))}

        {rightNodes.map((node, i) => (
          <div
            key={`right-${i}`}
            style={{
              top: node.top,
              right: node.right,
              width: `${node.size * 2}px`,
              height: `${node.size * 2}px`,
              animationDelay: node.delay,
            }}
            className="absolute rounded-full translate-x-1/2 -translate-y-1/2 animate-multiverse-pulse pointer-events-none z-20"
          >
            <div
              style={{
                backgroundColor: node.color,
                boxShadow: `0 0 16px 5px ${node.shadow}`,
              }}
              className="w-full h-full rounded-full"
            />
          </div>
        ))}
      </motion.div>

      {/* 4. COVER UP BOTTOM-RIGHT GEMINI WATERMARK STAR */}
      <div className="absolute bottom-0 right-0 w-28 h-28 bg-[#020208] pointer-events-none z-30 blur-md opacity-95" />
    </div>
  );
}
