# CounterApp 🎯

A modern Progressive Web App (PWA) for tracking daily activities and habits. Built with Next.js, TypeScript, Supabase, and Tailwind CSS.

## 🚀 Features (MVP - Phase 1)

### ✅ Implemented (Phase 1 & 2)

**Authentication & Core Features:**
- **User Authentication** - Secure signup/login with Supabase Auth
- **Landing Page** - Welcome screen with feature highlights  
- **Dashboard** - Modern interface with responsive navigation bar
- **Protected Routes** - Dashboard only accessible when logged in
- **Session Management** - Persistent login across browser sessions

**Counter Management:**
- **Create Counters** - Beautiful modal form with validation
- **Counter Display** - Responsive grid of colorful counter cards
- **8 Preset Colors** - Quick color selection plus custom color picker
- **Emoji Icons** - Add personality to your counters (🍺, ✈️, 💪, 📚)
- **Increment/Decrement** - One-click +1/-1 buttons with instant updates
- **Today's Count Badge** - Shows today's activity for each counter
- **Real-time Updates** - Optimistic UI with background database sync
- **Character Limits** - Name (50 chars), Description (200 chars) with counters
- **Form Validation** - Helpful error messages and loading states
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop

**User Feedback & Documentation:**
- **Feedback System** - Floating feedback button for logged-in users
- **Bug Reports** - Submit bug reports directly from the app
- **Feature Requests** - Request new features and improvements
- **General Feedback** - Share thoughts and suggestions
- **Release Notes** - Beautiful timeline page showing version history
- **Version Tracking** - See all updates, features, and bug fixes

### 🚧 Coming Next (Phase 3)
- Edit counter functionality
- Delete/archive counters with confirmation
- Statistics dashboard with summary cards
- Basic charts and graphs
- Date range filtering
- Counter search and sorting

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **State Management:** Zustand
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Deployment:** Vercel (planned)

## 📁 Project Structure

```
counter_app/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Authentication route group
│   │   ├── login/           # Login page
│   │   └── signup/          # Signup page
│   ├── dashboard/           # Dashboard page (protected)
│   ├── releases/            # Release notes page
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── lib/                     # Utility functions
│   └── supabase/           
│       └── client.ts        # Supabase client configuration
├── types/                   # TypeScript type definitions
│   └── database.types.ts    # Database schema types
├── hooks/                   # Custom React hooks
│   └── useAuth.ts          # Authentication hook
├── components/              # Reusable UI components
│   ├── CounterCard.tsx     # Counter display card
│   ├── CreateCounterModal.tsx  # Counter creation modal
│   └── FeedbackButton.tsx  # Floating feedback button
├── store/                   # Zustand stores
│   └── counterStore.ts     # Counter state management
├── data/                    # Static data files
│   └── releases.ts          # Version history data
├── docs/                    # Project documentation
│   ├── README.md           # Original project vision
│   ├── planning.md         # Project planning
│   ├── database-setup.sql  # Database initialization script
│   ├── SETUP_GUIDE.md      # Complete setup instructions
│   └── TESTING_GUIDE.md    # Comprehensive testing guide
├── .env.local              # Environment variables (not in git)
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript configuration
```

## 🗄️ Database Schema

### Tables

**profiles**
- `id` (UUID, PK) - References auth.users
- `username` (TEXT, unique) - User's display name (defaults to email)
- `avatar_url` (TEXT, optional) - Profile picture URL
- `created_at` / `updated_at` (TIMESTAMPTZ)

**counters**
- `id` (UUID, PK)
- `user_id` (UUID, FK → profiles)
- `name` (TEXT) - Counter name (e.g., "Beers", "Workouts")
- `description` (TEXT, optional) - Additional details
- `icon` (TEXT, optional) - Icon identifier
- `color` (TEXT) - Hex color for visual identification
- `archived` (BOOLEAN) - Soft delete flag
- `created_at` / `updated_at` (TIMESTAMPTZ)

