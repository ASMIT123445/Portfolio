import { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const glowRef = useRef(null);
  const trailRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    if ('ontouchstart' in window) return;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      current.current.x = lerp(current.current.x, mouse.current.x, 0.08);
      current.current.y = lerp(current.current.y, mouse.current.y, 0.08);

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%)`;
      }
      // trail follows even slower
      if (trailRef.current) {
        const tx = lerp(
          parseFloat(trailRef.current.dataset.x || current.current.x),
          current.current.x,
          0.04
        );
        const ty = lerp(
          parseFloat(trailRef.current.dataset.y || current.current.y),
          current.current.y,
          0.04
        );
        trailRef.current.dataset.x = tx;
        trailRef.current.dataset.y = ty;
        trailRef.current.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div className="cursor-glow" ref={glowRef} />
      <div className="cursor-trail" ref={trailRef} />
    </>
  );
};

export default CursorGlow;
