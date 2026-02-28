# 🤖 CareerSathi AI - Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

The frontend application for **CareerSathi AI**, a smart AI-powered platform for practicing interviews. It offers role-based mock interviews with smart follow-ups, adaptive difficulty, and real-time performance evaluation.

## ✨ Features
- **AI-Powered Mock Interviews:** Dynamic questions based on user roles and experience.
- **Real-Time Evaluation:** Instant feedback on interview performance.
- **Modern UI/UX:** Fully responsive design powered by Tailwind CSS and Framer Motion.
- **Dark Mode Support:** Integrated light and dark themes.
- **Google Authentication:** Secure login using `@react-oauth/google`.
- **Interactive Dashboards:** Visualized performance metrics using `recharts`.
- **PDF Reports:** Downloadable interview history and feedback using `jspdf`.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `client` directory and add your environment variables (e.g., Google Client ID, Backend API URL).
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠️ Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **Animations:** Framer Motion
- **Charts & Icons:** Recharts, React Icons

## 📦 Build for Production
To build the application for production, run:
```bash
npm run build
```
This will generate a `dist` folder ready to be deployed to platforms like Vercel, Netlify, or Render.
