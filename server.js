require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

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
    expires: 300
  }

});

const OTP = mongoose.model("OTP", otpSchema);


/* =========================
   Mail Setup
========================= */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


/* =========================
   OTP Generator
========================= */

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
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

    const otp = generateOTP();

    await OTP.create({ email, otp });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your verification OTP is ${otp}`
    });

    res.json({
      success: true,
      message: "OTP sent"
    });

  } catch (error) {

    console.log(error);

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

    console.error(error);

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
});
