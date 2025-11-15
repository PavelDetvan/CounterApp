# CounterApp Testing Guide 🧪

Complete testing documentation for Phase 1 features (Authentication + Dashboard).

---

## 🚀 Getting Started

### Prerequisites
- App running on http://localhost:3000
- Fresh browser session (or incognito mode for clean tests)

---

## Test Suite 1: Authentication Flow

### Test 1.1: Signup (New User Registration)

**Steps:**
1. Navigate to http://localhost:3000
2. Click **"Get Started"** button
3. You should be redirected to `/signup`

**Expected Result:**
- ✅ Clean signup form with email, password, confirm password fields
- ✅ "Create Account" heading visible
- ✅ Blue gradient background
- ✅ "Already have an account? Sign in" link at bottom

**Test Actions:**
1. Enter email: `test@example.com`
2. Enter password: `testpassword123` (6+ characters)
3. Enter confirm password: `testpassword123` (must match)
4. Click **"Sign Up"** button

**Expected Behavior:**
- ✅ Button shows "Creating account..." while processing
- ✅ Automatically redirected to `/dashboard` after successful signup
- ✅ User is logged in (email shown in navigation bar)

**Error Cases to Test:**

| Test Case | Action | Expected Error |
|-----------|--------|----------------|
| Passwords don't match | Password: `test123`, Confirm: `test456` | "Passwords do not match" |
| Password too short | Password: `test` | "Password must be at least 6 characters" |
| Duplicate email | Use already registered email | "An account with this email already exists" |
| Invalid email | Email: `notanemail` | Browser validation error |

---

### Test 1.2: Login (Existing User)

**Steps:**
1. Navigate to http://localhost:3000
2. Click **"Sign In"** button
3. You should be redirected to `/login`

**Expected Result:**
- ✅ Login form with email and password fields
- ✅ "Welcome Back!" heading
- ✅ "Don't have an account? Sign up" link at bottom

**Test Actions:**
1. Enter email: `test@example.com`
2. Enter password: `testpassword123`
3. Click **"Sign In"** button

**Expected Behavior:**
- ✅ Button shows "Signing in..." while processing
- ✅ Redirected to `/dashboard`
- ✅ User is logged in

**Error Cases to Test:**

| Test Case | Action | Expected Error |
|-----------|--------|----------------|
| Wrong password | Correct email, wrong password | "Failed to login" or "Invalid credentials" |
| Non-existent email | Email not in system | "Failed to login" |
| Empty fields | Leave fields blank | Browser validation error |

---

### Test 1.3: Logout

**Steps:**
1. While logged in, go to `/dashboard`
2. Click **"Logout"** button (top right)

**Expected Behavior:**
- ✅ Immediately redirected to `/` (landing page)
- ✅ User is logged out
- ✅ Attempting to access `/dashboard` redirects to `/login`

---

### Test 1.4: Protected Route Access

**Test Case: Accessing Dashboard While Logged Out**

**Steps:**
1. Make sure you're logged out
2. Navigate directly to http://localhost:3000/dashboard

**Expected Behavior:**
- ✅ Loading spinner appears briefly
- ✅ Automatically redirected to `/login`
- ✅ Cannot access dashboard without authentication

---

## Test Suite 2: Landing Page

### Test 2.1: Landing Page Display

**Steps:**
1. Navigate to http://localhost:3000 (while logged out)

**Expected Result:**
- ✅ "CounterApp" heading with blue accent
- ✅ Tagline: "Track your daily activities with ease..."
- ✅ Three feature cards displayed:
  - 📊 Track Anything
  - 📱 Mobile-First
  - 📈 View Stats
- ✅ Two CTA buttons: "Get Started" (blue) and "Sign In" (white)

### Test 2.2: Auto-Redirect When Logged In

**Steps:**
1. Login to your account
2. Navigate to http://localhost:3000

**Expected Behavior:**
- ✅ Brief loading state
- ✅ Automatically redirected to `/dashboard`
- ✅ Cannot see landing page while logged in

---

## Test Suite 3: Dashboard Interface

### Test 3.1: Dashboard Layout

**Steps:**
1. Login and navigate to `/dashboard`

**Expected Result:**

**Navigation Bar:**
- ✅ "CounterApp" logo on the left
- ✅ User email displayed (desktop only)
- ✅ "Logout" button on the right
- ✅ White background with subtle shadow

**Main Content:**
- ✅ "My Counters" heading
- ✅ "Track your activities and habits" subtitle
- ✅ Blue "Add Counter" button (top right)

### Test 3.2: Empty State

**Condition:** No counters created yet

**Expected Display:**
- ✅ White card with:
  - 📊 Large emoji icon
  - "No counters yet" heading
  - Helpful message
  - "Create Your First Counter" button

---

## Test Suite 4: Counter Management

### Test 4.1: Manual Counter Creation (Database)

**Setup:** Create a test counter via Supabase

