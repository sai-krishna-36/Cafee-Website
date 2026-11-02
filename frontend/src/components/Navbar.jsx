import { useState } from "react";
import { Coffee, Menu, X } from "lucide-react";

const links = [
  ["Home", "#home"],
  ["Our Story", "#about"],
  ["Menu", "#menu"],
  ["Visit Us", "#visit"]
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={() => setOpen(false)}>
          <span className="brand-mark"><Coffee size={20} /></span>
          <span>destination<span className="brand-light"> cafe</span></span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>

        <div className={`nav-links ${open ? "nav-links-open" : ""}`}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="button button-small" href="#reserve" onClick={() => setOpen(false)}>
            Book a Table
          </a>
        </div>
      </nav>
    </header>
  );
}
