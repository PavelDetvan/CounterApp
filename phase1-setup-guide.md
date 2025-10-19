# 📋 Phase 1 - Detailed Setup Guide

This document provides step-by-step instructions for setting up everything needed for Phase 1 (MVP) of CounterApp.

---

## 📝 Overview

**Phase 1 Goal:** Create a working PWA that users can install and use immediately, with offline capabilities and data syncing.

---

## 🎯 Pre-Development Checklist

Before writing any code, we need to set up accounts, tools, and plan the architecture in detail.

### Step 1: Create Required Accounts

#### 1.1 Supabase Account
- [ ] Go to [https://supabase.com/](https://supabase.com/)
- [ ] Sign up with GitHub (recommended) or email
- [ ] Verify your email address
- [ ] Note: Free tier includes:
  - 500MB database space
  - 1GB file storage
  - 50,000 monthly active users
  - Unlimited API requests

#### 1.2 Vercel Account
- [ ] Go to [https://vercel.com/](https://vercel.com/)
- [ ] Sign up with GitHub (recommended for easier deployment)
- [ ] Note: Free tier includes:
  - Unlimited deployments
  - 100GB bandwidth per month
  - Automatic HTTPS
  - Custom domains

#### 1.3 GitHub Repository
- [ ] Create a new GitHub repository named `counterapp` (or your chosen name)
- [ ] Set it to private or public (your choice)
- [ ] Initialize with README
- [ ] Add `.gitignore` for Node.js

---

## 🗄️ Step 2: Supabase Project Setup

### 2.1 Create New Supabase Project
- [ ] Log into Supabase dashboard
- [ ] Click "New Project"
- [ ] Fill in project details:
  - **Project Name:** CounterApp (or your choice)
  - **Database Password:** Generate a strong password and SAVE IT SECURELY
  - **Region:** Choose closest to your target users (e.g., Europe, US East, etc.)
  - **Pricing Plan:** Free
- [ ] Wait 2-3 minutes for project to initialize

### 2.2 Get Supabase Credentials
Once your project is created, you'll need these credentials for your app:

- [ ] Go to Project Settings → API
- [ ] Copy and save these values (we'll use them later):
  - **Project URL** (looks like: `https://xxxxx.supabase.co`)
  - **anon/public key** (this is safe to use in frontend)
  
**Important:** Never commit these to GitHub directly - we'll use environment variables!

### 2.3 Design Database Schema

We need to plan our database tables before creating them. Here's the schema:

#### **Table 1: `profiles`**
Extends Supabase auth.users with user profile data.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | References auth.users(id) |
| username | text | UNIQUE, NOT NULL | User's display name |
| avatar_url | text | NULLABLE | Profile picture URL |
| created_at | timestamp | DEFAULT now() | Account creation time |
| updated_at | timestamp | DEFAULT now() | Last profile update |

#### **Table 2: `counters`**
Stores user-created counters.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Counter unique ID |
| user_id | uuid | FOREIGN KEY → profiles(id), NOT NULL | Owner of counter |
| name | text | NOT NULL | Counter name (e.g., "Beers drunk") |
| description | text | NULLABLE | Optional description |
| icon | text | NULLABLE | Emoji or icon identifier |
| color | text | DEFAULT '#3B82F6' | Display color (hex code) |
| created_at | timestamp | DEFAULT now() | Counter creation time |
| updated_at | timestamp | DEFAULT now() | Last modified time |
| archived | boolean | DEFAULT false | Soft delete flag |

#### **Table 3: `counter_entries`**
Stores individual count events.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Entry unique ID |
| counter_id | uuid | FOREIGN KEY → counters(id), NOT NULL | Which counter this belongs to |
| user_id | uuid | FOREIGN KEY → profiles(id), NOT NULL | Who recorded this |
| value | integer | DEFAULT 1, NOT NULL | Increment value (usually 1) |
| timestamp | timestamp | DEFAULT now() | When this was recorded |
| note | text | NULLABLE | Optional note for this entry |
| synced | boolean | DEFAULT false | For offline sync tracking |

#### **Indexes to Create:**
- [ ] `counter_entries(counter_id, timestamp)` - For fast queries by date
- [ ] `counter_entries(user_id, timestamp)` - For user activity timeline
- [ ] `counters(user_id, archived)` - For listing active counters

---

## 🔒 Step 3: Supabase Security Setup (Row Level Security)

Supabase uses PostgreSQL Row Level Security (RLS) to protect data. We need to enable and configure it.

### 3.1 Enable RLS on All Tables
- [ ] Enable RLS on `profiles` table
- [ ] Enable RLS on `counters` table
- [ ] Enable RLS on `counter_entries` table

### 3.2 Create Security Policies

We'll need to create policies for each table. Here's what each policy should do:

#### Policies for `profiles`:
- [ ] **SELECT:** Users can read any profile (for social features later)
- [ ] **INSERT:** Users can insert their own profile only
- [ ] **UPDATE:** Users can update only their own profile
- [ ] **DELETE:** Users can delete only their own profile

#### Policies for `counters`:
- [ ] **SELECT:** Users can read only their own counters
- [ ] **INSERT:** Users can create counters for themselves only
- [ ] **UPDATE:** Users can update only their own counters
- [ ] **DELETE:** Users can delete only their own counters

#### Policies for `counter_entries`:
- [ ] **SELECT:** Users can read entries for their own counters only
- [ ] **INSERT:** Users can create entries for their own counters only
- [ ] **UPDATE:** Users can update only their own entries
- [ ] **DELETE:** Users can delete only their own entries

---

## 🎨 Step 4: Design & UX Planning

Before coding, let's plan the user interface and experience.

### 4.1 App Structure (Pages/Routes)

| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/` | Landing page with app description | No |
| `/login` | Login/signup page | No |
| `/dashboard` | Main app - list of counters | Yes |
| `/counter/:id` | Individual counter detail view | Yes |
| `/counter/:id/history` | Full history of entries | Yes |
| `/settings` | User profile and app settings | Yes |
| `/stats` | Statistics dashboard | Yes |

### 4.2 Key User Flows

#### Flow 1: First-Time User
1. User visits landing page
2. Clicks "Get Started" or "Sign Up"
3. Creates account (email + password or OAuth)
4. Redirected to empty dashboard with onboarding tutorial
5. Creates first counter
6. Records first entry
7. Sees congratulations message

#### Flow 2: Daily Usage (Most Important!)
1. User opens PWA (from home screen or browser)
2. App loads instantly (even offline)
3. Dashboard shows all counters with current counts
4. User taps big "+" button on a counter
5. Count increments immediately (no confirmation needed)
6. Visual feedback (animation, haptic on mobile)
7. Data syncs in background when online

#### Flow 3: Viewing Statistics
1. User navigates to Stats page or counter detail
2. Sees charts showing:
   - Today's count
   - This week's total
   - This month's total
   - Trend graph (last 30 days)
3. Can switch between different time ranges

### 4.3 UI Component List

#### Core Components to Build:
- [ ] **CounterCard** - Shows counter name, icon, current count, quick +1 button
- [ ] **CounterList** - Grid/list of all CounterCards
- [ ] **AddCounterForm** - Modal/page to create new counter
- [ ] **EditCounterForm** - Edit existing counter details
- [ ] **EntryHistory** - List of past entries with timestamps
- [ ] **StatsChart** - Reusable chart component (bar/line chart)
- [ ] **DateRangePicker** - Select date range for stats
- [ ] **AuthForm** - Login/signup form
- [ ] **Navigation** - Top/bottom nav bar
- [ ] **OfflineIndicator** - Shows when app is offline

### 4.4 Design Decisions to Make

- [ ] **Color Scheme:** Choose primary colors (consider accessibility)
- [ ] **Counter Icons:** Use emoji picker or icon library? (Lucide React recommended)
- [ ] **Layout:** Bottom navigation or side menu?
- [ ] **Animations:** Decide on feedback animations (Spring animations with Framer Motion?)
- [ ] **Dark Mode:** Support from day 1? (Recommended: yes, with system preference)

---

## 🛠️ Step 5: Development Environment Setup

### 5.1 Required Software
- [ ] **Node.js** - Download and install LTS version from [nodejs.org](https://nodejs.org/)
  - Check installation: `node --version` (should be v18 or higher)
  - Check npm: `npm --version`
- [ ] **Git** - Install from [git-scm.com](https://git-scm.com/)
  - Check: `git --version`
- [ ] **VS Code** - Recommended editor from [code.visualstudio.com](https://code.visualstudio.com/)

### 5.2 VS Code Extensions (Recommended)
- [ ] ES7+ React/Redux/React-Native snippets
- [ ] Tailwind CSS IntelliSense
- [ ] ESLint
- [ ] Prettier - Code formatter
- [ ] GitLens
- [ ] Thunder Client (for API testing)

### 5.3 Choose Your Frontend Framework

We have two good options:

#### Option A: **Next.js** (Recommended)
**Pros:**
- Built-in routing
- Server-side rendering capabilities for future
- Great for SEO (even for landing page)
- Easy API routes if needed
- Large community

**Cons:**
- Slightly more complex setup
- Bigger bundle size

#### Option B: **Vite + React**
**Pros:**
- Faster development server
- Simpler configuration
- Lighter weight
- Very fast builds

**Cons:**
- Need to add React Router manually
- No SSR out of the box

**Recommendation:** Start with **Next.js** - the benefits outweigh the complexity for a PWA.

### 5.4 Core Dependencies to Install

After creating the project, we'll need:

**Essential:**
- `@supabase/supabase-js` - Supabase client
- `@supabase/auth-helpers-nextjs` - Auth integration (if Next.js)
- `react-hook-form` - Form handling
- `zod` - Form validation
- `tailwindcss` - Styling
- `lucide-react` - Icons

**Charts & Visualization:**
- `recharts` - Chart library (recommended for React)
- OR `chart.js` + `react-chartjs-2` - Alternative

**PWA:**
- `next-pwa` - PWA support for Next.js
- OR `vite-plugin-pwa` - PWA support for Vite

**State Management:**
- `zustand` - Lightweight state management (optional but recommended)

**Date Handling:**
- `date-fns` - Date utilities (lightweight alternative to moment.js)

---

## 📱 Step 6: PWA Requirements Planning

To make the app installable and work offline, we need:

### 6.1 PWA Manifest (manifest.json)
- [ ] Define app name
- [ ] Choose app icons (need multiple sizes: 192x192, 512x512)
- [ ] Set display mode: "standalone"
- [ ] Set theme color
- [ ] Set background color
- [ ] Define start URL

### 6.2 Service Worker Strategy
- [ ] **Cache-first for static assets** (JS, CSS, images)
- [ ] **Network-first for API calls** (with fallback to cache)
- [ ] **Background sync for data mutations** (when offline)

### 6.3 Offline Data Strategy
- [ ] Use IndexedDB for offline storage (via Supabase client)
- [ ] Queue mutations when offline
- [ ] Sync when connection restored
- [ ] Show offline indicator to user

---

## 📊 Step 7: Testing Plan

Even for MVP, we should plan basic testing:

### 7.1 Manual Testing Checklist
- [ ] Test on Chrome (desktop)
- [ ] Test on Firefox (desktop)
- [ ] Test on Safari (if Mac available)
- [ ] Test on Chrome Mobile (Android)
- [ ] Test on Safari Mobile (iOS)
- [ ] Test offline mode
- [ ] Test PWA installation
- [ ] Test data sync after offline

### 7.2 Key Scenarios to Test
- [ ] Create account and login
- [ ] Create counter
- [ ] Increment counter multiple times quickly
- [ ] View counter history
- [ ] Edit counter
- [ ] Delete counter
- [ ] Go offline and increment counter
- [ ] Come back online and verify sync
- [ ] Install PWA and use from home screen

---

## 🚀 Step 8: Deployment Planning

### 8.1 Environment Variables Setup

We'll need different environments:

**Local Development (.env.local):**
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

**Production (Vercel):**
- Same variables will be set in Vercel dashboard

### 8.2 Vercel Deployment Setup
- [ ] Connect GitHub repo to Vercel
- [ ] Configure build settings:
  - Framework Preset: Next.js (or Vite)
  - Build Command: `npm run build`
  - Output Directory: `.next` (or `dist`)
- [ ] Add environment variables in Vercel dashboard
- [ ] Set up automatic deployments from main branch

### 8.3 Custom Domain (Optional)
- [ ] Purchase domain (Namecheap, Google Domains, etc.)
- [ ] Add domain in Vercel
- [ ] Configure DNS records
- [ ] Wait for SSL certificate (automatic)

---

## 📋 Step 9: Development Order (When We Start Coding)

This is the recommended order to build features:

### Sprint 1: Foundation (Week 1)
1. Project setup and dependencies
2. Supabase connection
3. Authentication (signup/login)
4. Basic routing structure
5. Layout components

### Sprint 2: Core Functionality (Week 2)
1. Database tables creation
2. Counter creation form
3. Counter list display
4. Counter increment functionality
5. Basic counter editing

### Sprint 3: Data & History (Week 3)
1. Entry history view
2. Counter deletion
3. Entry editing/deletion
4. Search/filter counters
5. Basic statistics display

### Sprint 4: Polish & PWA (Week 4)
1. Charts and visualizations
2. PWA configuration
3. Offline functionality
4. UI animations and polish
5. Mobile optimization

### Sprint 5: Testing & Launch (Week 5-6)
1. Bug fixes
2. Performance optimization
3. Cross-browser testing
4. Deployment to production
5. User documentation

---

## 🎯 Success Criteria for Phase 1

Before we consider Phase 1 complete, the app must:

- [ ] User can create account and login
- [ ] User can create unlimited counters
- [ ] User can increment counters with one tap
- [ ] User can view daily/weekly/monthly statistics
- [ ] App works offline and syncs when online
- [ ] App is installable as PWA
- [ ] App is mobile-responsive
- [ ] App loads in under 3 seconds
- [ ] No critical bugs
- [ ] Deployed to production URL
