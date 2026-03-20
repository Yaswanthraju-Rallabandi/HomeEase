# HomeEase 🏠

**One-stop solution for local home repairs and services with multi-modal accessibility.**

HomeEase is a comprehensive full-stack application designed to connect local service providers (like plumbers, electricians, and cleaners) with customers in need of immediate assistance. The application is built with a strong focus on accessibility and ease of use, particularly for users with varying levels of digital literacy or language barriers.

---

## 🚀 Key Features

### 🎙️ Multi-modal Input System
Users can describe their problems in the way that feels most natural to them:
- **Voice Search:** Speak your problem in your local language.
- **Photo Input:** Take a picture of the issue (e.g., a leaking pipe) for AI analysis.
- **Draw Input:** Sketch the problem on a digital canvas.
- **Type Search:** Traditional text-based search for specific services.

### 🛠️ Service Provider Matching
- **AI-Powered Suggestions:** Uses Gemini AI to analyze inputs and suggest the right professional.
- **Local Discovery:** Finds the nearest verified repair persons using Google Maps.
- **Emergency SOS:** Instant one-tap calling for critical repairs.

### 📊 Partner Dashboard
- **Real-time Job Alerts:** Service providers get notified instantly of new requests.
- **Live Navigation:** Integrated maps to guide partners to the customer's location.
- **Earnings Tracking:** Manage daily jobs and track income directly in the app.

### 🌍 Accessibility & Localization
- **Multi-language Support:** Available in **English**, **Hindi**, and **Telugu**.
- **Voice Guidance:** Integrated text-to-speech to guide users through the booking process.
- **High-Contrast UI:** Designed for clarity and ease of use in all conditions.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Animations:** Framer Motion, Motion/React
- **Icons:** Lucide React
- **Backend:** Firebase (Authentication, Firestore)
- **AI Integration:** Google Gemini API (GenAI SDK)
- **Maps & Location:** Google Maps Platform (Maps, Places, Routes)
- **Speech:** Web Speech API (SpeechSynthesis & SpeechRecognition)

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- A Google Cloud Project with Gemini API and Google Maps API enabled.
- A Firebase Project.

### Environment Variables
Create a `.env` file in the root directory and add the following:

```env
# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key

# Google Maps Platform Key
GOOGLE_MAPS_PLATFORM_KEY=your_google_maps_key

# Firebase Configuration (from firebase-applet-config.json)
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_APP_ID=...
```

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/HomeEase.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📖 How It Works

1. **User Request:** A user selects an input method (Voice, Photo, Draw, or Type) to describe their home repair issue.
2. **AI Analysis:** The Gemini API processes the input to determine the service category and priority.
3. **Provider Search:** The app searches for nearby verified professionals using the Google Maps API.
4. **Booking:** The user confirms the booking. A family member can be automatically notified via WhatsApp for safety.
5. **Service Delivery:** The service provider receives the request on their dashboard, accepts it, and navigates to the user's location.
6. **Completion:** The user provides an OTP to the partner to confirm arrival and completes the service.

---

## 🛡️ Security
- **Firebase Security Rules:** Robust rules are in place to ensure data privacy and secure access to user and partner information.
- **Verified Partners:** All service providers are marked with a verification badge for trust.

---

## 📄 License
This project is licensed under the MIT License.
