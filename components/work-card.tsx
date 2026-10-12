"use client";

import { useSyncExternalStore } from "react";
import { motion, useMotionValue } from "motion/react";
import { ArrowUp } from "@/components/icons";
import { MotionLink } from "@/components/motion";
import type { Project } from "@/lib/content";
import { hoverRoot, tw } from "@/lib/motion";

const pointerQuery = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const subscribePointer = (notify: () => void) => {
  const query = matchMedia(pointerQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};

export default function WorkCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const interactive = useSyncExternalStore(subscribePointer, () => matchMedia(pointerQuery).matches, () => false);
  const left = useMotionValue(0);
  const top = useMotionValue(0);

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    left.set(e.clientX - box.left);
    top.set(e.clientY - box.top);
  };

  return (
    <MotionLink href={`/projects/${project.slug}`} data-featured-card={featured ? true : undefined} className="flex flex-col gap-2 overflow-hidden">
      <motion.div onMouseMove={!featured && interactive ? move : undefined} className="relative aspect-[648/720]" {...hoverRoot}>
        <motion.div
          key={interactive ? "interactive" : "static"}
          data-project-media
          className="absolute inset-0 bg-surface"
          variants={{ rest: { scale: 1 }, hover: { scale: interactive ? 1.1 : 1 } }}
          transition={interactive ? { type: "spring", duration: 0.45, bounce: 0.25 } : { duration: 0 }}
          style={{
            backgroundImage: `linear-gradient(135deg, ${project.cover[0]}, ${project.cover[1]})`,
          }}
        />

        {!featured && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute z-10 flex items-center"
            style={{ left, top, x: 12, y: "-50%" }}
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={tw(300)}
          >
            <span className="flex size-12 items-center justify-center rounded-pill bg-fg text-bg">
              <ArrowUp className="rotate-45" size={22} />
            </span>
            <span className="-ml-2 flex h-12 items-center rounded-pill bg-black/55 px-[22px] text-sm tracking-[0.02em] text-fg backdrop-blur-[12px]">
              VIEW PROJECT
            </span>
          </motion.div>
        )}
      </motion.div>

      <div className="flex items-baseline justify-between gap-4 pt-10 pb-6">
        <h3 className="min-w-0 text-4xl font-bold tracking-[-0.04em]">{project.title}</h3>
        <span className="shrink-0 text-2xl text-muted">{project.year}</span>
      </div>
    </MotionLink>
  );
}
