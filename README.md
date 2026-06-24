<div align="center">

<p align="center">
  <a href="https://do-quests.vercel.app" target="_blank">
    <img src="./public/do.svg" width="120" alt="DoQuest Logo" />
  </a>
</p>

# Do.Quest — Bounty & Quest Management Platform

A modern platform to create, manage, and complete bounties with secure transactions and role-based dashboards.

[Live App](https://do-quests.vercel.app) · [Backend API Docs](https://do-quest-backend.vercel.app/api/v1/docs) · [Backend Repo](#)

</div>




##  Overview

**Do.Quest** is a full-stack bounty & quest management platform where users can:

* Create and explore bounties
* Submit work for rewards
* Manage wallet transactions
* Access role-based dashboards (User & Admin)

It focuses on scalability, clean UI, and secure backend integration.

---

## Tech Stack

| Category           | Technology               |
| ------------------ | ------------------------ |
| Framework          | Next.js (App Router)     |
| Language           | TypeScript               |
| UI                 | shadcn/ui + Tailwind CSS |
| State Management   | TanStack Query           |
| Forms & Validation | React Hook Form + Zod    |
| API Handling       | Axios + Server Actions   |
| Package Manager    | pnpm                     |

---

##  Key Features

*  Authentication (Login, Register, Password Management)
*  Bounty Posting & Browsing
*  Submission System
*  Wallet & Transactions (Stripe Integration)
*  Role-based Dashboard (Admin & User)
*  Data Tables & Analytics UI
* Fast & Optimized UI with Server Components

---



##  Getting Started (Run Locally)

###  Prerequisites

* Node.js >= 18
* pnpm >= 8
* Backend server running

---

###  Installation

```bash
git clone https://github.com/your-org/doquest-frontend.git
cd doquest-frontend
pnpm install
```

---

###  Environment Setup

```bash
cp .env.example .env.local
```

Update `.env.local`:

```env
NEXT_PUBLIC_API_URL=your_backend_url
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

---

###  Run Development Server

```bash
pnpm dev
```

 App will run at:
`http://localhost:3000`

---

##  Project Structure

```
src/
├── app/
│   ├── (authGroup)/
│   ├── (dashboard)/
│   └── (home)/
├── components/
│   ├── modules/
│   ├── shared/
│   └── ui/
├── services/
├── hooks/
├── types/
├── zod/
└── lib/
```

---

##  Important Links

* 🌐 Live App: https://do-quests.vercel.app
* 📘 API Docs: https://do-quest-backend.vercel.app/api/v1/docs
* 💻 Frontend Repo: (Add your repo link)
* ⚙️ Backend Repo: (Add backend repo link)

---

##  Contributing

1. Fork the repository
2. Create a branch

   ```bash
   git checkout -b feat/your-feature
   ```
3. Commit changes

   ```bash
   git commit -m "feat: add new feature"
   ```
4. Push & create PR 🚀

---

##  Status

 Project is under active development

---

##  Future Improvements

* Notification system
* Real-time updates (WebSocket)
* Mobile responsiveness improvements
* Advanced analytics dashboard


