<div align="center">

<p align="center">
  <a href="https://do-quest.vercel.app" target="_blank">
    <img src="./public/do.svg" width="120" alt="DoQuest Logo" />
  </a>
</p>

**The Next.js web application for the Do.Quest bounty & quest management platform**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=flat&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

> **Status:** 🚧 Under active development

[Live App](https://do-quest.vercel.app) · [Backend API Docs](https://do-quest-backend.vercel.app/api/v1/docs) · [Backend Repo](#)

</div>

---

## Overview

Do.Quest is a bounty and quest management platform. This is the **Next.js 15+ frontend** — it handles authentication, bounty browsing and posting, submission management, wallet transactions, and a role-based admin dashboard.

---

## Tech Stack

| | |
|---|---|
| Framework | Next.js 15+ (App Router) |
| Language | TypeScript |
| UI | shadcn/ui + Tailwind CSS |
| HTTP Client | Axios + Server Actions |
| Forms | React Hook Form + Zod |
| State | TanStack Query |
| Package Manager | pnpm |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8
- DoQuest backend running (local or remote)

### Installation & Running

```bash
git clone https://github.com/your-org/doquest-frontend.git
cd doquest-frontend
pnpm install
cp .env.example .env.local
pnpm dev
```

App runs at `http://localhost:3000`.

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (`pk_test_...`) |

---

## Project Structure

```
src/
├── app/
│   ├── (authGroup)/    # sign-in, sign-up, forgot/reset/change password
│   ├── (dashboard)/    # admin & user dashboards
│   └── (home)/         # landing, browse, post-bounty, wallet, profile…
├── components/
│   ├── modules/        # feature components (Auth, Dashboard, Admin, Home)
│   ├── shared/         # DataTable, DataCard, Navbar, Footer, charts
│   └── ui/             # shadcn/ui primitives (do not edit manually)
├── services/           # Axios API call functions
├── hooks/              # custom hooks
├── types/              # TypeScript interfaces
├── zod/                # validation schemas
└── lib/                # Axios instance, auth/token/cookie utilities
```

---




## Contributing

1. Fork the repo and create a branch: `git checkout -b feat/your-feature`
2. Commit using conventional commits: `git commit -m "feat(browse): add bounty card"`
3. Open a pull request against `main`

---