**counter_entries**
- `id` (UUID, PK)
- `counter_id` (UUID, FK → counters)
- `user_id` (UUID, FK → profiles)
- `value` (INTEGER) - Increment/decrement amount (default: 1)
- `timestamp` (TIMESTAMPTZ) - When the entry was created
- `note` (TEXT, optional) - Additional context
- `synced` (BOOLEAN) - For offline sync support (future)

**feedback**
- `id` (UUID, PK)
- `user_id` (UUID, FK → profiles, nullable)
- `user_email` (TEXT, optional) - User's email for follow-up
- `feedback_type` (TEXT) - Type: 'bug', 'feature', or 'general'
- `message` (TEXT) - Feedback content
- `status` (TEXT) - Status: 'new', 'reviewed', or 'resolved'
- `created_at` (TIMESTAMPTZ)

### Security

- **Row Level Security (RLS)** enabled on all tables
- Users can only access their own data
- Automatic profile creation on signup via database trigger
- Policies enforce user isolation at database level

### Indexes

Performance indexes created for common queries:
- `counter_entries_counter_id_timestamp_idx` - Fast counter history queries
- `counter_entries_user_id_timestamp_idx` - Fast user activity queries
- `counters_user_id_archived_idx` - Fast counter list filtering

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account and project
- Git installed

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd counter_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env.local` in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   
   Run the SQL script from `docs/database-setup.sql` in your Supabase SQL Editor

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

📚 **For detailed setup instructions, see [docs/SETUP_GUIDE.md](docs/SETUP_GUIDE.md)**

## 📝 Environment Variables

| Variable | Description | Where to find |
|----------|-------------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Supabase Dashboard → Settings → API → Project API keys → anon public |

⚠️ **Security Note:** Never commit `.env.local` to version control! It's already in `.gitignore`.

## 🏗️ Development Progress

### Phase 1: Foundation & Authentication ✅ COMPLETE
- [x] Project setup with Next.js + TypeScript
- [x] Supabase integration
- [x] Database schema and RLS policies  
- [x] User authentication (signup/login)
- [x] Landing page with feature highlights
- [x] Type-safe database client
- [x] Custom authentication hook
- [x] Auto-redirect based on auth state
- [x] Dashboard layout with navigation

### Phase 2: Core Counter Functionality ✅ COMPLETE
- [x] Counter display grid with responsive design
- [x] Counter cards with color-coding and emojis
- [x] Increment/decrement buttons with instant feedback
- [x] Create counter modal with validation
- [x] Color picker (8 presets + custom)
- [x] Emoji icon support
- [x] Zustand state management
- [x] Real-time UI updates with optimistic rendering
- [x] Today's count badge on each counter
- [x] Form validation with character counters
- [x] Loading states and error handling
- [x] Floating feedback button (logged-in users only)
- [x] Bug report, feature request, and general feedback forms
- [x] Feedback stored in Supabase database
- [x] Release notes page with version timeline
- [x] Navigation links to releases from dashboard
- [x] ~1200 lines of production code added
- [x] All test cases passing
- [x] Zero console errors

### Phase 3: Advanced Counter Management (Next Up)
- [ ] Edit counter functionality  
- [ ] Delete/archive counters with confirmation
- [ ] Counter search and filtering
- [ ] Statistics dashboard with summary cards
- [ ] Basic charts (daily/weekly trends)
- [ ] Date range filtering for entries

### Phase 4: Analytics & Data Visualization
- [ ] Detailed analytics dashboard
- [ ] Advanced charts and graphs
- [ ] Data export (CSV, JSON)
- [ ] Counter history view
- [ ] Comparison views
- [ ] Goal setting and tracking

### Phase 5: PWA & Offline Support
- [ ] Enhanced PWA manifest
- [ ] Service worker implementation
- [ ] Offline data caching
- [ ] Background sync
- [ ] Push notifications
- [ ] Dark mode

### Phase 6: Social Features
- [ ] Public profiles
- [ ] Counter sharing
- [ ] Leaderboards
- [ ] Friend comparisons
- [ ] Achievement system

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

📚 **See [docs/TESTING_GUIDE.md](docs/TESTING_GUIDE.md) for comprehensive testing instructions and test cases.**

## 📱 PWA Features (Planned)

- **Installable** - Add to home screen on mobile devices
- **Offline Support** - Work without internet connection
- **Fast Loading** - Optimized performance with caching
- **Push Notifications** - Reminders to log activities

## 🔒 Security Features

- **Environment-based configuration** - Credentials stored securely
- **Row Level Security** - Database-level access control
- **HTTP-only cookies** - Secure session management (via Supabase)
- **Password hashing** - Bcrypt via Supabase Auth
- **Input validation** - Zod schemas for form validation

## 🤝 Contributing

We welcome contributions from the team! Please follow our development workflow:

### 📚 Documentation

- **[SETUP.md](SETUP.md)** - Complete environment setup guide for new contributors
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Detailed contribution guidelines and workflow
- **[docs/TESTING_GUIDE.md](docs/TESTING_GUIDE.md)** - Comprehensive testing instructions

### 🔄 Development Workflow

1. **Get Access**
   - Request collaborator access from @PavelDetvan
   - Clone the repository

2. **Set Up Environment**
   - Follow [SETUP.md](SETUP.md) for complete setup instructions
   - Install dependencies: `npm install`
   - Configure `.env.local` with Supabase credentials
   - Run dev server: `npm run dev`

3. **Create Feature Branch**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-username/description
   ```
   
   **Branch naming:**
   - Features: `feature/username/add-dark-mode`
   - Bug fixes: `bugfix/username/fix-counter-increment`
   - Documentation: `docs/username/update-readme`

