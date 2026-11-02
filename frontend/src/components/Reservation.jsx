import { useState } from "react";
import { CalendarDays, CheckCircle2 } from "lucide-react";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

const initialForm = {
  name: "",
  phone: "",
  date: "",
  time: "",
  guests: "2",
  specialRequest: ""
};

export default function Reservation() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to submit your request.");

      setStatus({ type: "success", message: result.message });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message === "Failed to fetch"
          ? "Cannot reach the booking server. Please try again in a moment."
          : error.message
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="reservation-section" id="reserve">
      <div className="container reservation-grid">
        <div className="reservation-copy reveal">
          <p className="eyebrow">SAVE YOURSELF A SEAT</p>
          <h2>Good times are<br /><em>better together.</em></h2>
          <p>Planning a catch-up, a little celebration, or just a coffee date? Send us a reservation request and we'll take it from there.</p>
          <div className="reservation-note"><CalendarDays size={20} /><span>For same-day or large-group bookings, please call the cafe directly.</span></div>
        </div>

        <form className="reservation-form reveal" onSubmit={handleSubmit}>
          <div className="form-heading"><span>01 / YOUR DETAILS</span><h3>Book a table</h3></div>
          <label>Your name<input name="name" value={form.name} onChange={updateField} placeholder="e.g. Alex Morgan" maxLength="100" required /></label>
          <label>Phone number<input name="phone" value={form.phone} onChange={updateField} placeholder="Your contact number" type="tel" maxLength="20" required /></label>
          <div className="form-row">
            <label>Date<input name="date" type="date" min={minDate} value={form.date} onChange={updateField} required /></label>
            <label>Time<input name="time" type="time" value={form.time} onChange={updateField} required /></label>
          </div>
          <label>Number of guests
            <select name="guests" value={form.guests} onChange={updateField}>
              {Array.from({ length: 12 }, (_, index) => index + 1).map((number) => <option key={number} value={number}>{number} {number === 1 ? "guest" : "guests"}</option>)}
            </select>
          </label>
          <label>Special request <span className="optional">(optional)</span><textarea name="specialRequest" value={form.specialRequest} onChange={updateField} rows="3" maxLength="500" placeholder="Anything we should know?" /></label>
          <button className="button button-dark submit-button" type="submit" disabled={submitting}>
            {submitting ? "Sending request..." : "Request a reservation"}
          </button>
          {status.message && (
            <p className={`form-status ${status.type}`} role="status">
              {status.type === "success" && <CheckCircle2 size={17} />}
              {status.message}
            </p>
          )}
          <p className="form-small">Your request is subject to cafe confirmation. We only use these details to respond to your booking.</p>
        </form>
      </div>
    </section>
  );
}
