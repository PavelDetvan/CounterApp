# CounterApp Setup Guide

Complete step-by-step guide to set up the CounterApp project locally.

## Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- **Git** installed ([Download here](https://git-scm.com/))
- **Supabase account** ([Sign up here](https://supabase.com/))
- A code editor (VS Code recommended)

## Step 1: Create Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in the details:
   - **Name:** `counterapp` (or your choice)
   - **Database Password:** Generate a strong password and save it
   - **Region:** Choose closest to your location
   - **Pricing Plan:** Free tier is perfect for development
4. Click **"Create new project"**
5. Wait 2-3 minutes for the project to initialize

## Step 2: Set Up Database

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy the entire contents of `docs/database-setup.sql`
4. Paste into the SQL Editor
5. Click **"Run"** (or press Ctrl/Cmd + Enter)
6. You should see: "Success. No rows returned"

**What this does:**
- Creates 3 tables: `profiles`, `counters`, `counter_entries`
- Enables Row Level Security (RLS) for data isolation
- Creates policies to ensure users only see their own data
- Sets up automatic profile creation on signup
- Creates performance indexes

## Step 3: Get Supabase Credentials

1. In your Supabase project, go to **Settings** (gear icon) → **API**
2. Find the **Project URL** section and copy the URL
   - It looks like: `https://xxxxx.supabase.co`
3. Scroll down to **Project API keys**
4. Copy the **`anon` `public`** key (not the service_role key!)
   - It's a long string starting with `eyJ...`

## Step 4: Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd counter_app

# Install dependencies
npm install
```

## Step 5: Configure Environment Variables

1. Create a file named `.env.local` in the project root
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Replace the values with your actual credentials from Step 3.

**Important:** Never commit `.env.local` to git! It's already in `.gitignore`.

## Step 6: Run the Development Server

```bash
npm run dev
```

You should see:
```
▲ Next.js 15.x.x
- Local:        http://localhost:3000
✓ Ready in 2.5s
```

## Step 7: Test the Application

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. You should see the landing page with "CounterApp" title
3. Click **"Get Started"** to go to the signup page
4. Create a test account with your email
5. You should be automatically logged in and redirected to `/dashboard`

## Development Workflow

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Project Structure Overview

```
counter_app/
├── app/                    # Next.js pages
│   ├── (auth)/            # Authentication pages
│   ├── page.tsx           # Landing page
│   └── layout.tsx         # Root layout
├── lib/                   # Utilities
│   └── supabase/          # Database client
├── types/                 # TypeScript types
├── hooks/                 # React hooks
├── components/            # UI components
└── docs/                  # Documentation
```
