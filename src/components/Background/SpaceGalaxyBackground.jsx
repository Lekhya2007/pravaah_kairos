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
      smoothX.set(-normX * 40); // Shifts in OPPOSITE direction of cursor
      smoothY.set(-normY * 40);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const { innerWidth, innerHeight } = window;
        const normX = touch.clientX / innerWidth - 0.5;
        const normY = touch.clientY / innerHeight - 0.5;
        setMousePos({ x: normX, y: normY });
        smoothX.set(-normX * 40);
        smoothY.set(-normY * 40);
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

  // Primary node coordinates for neon-purple (left side) and electric-cyan (right side) glowing intersections
  const pulsingNodes = [
    { top: '15%', left: '18%', color: 'rgba(243, 85, 218, 0.95)', shadow: 'rgba(243, 85, 218, 0.8)', delay: '0s' },
    { top: '35%', left: '8%', color: 'rgba(243, 85, 218, 0.95)', shadow: 'rgba(243, 85, 218, 0.8)', delay: '1s' },
    { top: '55%', left: '10%', color: 'rgba(243, 85, 218, 0.95)', shadow: 'rgba(243, 85, 218, 0.8)', delay: '2s' },
    { top: '75%', left: '22%', color: 'rgba(243, 85, 218, 0.95)', shadow: 'rgba(243, 85, 218, 0.8)', delay: '0.5s' },
    { top: '10%', right: '18%', color: 'rgba(0, 242, 254, 0.95)', shadow: 'rgba(0, 242, 254, 0.8)', delay: '1.5s' },
    { top: '30%', right: '12%', color: 'rgba(0, 242, 254, 0.95)', shadow: 'rgba(0, 242, 254, 0.8)', delay: '2.5s' },
    { top: '68%', right: '15%', color: 'rgba(0, 242, 254, 0.95)', shadow: 'rgba(0, 242, 254, 0.8)', delay: '0.8s' },
    { top: '85%', right: '28%', color: 'rgba(0, 242, 254, 0.95)', shadow: 'rgba(0, 242, 254, 0.8)', delay: '1.8s' },
  ];

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden bg-[#020208]">
      
      {/* 1 & 2. FIXED PARALLAX BACKGROUND GRAPHIC (SCALE 1.1 WITH OPPOSITE DIRECTION DRIFT) */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          scale: 1.1,
          rotateX: -mousePos.y * 6,
          rotateY: mousePos.x * 6,
        }}
        transition={{ type: 'spring', stiffness: 90, damping: 25 }}
        className="absolute inset-0 w-full h-full flex items-center justify-center [transform-style:preserve-3d]"
      >
        <img
          src="/multiverse_nodes.png"
          alt="Multiverse Network Background"
          className="w-full h-full object-cover select-none"
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
            className="absolute w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2 animate-multiverse-pulse pointer-events-none"
          >
            <div
              style={{
                backgroundColor: node.color,
                boxShadow: `0 0 25px 8px ${node.shadow}`,
              }}
              className="w-full h-full rounded-full"
            />
          </div>
        ))}
      </motion.div>

      {/* AMBIENT SOFT VIGNETTE MASK FOR VIBRANT GRAPHIC SHINE */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020208] via-transparent to-[#020208]/60 pointer-events-none" />
    </div>
  );
}
