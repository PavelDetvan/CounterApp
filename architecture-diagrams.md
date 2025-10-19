# 🏗️ Architecture & Database Diagrams

Visual representations of the CounterApp architecture, database schema, and data flow.

---

## 📊 Database Schema (ER Diagram)

```
┌─────────────────────────────────────────────────────────────────────┐
│                          SUPABASE AUTH                              │
│                                                                     │
│    ┌──────────────────┐                                             │
│    │   auth.users     │                                             │
│    ├──────────────────┤                                             │
│    │  • id (uuid)     │◄───────┐                                    │
│    │  • email         │        │                                    │
│    │  • created_at    │        │ REFERENCES                         │
│    └──────────────────┘        │                                    │
│                                │                                    │
└────────────────────────────────┼────────────────────────────────────┘
                                 │
                                 │
┌────────────────────────────────┼────────────────────────────────────┐
│                                │  APPLICATION DATABASE              │
│                                │                                    │
│    ┌───────────────────────────▼──────┐                             │
│    │         profiles                 │                             │
│    ├──────────────────────────────────┤                             │
│    │  🔑 id (uuid) PK                 │◄──────┐                    │
│    │     username (text) UNIQUE       │       │                     │
│    │     avatar_url (text)            │       │                     │
│    │     created_at (timestamp)       │       │                     │
│    │     updated_at (timestamp)       │       │                     │
│    └──────────────────────────────────┘       │                     │
│                     ▲                          │                    │
│                     │                          │                    │
│                     │ FK                       │ FK                 │
│                     │                          │                    │
│    ┌────────────────┴────────────┐            │                    │
│    │        counters             │            │                    │
│    ├─────────────────────────────┤            │                    │
│    │  🔑 id (uuid) PK            │            │                    │
│    │  🔗 user_id (uuid) FK       ├────────────┘                    │
│    │     name (text)             │                                 │
│    │     description (text)      │                                 │
│    │     icon (text)             │                                 │
│    │     color (text)            │                                 │
│    │     created_at (timestamp)  │                                 │
│    │     updated_at (timestamp)  │                                 │
│    │     archived (boolean)      │                                 │
│    └─────────────────────────────┘                                 │
│                     ▲                                               │
│                     │                                               │
│                     │ FK                                            │
│                     │                                               │
│    ┌────────────────┴────────────┐                                 │
│    │     counter_entries         │                                 │
│    ├─────────────────────────────┤                                 │
│    │  🔑 id (uuid) PK            │                                 │
│    │  🔗 counter_id (uuid) FK    ├───────┐                         │
│    │  🔗 user_id (uuid) FK       ├───────┼──────┐                  │
│    │     value (integer)         │       │      │                  │
│    │     timestamp (timestamp)   │       │      │                  │
│    │     note (text)             │       │      │                  │
│    │     synced (boolean)        │       │      │                  │
│    └─────────────────────────────┘       │      │                  │
│                                           │      │                  │
│    📑 INDEXES:                            │      │                  │
│    • counter_entries(counter_id, ────────┘      │                  │
│      timestamp)                                  │                  │
│    • counter_entries(user_id, ───────────────────┘                  │
│      timestamp)                                                     │
│    • counters(user_id, archived)                                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Legend:**
- 🔑 = Primary Key
- 🔗 = Foreign Key
- PK = Primary Key
- FK = Foreign Key
- ◄── = Relationship/Reference

---

## 🏛️ Application Architecture

```
┌───────────────────────────────────────────────────────────────────┐
│                          CLIENT SIDE                              │
│                                                                   │
│    ┌───────────────────────────────────────────────────────┐     │
│    │                    USER DEVICE                        │     │
│    │                                                       │     │
│    │    ┌──────────┐    ┌──────────┐    ┌──────────┐     │     │
│    │    │ Desktop  │    │  Mobile  │    │  Tablet  │     │     │
│    │    │ Browser  │    │ Browser  │    │ Browser  │     │     │
│    │    └────┬─────┘    └────┬─────┘    └────┬─────┘     │     │
│    │         │               │               │            │     │
│    │         └───────────────┼───────────────┘            │     │
│    │                         │                            │     │
│    │                         ▼                            │     │
│    │             ┌──────────────────────┐                 │     │
│    │             │  PWA (Installable)   │                 │     │
│    │             ├──────────────────────┤                 │     │
│    │             │  • Service Worker    │                 │     │
│    │             │  • IndexedDB Cache   │                 │     │
│    │             │  • Offline Support   │                 │     │
│    │             └──────────┬───────────┘                 │     │
│    │                        │                             │     │
│    └────────────────────────┼─────────────────────────────┘     │
│                             │                                   │
└─────────────────────────────┼───────────────────────────────────┘
                              │
                     HTTPS (Secure)
                              │
