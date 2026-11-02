require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    // Allow tools such as curl/Postman (no Origin header) and configured sites.
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin not allowed by CORS"));
  }
}));
app.use(express.json({ limit: "20kb" }));

const bookingLimiter = rateLimit({
  windowMs: 15 *  60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many booking attempts. Please try again later." }
});

app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("Health check database error:", error.message);
    res.status(503).json({ status: "error", database: "unavailable" });
  }
});

app.post("/api/bookings", bookingLimiter, async (req, res) => {
  try {
    const { name, phone, date, time, guests, specialRequest = "" } = req.body;

    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanPhone = typeof phone === "string" ? phone.trim() : "";
    const cleanRequest = typeof specialRequest === "string" ? specialRequest.trim() : "";
    const guestCount = Number(guests);

    if (!cleanName || cleanName.length > 100) {
      return res.status(400).json({ message: "Enter your name (maximum 100 characters)." });
    }
    if (!/^[0-9+()\-\s]{7,20}$/.test(cleanPhone)) {
      return res.status(400).json({ message: "Enter a valid phone number." });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date || ""))) {
      return res.status(400).json({ message: "Choose a valid booking date." });
    }
    const parsedDate = new Date(`${date}T00:00:00.000Z`);
    if (Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date) {
      return res.status(400).json({ message: "Choose a valid booking date." });
    }
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    if (parsedDate < todayUTC) {
      return res.status(400).json({ message: "Booking date cannot be in the past." });
    }
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(time || ""))) {
      return res.status(400).json({ message: "Choose a valid booking time." });
    }
    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 12) {
      return res.status(400).json({ message: "Guests must be between 1 and 12." });
    }
    if (cleanRequest.length > 500) {
      return res.status(400).json({ message: "Special request must be 500 characters or fewer." });
    }

    const [result] = await db.execute(
      `INSERT INTO bookings
       (customer_name, phone, booking_date, booking_time, guests, special_request)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [cleanName, cleanPhone, date, `${time}:00`, guestCount, cleanRequest || null]
    );

    return res.status(201).json({
      message: "Thanks! Your reservation request has been received.",
      bookingId: result.insertId
    });
  } catch (error) {
    console.error("Create booking error:", error);
    return res.status(500).json({ message: "We couldn't save your request. Please try again." });
  }
});

app.use((err, req, res, next) => {
  if (err.message === "Origin not allowed by CORS") {
    return res.status(403).json({ message: "This website is not allowed to access the API." });
  }
  console.error(err);
  return res.status(500).json({ message: "Unexpected server error." });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Destination Cafe API listening on port ${PORT}`);
});
