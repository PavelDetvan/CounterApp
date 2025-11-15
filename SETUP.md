# Development Setup Guide 🛠️

Complete guide to set up CounterApp on your local machine for development.

---

## ✅ Prerequisites

Before you start, make sure you have these installed:

### Required Software

1. **Node.js 20 or higher**
   - Download: https://nodejs.org/
   - Check version: `node --version`
   - Should show: v20.x.x or higher

2. **Git**
   - Download: https://git-scm.com/
   - Check version: `git --version`

3. **Code Editor**
   - VS Code (recommended): https://code.visualstudio.com/
   - Or any editor you prefer

4. **GitHub Account**
   - Sign up: https://github.com/join
   - Ask @PavelDetvan for repository access

---

## 📥 Step-by-Step Setup

### Step 1: Get Repository Access

1. **Request access:**
   - Contact @PavelDetvan
   - Provide your GitHub username
   - Wait for invitation email

2. **Accept invitation:**
   - Check your email
   - Click "Accept invitation"
   - You now have collaborator access!

---

### Step 2: Clone the Repository

Open terminal (PowerShell/Command Prompt/Terminal):

```bash
# Navigate to where you want the project
cd C:\Users\YourName\Documents

# Clone the repository
git clone https://github.com/PavelDetvan/CounterApp.git

# Enter the project folder
cd CounterApp
```

**Verify it worked:**
```bash
dir  # Windows
ls   # Mac/Linux

# You should see folders like: app, components, lib, etc.
```

---

### Step 3: Install Dependencies

```bash
npm install
```

This will:
- Download all required packages
- Take 1-2 minutes
- Create `node_modules` folder

**Expected output:**
```
added 385 packages in 45s
```

---

### Step 4: Set Up Environment Variables

**Get credentials from @PavelDetvan:**

Ask them for:
- Supabase URL
- Supabase Anon Key

**Create `.env.local` file:**

In the project root, create a file named `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important:**
- ⚠️ Never commit this file to Git
- ⚠️ It's already in `.gitignore`
- ⚠️ Don't share these keys publicly

---

### Step 5: Run Development Server

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 16.0.3 (Turbopack)
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Starting...
✓ Ready in 2.5s
```

**Open your browser:**
- Go to: http://localhost:3000
- You should see the CounterApp landing page! 🎉

---

### Step 6: Verify Everything Works

**Test these features:**

1. ✅ **Landing page loads**
   - See "CounterApp" title
   - See feature cards
   - No console errors

2. ✅ **Sign up works**
   - Click "Get Started"
   - Fill in email/password
   - Check email for confirmation
   - Click confirmation link

3. ✅ **Login works**
   - Use your credentials
   - Should redirect to dashboard

4. ✅ **Create counter works**
   - Click "Add Counter"
   - Fill in name, color, emoji
   - Counter appears

5. ✅ **Increment/decrement works**
   - Click +1 button
   - Count increases
   - Click -1 button
   - Count decreases

**If all tests pass, you're ready to code!** ✅

---

## 🔧 Common Setup Issues

### Issue: `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Or use different port:
npm run dev -- -p 3001
```

### Issue: Environment variables not working

**Checklist:**
- [ ] File is named exactly `.env.local` (not `.env.local.txt`)
- [ ] File is in project root (same folder as `package.json`)
- [ ] No spaces around `=` sign
- [ ] Restart dev server after creating file

### Issue: TypeScript errors

**Solution:**
```bash
# Check for errors
npx tsc --noEmit

# Common fix: delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: Can't see changes

**Solutions:**
1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Restart dev server
4. Check if file was saved

---

## 🎯 Development Checklist

Before you start coding, verify:

- [ ] `node --version` shows v20 or higher
- [ ] `git --version` works
- [ ] Repository cloned successfully
- [ ] `npm install` completed without errors
- [ ] `.env.local` file created with correct values
- [ ] `npm run dev` starts successfully
- [ ] App loads at http://localhost:3000
- [ ] Can sign up and login
- [ ] Can create and use counters
- [ ] No console errors in browser
- [ ] Read CONTRIBUTING.md

---

## 📁 Recommended VS Code Extensions

Install these for better development experience:

1. **ES7+ React/Redux/React-Native snippets**
   - ID: `dsznajder.es7-react-js-snippets`

2. **Tailwind CSS IntelliSense**
   - ID: `bradlc.vscode-tailwindcss`

3. **Prettier - Code formatter**
   - ID: `esbenp.prettier-vscode`

