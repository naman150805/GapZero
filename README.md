# GapZero — Premium Personalized JEE Coaching Web Platform

> **Tagline:** *Bridging the gap between your preparation and your true potential.*  
> **Target Programme:** JEE Main January 2027 — 45-Day Personalized Preparation Programme  
> **Contact:** Phone: [+91 9950540994](tel:+919950540994) | Email: [GapZeroiit@gmail.com](mailto:GapZeroiit@gmail.com)

---

## 1. Project Overview

GapZero is an EdTech startup website providing affordable, highly personalized online coaching to JEE aspirants through currently enrolled IIT Delhi students.

### Core Value Propositions
1. **Teaching by currently enrolled IIT Delhi students** who bring recent examination experience, conceptual clarity, and practical problem-solving strategies.
2. **Strict 1:3 Tutor-to-Student Ratio**: Maximum 3 students per batch, ensuring personal attention, active student participation, and real-time doubt solving during every regular class.
3. **Personalized Syllabus**: We personalize not only the teaching experience but also the syllabus according to individual students' academic weaknesses. Rather than forcing students to revise what they already know, preparation hours are directed toward their weakest chapters and conceptual gaps.
4. **Primary Conversion Goal**: Encourage students and parents to register for a **Free 20-Minute 1:1 Counselling Session** to diagnose preparation bottlenecks, review mock test scores, and receive a customized preparation roadmap.

---

## 2. Technology Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite 5
- **Styling & Design System:** Tailwind CSS with custom brand colors, typography (`Plus Jakarta Sans`), and subtle elevation shadows
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Animations:** Subtle CSS transitions and Framer Motion primitives
- **Database & Backend Services:** Firebase Firestore for lead and counselling storage
- **Authentication:** Firebase Authentication for secure role-based Administrator Dashboard access (with automatic resilient offline/demo fallback)
- **Exporting:** Client-side CSV generator for lead reporting and batch planning

---

## 3. Getting Started & Local Development

### Prerequisites
- Node.js `v18+` or `v20+` (tested on Node `v24.16.0`)
- npm `v9+` or `v10+`

### Installation
```bash
# 1. Clone or navigate into the project directory
cd "GapZero"

# 2. Install all dependencies
npm install

# 3. Create your local environment configuration file
cp .env.example .env

# 4. Start the local Vite development server
npm run dev

# 5. Open your browser at:
# http://localhost:5173
```

### Production Build & Preview
```bash
# Compile TypeScript and build optimized assets for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 4. Environment Variables Configuration (`.env`)

A template `.env.example` file is included in the project root:

```env
# Firebase Project Credentials (obtain from Firebase Console)
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Optional Analytics Integration
VITE_GOOGLE_ANALYTICS_ID=
VITE_META_PIXEL_ID=

# WhatsApp Floating CTA (true / false)
VITE_ENABLE_WHATSAPP_FLOAT=true
```

> **Note on Local / Demo Mode:**  
> If external Firebase credentials are not yet configured in `.env`, the application seamlessly falls back to a secure local store (`localStorage`/`sessionStorage`). All registration submissions, form validations, search filters, status updates, and CSV exports function immediately out-of-the-box. Once you paste your Firebase keys into `.env`, cloud synchronization activates automatically without code changes.

---

## 5. Firebase Setup & Security Rules

### Step 1: Create Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project (e.g., `gapzero-portal`).
3. Under **Authentication** > **Sign-in method**, enable **Email/Password**.
4. Create an admin user (e.g., `admin@gapzero.in` with a secure password).
5. Under **Firestore Database**, create a database in production mode.

### Step 2: Deploy Firestore Security Rules
A production-grade `firestore.rules` file is included in the repository:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Public write permitted strictly for new counselling registrations with required fields
    match /counselling_registrations/{registrationId} {
      allow create: if request.resource.data.fullName is string
                    && request.resource.data.mobileNumber is string
                    && request.resource.data.email is string
                    && request.resource.data.guardianConsent == true
                    && request.resource.data.termsAccepted == true;
                    
      // Strictly restrict read, update, and delete to authenticated administrators
      allow read, update, delete: if request.auth != null && request.auth.token.email.matches(".*@gapzero\\.in$");
    }
    
    // Default deny for all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Deploy the rules via Firebase CLI:
```bash
firebase deploy --only firestore:rules
```

---

## 6. Administrator Dashboard (`/admin`)

The `/admin` route is a protected admissions portal:

- **Default Administrator Credentials (for development preview):**
  - **Email:** `admin@gapzero.in`
  - **Password:** `GapZeroAdmin2026!`
- **Dashboard Features:**
  - **KPI Metrics:** Total Registrations, New Leads, Contacted, Scheduled, Completed, Converted, Not Converted, and Paid Subject Enrolments (tracked against the 30-enrolment cap).
  - **Lead Management Table:** Displays student name, contact details, academic status, selected subjects, 1-10 preparation rating, mock scores (including negative marks), weak chapters, preferred counselling time, and lead status.
  - **Search & Filtering:** Search by student name, phone, email, or weak chapters. Filter by subject (Physics, Chemistry, Mathematics) or status.
  - **Lead Detail Modal:** View full diagnostic responses, update lead status, assign tutors/counsellors, record internal consultation notes, and track paid enrolments.
  - **Export to CSV:** One-click CSV export of filtered or all leads for administrative review.

---

## 7. Customization & Updating Programme Details

All business details, pricing, deadlines, contact information, and programme features are centralized in `src/config/`:

| Configuration File | Purpose |
| :--- | :--- |
| `src/config/business.ts` | Brand name, phone numbers, email address, enrolment deadline (`2 December 2026`), target exam, and disclaimers. |
| `src/config/programme.ts` | 45-day sprint features, subjects data, comparison metrics, and timeline steps. |
| `src/config/faq.ts` | 13 detailed, transparent FAQ questions and answers. |
| `src/config/navigation.ts` | Header navbar items and footer links. |

---

## 8. Deployment Guide

### Deploying to Firebase Hosting (Recommended)
```bash
# 1. Install Firebase CLI if not already installed
npm install -g firebase-tools

# 2. Login to your Google account
firebase login

# 3. Initialize Firebase in this project (select Hosting and Firestore)
firebase init

# 4. Set your public directory to 'dist' and configure as single-page app (Yes)
# 5. Build and deploy
npm run build
firebase deploy
```

### Deploying to Vercel or Netlify
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Single Page App Rewrite Rule:**
  - Netlify: Create a `public/_redirects` file with `/*  /index.html  200`
  - Vercel: Standard Vite preset automatically handles client-side routing.

---

## 9. Regulatory & Transparency Compliance

- **Independence:** GapZero is an independent educational initiative whose tutors are currently enrolled IIT Delhi students. GapZero is not officially affiliated with or endorsed by IIT Delhi.
- **Honest Metrics:** No fabricated testimonials, fake countdown timers, artificial seat tickers, or misleading rank guarantees are used.
- **Draft Legal Framework:** Draft versions of the Privacy Policy, Terms & Conditions, and Refund Policy are included with clear unapproved notices to protect both students and the startup.
- **Licensed Imagery:** All photography used on the site is licensed under the commercial Unsplash License. A full manifest of sources and descriptions is documented in `image-sources.md`.
