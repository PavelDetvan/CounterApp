# Contributing to CounterApp 🎯

Thanks for helping build CounterApp! This guide will help you get started and contribute effectively.

## 🚀 Quick Start

### Prerequisites

- **Node.js 20+**: https://nodejs.org/
- **Git**: https://git-scm.com/
- **VS Code** (recommended): https://code.visualstudio.com/
- **GitHub account**

### 1. Get Repository Access

Ask **@PavelDetvan** to add you as a collaborator:
- They'll invite you via GitHub
- Accept the invitation email
- You'll have write access to create branches and PRs

### 2. Clone the Repository

```bash
git clone https://github.com/PavelDetvan/CounterApp.git
cd CounterApp
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Get these credentials from @PavelDetvan!**

### 5. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 - you should see the app! 🎉

---

## 🔄 Development Workflow

### Creating a Feature

1. **Always start from main:**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-name/feature-description
   ```

   **Branch naming convention:**
   - `feature/john/add-statistics` - New feature
   - `feature/sarah/dark-mode` - Another feature
   - `fix/john/login-bug` - Bug fix
   - `docs/john/update-readme` - Documentation

3. **Make your changes:**
   - Write code
   - Test locally (`npm run dev`)
   - Make sure everything works
   - Commit regularly

4. **Commit your work:**
   ```bash
   git add .
   git commit -m "feat: add statistics dashboard"
   ```

   **Use conventional commit messages:**
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code formatting (no logic change)
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

5. **Push your branch:**
   ```bash
   git push origin feature/your-name/feature-description
   ```

6. **Create Pull Request:**
   - Go to https://github.com/PavelDetvan/CounterApp
   - Click "Pull Requests" → "New Pull Request"
   - Select your branch
   - Fill in the PR template (see below)
   - Click "Create Pull Request"

7. **Wait for review:**
   - @PavelDetvan will review your code
   - Address any feedback
   - Once approved, your PR will be merged!
   - Vercel will auto-deploy to production 🚀

---

## 📝 Pull Request Template

When creating a PR, use this structure:

```markdown
## 🎯 What does this PR do?

Brief description of what you built/fixed.

## 🔨 How to test?

1. Step-by-step instructions
2. How to verify it works
3. Expected behavior

## 📸 Screenshots (if UI changes)

[Attach screenshots or GIFs]

## ✅ Checklist

- [ ] Code runs locally without errors
- [ ] Tested on Chrome/Firefox
- [ ] Tested on mobile (responsive)
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Follows existing code style
- [ ] Updated documentation if needed
```

---

## 🧪 Testing Your Changes

Before submitting a PR, verify:

### Local Testing
```bash
# Run dev server
npm run dev

# Check TypeScript errors
npx tsc --noEmit

# Run linter
npm run lint

# Build for production (make sure it builds)
npm run build
```

### Manual Testing Checklist
- [ ] Tested in Chrome/Firefox/Safari
- [ ] Tested on mobile screen sizes
- [ ] Tested authentication flow
- [ ] Tested all new features
- [ ] No console errors in browser
- [ ] App loads without errors

---

## 📁 Project Structure

```
counter_app/
├── app/                       # Next.js app directory
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── (auth)/               # Auth route group
│   │   ├── login/            # Login page
│   │   └── signup/           # Signup page
│   ├── dashboard/            # Dashboard (protected)
│   └── releases/             # Release notes
├── components/               # React components
│   ├── CounterCard.tsx       # Counter display card
│   ├── CreateCounterModal.tsx # Counter creation modal
│   └── FeedbackButton.tsx    # Floating feedback button
├── lib/                      # Utilities
│   └── supabase/
│       └── client.ts         # Supabase client
├── hooks/                    # Custom React hooks
│   └── useAuth.ts           # Authentication hook
├── store/                    # Zustand state management
│   └── counterStore.ts      # Counter state
├── types/                    # TypeScript types
│   └── database.types.ts    # Database schema types
├── data/                     # Static data
│   └── releases.ts          # Release notes data
└── public/                   # Static files
    └── manifest.json        # PWA manifest
```