**Steps:**
1. Go to Supabase Dashboard → Table Editor
2. Open `profiles` table
3. Copy your user `id` (UUID)
4. Open `counters` table
5. Click **"Insert"** → **"Insert row"**
6. Fill in:
   ```
   user_id: <your-user-id>
   name: Beer Counter
   description: Tracking my beer consumption
   color: #F59E0B
   icon: 🍺
   ```
7. Click **"Save"**
8. Refresh your dashboard at http://localhost:3000/dashboard

**Expected Result:**
- ✅ Counter card appears in the grid
- ✅ Card has orange border (based on color)
- ✅ Shows "Beer Counter" as title
- ✅ Shows description text
- ✅ Large "0" displayed (total count)
- ✅ No "today" badge (since count is 0)
- ✅ Two buttons: "-1" (gray) and "+1" (orange)
- ✅ Footer shows creation date and 🍺 icon

---

### Test 4.2: Increment Counter

**Steps:**
1. With "Beer Counter" visible
2. Click the **"+1"** button

**Expected Behavior:**
- ✅ Count immediately updates from `0` to `1`
- ✅ Green badge appears: "+1 today"
- ✅ No page reload
- ✅ Button shows brief animation (scale effect)

**Verify in Database:**
1. Go to Supabase → `counter_entries` table
2. You should see a new row:
   - `counter_id`: matches your counter
   - `user_id`: your user ID
   - `value`: 1
   - `timestamp`: current time

**Continue Testing:**
3. Click **"+1"** again → Count shows `2`, badge shows "+2 today"
4. Click **"+1"** again → Count shows `3`, badge shows "+3 today"

---

### Test 4.3: Decrement Counter

**Steps:**
1. With counter showing a count of `3`
2. Click the **"-1"** button

**Expected Behavior:**
- ✅ Count decreases from `3` to `2`
- ✅ Today badge updates: "+2 today"
- ✅ Immediate UI update

**Test Negative Values:**
1. Keep clicking "-1" until count reaches `0`
2. Click "-1" one more time
3. Count should show `-1` (app allows negative counts)

---

### Test 4.4: Multiple Counters

**Setup:** Create 3 different counters in Supabase

**Counter Examples:**
```
Counter 1: Beer Counter (🍺, Orange)
Counter 2: Workout Sessions (💪, Green)
Counter 3: Books Read (📚, Purple)
```

**Expected Display:**
- ✅ All counters shown in a responsive grid
- ✅ Desktop: 3 columns
- ✅ Tablet: 2 columns  
- ✅ Mobile: 1 column
- ✅ Each counter maintains its own color scheme
- ✅ Each counter tracks independently

**Test Independence:**
1. Increment "Beer Counter" → Only that counter updates
2. Decrement "Workout Sessions" → Only that counter updates
3. Verify each counter has separate totals

---

## Test Suite 5: Counter Display Features

### Test 5.1: Today's Count Badge

**Test Scenario:** Counter incremented today vs. previous days

**Steps:**
1. Create a counter and increment it 5 times today
2. Badge should show "+5 today" in green

**Manual Database Test:**
1. Add an entry dated yesterday (change timestamp)
2. Refresh dashboard
3. Yesterday's entries should count toward total
4. But NOT show in "today" badge

---

### Test 5.2: Total Count Calculation

**Test Scenario:** Mixed increments and decrements

**Steps:**
1. Create counter (starts at 0)
2. Click +1 three times (total: 3)
3. Click -1 once (total: 2)
4. Click +1 five times (total: 7)
5. Click -1 twice (total: 5)

**Expected:**
- ✅ Final total shows `5`
- ✅ All operations saved in `counter_entries`
- ✅ Some entries have positive values, some negative

---

### Test 5.3: Counter Colors

**Test Different Colors:**

Create counters with these colors and verify display:

| Color Name | Hex Code | Expected Appearance |
|------------|----------|---------------------|
| Blue (default) | #3B82F6 | Blue border and +1 button |
| Red | #EF4444 | Red border and +1 button |
| Green | #10B981 | Green border and +1 button |
| Purple | #8B5CF6 | Purple border and +1 button |
| Orange | #F59E0B | Orange border and +1 button |

**Verify:**
- ✅ Border uses the color
- ✅ +1 button background uses the color
- ✅ Large count number uses the color
- ✅ Header background is a light tint of the color

---

## Test Suite 6: Responsive Design

### Test 6.1: Mobile View (< 768px)

**Test Using Chrome DevTools:**
1. Open DevTools (F12)
2. Click device toggle (Ctrl+Shift+M)
3. Select iPhone 14 Pro or similar

**Expected Layout:**
- ✅ Navigation: Logo and logout button visible
- ✅ Email hidden on mobile
- ✅ "Add Counter" button full width on small screens
- ✅ Counter cards: 1 per row (full width)
- ✅ All text readable
- ✅ Buttons easily tappable (44px+ target size)

### Test 6.2: Tablet View (768px - 1024px)

**Expected Layout:**
- ✅ Counter cards: 2 per row
- ✅ Navigation: email becomes visible
- ✅ Adequate spacing between elements

### Test 6.3: Desktop View (> 1024px)

