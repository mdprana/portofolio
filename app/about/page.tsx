import type { Metadata } from "next";
import * as motion from "motion/react-client";
import FitText from "@/components/fit-text";
import Footer from "@/components/footer";
import HeroImage from "@/components/hero-image";
import Nav from "@/components/nav";
import { MotionLink, RowMotion } from "@/components/motion";
import Reveal from "@/components/reveal";
import { ArrowSub } from "@/components/icons";
import { capabilities, profile, publication, timeline } from "@/lib/content";
import { hoverRoot, rowBorder, tw } from "@/lib/motion";

export const metadata: Metadata = { title: "About" };

/** About page (Figma 18:112) — intro, experience timeline, capabilities. */
export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="frame flex flex-col gap-10 pb-[120px] pt-6">
          <FitText text="About Prana" as="h1" />

          <div className="flex flex-col gap-12 md:flex-row md:gap-16">
            <HeroImage src="/portrait.jpg" mobileStatic={false} scope="about-image" className="h-[340px] w-[310px] max-w-full shrink-0 md:sticky md:top-24" />

            <div className="flex max-w-[760px] flex-col gap-10">
              <div className="flex flex-col gap-10">
                {profile.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="body-xl text-fg">{paragraph}</p>
                ))}
              </div>

              <span className="label">(Experience)</span>

              <ol className="flex flex-col">
                {timeline.map((item, i) => (
                  <li key={item.role} className="flex gap-10">
                    <div className="flex w-6 shrink-0 flex-col items-center">
                      <span className="mt-10 size-4 shrink-0 rounded-full bg-fg" />
                      {i < timeline.length - 1 && (
                        <span className="w-0.5 flex-1 bg-line-strong" />
                      )}
                    </div>

                    <Reveal delay={i * 80} className="min-w-0 flex-1 pt-10 pb-[72px]">
                      <span className="mb-4 flex h-10 items-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.logo} alt="" className="h-full w-auto max-w-[160px] object-contain" loading="lazy" />
                      </span>
                      <p className="text-base text-muted">{item.period}</p>
                      <h3 className="mt-3 text-[40px] font-bold leading-[1.1] tracking-[-0.04em] [overflow-wrap:anywhere]">
                        {item.role}
                      </h3>
                      <p className="mt-3 flex min-w-0 items-center gap-2 text-xl text-muted">
                        <ArrowSub size={20} />
                        <span className="min-w-0 [overflow-wrap:anywhere]">{item.org}</span>
                      </p>
                      <p className="mt-3 max-w-[696px] text-xl text-muted [overflow-wrap:anywhere]">
                        {item.description}
                      </p>
                    </Reveal>
                  </li>
                ))}
              </ol>

              <span className="label">(Publication)</span>

              <Reveal>
                <h3 className="text-[40px] font-bold leading-[1.1] tracking-[-0.04em] [overflow-wrap:anywhere]">
                  <a href={publication.url} target="_blank" rel="noopener noreferrer" className="hover:underline focus-visible:underline">
                    {publication.title}
                  </a>
                </h3>
                <p className="mt-3 text-xl text-muted">{publication.authors}</p>
                <p className="mt-3 text-xl text-muted">{publication.journal}, {publication.year}</p>
                <p className="mt-3 text-xl text-muted [overflow-wrap:anywhere]">
                  DOI:{" "}
                  <a href={publication.doiUrl} target="_blank" rel="noopener noreferrer" className="hover:underline focus-visible:underline">
                    {publication.doi}
                  </a>
                </p>
              </Reveal>
            </div>
          </div>
        </section>

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
                className="flex flex-col justify-between border-b border-line"
                {...hoverRoot}
                variants={rowBorder}
                transition={tw(300)}
              >
                <RowMotion className="flex items-center py-7 text-4xl font-bold tracking-[-0.04em]">
                  <ArrowSub className={item.dim ? "text-dim" : "text-fg"} />
                  <span className={item.dim ? "text-dim" : "text-fg"}>
                    {item.label}
                  </span>
                </RowMotion>
              </motion.li>
            ))}
            <li className="pt-12">
              <MotionLink href="/contact" className="group text-2xl text-fg transition-colors hover:text-muted focus-visible:text-muted motion-reduce:transition-none">
                <span className="group-hover:underline group-focus-visible:underline">Read more</span>
              </MotionLink>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
