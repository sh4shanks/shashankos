import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MinimalPreloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    tl.set(preloaderRef.current, { autoAlpha: 1 })
      .fromTo(
        contentRef.current,
        { scale: 0.95, opacity: 0, filter: "blur(8px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
      )
      .to(contentRef.current, {
        scale: 1.05,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.4,
        ease: "power2.in",
        delay: 0.6
      })
      .to(preloaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center select-none overflow-hidden"
    >
      <div ref={contentRef} className="flex flex-col items-center gap-4">
        {/* Minimal Red Indicator Dot */}
        <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></div>

        {/* Minimal Typography */}
        <h1 
          className="text-2xl md:text-3xl font-black uppercase tracking-[0.3em] text-white"
          style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
        >
          SHASHANK
        </h1>
      </div>
    </div>
  );
};

export default MinimalPreloader;