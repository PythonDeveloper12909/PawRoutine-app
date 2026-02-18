# 🐾 PawRoutine - Pet Care Manager

A comprehensive pet routine tracking and health monitoring application designed for pet owners who want to maintain consistency in their pet care routines.

## ✨ Features

### 🔐 User Authentication
- Secure email/password signup and login
- Session management with JWT tokens
- Password validation and security

### 🐕 Pet Management
- Add and manage multiple pets
- Detailed pet profiles (species, breed, age, weight, gender)
- Medical notes and special care instructions
- Visual pet avatars based on species

### 📅 Routine Task System
- Create recurring routines for each pet
- 7 predefined categories: Feeding, Walk, Medicine, Grooming, Playtime, Water, Custom
- Daily and weekly scheduling options
- Time-based task organization

### ✅ Daily Task Tracker
- View today's scheduled tasks in checklist format
- Mark tasks as completed with one tap
- Real-time completion percentage
- Visual progress indicators
- Highlight missed tasks

### 🏥 Health & Behavior Logging
- Log daily mood (Happy, Normal, Tired, Anxious, Sick)
- Track appetite levels (Low, Normal, High)
- Monitor energy levels (Low, Normal, High)
- Record weight changes over time
- Add custom notes for observations
- View weekly health trends

### 📊 Analytics Dashboard
- Weekly completion rate calculation
- Current streak tracking (consecutive days)
- Total tasks completed counter
- Weekly activity bar chart
- Category-wise performance breakdown
- Visual progress representations

### 🏆 Gamification System
- **7-Day Streak Badge** 🔥 - Complete tasks for 7 consecutive days
- **30-Day Streak Badge** ⭐ - Complete tasks for 30 consecutive days
- **Perfect Week Badge** 💯 - Achieve 100% completion rate for a week
- **Dedicated Parent Badge** 🏆 - Maintain 80%+ completion rate

### ⚙️ Settings & Data Management
- User profile overview
- App statistics (pets registered, total routines, tasks completed)
- Export data as JSON backup
- Clear all data option
- Feature highlights

## 🎨 Design Features

### Mobile-First Responsive Design
- Optimized for screens from 320px to 2560px
- Touch-friendly UI elements (minimum 44px tap targets)
- Responsive layouts using Flexbox and CSS Grid
- Media queries for mobile, tablet, and desktop breakpoints

### Modern UI/UX
- Clean, minimal design with soft pet-friendly colors
- Gradient color palette (pink to purple)
- Rounded cards and smooth transitions
- Bottom navigation for mobile
- Sidebar navigation for desktop
- Smooth animations and micro-interactions

## 🛠️ Technical Stack

- **React 19.2.3** with TypeScript
- **React Router DOM 7.12.0** for navigation
- **Tailwind CSS 4.1.17** for styling
- **Vite 7.2.2** for build tooling
- **LocalStorage** for data persistence

## 📱 Screens

1. **Login/Signup** - User authentication
2. **Dashboard** - Pet selector, today's tasks, progress overview
3. **Pets** - Pet management (add, edit, delete)
4. **Logs** - Health and behavior tracking
5. **Analytics** - Performance metrics and badges
6. **Settings** - User profile and data management

## 🚀 Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```
##OR

#Direct link to use : paw-routine-app.vercel.app

## 💾 Data Structure

### LocalStorage Keys
- `users` - User accounts
- `user` - Current logged-in user
- `token` - Authentication token
- `pets` - Pet profiles
- `routines` - Routine definitions
- `taskLogs` - Task completion logs
- `healthLogs` - Health and behavior logs

## 📈 Future Enhancements

- Push notifications for task reminders
- AI-based routine suggestions
- Vet appointment scheduling
- Pet report PDF export
- Cloud synchronization
- Photo upload for pets
- Weight trend graphs

---

**PawRoutine** - Because every pet deserves the best care! 🐾
