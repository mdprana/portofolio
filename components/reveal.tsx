"use client";

import { motion } from "motion/react";
import { useStaticMotion } from "@/components/motion";
import { quint } from "@/lib/motion";

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
