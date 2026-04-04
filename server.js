require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();

/* =========================
   Middlewares
========================= */

app.use(cors());
app.use(express.json());

/* =========================
   MongoDB Connection
========================= */

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.log("❌ MongoDB Error:", err);
});

/* =========================
   Registration Schema
========================= */

const registrationSchema = new mongoose.Schema({

  fullName: String,
  studentId: String,
  email: String,
  department: String,
  yearOfStudy: String,
  message: String,

  eventId: Number,
  eventName: String,
  eventDate: String,
  eventVenue: String,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

const Registration = mongoose.model("Registration", registrationSchema);

/* =========================
   OTP Schema
========================= */

const otpSchema = new mongoose.Schema({

  email: String,
  otp: String,

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300   // OTP expires in 5 minutes
  }

});

const OTP = mongoose.model("OTP", otpSchema);

/* =========================
   OTP Generator
========================= */

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/* =========================
   Send Email via Brevo API
========================= */

async function sendEmail(to, otp) {
  await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: { name: "Event Team", email: "ronak6609@gmail.com" },
      to: [{ email: to }],
      subject: "Event Registration OTP",
      textContent: `Your verification OTP is ${otp}. It will expire in 5 minutes.`
    },
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json"
      }
    }
  );
}

/* =========================
   Routes
========================= */

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

/* ---------- SEND OTP ---------- */

app.post("/send-otp", async (req, res) => {

  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const otp = generateOTP();

    await OTP.create({ email, otp });

    await sendEmail(email, otp);

    res.json({
      success: true,
      message: "OTP sent successfully"
    });

  } catch (error) {

    console.log("❌ OTP Error:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Failed to send OTP"
    });

  }

});

/* ---------- VERIFY OTP ---------- */

app.post("/verify-otp", async (req, res) => {

  try {

    const { email, otp } = req.body;

    const record = await OTP.findOne({ email, otp });

    if (!record) {

      return res.json({
        success: false,
        message: "Invalid or expired OTP"
      });

    }

    res.json({
      success: true,
      message: "OTP verified"
    });

  } catch (err) {

    console.log("❌ Verify OTP Error:", err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

});

/* ---------- REGISTER USER ---------- */

app.post("/api/register", async (req, res) => {

  try {

    const newRegistration = new Registration(req.body);

    const savedData = await newRegistration.save();

    res.json({
      success: true,
      id: savedData._id
    });

  } catch (error) {

    console.error("❌ Registration Error:", error);

    res.status(500).json({
      error: "Failed to save registration"
    });

  }

});

/* =========================
   Start Server
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
})