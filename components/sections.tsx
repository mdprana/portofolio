"use client";

import { motion } from "motion/react";
import FitText from "@/components/fit-text";
import HeroImage from "@/components/hero-image";
import Marquee from "@/components/marquee";
import { MotionLink, RowMotion, useStaticMotion } from "@/components/motion";
import Reveal from "@/components/reveal";
import WorkCard from "@/components/work-card";
import { ArrowRight, ArrowSub } from "@/components/icons";
import {
  awards,
  capabilities,
  homeProjects,
  profile,
  stats,
  tools,
} from "@/lib/content";
import { color, hoverRoot, rowBorder, tw } from "@/lib/motion";

const t300 = tw(300);
const tileText = { rest: { color: color.subtle }, hover: { color: color.black } };

/* Hero (Figma 14:15) — pad 0/24/8/24, gap 24. */
export function Hero() {
  return (
    <section className="frame flex flex-col gap-6 pb-2">
      <FitText text={profile.headline} as="h1" className="text-fg" />
      <div className="pb-8">
        <p className="body-xl ml-auto max-w-[980px] text-muted">
          {profile.intro.map((part) =>
            part.strong ? <strong key={part.text} className="text-fg">{part.text}</strong> : part.text,
          )}
        </p>
      </div>
      <HeroImage />
    </section>
  );
}

/* Work Section (14:21) — gap 36, grid gap 72, "View all" pad-top 56. */
export function FeaturedProjects() {
  const reduce = useStaticMotion();
  return (
    <section className="frame flex flex-col gap-9 pt-6 pb-8">
      <FitText text="Featured Projects" />
      <div className="grid gap-[72px] md:grid-cols-2 md:gap-x-24">
        {homeProjects.map((project) => (
          <WorkCard key={project.slug} project={project} featured />
        ))}
      </div>
      <MotionLink
        href="/projects"
        className="group mt-14 inline-flex self-center items-center gap-4 text-4xl font-bold tracking-[-0.04em] text-fg transition-colors hover:text-muted focus-visible:text-muted motion-reduce:transition-none"
        initial={{ gap: 16 }}
        whileHover={{ gap: reduce ? 16 : 24 }}
        whileFocus={{ gap: reduce ? 16 : 24 }}
        transition={{ duration: reduce ? 0 : 0.3, gap: { duration: reduce ? 0 : 0.3 } }}
      >
        <ArrowRight size={32} />
        <span className="group-hover:underline group-focus-visible:underline">View all projects</span>
      </MotionLink>
    </section>
  );
}

