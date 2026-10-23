"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { MotionLink } from "@/components/motion";
import type { Project } from "@/lib/content";
import { hoverRoot } from "@/lib/motion";

const pointerQuery = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const subscribePointer = (notify: () => void) => {
  const query = matchMedia(pointerQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};

export default function WorkCard({ project }: { project: Project }) {
  const interactive = useSyncExternalStore(subscribePointer, () => matchMedia(pointerQuery).matches, () => false);

  return (
    <MotionLink href={`/projects/${project.slug}`} data-featured-card className="flex flex-col gap-2 overflow-hidden">
      <motion.div className="relative aspect-[648/720]" {...hoverRoot}>
        <motion.div
          key={interactive ? "interactive" : "static"}
          data-project-media
          className="absolute inset-0 bg-surface"
          variants={{ rest: { scale: 1 }, hover: { scale: interactive ? 1.1 : 1 } }}
          transition={interactive ? { type: "spring", duration: 0.45, bounce: 0.25 } : { duration: 0 }}
          style={project.image ? undefined : {
            backgroundImage: `linear-gradient(135deg, ${project.cover[0]}, ${project.cover[1]})`,
          }}
        >
          {project.image && (
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1440px) calc((100vw - 144px) / 2), 648px"
              className="object-contain"
            />
          )}
        </motion.div>
      </motion.div>

      <div className="flex items-baseline justify-between gap-4 pt-10 pb-6">
        <h3 className="min-w-0 text-4xl font-bold tracking-[-0.04em]">{project.title}</h3>
        <span className="shrink-0 text-2xl text-muted">{project.year}</span>
      </div>
    </MotionLink>
  );
}
