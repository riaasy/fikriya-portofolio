import { useLayoutEffect, useRef } from "react";
import { gsap, reduceMotion, scrollTo } from "../lib/scroll";
import { profile } from "../data";

export default function Hero({ ready }) {
  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const tlRef = useRef(null);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const listeners = [];
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      tl.from("[data-hero-line]", {
        yPercent: 115,
        duration: 0.95,
        stagger: 0.07,
        ease: "expo.out",
      })
        .from(
          "[data-hero-label]",
          { opacity: 0, y: 10, duration: 0.6, ease: "expo.out" },
          0.15
        )
        .from(
          "[data-hero-sub]",
          { opacity: 0, y: 16, duration: 0.7, ease: "expo.out" },
          "-=0.5"
        )
        .from(
          "[data-hero-cta]",
          { opacity: 0, y: 12, duration: 0.6, stagger: 0.08, ease: "expo.out" },
          "-=0.45"
        )
        .from(
          "[data-hero-card]",
          { opacity: 0, y: 36, scale: 0.97, duration: 1, ease: "expo.out" },
          0.1
        );
      tlRef.current = tl;

      gsap.to("[data-hero-inner]", {
        yPercent: -7,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Pointer tilt — fine pointers only, transform/opacity only
      if (cardRef.current && window.matchMedia("(pointer: fine)").matches) {
        const card = cardRef.current;
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
        gsap.set(card, { transformPerspective: 900 });
        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          rx(-py * 7);
          ry(px * 7);
        };
        const onLeave = () => {
          rx(0);
          ry(0);
        };
        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        listeners.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        });
      }
    }, rootRef.current);
    return () => {
      listeners.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  useLayoutEffect(() => {
    if (ready && tlRef.current) tlRef.current.play();
  }, [ready]);

  const go = (e, id) => {
    e.preventDefault();
    scrollTo(`#${id}`);
  };

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative min-h-[100dvh] flex items-center pt-24 pb-14 lg:pt-24"
    >
      <div data-hero-inner className="shell w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5 md:gap-7">
            <span data-hero-label className="label">
              ML · Computer Vision · Data Engineering
            </span>

            <h1 className="display text-[clamp(2.5rem,7vw,4.75rem)]">
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line className="block headline-gradient">
                  Fikriya Sabila
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line className="block headline-gradient">
                  Yusriyani
                </span>
              </span>
            </h1>

            <p data-hero-sub className="text-muted text-base md:text-lg leading-relaxed max-w-[46ch]">
              {profile.headline}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                data-hero-cta
                href="#project"
                onClick={(e) => go(e, "project")}
                className="btn btn-primary"
              >
                View project
              </a>
              <a
                data-hero-cta
                href="#contact"
                onClick={(e) => go(e, "contact")}
                className="btn btn-ghost"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div ref={cardRef} data-hero-card className="card mx-auto max-w-[420px] lg:max-w-none">
              <div className="card-inner overflow-hidden p-0">
                <img
                  src={profile.photo}
                  alt={`${profile.name}, machine learning and computer vision researcher`}
                  className="w-full h-[34vh] lg:h-auto lg:aspect-[4/5] object-cover object-top"
                  width={800}
                  height={1000}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
