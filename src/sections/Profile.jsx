import { useLayoutEffect, useRef } from "react";
import { gsap, reduceMotion } from "../lib/scroll";
import { about } from "../data";

const words = about.statement.split(" ");

export default function Profile() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-scrub]",
        { color: "#cbb6bf" },
        {
          color: "#1a1418",
          ease: "none",
          stagger: 0.03,
          scrollTrigger: {
            trigger: "[data-scrub-wrap]",
            start: "top 78%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      );
      gsap.from("[data-meta-row]", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-meta-row]", start: "top 88%" },
      });
    }, rootRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section id="profile" ref={rootRef} className="py-24 lg:py-36 scroll-mt-20">
      <div className="shell">
        <div className="max-w-[52ch] mb-10 lg:mb-14">
          <h2 className="display text-[clamp(1.75rem,3.4vw,2.75rem)]">
            Balancing technical depth with real-world validity.
          </h2>
        </div>

        <p
          data-scrub-wrap
          className="text-[clamp(1.2rem,2.4vw,1.85rem)] leading-[1.55] font-medium tracking-[-0.01em] max-w-[62ch] mb-14 lg:mb-20"
        >
          {words.map((w, i) => (
            <span key={i} data-scrub className="inline-block whitespace-pre">
              {w + " "}
            </span>
          ))}
        </p>

        <div className="grid sm:grid-cols-3 border-t border-line">
          {about.meta.map((m) => (
            <div
              key={m.label}
              data-meta-row
              className="py-6 sm:py-7 sm:pr-8 border-b sm:border-b-0 sm:border-r last:border-r-0 border-line sm:px-6 sm:first:pl-0"
            >
              <span className="label block mb-2">{m.label}</span>
              <span className="text-[0.95rem] leading-snug">{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
