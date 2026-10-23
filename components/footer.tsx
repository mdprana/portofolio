"use client";

import { motion } from "motion/react";

import FitText from "@/components/fit-text";
import { MeasuredReveal } from "@/components/reveal";
import {
  ArrowUp,
  Download,
} from "@/components/icons";
import { MotionLink } from "@/components/motion";
import { footerColumns, profile } from "@/lib/content";
import { color, hoverRoot, textMuted, tw } from "@/lib/motion";

export function Pill({
  label,
  href,
  tone = "light",
}: {
  label: string;
  href: string;
  tone?: "light" | "dark";
}) {
  const [rest, hover] =
    tone === "light" ? [color.fg, color.muted] : [color.surface, color.surface2];
  return (
    <MotionLink
      href={href}
      className={`inline-flex h-[51px] items-center rounded-pill px-7 text-base font-medium ${
        tone === "light" ? "text-bg" : "text-fg"
      }`}
      initial={{ backgroundColor: rest }}
      whileHover={{ backgroundColor: hover }}
      transition={tw(300)}
    >
      {label}
    </MotionLink>
  );
}

export function ResumeButton() {
  return (
    <motion.a
      href={profile.resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-[53px] items-center gap-3 rounded-pill border border-fg px-7 text-base font-medium"
      initial={{ backgroundColor: color.clear, color: color.fg }}
      whileHover={{ backgroundColor: color.fg, color: color.bg }}
      transition={tw(250)}
    >
      <Download />
      Download Resume
    </motion.a>
  );
}

export default function Footer() {
  return (
    <footer className="frame flex flex-col gap-2 pb-8 pt-6">
      <MeasuredReveal>
        <a href={`mailto:${profile.email}`} aria-label="Get in touch by email"><FitText text="Get in touch" as="p" /></a>
      </MeasuredReveal>

      <MeasuredReveal className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <p className="body-xl max-w-[760px] text-muted">
          Have a project, role, or dataset in mind? Let’s talk.
        </p>
        <div className="flex min-w-0 flex-col items-end text-right text-[14px] leading-[1.2] min-[1107px]:text-[19px] min-[1440px]:text-[24px]">
          <MotionLink href={`mailto:${profile.email}`} {...hoverRoot} whileFocus="hover" variants={textMuted} transition={tw(250)}>Say Hello</MotionLink>
          <MotionLink href={`mailto:${profile.email}`} className="[overflow-wrap:anywhere]" {...hoverRoot} whileFocus="hover" variants={textMuted} transition={tw(250)}>{profile.email}</MotionLink>
        </div>
      </MeasuredReveal>

      <MeasuredReveal className="mt-[72px] grid grid-cols-2 items-start gap-10 min-[1440px]:grid-cols-[1.5fr_1fr_1fr_auto]">
        <p className="col-span-2 text-[80px] font-bold leading-[0.8] tracking-[-0.04em] min-[1440px]:col-span-1">
          {profile.wordmark}
        </p>

          {footerColumns.filter(column => column.label !== "(Contact)").map((column) => (
            <div key={column.label} className="flex flex-col gap-2.5 text-base">
              <p className="text-muted">{column.label}</p>
              {column.links.map((link) =>
                link.href ? (
                  <MotionLink key={link.text} href={link.href} className="text-[24px] font-bold leading-[1.2] min-[1107px]:text-[31px] min-[1440px]:text-[36px]" {...hoverRoot} whileFocus="hover" variants={textMuted} transition={tw(250)}>
                    {link.text}
                  </MotionLink>
                ) : (
                  <span key={link.text}>{link.text}</span>
                ),
              )}
            </div>
          ))}

          <MotionLink
            href="#top"
            className="inline-flex items-start gap-2 self-start text-base"
            {...hoverRoot}
            whileFocus="hover"
            variants={textMuted}
            transition={tw(250)}
          >
            Back to Top
            <ArrowUp />
          </MotionLink>
      </MeasuredReveal>
    </footer>
  );
}