4. **ESLint**
   - ID: `dbaeumer.vscode-eslint`

5. **GitLens**
   - ID: `eamodio.gitlens`

**Install via VS Code:**
- Press `Ctrl+Shift+X` (Windows) or `Cmd+Shift+X` (Mac)
- Search for extension name
- Click "Install"

---

## 🗂️ Understanding the Project Structure

```
counter_app/
├── app/                      # Next.js pages (App Router)
│   ├── page.tsx             # Landing page (/)
│   ├── layout.tsx           # Root layout
│   ├── (auth)/              # Auth pages
│   │   ├── login/           # /login
│   │   └── signup/          # /signup
│   ├── dashboard/           # /dashboard (protected)
│   └── releases/            # /releases
│
├── components/              # Reusable React components
│   ├── CounterCard.tsx      # Individual counter display
│   ├── CreateCounterModal.tsx # Modal for creating counters
│   └── FeedbackButton.tsx   # Floating feedback button
│
├── lib/                     # Utility functions
│   └── supabase/
│       └── client.ts        # Supabase client instance
│
├── hooks/                   # Custom React hooks
│   └── useAuth.ts          # Authentication hook
│
├── store/                   # State management (Zustand)
│   └── counterStore.ts     # Counter global state
│
├── types/                   # TypeScript type definitions
│   └── database.types.ts   # Database schema types
│
├── data/                    # Static data
│   └── releases.ts         # Release notes
│
├── public/                  # Static assets
│   └── manifest.json       # PWA manifest
│
├── .env.local              # Environment variables (NOT IN GIT)
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind CSS config
└── next.config.ts          # Next.js config
```

---

## 🔐 Database Access (Optional)

If you need direct database access:

1. **Ask @PavelDetvan** to add you to Supabase project

2. **Go to:** https://supabase.com/dashboard

3. **You'll see:**
   - Table Editor - View/edit data
   - SQL Editor - Run queries
   - Authentication - Manage users
   - Storage - Manage files

**Tables:**
- `profiles` - User profiles
- `counters` - Counter data
- `counter_entries` - Counter increment/decrement history
- `feedback` - User feedback submissions

---

## 📚 Technologies Used

Learn about these technologies:

- **Next.js 15** - React framework
  - Docs: https://nextjs.org/docs

- **TypeScript** - Type-safe JavaScript
  - Docs: https://www.typescriptlang.org/docs/

- **Tailwind CSS** - Utility-first CSS
  - Docs: https://tailwindcss.com/docs

- **Supabase** - Backend as a Service
  - Docs: https://supabase.com/docs

- **Zustand** - State management
  - Docs: https://zustand-demo.pmnd.rs/

- **Lucide React** - Icon library
  - Icons: https://lucide.dev/icons/

---

## 🎓 Learning Resources

New to these technologies?

**Next.js:**
- Official Tutorial: https://nextjs.org/learn
- Next.js 15 Updates: https://nextjs.org/blog/next-15

**React:**
- Official Docs: https://react.dev/learn
- React Hooks: https://react.dev/reference/react

**TypeScript:**
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/
- TypeScript for React: https://react-typescript-cheatsheet.netlify.app/

**Tailwind CSS:**
- Play with examples: https://play.tailwindcss.com/
- Tutorial: https://tailwindcss.com/docs/utility-first

---

## 🆘 Getting Help

**Stuck? Here's what to do:**

1. **Check existing code**
   - Look at similar components
   - See how others solved it

2. **Search GitHub Issues**
   - Someone might have asked already
   - Check closed issues too

3. **Ask for help**
   - Open a new GitHub Issue
   - Tag @PavelDetvan
   - Provide details:
     - What you're trying to do
     - What error you're getting
     - What you've tried
     - Screenshots if relevant

4. **Useful debugging commands:**
   ```bash
   # Check TypeScript errors
   npx tsc --noEmit
   
   # Check linting errors
   npm run lint
   
   # Build to check for issues
   npm run build
   
   # Clear Next.js cache
   rm -rf .next
   npm run dev
   ```

---

## 🎉 You're Ready!

Setup complete! Here's what to do next:

1. ✅ Read CONTRIBUTING.md
2. ✅ Look at existing code
3. ✅ Pick an issue from GitHub
4. ✅ Create your first feature branch
5. ✅ Make your first contribution!

---

**Questions? Tag @PavelDetvan in GitHub Issues!**

**Happy coding! 🚀**
