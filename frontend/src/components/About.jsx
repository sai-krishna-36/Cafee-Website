import { Heart, Leaf, Coffee } from "lucide-react";

const values = [
  { icon: Coffee, title: "Coffee with character", text: "Carefully brewed cups, made to be enjoyed slowly." },
  { icon: Leaf, title: "Fresh, always", text: "Seasonal ingredients and plates made with care." },
  { icon: Heart, title: "A place to belong", text: "Warm welcomes, familiar faces and room for everyone." }
];

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container about-grid">
        <div className="about-photo-wrap reveal">
          <img
            className="about-photo"
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1100&q=85"
            alt="Warm and welcoming cafe interior"
            loading="lazy"
          />
          <div className="photo-caption"><span>MADE FOR THE MOMENTS IN BETWEEN</span></div>
        </div>
        <div className="about-copy reveal">
          <p className="eyebrow">A PLACE WITH A STORY</p>
          <h2>More than a coffee stop. <em>A feeling.</em></h2>
          <p className="body-copy">
            Destination Cafe is built around a simple thought: the best
            moments often happen when you slow down. Come by for your
            morning coffee, stay for brunch, and make yourself at home.
          </p>
          <div className="value-list">
            {values.map(({ icon: Icon, title, text }) => (
              <div className="value-item" key={title}>
                <span className="value-icon"><Icon size={19} /></span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
