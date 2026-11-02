import { Instagram, Facebook, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <a className="brand footer-logo" href="#home">destination<span className="brand-light"> cafe</span></a>
          <p>A little pause in your day.<br />A whole lot to look forward to.</p>
        </div>
        <div className="footer-nav"><h3>Explore</h3><a href="#about">Our Story</a><a href="#menu">The Menu</a><a href="#reserve">Reservations</a></div>
        <div className="footer-nav"><h3>Get in touch</h3><a href="#visit">Visit the cafe</a><a href="mailto:hello@destinationcafe.in">Send us an email <ArrowUpRight size={13} /></a><div className="social-links"><a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noreferrer"><Instagram size={17} /></a><a href="https://www.facebook.com/" aria-label="Facebook" target="_blank" rel="noreferrer"><Facebook size={17} /></a></div></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Destination Cafe. All rights reserved.</span><a href="#home">Back to top ↑</a></div>
    </footer>
  );
}
