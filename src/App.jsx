import { useEffect, useState } from "react";
import {
  initScroll,
  destroyScroll,
  ScrollTrigger,
  reduceMotion,
} from "./lib/scroll";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import Profile from "./sections/Profile";
import Featured from "./sections/Featured";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";

export default function App() {
  const [ready, setReady] = useState(reduceMotion);

  useEffect(() => {
    initScroll();
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => destroyScroll();
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {!reduceMotion && <Loader onDone={() => setReady(true)} />}
      <Nav />
      <main id="main" style={{ position: "relative", zIndex: "var(--z-content)" }}>
        <Hero ready={ready} />
        <Profile />
        <Featured />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
