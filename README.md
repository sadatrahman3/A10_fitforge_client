Admin Login:- admin@fitforge.com
Admin Password:- Aa12345


# FitForge Client

**Live Site:** https://a10-fitforge-client.vercel.app
**Server API:** https://a10-fitforge-server.onrender.com
**Server Repo:** https://github.com/sadatrahman3/A10_fitforge_server

## Purpose
FitForge is a comprehensive fitness management platform for fitness enthusiasts, gym trainers, and administrators.

## Key Features
- Role-based dashboards (User, Trainer, Admin)
- Class booking with Stripe payment integration
- Community forum with posts, comments, likes/dislikes
- Trainer application and approval system
- Admin management for users, trainers, classes, and forum
- Responsive dark theme UI with Framer Motion animations

## Tech Stack
- React + Vite
- Tailwind CSS
- React Router v7
- Framer Motion
- Axios
- React Toastify
- Lucide React Icons

## NPM Packages
- `react-router-dom` - Routing
- `tailwindcss` - Styling
- `framer-motion` - Animations
- `axios` - HTTP client
- `react-icons` - Icons
- `react-toastify` - Notifications
- `react-helmet-async` - SEO
- `@stripe/stripe-js` - Payments
- `lucide-react` - Icons

## Environment Variables
- `VITE_GOOGLE_CLIENT_ID` - Google Identity Services client ID for Google login.
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key.
- `VITE_IMGBB_API_KEY` - Imgbb API key for forum post image uploads.
- `VITE_API_URL` - Optional API base URL. Leave unset on Vercel when using the included `/api` rewrite.
