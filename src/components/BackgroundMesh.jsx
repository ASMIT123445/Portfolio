import { useEffect, useRef } from 'react';

const BackgroundMesh = () => {
  const orbRefs = useRef([]);

  useEffect(() => {
    if ('ontouchstart' in window) return;

    // Each orb has a different parallax strength
    const strengths = [0.025, -0.018, 0.012, -0.022];
    const positions = orbRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      return { x: 0, y: 0 };
    });

    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      orbRefs.current.forEach((orb, i) => {
        if (!orb) return;
        const s = strengths[i] ?? 0.02;
        positions[i].x += (dx * s - positions[i].x) * 0.06;
        positions[i].y += (dy * s - positions[i].y) * 0.06;
        orb.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
      });
    };

    const raf = { id: null };
    let lastE = null;

    const onMove = (e) => { lastE = e; };
    const tick = () => {
      if (lastE) handleMouseMove(lastE);
      raf.id = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove);
    raf.id = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.id);
    };
  }, []);

  return (
    <div className="bg-mesh" aria-hidden="true">
      <span ref={(el) => (orbRefs.current[0] = el)}></span>
      <span ref={(el) => (orbRefs.current[1] = el)}></span>
      <span ref={(el) => (orbRefs.current[2] = el)}></span>
      <span ref={(el) => (orbRefs.current[3] = el)}></span>
    </div>
  );
};

export default BackgroundMesh;