┌─────────────────────────────┼───────────────────────────────────┐
│                             ▼                                   │
│    ┌───────────────────────────────────────────────────────┐   │
│    │                  FRONTEND HOSTING                     │   │
│    │                                                       │   │
│    │    ┌───────────────────────────────────────────┐     │   │
│    │    │               VERCEL                      │     │   │
│    │    ├───────────────────────────────────────────┤     │   │
│    │    │  • Next.js App (React + TypeScript)      │     │   │
│    │    │  • Automatic Deployments from GitHub     │     │   │
│    │    │  • Edge Network (CDN)                    │     │   │
│    │    │  • Automatic HTTPS/SSL                   │     │   │
│    │    │  • Environment Variables                 │     │   │
│    │    └───────────────────────────────────────────┘     │   │
│    │                                                       │   │
│    └───────────────────────────────────────────────────────┘   │
│                             │                                   │
└─────────────────────────────┼───────────────────────────────────┘
                              │
                         API Calls
                              │
┌─────────────────────────────┼───────────────────────────────────┐
│                             ▼                                   │
│    ┌───────────────────────────────────────────────────────┐   │
│    │                BACKEND (SUPABASE)                     │   │
│    │                                                       │   │
│    │    ┌───────────────────────────────────────────┐     │   │
│    │    │           Supabase Auth                   │     │   │
│    │    ├───────────────────────────────────────────┤     │   │
│    │    │  • Email/Password Authentication          │     │   │
│    │    │  • OAuth Providers (Google, GitHub)      │     │   │
│    │    │  • JWT Token Management                  │     │   │
│    │    │  • Session Handling                      │     │   │
│    │    └───────────────────────────────────────────┘     │   │
│    │                        │                              │   │
│    │                        ▼                              │   │
│    │    ┌───────────────────────────────────────────┐     │   │
│    │    │        PostgreSQL Database                │     │   │
│    │    ├───────────────────────────────────────────┤     │   │
│    │    │  Tables:                                  │     │   │
│    │    │  • profiles                               │     │   │
│    │    │  • counters                               │     │   │
│    │    │  • counter_entries                        │     │   │
│    │    │                                           │     │   │
│    │    │  Security: Row Level Security (RLS)      │     │   │
│    │    └───────────────────────────────────────────┘     │   │
│    │                        │                              │   │
│    │                        ▼                              │   │
│    │    ┌───────────────────────────────────────────┐     │   │
│    │    │         Supabase Realtime                 │     │   │
│    │    ├───────────────────────────────────────────┤     │   │
│    │    │  • Live data synchronization              │     │   │
│    │    │  • WebSocket connections                 │     │   │
│    │    │  • Database change listeners             │     │   │
│    │    └───────────────────────────────────────────┘     │   │
│    │                        │                              │   │
│    │                        ▼                              │   │
│    │    ┌───────────────────────────────────────────┐     │   │
│    │    │         Supabase Storage                  │     │   │
│    │    ├───────────────────────────────────────────┤     │   │
│    │    │  • User avatars                           │     │   │
│    │    │  • Future: Counter icons                 │     │   │
│    │    └───────────────────────────────────────────┘     │   │
│    │                                                       │   │
│    └───────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagrams

### User Authentication Flow

```
┌─────────────┐         ┌─────────────┐         ┌──────────────┐
│    User     │───1───► │  Next.js    │───2───► │   Supabase   │
│             │         │   Client    │         │     Auth     │
└─────────────┘         └─────────────┘         └──────────────┘
       ▲                      │                        │
       │                      │                        │
       │                      ▼                        ▼
       │                 ┌──────────┐          ┌──────────────┐
       └───────5─────────│  Store   │◄───4─────│  JWT Token   │
                         │ Session  │          │  Generated   │
                         └──────────┘          └──────────────┘
                              │
                              │ 3. Create Profile
                              ▼
                         ┌──────────┐
                         │ profiles │
                         │  table   │
                         └──────────┘
```

**Steps:**
1. User submits login/signup form
2. Credentials sent to Supabase Auth
3. On success, create/fetch user profile
4. JWT token returned
5. Session stored in browser

---

### Counter Increment Flow (Online)

```
┌─────────────┐         ┌─────────────┐         ┌──────────────┐
│    User     │───1───► │   Counter   │───2───► │   Supabase   │
│   Clicks    │         │     Card    │         │   Database   │
│    "+1"     │         │             │         │              │
└─────────────┘         └──────┬──────┘         └──────┬───────┘
                               │                       │
                               │ 4. Success            │ 3. Insert
                               │    Confirmation       │    Entry
                               ▼                       ▼
                          ┌──────────┐          ┌──────────────┐
                          │    UI    │          │counter_entries│
                          │  Update  │          │    table      │
                          │Animation │          └───────────────┘
                          └──────────┘
```

