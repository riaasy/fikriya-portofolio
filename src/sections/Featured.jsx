import { useLayoutEffect, useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { gsap, reduceMotion } from "../lib/scroll";
import { featured } from "../data";

function Metric({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3.5 border-b border-white/15 last:border-b-0">
      <span className="text-sm text-white/75">{label}</span>
      <span
        data-metric={value}
        className="font-mono text-2xl md:text-[1.7rem] font-semibold tabular-nums text-white"
      >
        {reduceMotion ? value.toFixed(2) : "0.00"}
      </span>
    </div>
  );
}

export default function Featured() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: 0.75,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.from("[data-node]", {
        opacity: 0,
        y: 18,
        scale: 0.96,
        duration: 0.55,
        stagger: 0.07,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: "[data-pipeline]", start: "top 82%" },
      });

      document.querySelectorAll("[data-metric]").forEach((el) => {
        const target = parseFloat(el.dataset.metric);
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = state.v.toFixed(2);
          },
        });
      });

      gsap.utils.toArray("[data-chapter]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
      });
    }, rootRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section id="project" ref={rootRef} className="py-24 lg:py-36 scroll-mt-20 bg-subtle/60">
      <div className="shell">
        <div className="max-w-[64ch] mb-12 lg:mb-16">
          <span data-reveal className="label block mb-4">
            {featured.eyebrow}
          </span>
          <h2 data-reveal className="display text-[clamp(1.9rem,4vw,3.4rem)] mb-6">
            {featured.title}
          </h2>
          <div data-reveal className="flex flex-wrap gap-x-6 gap-y-1 mb-6">
            <span className="label">{featured.role}</span>
            <span className="label">{featured.kind}</span>
          </div>
          <p data-reveal className="text-muted text-base md:text-lg leading-relaxed max-w-[58ch]">
            {featured.summary}
          </p>
        </div>

        {/* Pipeline band — real process, rendered as a flow */}
        <div data-pipeline data-reveal className="card mb-16 lg:mb-20">
          <div className="card-inner p-5 md:p-7">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-4">
              {featured.pipeline.map((node, i) => (
                <div key={node.id} className="flex items-center gap-2">
                  <div
                    data-node
                    className="rounded-2xl border border-line bg-bg px-4 py-3"
                  >
                    <span className="block text-sm font-semibold leading-tight">
                      {node.label}
                    </span>
                    <span className="block font-mono text-[0.68rem] text-muted mt-1 tracking-tight">
                      {node.note}
                    </span>
                  </div>
                  {i < featured.pipeline.length - 1 && (
                    <ArrowRight
                      data-node
                      size={16}
                      weight="bold"
                      className="text-accent shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chapters + sticky metrics */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-7 flex flex-col gap-10 lg:gap-14">
            {featured.chapters.map((c) => (
              <article key={c.n} data-chapter>
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-mono text-accent text-sm font-semibold">
                    {c.n}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
                    {c.title}
                  </h3>
                </div>
                <p className="text-muted leading-relaxed max-w-[60ch] pl-0 md:pl-9">
                  {c.body}
                </p>
                <div className="flex flex-wrap gap-2 mt-4 md:pl-9">
                  {c.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div
                className="rounded-[28px] p-7 md:p-8 shadow-[0_20px_60px_-20px_rgba(190,24,93,0.4)]"
                style={{
                  background:
                    "linear-gradient(155deg, #db2777 0%, #be185d 55%, #9d174d 100%)",
                }}
              >
                <span className="label text-white/70 block mb-5">
                  Best scenario results
                </span>
                <div>
                  {featured.metrics.map((m) => (
                    <Metric key={m.key} label={m.label} value={m.value} />
                  ))}
                </div>
                <p className="text-sm text-white/80 mt-5 leading-relaxed">
                  {featured.metricsNote}
                </p>
              </div>

              <ul className="mt-8 flex flex-col gap-4">
                {featured.outcomes.map((o, i) => (
                  <li key={i} className="flex gap-3 text-[0.95rem] leading-relaxed">
                    <span className="text-accent font-mono text-sm shrink-0 pt-0.5">
                      –
                    </span>
                    <span className="text-muted">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="flex flex-wrap gap-2 mt-14 lg:mt-16" data-reveal>
          {featured.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
