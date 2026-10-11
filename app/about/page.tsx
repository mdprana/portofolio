import type { Metadata } from "next";
import * as motion from "motion/react-client";
import FitText from "@/components/fit-text";
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import { MotionLink, RowMotion } from "@/components/motion";
import Reveal from "@/components/reveal";
import { ArrowSub } from "@/components/icons";
import { capabilities, profile, timeline } from "@/lib/content";
import { hoverRoot, rowBorder, textMuted, tw } from "@/lib/motion";

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
            <div className="h-[340px] w-[310px] max-w-full shrink-0 bg-[url(/portrait.jpg)] bg-cover bg-center md:sticky md:top-24" />

            <div className="flex max-w-[760px] flex-col gap-10">
              <p className="body-xl text-fg">{profile.paragraphs[0]}</p>

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

                    <Reveal delay={i * 80} className="flex-1 pt-10 pb-[72px]">
                      <p className="text-base text-muted">{item.period}</p>
                      <h3 className="mt-3 text-[40px] font-bold leading-[1.1] tracking-[-0.04em]">
                        {item.role}
                      </h3>
                      <p className="mt-3 flex items-center gap-2 text-xl text-muted">
                        <ArrowSub size={20} />
                        {item.org}
                      </p>
                      <p className="mt-3 max-w-[696px] text-xl text-muted">
                        {item.description}
                      </p>
                    </Reveal>
                  </li>
                ))}
              </ol>
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
              <MotionLink href="/contact" className="text-2xl" {...hoverRoot} variants={textMuted} transition={tw(250)}>
                Read more
              </MotionLink>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