**Steps:**
1. User taps +1 button
2. Optimistic UI update (instant feedback)
3. Insert new entry into counter_entries table
4. Confirm success or rollback on error

---

### Counter Increment Flow (Offline)

```
┌─────────────┐         ┌─────────────┐         ┌──────────────┐
│    User     │───1───► │   Counter   │───2───► │  IndexedDB   │
│   Clicks    │         │     Card    │         │   (Local)    │
│    "+1"     │         │             │         │              │
└─────────────┘         └──────┬──────┘         └──────┬───────┘
                               │                       │
                               │ 3. Queue              │
                               │    for Sync           │
                               ▼                       │
                          ┌──────────┐                 │
                          │    UI    │                 │
                          │  Update  │                 │
                          │Animation │                 │
                          └──────────┘                 │
                                                       │
                          ┌──────────┐                 │
                          │ Network  │◄────────────────┘
                          │ Restored │     4. Sync Queue
                          └─────┬────┘
                                │ 5. Send Queued Entries
                                ▼
                          ┌──────────────┐
                          │   Supabase   │
                          │   Database   │
                          └──────────────┘
```

**Steps:**
1. User taps +1 button while offline
2. Save to local IndexedDB
3. Add to sync queue
4. When network restored, detect online status
5. Upload all queued entries to Supabase

---

## 🛠️ Technology Stack Overview

### Frontend Stack
```
Framework:      Next.js 14+ (React 18+)
Language:       TypeScript
Styling:        TailwindCSS + CSS Modules
Icons:          Lucide React
Charts:         Recharts
Forms:          React Hook Form + Zod
State:          Zustand (optional)
Date Utils:     date-fns
PWA:            next-pwa
```

### Backend Stack
```
BaaS:           Supabase
Database:       PostgreSQL 15+
Auth:           Supabase Auth (JWT)
Storage:        Supabase Storage
Realtime:       Supabase Realtime (WebSockets)
SDK:            @supabase/supabase-js
```

### Hosting & Deployment
```
Frontend Host:  Vercel
Database Host:  Supabase Cloud
Version Control: GitHub
CI/CD:          Vercel (automatic deployments)
Domain:         Custom domain (optional)
SSL/HTTPS:      Automatic (Vercel)
```

### Development Tools
```
IDE:            VS Code
Package Manager: npm / pnpm
Linting:        ESLint
Formatting:     Prettier
Git:            Git + GitHub
API Testing:    Thunder Client / Postman
```

---

## 📱 Component Hierarchy

```
App
│
├── Layout
│   ├── Header/Navigation
│   │   ├── Logo
│   │   ├── User Menu
│   │   └── Offline Indicator
│   │
│   ├── Main Content
│   │   │
│   │   ├── Landing Page (/)
│   │   │   ├── Hero Section
│   │   │   ├── Features
│   │   │   └── CTA Buttons
│   │   │
│   │   ├── Auth Page (/login)
│   │   │   └── AuthForm
│   │   │       ├── Login Form
│   │   │       └── Signup Form
│   │   │
│   │   ├── Dashboard (/dashboard)
│   │   │   ├── AddCounterButton
│   │   │   └── CounterList
│   │   │       └── CounterCard (multiple)
│   │   │           ├── Counter Icon
│   │   │           ├── Counter Name
│   │   │           ├── Current Count
│   │   │           ├── +1 Button
│   │   │           └── Actions Menu
│   │   │
│   │   ├── Counter Detail (/counter/:id)
│   │   │   ├── Counter Header
│   │   │   ├── Quick Stats
│   │   │   ├── StatsChart
│   │   │   └── EntryHistory
│   │   │       └── EntryItem (multiple)
│   │   │
│   │   ├── Stats Page (/stats)
│   │   │   ├── DateRangePicker
│   │   │   ├── Overall Stats
│   │   │   └── StatsChart
│   │   │
│   │   └── Settings (/settings)
│   │       ├── Profile Section
│   │       ├── Preferences
│   │       └── Logout Button
│   │
│   └── Footer (optional)
│
└── Modals/Dialogs
    ├── AddCounterModal
    ├── EditCounterModal
    ├── DeleteConfirmModal
    └── OnboardingModal
```

---

## 🔐 Security Architecture

### Layer 1: Network Security
- HTTPS/TLS encryption on all connections
- CORS properly configured
- Rate limiting (Supabase built-in)

### Layer 2: Authentication
- JWT tokens (short-lived)
- Refresh tokens (longer-lived)
- Secure session storage
- Email verification

### Layer 3: Authorization (Row Level Security)

**Profiles Table:**
- ✓ Users can only modify their own profile

**Counters Table:**
- ✓ Users can only access their own counters

**Counter Entries Table:**
- ✓ Users can only add entries to their own counters
- ✓ Users can only view their own entries