---

## 💡 Code Style Guidelines

### TypeScript
- Use TypeScript for all new files
- Define types/interfaces for props
- Avoid `any` type - use proper types

### React Components
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use meaningful component names

### Naming Conventions
- Components: `PascalCase` (e.g., `CounterCard.tsx`)
- Files: `camelCase` for utilities (e.g., `useAuth.ts`)
- Variables: `camelCase` (e.g., `userName`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES`)

### Styling
- Use Tailwind CSS utility classes
- Mobile-first responsive design
- Follow existing color scheme
- Keep consistent spacing

---

## 🐛 Found a Bug?

1. **Check if issue exists:**
   - Search GitHub Issues first
   - Avoid duplicate reports

2. **Create a new issue:**
   - Go to GitHub Issues
   - Click "New Issue"
   - Choose "Bug Report" template
   - Fill in details:
     - What you expected
     - What actually happened
     - Steps to reproduce
     - Screenshots if relevant
     - Browser/device info

3. **Want to fix it yourself?**
   - Comment on the issue to claim it
   - Create a feature branch
   - Fix the bug
   - Submit PR referencing the issue

---

## 💭 Suggesting Features?

1. **Open an issue:**
   - Use "Feature Request" template
   - Describe the feature clearly
   - Explain why it's useful
   - Add mockups if you have them

2. **Want to implement it?**
   - Wait for @PavelDetvan to approve
   - Create feature branch
   - Build it
   - Submit PR!

**Or use the feedback button in the app!** 📬

---

## 🚫 What NOT to Do

❌ **Don't push directly to `main`**
- Always use feature branches
- Always create PRs

❌ **Don't commit sensitive data**
- No API keys in code
- No passwords
- No `.env.local` file
- Check `.gitignore`

❌ **Don't merge your own PRs**
- Wait for @PavelDetvan's approval
- Only maintainer can merge

❌ **Don't break the build**
- Test locally before pushing
- Fix TypeScript errors
- Make sure `npm run build` works

❌ **Don't make huge PRs**
- Keep changes focused
- One feature per PR
- Easier to review

---

## ⚡ Quick Commands Reference

```bash
# Clone repository
git clone https://github.com/PavelDetvan/CounterApp.git

# Install dependencies
npm install

# Start dev server
npm run dev

# Create feature branch
git checkout -b feature/your-name/feature-name

# Check TypeScript
npx tsc --noEmit

# Run linter
npm run lint

# Build for production
npm run build

# Commit changes
git add .
git commit -m "feat: your feature"

# Push branch
git push origin feature/your-name/feature-name

# Update your branch with latest main
git checkout main
git pull origin main
git checkout your-branch
git merge main

# Delete local branch after merge
git branch -d feature/your-name/feature-name
```

---

## 🆘 Need Help?

- **Questions?** Ask in GitHub Issues
- **Stuck?** Tag @PavelDetvan in your PR
- **Technical issues?** Check existing code for examples
- **Environment setup?** See SETUP.md

---

## 🎉 After Your PR is Merged

1. **Celebrate!** 🎊 Your code is in production!

2. **Clean up:**
   ```bash
   git checkout main
   git pull origin main
   git branch -d feature/your-name/feature-name
   ```

3. **Check production:**
   - Visit https://counter-app-eight-liart.vercel.app
   - Your feature is live!

4. **Next contribution:**
   - Find another issue
   - Or suggest new features
   - Keep building! 🚀

---

## 📊 Deployment Info

- **Production:** https://counter-app-eight-liart.vercel.app
- **Auto-deploys:** When PRs merge to `main`
- **Preview deploys:** Automatic for all branches
- **Build time:** ~2-3 minutes
- **Hosting:** Vercel (free tier)

---

## 🏆 Recognition

All contributors will be:
- Listed in release notes
- Mentioned in GitHub releases
- Thanked in the community!

---

**Happy coding! Let's build something awesome together! 🚀**

Questions? Open an issue or tag @PavelDetvan!
