# CounterApp 🎯

A modern Progressive Web App (PWA) for tracking daily activities and habits. Built with Next.js, TypeScript, Supabase, and Tailwind CSS.

## 🚀 Features (MVP - Phase 1)

### ✅ Implemented
- **User Authentication** - Secure signup/login with Supabase Auth
- **Landing Page** - Welcome screen with feature highlights
- **Responsive Design** - Mobile-first, works on all devices
- **TypeScript** - Full type safety throughout the app
- **Environment Configuration** - Secure credential management

### 🚧 Coming Next (Phase 2)
- Dashboard with counter list
- Create/edit/delete counters
- Increment/decrement functionality
- Basic statistics view

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
├── components/              # Reusable UI components (coming soon)
├── store/                   # Zustand stores (coming soon)
├── docs/                    # Project documentation
│   ├── README.md           # Original project vision
│   ├── planning.md         # Project planning
│   ├── database-setup.sql  # Database initialization script
│   └── SETUP_GUIDE.md      # Complete setup instructions
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

### Phase 1: Foundation & Authentication ✅ (Current)
- [x] Project setup with Next.js + TypeScript
- [x] Supabase integration
- [x] Database schema and RLS policies
- [x] User authentication (signup/login)
- [x] Landing page with feature highlights
- [x] Type-safe database client
- [x] Custom authentication hook
- [x] Auto-redirect based on auth state

### Phase 2: Core Functionality (Next)
- [ ] Dashboard layout with navigation
- [ ] Counter list view
- [ ] Create counter form
- [ ] Edit/delete counters
- [ ] Increment/decrement functionality
- [ ] Basic statistics (totals, today's count)

### Phase 3: Advanced Features
- [ ] Detailed analytics dashboard
- [ ] Charts and graphs (daily, weekly, monthly trends)
- [ ] Data export (CSV, JSON)
- [ ] PWA offline support
- [ ] Push notifications
- [ ] Dark mode

### Phase 4: Social Features
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

This is a personal learning project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

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
