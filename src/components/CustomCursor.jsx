'use client';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });

      // Add spark trail particle
      const newParticle = {
        id: Date.now() + Math.random(),
        x: clientX,
        y: clientY,
      };
      setTrail((prev) => [...prev, newParticle]);

      // Remove old particles after 500ms
      setTimeout(() => {
        setTrail((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 300);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseEnter = () => setHovered(true);
    const onMouseLeave = () => setHovered(false);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    // Add hover for interactive elements
    const hoverables = document.querySelectorAll('a, button, .cursor-hover');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  const cursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  return (
    <>
      {/* Spark trail particles */}
      {trail.map((particle) => (
        <div
          key={particle.id}
          className="fixed w-2 h-2 rounded-full bg-pry opacity-60 pointer-events-none z-[9998] animate-ping"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Main Cursor */}
      <div
        className={`
          fixed top-0 left-0 z-[9999] pointer-events-none
          w-6 h-6 rounded-full mix-blend-difference transition-transform duration-150 ease-out
          ${hovered ? 'bg-white scale-[1.8]' : 'bg-pry scale-110'}
          ${clicked ? 'scale-75' : ''}
        `}
        style={{
          ...cursorStyle,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}
