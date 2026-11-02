import { Clock3, MapPin, Phone } from "lucide-react";

export default function Visit() {
  return (
    <section className="section visit-section" id="visit">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">COME ON IN</p>
          <h2>Your table is <em>waiting.</em></h2>
          <p>Find us, say hello, and make a day of it.</p>
        </div>
        <div className="visit-grid">
          <div className="visit-card reveal"><span className="visit-icon"><MapPin /></span><h3>Find us</h3><p>Replace with your cafe's street address<br />City, State, PIN code</p></div>
          <div className="visit-card reveal"><span className="visit-icon"><Clock3 /></span><h3>Opening hours</h3><p>Monday – Friday: 8 AM – 9 PM<br />Saturday – Sunday: 9 AM – 10 PM</p></div>
          <div className="visit-card reveal"><span className="visit-icon"><Phone /></span><h3>Say hello</h3><p>+91 98765 43210<br />hello@destinationcafe.in</p></div>
        </div>
      </div>
    </section>
  );
}