/* About Section (16:2) — gap 40, pad bottom 120. Copy 45/700 white, gap 56. */
export function About() {
  return (
    <section className="frame flex flex-col gap-10 pb-[120px] pt-6">
      <FitText text="About Prana" />
      <div className="flex flex-col gap-12 md:flex-row md:justify-between">
        <div className="h-[340px] w-[310px] max-w-full shrink-0 bg-[url(/portrait.jpg)] bg-cover bg-center md:sticky md:top-24" />
        <div className="flex max-w-[760px] flex-col gap-14">
          {profile.paragraphs.map((paragraph) => (
            <p key={paragraph} className="body-xl text-fg">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Capabilities (16:12) — Row gap 24 → 36 on hover, divider 15% → 100%. */
export function Capabilities() {
  return (
    <section className="frame flex flex-col gap-12 pb-[120px] md:flex-row md:justify-between">
      <div className="flex flex-col gap-3">
        <span className="label">(Capabilities)</span>
        <p className="text-[45px] font-bold leading-none tracking-[-0.04em]">
          What I do
        </p>
      </div>

      <ul className="w-full max-w-[750px]">
        {capabilities.map((item) => (
          <motion.li
            key={item.label}
            className="border-b border-line"
            {...hoverRoot}
            variants={rowBorder}
            transition={t300}
          >
            <RowMotion className="flex min-h-[100px] items-center px-0">
              <ArrowSub className={item.dim ? "text-dim" : "text-fg"} />
              <span
                className={`text-4xl font-bold tracking-[-0.04em] ${
                  item.dim ? "text-dim" : "text-fg"
                }`}
              >
                {item.label}
              </span>
            </RowMotion>
          </motion.li>
        ))}
        <li className="pt-12">
          <MotionLink href="/about" className="group text-2xl text-fg transition-colors hover:text-muted focus-visible:text-muted motion-reduce:transition-none">
            <span className="group-hover:underline group-focus-visible:underline">Read more</span>
          </MotionLink>
        </li>
      </ul>
    </section>
  );
}

/* Tech Stack (32:156) — gap 40, label left / intro right (bottom aligned). */
export function TechStack() {
  const track = [...tools, ...tools];
  const reduce = useStaticMotion();

  return (
    <section className="flex flex-col gap-10 pb-[120px]">
      <div className="frame">
        <FitText text="The Toolkit" />
      </div>

      <div className="frame flex items-end justify-between gap-8">
        <div className="flex flex-col gap-3">
          <span className="label">(Tech Stack)</span>
          <span className="label">12 elements · 5 groups</span>
        </div>
        <p className="body-xl max-w-[760px] text-muted">
          The tools I use to clean data, train models, and ship them to the web.
        </p>
      </div>

      <Marquee>
          {track.map((tool, i) => (
            <div key={`${tool.name}-${i}`} className="flex items-center gap-10">
              <div className="flex items-center gap-3.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tool.logo} alt="" width={28} height={28} style={{ filter: "brightness(0) invert(1)" }} />
                <span className="text-[28px] font-bold tracking-[-0.03em]">
                  {tool.name}
                </span>
              </div>
              <span className="text-xl text-subtle">✳</span>
            </div>
          ))}
      </Marquee>

      <ul className="frame grid grid-cols-2 md:grid-cols-6">
        {tools.map((tool) => (
          <motion.li
            key={tool.name}
            data-tool={tool.name}
            className="relative flex h-[232px] min-w-0 w-full flex-col justify-between border border-line bg-bg p-4"
            {...hoverRoot}
            variants={{
              rest: { borderColor: color.line, backgroundColor: color.bg },
              hover: { borderColor: color.fg, backgroundColor: color.fg },
            }}
            transition={t300}
          >
            <motion.div className="flex justify-between text-[13px] text-subtle" variants={tileText} transition={t300}>
              <span>{tool.category}</span>
              <span>{tool.index}</span>
            </motion.div>
            <div className="flex flex-col items-start gap-3">
              <motion.img
                src={tool.logo}
                alt=""
                width={56}
                height={56}
                variants={{
                  rest: { width: 56, height: 56, filter: "brightness(0) invert(1)" },
                  hover: { width: reduce ? 56 : 72, height: reduce ? 56 : 72, filter: "brightness(0) invert(0)" },
                }}
                transition={t300}
              />
              <motion.span
                className="text-[20px] font-bold tracking-[-0.03em]"
                variants={{ rest: { color: color.fg }, hover: { color: color.black } }}
                transition={t300}
              >
                {tool.name}
              </motion.span>
            </div>
          </motion.li>
        ))}
      </ul>

      <div className="frame flex justify-between text-sm text-subtle">
        <span>Always learning →</span>
      </div>
    </section>
  );
}

/* Highlights (16:45) — gap 56, stats gap 24 (no card fill), awards pad-top 40. */
export function Highlights() {
  return (
    <section className="frame flex flex-col gap-14 pb-[120px]">
      <FitText text="Highlights" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Reveal key={stat.label} className="flex flex-col gap-3 py-8">
            <span className="text-[120px] font-bold leading-[0.9] tracking-[-0.06em]">
              {stat.value}
            </span>
            <span className="text-base text-muted">{stat.label}</span>
          </Reveal>
        ))}
      </div>

      <div className="flex flex-col pt-10">
        <span className="label mb-5">(Awards &amp; Certifications)</span>
        {awards.map((award) => (
          <motion.div
            key={award.title}
            className="flex flex-col gap-2 border-b border-line py-7 md:flex-row md:items-center md:gap-6"
            {...hoverRoot}
            variants={rowBorder}
            transition={t300}
          >
            <ArrowSub size={24} className="shrink-0 text-fg" />
            <span className="flex-1 text-4xl font-bold tracking-[-0.04em]">
              {award.title}
            </span>
            <span className="text-base text-muted md:w-[200px]">{award.org}</span>
            <span className="text-base text-muted">{award.year}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
