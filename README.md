<div align="center">

<img src="https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge&logo=github" />
<img src="https://img.shields.io/badge/Made%20with-HTML%20%7C%20CSS%20%7C%20JS-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/Database-MongoDB%20Atlas-green?style=for-the-badge&logo=mongodb" />
<img src="https://img.shields.io/badge/Deployed-GitHub%20Pages-black?style=for-the-badge&logo=github" />

<br/><br/>

```
 ███████╗██╗   ██╗███████╗███╗   ██╗████████╗    ██████╗ ███████╗ ██████╗
 ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝    ██╔══██╗██╔════╝██╔════╝
 █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║       ██████╔╝█████╗  ██║  ███╗
 ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║       ██╔══██╗██╔══╝  ██║   ██║
 ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║       ██║  ██║███████╗╚██████╔╝
 ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝  ╚═╝       ╚═╝  ╚═╝╚══════╝ ╚═════╝
```

# 🎓 Campus Event Registration Portal

### *Your one-stop platform to discover, register & attend university events — Tech Fests, Cultural Nights, Workshops and more!*

<br/>

[![Live Demo](https://img.shields.io/badge/🌐%20View%20Live%20Demo-Click%20Here-ff6b6b?style=for-the-badge)](https://ronak6609-ops.github.io/Event-registration/)

</div>

---

## 📸 Preview

```
┌─────────────────────────────────────────────────────┐
│          🎓 University Events Portal                │
│                                                     │
│  12+ Active Events  |  2,400 Registered  |  8 Depts │
│                                                     │
│  [ Browse ] → [ Select ] → [ Details ] → [ Done ✓ ]│
└─────────────────────────────────────────────────────┘
```

> A multi-step registration flow with real-time email OTP verification, MongoDB Atlas storage, and a clean UI — all in one page.

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🔢 **5-Step Flow** | Guided step-by-step registration process |
| 📧 **Email OTP Verification** | Real OTP sent to user's email before registering |
| 🗄️ **MongoDB Atlas** | Secure cloud database storage for all entries |
| 📱 **Responsive Design** | Works perfectly on mobile, tablet & desktop |
| 🎯 **Event Filtering** | Filter events by Tech / Cultural / Workshop |
| 🎉 **Confirmation Screen** | Instant success confirmation with event name |
| 🔒 **Secure Data Handling** | Email verified before any data is saved |

---

## 🗺️ Registration Flow

```
Step 1          Step 2          Step 3          Step 4          Step 5
  │               │               │               │               │
  ▼               ▼               ▼               ▼               ▼
Browse         Select           Fill           Verify          🎉
Events    →    Event     →    Details    →    Email     →   Confirmed!
                              (Name,         (OTP sent
                              Dept,          to inbox)
                              Year)
```

---

## 🛠️ Tech Stack

```
Frontend
├── 📄 HTML5          — Semantic structure
├── 🎨 CSS3           — Custom styling & animations
└── ⚡ JavaScript (Vanilla) — Logic & API calls

Backend / Services
├── 🗄️ MongoDB Atlas   — Cloud database
├── 📧 Email API       — OTP delivery service
└── 🌐 GitHub Pages    — Static site hosting
```

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine:

### ✅ Prerequisites

Make sure you have the following installed:
- [Git](https://git-scm.com/)
- A modern browser (Chrome, Firefox, Edge)
- A code editor like [VS Code](https://code.visualstudio.com/)
- Node.js (if backend is involved)

---

### 📥 Step 1 — Clone the Repository

```bash
git clone https://github.com/ronak6609-ops/Event-registration.git
```

---

### 📂 Step 2 — Navigate into the Project Folder

```bash
cd Event-registration
```

---

### 🗄️ Step 3 — Set Up MongoDB Atlas

1. Go to [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a new **Cluster** (free tier works perfectly)
3. Create a **Database** (e.g., `eventdb`) and a **Collection** (e.g., `registrations`)
4. Go to **Database Access** → Add a new database user
5. Go to **Network Access** → Allow IP `0.0.0.0/0` (or your specific IP)
6. Click **Connect** on your cluster and copy the **connection string**

---

### 📧 Step 4 — Configure Email OTP Service

1. Set up an email service (e.g., [EmailJS](https://www.emailjs.com/) or your backend mailer)
2. Create a free account and get your **Service ID**, **Template ID**, and **Public Key**
3. Add these credentials in your JS config file or environment variables

---

### ⚙️ Step 5 — Configure Environment Variables

Create a config file or update the existing one with your credentials:

```javascript
// config.js (example)
const CONFIG = {
  MONGODB_URI: "your_mongodb_connection_string",
  EMAIL_SERVICE_ID: "your_emailjs_service_id",
  EMAIL_TEMPLATE_ID: "your_emailjs_template_id",
  EMAIL_PUBLIC_KEY: "your_emailjs_public_key"
};
```

> ⚠️ **Never commit real credentials to GitHub.** Use environment variables or a `.env` file, and add it to `.gitignore`.

---

### 🌐 Step 6 — Open in Browser

Since this is a static frontend project, simply open the file:

```bash
# Option A: Open directly
open index.html

# Option B: Use Live Server (VS Code extension)
# Right-click index.html → "Open with Live Server"
```

---

### 🔁 Step 7 — Test the Registration Flow

1. Open the app in your browser
2. Browse available events and select one
3. Fill in your details (Name, Student ID, Email, Department, Year)
4. Click **Send OTP** — check your email inbox
5. Enter the 6-digit OTP and click **Verify Code**
6. Click **Register Now** 🎉
7. Check your **MongoDB Atlas** dashboard — your entry should appear!

---

## 📁 Project Structure

```
Event-registration/
│
├── index.html          # Main HTML file (single-page app)
├── style.css           # All styles and animations
├── script.js           # Registration logic, OTP, API calls
├── config.js           # API keys and configuration (keep private!)
└── README.md           # You are here 📍
```

---

## 🌍 Deployment

This project is deployed using **GitHub Pages**:

1. Push your code to the `main` branch
2. Go to **Settings** → **Pages**
3. Set source to `main` branch → `/ (root)`
4. Your site will be live at:

```
https://<your-username>.github.io/Event-registration/
```

---

## 📊 Stats at a Glance

```
┌──────────────────────────────────────┐
│  🎪 12+   Active Events              │
│  👥 2,400 Students Registered        │
│  🏫 8     Departments Supported      │
│  📅 3     Days Left (Rolling)        │
└──────────────────────────────────────┘
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m "Add: amazing feature"

# 4. Push to the branch
git push origin feature/amazing-feature

# 5. Open a Pull Request 🚀
```

---

## 🐛 Found a Bug?

Open an issue on GitHub with:
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if any)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

<div align="center">

**Ronak**
🎓 Student Developer | 💻 Web Enthusiast

[![GitHub](https://img.shields.io/badge/GitHub-ronak6609--ops-black?style=flat-square&logo=github)](https://github.com/ronak6609-ops)
[![Live Project](https://img.shields.io/badge/Live-Event%20Registration-ff6b6b?style=flat-square&logo=googlechrome)](https://ronak6609-ops.github.io/Event-registration/)

</div>

---

<div align="center">

⭐ **If you found this project helpful, please give it a star!** ⭐

*Made with ❤️ for the campus community*

</div>
