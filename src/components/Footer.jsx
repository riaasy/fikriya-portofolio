import { ArrowUp } from "@phosphor-icons/react";
import { scrollToTop } from "../lib/scroll";
import { profile } from "../data";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">{profile.name}</span>
          <span className="label">{profile.focus}</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="label">© 2026</span>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="btn btn-ghost px-3.5"
            aria-label="Back to top"
          >
            <ArrowUp size={16} weight="bold" />
          </a>
        </div>
      </div>
    </footer>
  );
}
