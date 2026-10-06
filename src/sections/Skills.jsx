import { useLayoutEffect, useRef } from "react";
import { gsap, reduceMotion, scrollVelocity } from "../lib/scroll";
import { skills, marqueeWords } from "../data";

function Marquee() {
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const el = trackRef.current;
    if (!el) return;

    let tween;
    const boost = () => {
      if (!tween) return;
      const v = Math.abs(scrollVelocity());
      tween.timeScale(gsap.utils.clamp(1, 3.2, 1 + v / 320));
    };

    const setup = () => {
      tween?.kill();
      gsap.ticker.remove(boost);
      const half = el.scrollWidth / 2;
      if (!half) return;
      tween = gsap.to(el, {
        x: -half,
        duration: 26,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => `${parseFloat(x) % half}px`,
        },
      });
      gsap.ticker.add(boost);
    };

    setup();
    window.addEventListener("resize", setup);
    document.fonts?.ready.then(setup);

    return () => {
      window.removeEventListener("resize", setup);
      gsap.ticker.remove(boost);
      tween?.kill();
      gsap.set(el, { x: 0 });
    };
  }, []);

  const items = [...marqueeWords, ...marqueeWords];

  return (
    <div className="overflow-hidden py-6 border-y border-line bg-subtle/50 select-none" aria-hidden="true">
      <div ref={trackRef} className="flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-track">
            {items.map((w, i) => (
              <span key={`${copy}-${i}`} className="flex items-center gap-6">
                <span className="display text-[1.35rem] md:text-[1.7rem] text-ink/85 whitespace-nowrap">
                  {w}
                </span>
                <span className="inline-block w-1.5 h-1.5 rotate-45 bg-accent shrink-0" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-group]", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-groups]", start: "top 84%" },
      });
    }, rootRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={rootRef} className="py-24 lg:py-36 scroll-mt-20">
      <div className="shell">
        <h2 className="display text-[clamp(1.9rem,4vw,3.4rem)] mb-12 lg:mb-16 max-w-[20ch]">
          Skills demonstrated through the work.
        </h2>

        <div data-groups className="grid md:grid-cols-3 gap-8 md:gap-6">
          {skills.map((g) => (
            <div key={g.group} data-group>
              <span className="label block mb-4 pb-4 border-b border-line">
                {g.group}
              </span>
              <ul>
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="py-3.5 border-b border-line flex items-center gap-3 text-[0.97rem] transition-colors duration-200 hover:text-accent-deep"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 lg:mt-20">
        <Marquee />
      </div>
    </section>
  );
}
