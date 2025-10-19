# CounterApp

PWA progressive web app for phone that allows users to count their daily activities of their choice (like beers drunk, plane flights taken, trips abroad, habits...).
The goal is to make a simple, fast, and accessible tracker that anyone can use — with analytics and comparisons added later.

---

## 🚀 Project Vision

Imagine you want to count how many beers you drink to show Slovaks can easily surpass the average Czech beer alcohol consumption.
This projects wants to make the interesting data of activities and habbits more accesible and comparable.
There's no single-use app that lets users easily count arbitrary events in life and visualize them with flexible statistics!
**CounterApp** _(name TBD)_ aims to solve this by allowing users to:
- Create custom counters for anything
- Increment counters quickly from a mobile-friendly interface with as little clicks as possible
- View personal statistics and progress over time
- Compare results with friends and the community (future feature)

The project will start as a minimal viable product (MVP) with core functionality and later evolve into a full-featured analytics platform.

---

## 🧱 Architecture Overview

This app follows a **serverless architecture** — no dedicated backend server is required initially.
The React frontend communicates directly with Supabase, which handles authentication, database, and file storage securely.

### Core Stack

| Layer | Technology | Hosted on | Purpose |
|-------|-----------|-----------|---------|
| **Frontend** | React / Next.js (TypeScript) | Vercel | User interface, PWA, data visualization |
| **Database** | Supabase (PostgreSQL) | Supabase Cloud | Store counters, user data, and logs |
| **Auth** | Supabase Auth | Supabase Cloud | User authentication and sessions |
| **Backend Logic** | Supabase Edge Functions _(optional)_ | Supabase Cloud | Optional serverless logic and scheduled tasks |
| **Analytics Backend** _(future)_ | FastAPI / Python | Render / Railway | Advanced statistics and aggregations |

---

## 🔗 Resources

- **Supabase** (database and auth): [https://supabase.com/](https://supabase.com/)
- **Hosting Options**:
  - Vercel: [https://vercel.com/pricing](https://vercel.com/pricing)
  - Netlify: [https://www.netlify.com/pricing/](https://www.netlify.com/pricing/)

---

## 🛠️ Getting Started

_Coming soon..._

## 📄 License

_To be determined_



