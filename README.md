# DevEx — The Micro-SaaS Marketplace 🚀

**DevEx** is a premium, high-performance marketplace engineered for the seamless exchange of Micro-SaaS projects. Beyond a simple listing site, DevEx implements sophisticated **System Design** principles and **Data Structures** to ensure a secure, scalable, and ultra-fast user experience.

Developed as a flagship project for the **Data Structures (3rd Semester)** curriculum at **UBIT, University of Karachi**.

---

## 📋 Table of Contents
- [Tech Stack](#-tech-stack)
- [Advanced Data Structures](#-advanced-data-structures)
- [Comprehensive Features](#-comprehensive-features)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Security & Authorization](#-security--authorization)
- [The Team](#-the-team)

---

## 🛠️ Tech Stack

### Frontend (Clean & Minimalistic UI)
- **Framework:** React 18 with Vite for lightning-fast builds.
- **State Management:** **Redux Toolkit** for complex state & Context API for lightweight providers.
- **UI Components:** **shadcn/ui** and custom-built **Glassmorphism** components.
- **Styling:** Tailwind CSS 4.0 for utility-first responsive design.
- **Form Handling:** **Formik** & **Yup** for robust validation and schema-based error handling.
- **Routing:** **React Router DOM v6** with protected route guards.
- **Animations:** Framer Motion for fluid, interactive micro-interactions.
- **Real-time:** Socket.io-client for instant bi-directional communication.

### Backend (Scalable & Secure)
- **Runtime:** Node.js & Express.js.
- **Database:** MongoDB Atlas with Mongoose ODM.
- **Authentication:** Dual-layer security with Google OAuth 2.0, JWT, and OTP verification.
- **Storage:** **Cloudinary** integration for high-performance image hosting.
- **Payments:** Stripe API for secure global transaction processing(Currently not integrated in Frontend)
- **Real-time:** Socket.io for live notifications and chat updates.

---

## 🧠 Advanced Data Structures

DevEx is built on a foundation of custom data structures, optimized for specific platform needs:

### 1. **Linked List (Listing Management)**
- **Purpose:** Manages the active marketplace listings in-memory.
- **Advantage:** Provides **O(1) insertion** at the head for "Newest First" sorting, ensuring the marketplace feels live and responsive without constant database polling.

### 2. **Stack (Browsing History)**
- **Purpose:** Implements a "Recently Viewed" feature for logged-in buyers.
- **Advantage:** Uses **LIFO (Last-In-First-Out)** logic to track the last 5 listings visited, allowing users to quickly backtrack through their exploration.

### 3. **Queue (Purchase Processing)**
- **Purpose:** Manages incoming purchase requests during high traffic.
- **Advantage:** Implements **FIFO (First-In-First-Out)** logic to process transactions sequentially, preventing race conditions and ensuring database integrity during checkout.

---

## ✨ Comprehensive Features

### 🔐 Security & Authentication
- **Hybrid Auth System:** Secure Google OAuth 2.0 integration and traditional Email/Password login.
- **Double-Layer Protection:** JWT session management combined with secure HTTP-only cookies.
- **OTP Verification:** 6-digit OTP verification for secure signup and password recovery.
- **Strict Authorization:** Robust Role-Based Access Control (RBAC) ensuring Buyers, Sellers, and Admins never cross-contaminate data.

### 🏪 Marketplace & Discovery
- **Smart Market Feed:** Real-time search with debounced inputs and advanced filtering by category (AI, Fintech, E-commerce, etc.).
- **Dynamic Sorting:** Toggle between Latest, Most Popular (by clicks), and Alphabetical views.
- **Interactive Listings:** High-fidelity listing cards with favorites toggle, sold status badges, and seller profile previews.
- **Rich Listing Details:** In-depth product pages featuring image carousels, long-form technical descriptions, and live demo/repo links.

### 👨‍💼 Seller Ecosystem
- **Advanced Dashboard:** High-level overview of total sales, revenue metrics, and active listing count.
- **Listing Lifecycle:** Full CRUD management for SaaS products with multi-image Cloudinary uploads.
- **Approval Workflow:** Real-time tracking of "Pending" vs "Approved" listings.
- **Deep Analytics:** Per-listing performance tracking (click count, conversion status) and detailed sales history.

### 🛒 Buyer Experience
- **Personalized Dashboard:** One-stop view for acquisition history and saved bookmarks.
- **Favorites / Cart System:** Save interesting projects for later review with instant removal options.
- **Order History:** Detailed records of all acquired SaaS projects, including amount paid via Stripe.
- **Recently Viewed:** Quick access to previously explored listings powered by the Stack data structure.

### 🛠️ Admin Control Center
- **Moderation Engine:** Dedicated portal to approve or reject new SaaS submissions.
- **Global Visibility:** Monitor all active marketplace listings and pending requests in one place.
- **User Management:** Ability to manage listing integrity and platform security.

### 💬 Real-time Interaction
- **Direct Messaging:** Instant chat between buyers and sellers for negotiation and technical inquiries.
- **DevEX AI ChatBot:** An integrated intelligent assistant to help users navigate the platform and answer common questions.

### 💳 Transactional Excellence
- **Stripe Integration:** Production-ready checkout flow for real-world payments.
- **Mock Bank System:** A custom-built bank simulator for safe testing of high-value project acquisitions.

---

## 📁 Project Architecture

```text
DevEx/
├── Backend/
│   ├── contollers/         # Logic isolated by domain (Listing, Card, Chat, etc.)
│   ├── middlewares/        # Strict RBAC (Role-Based Access Control)
│   ├── models/             # Optimized MongoDB Schemas
│   ├── utils/              # Custom DS (Stack, Queue, LinkedList)
│   └── server.js           # Express & Socket.io initialization
├── FrontEnd/
│   ├── src/
│   │   ├── components/     # Atomic UI components with Premium styling
│   │   ├── context/        # Theme & Auth providers
│   │   └── App.jsx         # View-level routing & layout
└── README.md
```

---

## 🚀 Getting Started

### 1. Installation
```bash
# Clone the repo
git clone https://github.com/SalmanZulfiqarShaikh/DevEx.git

# Install Backend deps
cd Backend && npm install

# Install Frontend deps
cd ../FrontEnd && npm install
```

### 2. Launch
```bash
# Backend (Port 3000)
npm run dev

# Frontend (Port 5173)
npm run dev
```

---

## 🔐 Environment Variables

| Component | Key | Purpose |
| :--- | :--- | :--- |
| **Backend** | `MONGO_URI` | Database Connection |
| **Backend** | `JWT_SECRET` | Token Encryption |
| **Backend** | `STRIPE_SECRET_KEY` | Payment Processing |
| **Frontend** | `VITE_API_URL` | API Bridge |

---

## 👨‍💻 The Team

- **Muhammad Salman**
- **S.M Hussain Abbas**
- **Hassan Raza**
- **Fasih Dagia**
- **Aun Raza**

---

## 🔗 Live Link

-[devexpk.vercel.app](https://devexpk.vercel.app)

Built with ❤️ by the DevEx Team.

---

**Presented to:**  
🎓 **Mr. Muhammad Daud**  
🎓 **Miss Farheen Faisal**



