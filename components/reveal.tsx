"use client";

import { motion, useAnimationControls } from "motion/react";
import { useLayoutEffect } from "react";
import { useStaticMotion } from "@/components/motion";
import { heroSpring, quint, revealFinal, revealPresets } from "@/lib/motion";

export function HeroLoad({ children, copy = false, className }: { children: React.ReactNode; copy?: boolean; className?: string }) {
  const reduce = useStaticMotion();
  const controls = useAnimationControls();
  useLayoutEffect(() => {
    if (reduce) {
      controls.stop();
      controls.set(revealFinal);
    }
    else void controls.start({ ...revealFinal, transition: { ...heroSpring, delay: copy ? 0.2 : 0 } });
  }, [controls, copy, reduce]);
  return (
    <motion.div
      data-motion-load={copy ? "copy" : "title"}
      className={className}
      initial={{ opacity: 0.001, y: copy ? 30 : -400 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}

export function MeasuredReveal({ children, family = "spring", className }: { children: React.ReactNode; family?: keyof typeof revealPresets; className?: string }) {
  const reduce = useStaticMotion();
  const preset = revealPresets[family];
  const controls = useAnimationControls();
  useLayoutEffect(() => {
    if (!reduce) return;
    controls.stop();
    controls.set(revealFinal);
    return () => controls.stop();
  }, [controls, reduce]);
  return (
    <motion.div
      data-reveal={family}
      className={className}
      initial={preset.hidden}
      animate={controls}
      whileInView={revealFinal}
      viewport={preset.viewport}
      transition={reduce ? { duration: 0, delay: 0 } : preset.transition}
    >
      {children}
    </motion.div>
  );
}

/** Fades up while in view, hides again on exit (Figma Timeline/tile reveal). */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useStaticMotion();
  return (
    <motion.div
      data-reveal
      className={className}
      initial={reduce ? "shown" : "hidden"}
      animate={reduce ? "shown" : undefined}
      whileInView={reduce ? undefined : "shown"}
      viewport={{ margin: "0px 0px -15% 0px" }}
      variants={{
        hidden: { opacity: 0, y: 28, transition: { duration: 0.8, ease: quint } },
        shown: { opacity: 1, y: 0, transition: reduce ? { duration: 0 } : { duration: 0.8, ease: quint, delay: delay / 1000 } },
      }}
    >
      {children}
    </motion.div>
  );
}
