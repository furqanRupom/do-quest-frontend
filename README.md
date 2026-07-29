<div align="center">

<p align="center">
  <a href="https://do-quests.vercel.app" target="_blank">
    <img src="./public/do.svg" width="120" alt="DoQuest Logo" />
  </a>
</p>

# Do.Quest — Bounty & Quest Management Platform

A modern platform to create, manage, and complete bounties with secure transactions and role-based dashboards.

[Live App](https://do-quests.vercel.app) · [Backend API Docs](https://do-quest-backend.vercel.app/api/v1/docs) · [Backend Repo](#)

![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active--development-yellow)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Important Links](#important-links)
- [Contributing](#contributing)
- [Status](#status)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

**Do.Quest** is a full-stack bounty & quest management platform where users can:

- Create and explore bounties
- Submit work for rewards
- Manage wallet transactions
- Access role-based dashboards (User & Admin)

It focuses on scalability, clean UI, and secure backend integration.

---

## Tech Stack

| Category            | Technology                |
| ------------------- | -------------------------- |
| Framework           | Next.js (App Router)       |
| Language            | TypeScript                 |
| UI                  | shadcn/ui + Tailwind CSS   |
| State Management    | TanStack Query             |
| Forms & Validation  | React Hook Form + Zod      |
| API Handling        | Axios + Server Actions     |
| Payments            | Stripe                     |
| Package Manager     | pnpm                       |

---

## Key Features

- **Authentication** — Login, Register, Password Management
- **Bounty Posting & Browsing** — Create and discover quests/bounties
- **Submission System** — Submit work against open bounties
- **Wallet & Transactions** — Stripe-powered payments and balance tracking
- **Role-Based Dashboards** — Separate experiences for Admin and User roles
- **Data Tables & Analytics UI** — Sortable, filterable views of activity
- **Optimized UI** — Built on Next.js Server Components for speed

---

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8
- Backend server running ([see Backend Repo](#))

### Installation

```bash
git clone https://github.com/your-org/doquest-frontend.git
cd doquest-frontend
pnpm install
```

### Environment Setup

Copy the example environment file:

```bash
cp .env.example .env.local
```

Update `.env.local` with your own values:

```env
NEXT_PUBLIC_API_URL=your_backend_url
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

### Run Development Server

```bash
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Useful Scripts

| Command           | Description                        |
| ------------------ | ----------------------------------- |
| `pnpm dev`         | Start local development server      |
| `pnpm build`       | Create a production build           |
| `pnpm start`       | Run the production build            |
| `pnpm lint`        | Run ESLint checks                   |

---

## Project Structure

```
src/
├── app/
│   ├── (authGroup)/     # Auth routes: login, register, password reset
│   ├── (dashboard)/     # Role-based dashboard routes
│   └── (home)/          # Public marketing / landing routes
├── components/
│   ├── modules/         # Feature-specific components
│   ├── shared/          # Shared/reusable components
│   └── ui/              # shadcn/ui primitives
├── services/             # API service layer
├── hooks/                # Custom React hooks
├── types/                # Shared TypeScript types
├── zod/                  # Zod validation schemas
└── lib/                  # Utilities and helpers
```

---

## Important Links

- 🌐 **Live App:** https://do-quests.vercel.app
- 📘 **API Docs:** https://do-quest-backend.vercel.app/api/v1/docs
- 💻 **Frontend Repo:** _(add your repo link)_
- ⚙️ **Backend Repo:** _(add backend repo link)_

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feat/your-feature
   ```
3. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/)
   ```bash
   git commit -m "feat: add new feature"
   ```
4. Push your branch and open a Pull Request
   ```bash
   git push origin feat/your-feature
   ```

Please make sure your code passes `pnpm lint` before submitting a PR.

---

## Status

🚧 Project is under active development. Expect frequent changes and improvements.

---

## Roadmap

- [ ] Notification system
- [ ] Real-time updates (WebSocket)
- [ ] Mobile responsiveness improvements
- [ ] Advanced analytics dashboard

---

## License

This project is licensed under the [MIT License](LICENSE).