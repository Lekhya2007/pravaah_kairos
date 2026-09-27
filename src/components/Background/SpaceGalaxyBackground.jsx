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
      smoothX.set(-normX * 35); // Smooth subtle shift in OPPOSITE direction of cursor
      smoothY.set(-normY * 35);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const { innerWidth, innerHeight } = window;
        const normX = touch.clientX / innerWidth - 0.5;
        const normY = touch.clientY / innerHeight - 0.5;
        setMousePos({ x: normX, y: normY });
        smoothX.set(-normX * 35);
        smoothY.set(-normY * 35);
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

  // Primary node coordinates matching graphic intersections for left (purple) and right (cyan)
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
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#020208]">
      
      {/* 1 & 2. FIXED PARALLAX BACKGROUND GRAPHIC (AUTHENTIC NATURAL NETWORK FIT) */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          scale: 1.05,
          rotateX: -mousePos.y * 5,
          rotateY: mousePos.x * 5,
        }}
        transition={{ type: 'spring', stiffness: 90, damping: 25 }}
        className="absolute inset-0 w-full h-full flex items-center justify-center [transform-style:preserve-3d]"
      >
        {/* BACKGROUND NETWORK IMAGE GRAPHIC - CRISP AUTHENTIC FIT */}
        <img
          src="/multiverse_nodes.png"
          alt="Multiverse Network Background"
          className="w-full h-full object-cover select-none filter brightness-110 contrast-110"
        />

        {/* 3. PULSING MULTIVERSE NODES OVERLAY (IDLE LIFE 4S OPACITY PULSE 60% TO 100%) */}
        {pulsingNodes.map((node, i) => (
          <div
            key={i}
            style={{
              top: node.top,
              left: node.left,
              right: node.right,
              animationDelay: node.delay,
            }}
            className="absolute w-3.5 h-3.5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-multiverse-pulse pointer-events-none z-20"
          >
            <div
              style={{
                backgroundColor: node.color,
                boxShadow: `0 0 20px 6px ${node.shadow}`,
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
