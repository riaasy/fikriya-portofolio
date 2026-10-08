import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { gsap, reduceMotion } from "../lib/scroll";
import { certificates } from "../data";

export default function Certificates() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-cert]", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-certs]", start: "top 84%" },
      });
    }, rootRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section id="certificates" ref={rootRef} className="py-24 lg:py-36 scroll-mt-20">
      <div className="shell">
        <h2 className="display text-[clamp(1.9rem,4vw,3.4rem)] mb-12 lg:mb-16 max-w-[20ch]">
          Certificates &amp; training.
        </h2>

        <div data-certs className="grid md:grid-cols-2 gap-8 md:gap-6">
          {certificates.map((c) => (
            <article
              key={c.id}
              data-cert
              className="group flex flex-col gap-6 border border-line p-6 lg:p-8 transition-colors duration-300 hover:border-accent"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="label">Certificate of Training</span>
                <span className="font-mono text-sm text-muted shrink-0">
                  No. {c.credentialNo}
                </span>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-medium mb-3">{c.title}</h3>
                <p className="text-base text-ink/85">
                  {c.issuer} · {c.date} · {c.location}
                </p>
                <p className="text-muted text-sm mt-1">{c.issuerDetail}</p>
              </div>

              <ul className="grow border-t border-line">
                {c.topics.map((t) => (
                  <li
                    key={t}
                    className="py-3.5 border-b border-line flex items-center gap-3 text-[0.97rem]"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                      aria-hidden="true"
                    />
                    {t}
                  </li>
                ))}
              </ul>

              <a
                href={c.pdf}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost self-start"
              >
                View certificate
                <ArrowUpRight
                  size={16}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
