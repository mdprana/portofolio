"use client";

import { useEffect, useRef } from "react";
import type { Ref } from "react";

/**
 * Figma types every display heading as "fit width" — the glyphs always fill the
 * 1392px column. Resolve the exact font-size by measuring the rendered string
 * (letter-spacing included) and scaling to the container. Renders at a sane
 * vw fallback first so there is no layout jump before hydration.
 */
export default function FitText({
  text,
  className = "",
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
}) {
  const ref = useRef<HTMLElement>(null);
  const figmaSize: Record<string, number> = {
    prana: 530,
    "Featured Projects": 176,
    "About Prana": 248,
    "The Toolkit": 279,
    Highlights: 302,
    "Get in touch": 257,
  };
  const knownSize = figmaSize[text];
  const fallbackSize = knownSize ?? 1392 / Math.max(1, text.length * 0.9);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      const width = el.clientWidth;
      if (!width) return;
      if (knownSize) {
        el.style.fontSize = `${fallbackSize * width / 1392}px`;
        return;
      }
      const probe = document.createElement("span");
      probe.textContent = text;
      probe.style.cssText =
        "position:absolute;visibility:hidden;white-space:nowrap;font:inherit;letter-spacing:inherit";
      el.appendChild(probe);
      const natural = probe.getBoundingClientRect().width;
      probe.remove();
      if (natural) el.style.fontSize = `${((width - 8) * parseFloat(getComputedStyle(el).fontSize)) / natural}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    document.fonts?.ready.then(fit);
    return () => observer.disconnect();
  }, [text, knownSize, fallbackSize]);

  return (
    // Tag is a union of intrinsic elements, so the ref widens to the union.
    <Tag ref={ref as unknown as Ref<HTMLHeadingElement>} className={`display ${className}`} style={{ fontSize: `calc(min(1392px, 100vw - 48px) * ${fallbackSize / 1392})` }}>
      {text}
    </Tag>
  );
}
