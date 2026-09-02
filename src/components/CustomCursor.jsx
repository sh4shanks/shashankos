import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const spotlight = spotlightRef.current;

    if (!dot || !ring) return;

    gsap.set([dot, ring], { scale: 0.5, opacity: 0, transformOrigin: "50% 50%" });

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power2.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power2.out" });
    
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.15, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.15, ease: "power3.out" });

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      const dotSize = 12;
      const ringSize = 48;

      xToDot(x - dotSize / 2);
      yToDot(y - dotSize / 2);
      xToRing(x - ringSize / 2);
      yToRing(y - ringSize / 2);

      if (spotlight) {
        spotlight.style.transform = `translate3d(${x - 350}px, ${y - 350}px, 0)`;
      }
    };

    const handleMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
      if (spotlight) gsap.to(spotlight, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, scale: 0.5, duration: 0.3, ease: "power2.inOut" });
      if (spotlight) gsap.to(spotlight, { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Global Mouse Follower Spotlight Beam */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none z-[9998] opacity-0 blur-[100px] transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(229,9,20,0.2) 0%, rgba(229,9,20,0.06) 45%, transparent 75%)'
        }}
      ></div>

      {/* Global Custom Cursor Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-3 h-3 bg-red-600 rounded-full shadow-[0_0_15px_#E50914]"
      ></div>

      {/* Global Custom Cursor Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-12 h-12 border border-red-600/60 rounded-full flex items-center justify-center backdrop-blur-[1px]"
      ></div>
    </>
  );
};

export default CustomCursor;