import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const categories = ["All", "Coffee", "Brunch", "Mains", "Desserts"];

const items = [
  { name: "Velvet Cappuccino", category: "Coffee", price: 180, description: "Rich espresso, silky milk and a soft cocoa finish.", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=85", tag: "HOUSE FAVOURITE" },
  { name: "Iced Spanish Latte", category: "Coffee", price: 230, description: "A chilled espresso with a mellow, creamy sweetness.", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85" },
  { name: "Slow Brew Cold Coffee", category: "Coffee", price: 210, description: "Smooth, refreshing and steeped for a little longer.", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85" },
  { name: "Garden Avocado Toast", category: "Brunch", price: 320, description: "Sourdough, smashed avocado, herbs and a little zing.", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=85", tag: "BRUNCH PICK" },
  { name: "Berry Pancake Stack", category: "Brunch", price: 350, description: "Fluffy pancakes, seasonal berries and maple drizzle.", image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=85" },
  { name: "Sunshine Breakfast Bowl", category: "Brunch", price: 290, description: "A colourful bowl with fresh, feel-good ingredients.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85" },
  { name: "Creamy Pesto Pasta", category: "Mains", price: 390, description: "Pasta tossed in basil pesto with parmesan.", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85" },
  { name: "Grilled Garden Sandwich", category: "Mains", price: 280, description: "Toasted sourdough, grilled vegetables and house sauce.", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85" },
  { name: "Chocolate Fudge Slice", category: "Desserts", price: 240, description: "A rich chocolate treat for your afternoon pause.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85" }
];

export default function Menu() {
  const [active, setActive] = useState("All");
  const filteredItems = useMemo(
    () => active === "All" ? items : items.filter((item) => item.category === active),
    [active]
  );

  return (
    <section className="section menu-section" id="menu">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">A LITTLE SOMETHING FOR EVERYONE</p>
          <h2>Made fresh. <em>Served happy.</em></h2>
          <p>From the first sip to the last bite, find your new favourite.</p>
        </div>

        <div className="menu-tabs" role="tablist" aria-label="Menu categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active === category}
              className={active === category ? "menu-tab active" : "menu-tab"}
              onClick={() => setActive(category)}
            >{category}</button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredItems.map((item, index) => (
            <article className="menu-card" key={item.name} style={{ "--card-index": index }}>
              <div className="menu-image-wrap">
                <img src={item.image} alt={item.name} loading="lazy" />
                {item.tag && <span className="menu-tag">{item.tag}</span>}
              </div>
              <div className="menu-card-content">
                <div className="menu-card-top"><span className="menu-category">{item.category}</span><span className="menu-price">₹{item.price}</span></div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <a className="menu-card-link" href="#reserve">Make it yours <ArrowUpRight size={15} /></a>
              </div>
            </article>
          ))}
        </div>
        <p className="menu-footnote">Menu and prices are sample content and can be edited to match your cafe.</p>
      </div>
    </section>
  );
}
