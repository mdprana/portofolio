import type { Metadata } from "next";
import Image from "next/image";
import * as motion from "motion/react-client";
import { notFound } from "next/navigation";
import FitText from "@/components/fit-text";
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import { MotionLink } from "@/components/motion";
import { MeasuredReveal } from "@/components/reveal";
import { nextProject, projectBySlug, projects, stackLogos } from "@/lib/content";
import { hoverRoot, textMuted, tw } from "@/lib/motion";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  return {
    title: project ? `${project.title} — ${project.type}` : "Project",
    description: project?.summary ?? project?.caseStudy.problem,
  };
}

const meta = ["year", "role", "stack", "type"] as const;

/** Project Detail (Figma 17:2) — hero title, meta row, cover, case study, gallery. */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const next = nextProject(project.slug);
  const rows = [
    { label: "(Problem)", text: project.caseStudy.problem },
    { label: "(Approach)", text: project.caseStudy.approach },
    { label: "(Result)", text: project.caseStudy.result },
  ];

  const shots = (list: NonNullable<typeof project.gallery>) =>
    list.length > 0 && (
      <section className="frame flex flex-col gap-6 md:gap-12">
        {list.map((shot) => (
          <Image
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1440px) calc(100vw - 48px), 1392px"
            className="h-auto w-full rounded-card"
          />
        ))}
      </section>
    );
  const [firstShot, ...restShots] = project.gallery ?? [];

  const values: Record<(typeof meta)[number], string> = {
    year: project.year,
    role: project.role,
    stack: project.stack,
    type: project.type,
  };

  return (
    <>
      <Nav />
      <main>
        <section className="frame flex flex-col gap-8 pb-10 pt-6">
          <MeasuredReveal family="tween">
            <FitText text={project.title} as="h1" />
          </MeasuredReveal>
          {project.summary && <p className="body-xl max-w-[900px]">{project.summary}</p>}
          {(project.demoUrl || project.repoUrl) && (
            <div className="flex flex-wrap gap-6">
              {[
                { label: "View demo", href: project.demoUrl },
                { label: "Source code", href: project.repoUrl },
              ].map(({ label, href }) => href && (
                <a key={label} href={href} className="text-2xl text-fg underline transition-colors hover:text-muted focus-visible:text-muted motion-reduce:transition-none">
                  {label}
                </a>
              ))}
            </div>
          )}
          <MeasuredReveal family="tween">
            <dl className="flex flex-wrap justify-between gap-8">
              {meta.map((key) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <dt className="label">
                    {`(${key[0].toUpperCase()}${key.slice(1)})`}
                  </dt>
                  {key === "stack" ? (
                    <dd>
                      <ul className="flex flex-wrap items-center gap-4">
                        {project.stack.split(",").map((s) => s.trim()).map((name) => (
                          <li key={name} title={name}>
                            <Image
                              src={stackLogos[name]}
                              alt={name}
                              width={32}
                              height={32}
                              unoptimized
                              className="h-8 w-auto"
                              style={(["Express", "Next.js", "Vercel"].includes(name)) ? { filter: "brightness(0) invert(1)" } : undefined}
                            />
                          </li>
                        ))}
                      </ul>
                    </dd>
                  ) : (
                    <dd className="text-2xl font-bold tracking-[-0.03em]">
                      {values[key]}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </MeasuredReveal>
        </section>

        <div className="frame">
          {project.image ? (
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1440px) calc(100vw - 48px), 1392px"
              className="w-full h-auto"
            />
          ) : (
            <div
              className="aspect-[1392/820] w-full"
              style={{
                backgroundImage: `linear-gradient(135deg, ${project.cover[0]}, ${project.cover[1]})`,
              }}
            />
          )}
        </div>

        {firstShot && <div className="pt-6 md:pt-12">{shots([firstShot])}</div>}

        <section className="frame flex flex-col gap-24 py-[120px]">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-6 md:flex-row md:justify-between"
            >
              <span className="label shrink-0">{row.label}</span>
              <p className="body-xl max-w-[900px]">{row.text}</p>
            </div>
          ))}

          {project.metrics.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex flex-col gap-2 rounded-card bg-surface px-8 py-8"
                >
                  <span className="text-[72px] md:text-[96px] font-bold leading-none tracking-[-0.05em]">
                    {metric.value}
                  </span>
                  <span className="text-base text-muted">{metric.label}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {restShots.length > 0 && <div className="pb-[120px]">{shots(restShots)}</div>}

        {!project.image && (
          <section className="frame grid gap-6 pb-[120px] md:grid-cols-2">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="aspect-[684/700] w-full"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${
                    project.cover[i % 2]
                  }, ${project.cover[(i + 1) % 2]})`,
                }}
              />
            ))}
          </section>
        )}

        <MeasuredReveal family="tween">
          <MotionLink href={`/projects/${next.slug}`} className="frame block pb-10" {...hoverRoot}>
            <span className="label">(Next project)</span>
            <motion.div variants={textMuted} transition={tw(300)}>
              <FitText text={`${next.title} →`} as="p" className="mt-4" />
            </motion.div>
          </MotionLink>
        </MeasuredReveal>
      </main>
      <Footer />
    </>
  );
}