4. **Make Changes**
   - Write clean, documented code
   - Follow existing code style
   - Test your changes thoroughly
   - Commit with descriptive messages

5. **Push & Create Pull Request**
   ```bash
   git add .
   git commit -m "feat: add dark mode toggle"
   git push origin feature/your-username/description
   ```
   - Go to GitHub and create a Pull Request
   - Fill out the PR template (auto-populated)
   - Request review from @PavelDetvan

6. **Code Review**
   - Address review feedback
   - Update PR with requested changes
   - Once approved, PR will be merged

7. **Auto-Deploy**
   - Merging to `main` triggers automatic Vercel deployment
   - Changes go live within 2-3 minutes

### 🛡️ Branch Protection

The `main` branch is protected:
- ✅ Direct pushes are blocked
- ✅ Pull requests required for all changes
- ✅ 1 approval required before merge
- ✅ Admin (@PavelDetvan) can bypass for urgent fixes
- ✅ Keeps production stable

### 📋 Issue Templates

When reporting bugs or requesting features, use GitHub issue templates:

- **🐛 Bug Report** - Structured bug reporting with reproduction steps
- **💡 Feature Request** - Propose new features with use cases

### 🚀 Deployment Process

**Production:** https://counter-app-eight-liart.vercel.app

1. **Feature Branches** → Preview deployment (auto-generated URL)
2. **Pull Request** → Review changes on preview
3. **Merge to Main** → Automatic production deployment
4. **Live in ~2 minutes** → Changes visible to users

**Environment:**
- **Platform:** Vercel
- **Auto-deploy:** Enabled for `main` branch
- **Preview deployments:** Enabled for all branches
- **Domain:** counter-app-eight-liart.vercel.app

### ✅ Commit Message Format

Follow Conventional Commits:

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style/formatting
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**Examples:**
```bash
feat: add dark mode toggle to settings
fix: counter increment not updating database
docs: update SETUP.md with troubleshooting
style: format code with Prettier
refactor: simplify counter state management
```

📖 **See [CONTRIBUTING.md](CONTRIBUTING.md) for complete guidelines!**

## 📄 License

MIT License - feel free to use this project for learning purposes.

## 👨‍💻 Author

Pavel Detvan

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icon library

---

**Built with ❤️ using Next.js and Supabase**
