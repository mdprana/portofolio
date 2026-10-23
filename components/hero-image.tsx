"use client";

import { useLayoutEffect, useRef } from "react";
import { animate, inView, motion, useMotionValue } from "motion/react";

const HERO = "/hero.png";

export default function HeroImage({
  src = HERO,
  className = "aspect-[1392/786] w-full",
  mobileStatic = true,
  scope = "hero-image",
}: {
  src?: string;
  className?: string;
  mobileStatic?: boolean;
  scope?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scale = useMotionValue(1);

  useLayoutEffect(() => {
    const mobile = mobileStatic ? matchMedia("(max-width: 809.98px)") : null;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let animation: ReturnType<typeof animate> | undefined;
    let stop = () => {};
    const settle = () => {
      stop();
      animation?.stop();
      scale.jump(1);
    };
    if (!mobile?.matches && !reduce.matches && ref.current) {
      scale.set(1.25);
      stop = inView(ref.current, () => {
        animation = animate(scale, 1, { type: "spring", stiffness: 400, damping: 60, mass: 1, delay: 0 });
      });
    }
    mobile?.addEventListener("change", settle);
    reduce.addEventListener("change", settle);
    return () => {
      mobile?.removeEventListener("change", settle);
      reduce.removeEventListener("change", settle);
      settle();
    };
  }, [scale, mobileStatic]);

  return (
    <div ref={ref} data-motion-scope={scope} className={`${className} overflow-hidden bg-surface`}>
      <motion.div
        className={[
          "size-full",
          src === HERO && "bg-[url(/hero.png)]",
          "bg-cover bg-center will-change-transform",
          mobileStatic && "max-[809.98px]:!transform-none",
          "motion-reduce:!transform-none",
        ].filter(Boolean).join(" ")}
        style={src === HERO ? { scale } : { scale, backgroundImage: `url(${src})` }}
      />
    </div>
  );
}
