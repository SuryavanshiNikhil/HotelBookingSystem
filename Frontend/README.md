# Hotel Room Booking System (MERN)

Simple hotel room booking system with:
- Admin (hotel owner)
- Customer (user)
- Room management
- Booking requests with email notifications
- Dashboards for both roles

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Email: Nodemailer

---

## Setup

### 1. Backend

```bash
cd Backend
npm install
cp .env.example .env
# edit .env with your MongoDB URI, JWT secret, SMTP details
npm run dev
