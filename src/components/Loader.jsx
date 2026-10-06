import { useEffect, useRef, useState } from "react";
import { gsap, reduceMotion } from "../lib/scroll";

export default function Loader({ onDone }) {
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const doneRef = useRef(onDone);
  const [count, setCount] = useState(0);

  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (reduceMotion) {
      doneRef.current();
      return;
    }
    document.documentElement.classList.add("is-locked");
    const state = { v: 0 };
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            document.documentElement.classList.remove("is-locked");
            doneRef.current();
          },
        })
        .to(
          state,
          {
            v: 100,
            duration: 1.15,
            ease: "power2.inOut",
            onUpdate: () => setCount(Math.round(state.v)),
          },
          0
        )
        .fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.15, ease: "power2.inOut" },
          0
        )
        .to(rootRef.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.7,
          ease: "expo.inOut",
        }, "+=0.12");
    }, rootRef.current);

    return () => {
      document.documentElement.classList.remove("is-locked");
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[var(--z-loader)] flex flex-col justify-end bg-bg"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden="true"
    >
      <div className="shell flex-1 flex items-end pb-10">
        <span className="display text-[18vw] lg:text-[11rem] leading-none tabular-nums text-ink/90">
          {String(count).padStart(3, "0")}
        </span>
      </div>
      <div className="h-[3px] w-full bg-line-subtle">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