**Expected Layout:**
- ✅ Counter cards: 3 per row
- ✅ Full navigation visible
- ✅ Maximum width: 7xl container (1280px)

---

## Test Suite 7: Loading States

### Test 7.1: Initial Page Load

**Steps:**
1. Clear browser cache
2. Navigate to http://localhost:3000

**Expected:**
- ✅ Brief loading spinner
- ✅ "Loading..." text
- ✅ Then content appears

### Test 7.2: Dashboard Loading

**Steps:**
1. Login and navigate to `/dashboard`

**Expected:**
- ✅ Auth check happens
- ✅ Then counters load
- ✅ "Loading counters..." state if data takes time

---

## Test Suite 8: Edge Cases

### Test 8.1: Very Large Numbers

**Steps:**
1. Increment a counter 100+ times
2. Or manually insert a large value in database

**Expected:**
- ✅ Large numbers display correctly
- ✅ Layout doesn't break
- ✅ Font size adjusts if needed

### Test 8.2: Long Counter Names

**Test:** Create counter with name: "My Very Long Counter Name That Goes On And On"

**Expected:**
- ✅ Text wraps properly
- ✅ Card height adjusts
- ✅ Layout remains intact

### Test 8.3: Special Characters

**Test:** Create counter with:
- Name: `"Test & Special <> Characters"`
- Description: `"Testing: quotes, apostrophes, and émojis 🎉"`

**Expected:**
- ✅ All characters display correctly
- ✅ No HTML injection
- ✅ Proper escaping

### Test 8.4: No Description

**Test:** Create counter without description

**Expected:**
- ✅ No description text shown
- ✅ Card layout still looks good
- ✅ No empty space or errors

---

## Test Suite 9: Performance

### Test 9.1: Multiple Counters Load Time

**Test:** Create 10+ counters

**Expected:**
- ✅ All load within 1-2 seconds
- ✅ No lag when scrolling
- ✅ Smooth animations

### Test 9.2: Rapid Clicking

**Test:** Click +1 button very rapidly (10 times in 2 seconds)

**Expected:**
- ✅ All clicks register
- ✅ UI updates smoothly
- ✅ All entries saved to database
- ✅ No race conditions

---

## Test Suite 10: Data Persistence

### Test 10.1: Page Refresh

**Steps:**
1. Increment counter to 5
2. Refresh page (F5)

**Expected:**
- ✅ Counter still shows 5
- ✅ Today badge still correct
- ✅ All data persisted

### Test 10.2: Logout and Login

**Steps:**
1. Create counters and increment them
2. Logout
3. Login again

**Expected:**
- ✅ All counters still visible
- ✅ Counts preserved
- ✅ Today's counts reset if next day

### Test 10.3: Different Browser

**Steps:**
1. Create counters in Chrome
2. Login in Firefox with same account

**Expected:**
- ✅ All counters visible
- ✅ Same data across browsers
- ✅ Increments sync

---

## ✅ Testing Checklist Summary

Use this checklist for quick regression testing:

### Authentication
- [ ] Can sign up with new account
- [ ] Can login with existing account  
- [ ] Can logout
- [ ] Protected routes redirect when logged out
- [ ] Auto-redirect to dashboard when logged in

### Dashboard
- [ ] Navigation bar displays correctly
- [ ] Empty state shows when no counters
- [ ] Multiple counters display in grid
- [ ] Responsive layout works on all screen sizes

### Counter Operations  
- [ ] Can increment counter
- [ ] Can decrement counter
- [ ] Counts update immediately
- [ ] Today's badge shows correctly
- [ ] Data persists after refresh
- [ ] Multiple counters work independently

### UI/UX
- [ ] Colors display correctly
- [ ] Loading states work
- [ ] Error messages appear when needed
- [ ] Buttons have hover effects
- [ ] Animations are smooth

---

## 🐛 Known Limitations (Phase 1)

**Not Yet Implemented:**
- ❌ "Add Counter" button doesn't work yet (Phase 2)
- ❌ "Edit" icon on cards (placeholder)
- ❌ "Delete" icon on cards (placeholder)
- ❌ No statistics/analytics view yet
- ❌ No date filtering
- ❌ No export functionality

**Coming in Phase 2:**
- ✅ Create counter form with UI
- ✅ Edit counter functionality
- ✅ Delete (archive) counters
- ✅ Basic statistics dashboard

---

## 📝 Test Results Template

Use this template to document your test results:

```
Test Date: ___________
Tester: ___________
Browser: ___________
Device: ___________

| Test Suite | Test Case | Status | Notes |
|------------|-----------|--------|-------|
| Auth | Signup | ✅ Pass | |
| Auth | Login | ✅ Pass | |
| Dashboard | Empty State | ✅ Pass | |
| Counters | Increment | ✅ Pass | |
| ... | ... | ... | ... |

Issues Found:
1. 
2. 
3. 

Overall Status: ✅ PASS / ❌ FAIL
```

---

**Happy Testing! 🚀**

For questions or issues, check the main README.md or open an issue on GitHub.
