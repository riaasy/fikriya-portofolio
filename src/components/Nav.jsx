import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, reduceMotion, scrollTo } from "../lib/scroll";
import { profile, sections } from "../data";

export default function Nav() {
  const navRef = useRef(null);
  const progressRef = useRef(null);
  const [active, setActive] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (progressRef.current) {
            gsap.set(progressRef.current, { scaleX: self.progress });
          }
          const hidden = self.direction === 1 && self.progress > 0.06;
          gsap.to(navRef.current, {
            yPercent: hidden ? -110 : 0,
            duration: 0.45,
            ease: "power3.out",
            overwrite: "auto",
          });
        },
      });
    }, navRef.current);
    return () => ctx.revert();
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    scrollTo(`#${id}`);
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[var(--z-nav)]"
      style={{
        background: "rgba(255, 244, 247, 0.82)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <nav className="shell flex items-center justify-between h-16 md:h-[72px]">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#top");
          }}
          className="flex items-center gap-2.5 font-semibold tracking-tight text-[0.95rem]"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
          {profile.firstName}
        </a>

        <div className="hidden md:flex items-center gap-1 p-1 rounded-full border border-line bg-white/60">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => go(e, s.id)}
              className={`px-4 h-9 inline-flex items-center rounded-full text-[0.82rem] font-medium transition-colors duration-200 ${
                active === s.id
                  ? "bg-accent text-white"
                  : "text-muted hover:text-ink"
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          onClick={(e) => go(e, "contact")}
          className="md:hidden btn btn-primary text-[0.85rem]"
        >
          Contact
        </a>
      </nav>
      <div className="h-[1.5px] w-full bg-line-subtle">
        <div ref={progressRef} className="h-full w-full origin-left bg-accent" />
      </div>
    </header>
  );
}
