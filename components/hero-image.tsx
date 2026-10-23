"use client";

import { useLayoutEffect, useRef } from "react";
import { animate, inView, motion, useMotionValue } from "motion/react";

export default function HeroImage() {
  const ref = useRef<HTMLDivElement>(null);
  const scale = useMotionValue(1);

  useLayoutEffect(() => {
    const mobile = matchMedia("(max-width: 809.98px)");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let animation: ReturnType<typeof animate> | undefined;
    let stop = () => {};
    const settle = () => {
      stop();
      animation?.stop();
      scale.jump(1);
    };
    if (!mobile.matches && !reduce.matches && ref.current) {
      scale.set(1.25);
      stop = inView(ref.current, () => {
        animation = animate(scale, 1, { type: "spring", stiffness: 400, damping: 60, mass: 1, delay: 0 });
      });
    }
    mobile.addEventListener("change", settle);
    reduce.addEventListener("change", settle);
    return () => {
      mobile.removeEventListener("change", settle);
      reduce.removeEventListener("change", settle);
      settle();
    };
  }, [scale]);

  return (
    <div ref={ref} data-motion-scope="hero-image" className="aspect-[1392/786] w-full overflow-hidden bg-surface">
      <motion.div
        className="size-full bg-[url(/hero.png)] bg-cover bg-center will-change-transform max-[809.98px]:!transform-none motion-reduce:!transform-none"
        style={{ scale }}
      />
    </div>
  );
}