### Layer 4: Input Validation
- Zod schemas for form validation
- SQL injection protection (Supabase)
- XSS prevention (React built-in)

---

## 📈 Scalability Considerations

### Current Architecture (Phase 1)

**Free Tier Limits:**
- 500MB Database
- 50,000 Monthly Active Users
- Unlimited API Requests
- 1GB File Storage

### Future Scaling Path (Phase 2+)

**1. Upgrade Supabase Plan**
- More database space
- More concurrent connections

**2. Add Caching Layer**
- Redis for aggregated stats
- Reduce database queries

**3. Add Analytics Backend**
- Python FastAPI service
- Pre-computed statistics
- ML/AI features

**4. Consider CDN for Assets**
- Static assets on CDN
- Faster global delivery

---

## 🎨 UI/UX Flow Mockup (Text-Based)

```
┌────────────────────────────────────────────────┐
│  Landing Page                        [Login]   │
├────────────────────────────────────────────────┤
│                                                │
│           Track Anything, Anytime              │
│         ═══════════════════════════            │
│                                                │
│     Count beers, flights, habits, or           │
│          anything you want to track!           │
│                                                │
│              [Get Started Free]                │
│                                                │
│  ┌──────┐  ┌──────┐  ┌──────┐                │
│  │ 📊  │  │ 📱  │  │ 🔒  │                │
│  │Stats │  │ PWA  │  │Secure│                │
│  └──────┘  └──────┘  └──────┘                │
└────────────────────────────────────────────────┘

After Login → Dashboard
┌────────────────────────────────────────────────┐
│  ☰  My Counters            👤  [User] [⚙️]    │
├────────────────────────────────────────────────┤
│                                                │
│  ┌─────────────────┐  ┌─────────────────┐    │
│  │ 🍺 Beers        │  │ ✈️  Flights     │    │
│  │                 │  │                 │    │
│  │      42         │  │       8         │    │
│  │                 │  │                 │    │
│  │    [  +1  ]     │  │    [  +1  ]     │    │
│  └─────────────────┘  └─────────────────┘    │
│                                                │
│  ┌─────────────────┐  ┌─────────────────┐    │
│  │ 📚 Books Read   │  │ 🏃 Workouts    │    │
│  │                 │  │                 │    │
│  │      15         │  │      23         │    │
│  │                 │  │                 │    │
│  │    [  +1  ]     │  │    [  +1  ]     │    │
│  └─────────────────┘  └─────────────────┘    │
│                                                │
│              [  ➕  Add Counter  ]            │
└────────────────────────────────────────────────┘

Counter Detail View
┌────────────────────────────────────────────────┐
│  ← Back          🍺 Beers              ⋮       │
├────────────────────────────────────────────────┤
│                                                │
│  Total:  42                Today: 3            │
│  Week:   12                Month: 28           │
│                                                │
│  ┌────────────────────────────────────────┐   │
│  │         📈 Trend (Last 30 Days)       │   │
│  │    ▁▂▃▅▆▇█▇▆▅▃▂▁                    │   │
│  └────────────────────────────────────────┘   │
│                                                │
│  Recent Entries:                               │
│  ┌────────────────────────────────────────┐   │
│  │ Today, 6:30 PM          +1    [Edit]  │   │
│  │ Today, 2:15 PM          +1    [Edit]  │   │
│  │ Yesterday, 8:00 PM      +1    [Edit]  │   │
│  │ Yesterday, 7:30 PM      +1    [Edit]  │   │
│  └────────────────────────────────────────┘   │
│                                                │
│              [  +1  Add Entry  ]              │
└────────────────────────────────────────────────┘
```

---

## 🌐 Deployment Pipeline

```
                    ┌──────────────┐
                    │  Developer   │
                    │   Writes     │
                    │    Code      │
                    └──────┬───────┘
                           │
                           │ git push
                           ▼
                    ┌──────────────┐
                    │   GitHub     │
                    │  Repository  │
                    └──────┬───────┘
                           │
                           │ Webhook
                           ▼
┌──────────────┐    ┌──────────────┐
│   Trigger    │───►│   Vercel     │
│    Build     │    │  (Detects    │
└──────────────┘    │   Changes)   │
                    └──────┬───────┘
                           │
                           │ Build Process:
                           │ 1. Install dependencies
                           │ 2. Run type checks
                           │ 3. Build Next.js app
                           │ 4. Generate PWA assets
                           │ 5. Optimize bundle
                           ▼
                    ┌──────────────┐
                    │  Deploy to   │
                    │ Vercel Edge  │
                    │   Network    │
                    └──────┬───────┘
                           │
                           │ Automatic
                           ▼
                    ┌──────────────┐
                    │  Production  │
                    │     URL      │
                    │   Live!      │
                    └──────────────┘
```
