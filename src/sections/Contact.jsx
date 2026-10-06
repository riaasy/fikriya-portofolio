import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "@phosphor-icons/react";
import { gsap, reduceMotion } from "../lib/scroll";
import { profile, socials } from "../data";

export default function Contact() {
  const rootRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        opacity: 0,
        y: 30,
        duration: 0.75,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-reveal]", start: "top 86%" },
      });
    }, rootRef.current);
    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(socials[2].handle);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = socials[2].href;
    }
  };

  return (
    <section id="contact" ref={rootRef} className="py-24 lg:py-36 scroll-mt-20">
      <div className="shell">
        <div className="max-w-[60ch] mb-10">
          <h2 data-reveal className="display text-[clamp(1.9rem,4vw,3.4rem)] mb-5">
            {profile.status}.
          </h2>
          <p data-reveal className="text-muted text-base md:text-lg leading-relaxed">
            For opportunities, collaborations, or questions about the project —
            reach out on any channel below.
          </p>
        </div>

        <ul data-reveal className="border-t border-line max-w-[760px]">
          {socials.map((s) => (
            <li key={s.label} className="border-b border-line">
              <a
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 py-5 transition-colors duration-200 hover:text-accent-deep"
              >
                <span className="flex flex-col gap-1 min-w-0">
                  <span className="label">{s.label}</span>
                  <span className="text-base md:text-lg font-medium truncate">
                    {s.handle}
                  </span>
                </span>
                <ArrowUpRight
                  size={22}
                  weight="bold"
                  className="text-muted shrink-0 transition-all duration-200 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        <div data-reveal className="flex flex-wrap items-center gap-3 mt-8">
          <a href={socials[2].href} className="btn btn-primary">
            Contact
          </a>
          <button type="button" onClick={copyEmail} className="btn btn-ghost">
            {copied ? (
              <>
                <Check size={16} weight="bold" /> Copied
              </>
            ) : (
              <>
                <Copy size={16} /> Copy email
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
