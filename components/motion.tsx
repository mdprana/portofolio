"use client";

import Link from "next/link";
import { MotionConfig, motion } from "motion/react";
import { useSyncExternalStore } from "react";

const subscribe = (notify: () => void) => {
  const query = matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};
export const useStaticMotion = () => useSyncExternalStore(subscribe, () => matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);

export const MotionLink = motion.create(Link);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reduce = useStaticMotion();
  return <MotionConfig reducedMotion="user" transition={reduce ? { duration: 0 } : undefined}>{children}</MotionConfig>;
}

export function HoverArrow({ children }: { children: React.ReactNode }) {
  const reduce = useStaticMotion();
  return <motion.span className="shrink-0" variants={{ rest: { x: 0 }, hover: { x: reduce ? 0 : 8 } }} transition={{ duration: reduce ? 0 : 0.3 }}>{children}</motion.span>;
}

const subscribeHover = (notify: () => void) => {
  const query = matchMedia("(hover: hover) and (pointer: fine)");
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};

export function RowMotion({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useStaticMotion();
  const hover = useSyncExternalStore(subscribeHover, () => matchMedia("(hover: hover) and (pointer: fine)").matches, () => false);
  return <motion.span className={className} variants={{ rest: { gap: "24px" }, hover: { gap: !reduce && hover ? "36px" : "24px" } }} transition={{ duration: reduce ? 0 : 0.3 }}>{children}</motion.span>;
}
