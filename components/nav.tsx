"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "motion/react";
import { MotionLink, useStaticMotion } from "@/components/motion";
import { nav, profile } from "@/lib/content";
import { heroSpring, hoverRoot, quint, textMuted, tw } from "@/lib/motion";

const roll = { rest: { y: 0 }, hover: { y: -20 } };

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Makassar",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Fixed width so the layout does not jitter as the seconds tick over.
  return (
    <span className="inline-block w-[150px] whitespace-nowrap tabular-nums" suppressHydrationWarning>
      {time || "00:00:00"} WITA
    </span>
  );
}

/** Menu Open — Mobile 390 (Figma 19:93). */
function MobileMenu({ onClose }: { onClose: (restoreFocus?: boolean) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const restoreFocus = useRef(true);
  const reduce = useStaticMotion();
  const close = (shouldRestoreFocus = true) => {
    restoreFocus.current = shouldRestoreFocus;
    onClose(shouldRestoreFocus);
  };
  useEffect(() => {
    const node = dialog.current!;
    const trigger = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    node.showModal();
    node.querySelector<HTMLButtonElement>("button")?.focus();
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("scroll-lock");
    return () => {
      node.close();
      document.body.style.overflow = overflow;
      document.documentElement.classList.remove("scroll-lock");
      if (restoreFocus.current) trigger?.focus();
    };
  }, []);

  return (
    <dialog ref={dialog} id="mobile-menu" aria-label="Mobile menu" aria-modal="true" onCancel={() => close()} onKeyDown={(event) => {
      if (event.key !== "Tab") return;
      const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')];
      const index = controls.indexOf(document.activeElement as HTMLElement);
      if ((event.shiftKey && index <= 0) || (!event.shiftKey && index === controls.length - 1)) {
        event.preventDefault();
        controls[event.shiftKey ? controls.length - 1 : 0]?.focus();
      }
    }} className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none open:flex flex-col justify-between bg-bg text-fg px-4 pb-8 pt-5">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-[15px]" onClick={() => close(false)}>
          {profile.wordmark}
        </Link>
        <motion.button
          type="button"
          onClick={() => close()}
          className="text-[15px]"
          initial={{ color: textMuted.rest.color }}
          whileHover={textMuted.hover}
          transition={tw(250)}
        >
          CLOSE
        </motion.button>
      </div>

      <motion.nav
        className="flex flex-col gap-1"
        initial={{ opacity: reduce ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        aria-label="Mobile"
      >
        {[{ label: "Home", href: "/" }, ...nav].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => close(false)}
            className="text-[64px] font-bold leading-[1] tracking-[-0.04em]"
          >
            {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
          </Link>
        ))}
      </motion.nav>

      <a href={`mailto:${profile.email}`} className="text-[18px]">
        {profile.email}
      </a>
    </dialog>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const reduce = useStaticMotion();
  const labelRoll = reduce ? { rest: { y: 0 }, hover: { y: 0 } } : roll;
  const controls = useAnimationControls();
  useLayoutEffect(() => {
    if (reduce) {
      controls.stop();
      controls.set({ opacity: 1, y: 0 });
    } else void controls.start({ y: 0, transition: { ...heroSpring, delay: 0.4 } });
    return () => controls.stop();
  }, [controls, reduce]);

  return (
    <>
      <header id="top" className="frame relative top-0 z-50 grid grid-cols-[1fr_auto_auto] items-center py-5 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:py-[30px]">
        <Link href="/" className="justify-self-start text-[15px] md:text-base">
          {profile.wordmark}
        </Link>

        <motion.nav
          data-motion-load="navigation"
          className="hidden items-center gap-12 justify-self-center md:flex"
          aria-label="Primary"
          initial={{ opacity: 1, y: -160, scale: 1, transformPerspective: 1200 }}
          animate={controls}
        >
          {nav.map((item) => (
            <MotionLink key={item.href} href={item.href} className="block" {...hoverRoot} whileFocus="hover">
              {/* Link roll: two stacked labels, second slides in on hover (Figma 0.35s). */}
              <span className="relative block h-5 overflow-hidden leading-5">
                <motion.span className="block h-5 leading-5" variants={labelRoll} transition={{ duration: 0.35, ease: quint }}>
                  {item.label}
                </motion.span>
                <motion.span
                  aria-hidden
                  className="absolute start-0 top-5 block h-5 leading-5"
                  variants={labelRoll}
                  transition={{ duration: 0.35, ease: quint }}
                >
                  {item.label}
                </motion.span>
              </span>
            </MotionLink>
          ))}
        </motion.nav>

        <div className="flex items-center gap-1.5 justify-self-end text-[15px] md:text-base">
          <span className="hidden text-muted md:inline">LOCAL /</span>
          <Clock />
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="ml-4 text-[15px] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-haspopup="dialog"
        >
          MENU
        </button>
      </header>

      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </>
  );
}
