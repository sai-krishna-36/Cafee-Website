import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-shade" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">A LITTLE PAUSE. A LOT OF GOOD.</p>
          <h1>Find your way<br />to <em>something</em><br />delicious.</h1>
          <p className="hero-description">
            Thoughtful coffee, fresh-from-the-kitchen plates, and a place
            that feels like your favourite part of the day.
          </p>
          <div className="hero-actions">
            <a className="button button-light" href="#menu">Explore the Menu <ArrowUpRight size={17} /></a>
            <a className="text-link text-link-light" href="#about">Discover our story</a>
          </div>
        </div>
        <a className="hero-scroll" href="#about"><ArrowDown size={16} /> Scroll to explore</a>
        <div className="hero-note"><span>01 / 05</span><span>GOOD FOOD, GOOD MOOD</span></div>
      </div>
    </section>
  );
}
