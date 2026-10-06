import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis = null;
let raf = null;

export function initScroll() {
  if (reduceMotion) return;
  lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.95 });
  lenis.on("scroll", ScrollTrigger.update);
  raf = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
}

export function destroyScroll() {
  if (raf) gsap.ticker.remove(raf);
  if (lenis) lenis.destroy();
  lenis = null;
  raf = null;
}

export function scrollTo(target) {
  const el = document.querySelector(target);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
}

export function scrollVelocity() {
  return lenis ? lenis.velocity : 0;
}
