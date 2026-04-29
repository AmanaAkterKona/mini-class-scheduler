
# ClassSync — Mini Class Scheduling and Dashboard System

A production-grade class scheduling platform where teachers create time slots and students book them.

🔗 **Live Demo:** https://tiny-paletas-b012f5.netlify.app
📁 **GitHub:** https://github.com/AmanaAkterKona/mini-class-scheduler

---

## How to Run the Project

### Frontend

```bash
# Clone the repository
git clone https://github.com/AmanaAkterKona/mini-class-scheduler.git
cd mini-class-scheduler

# Install dependencies
npm install

# Create .env file in root
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
```

App runs at: `http://localhost:5173`

### Backend (Bonus)

```bash
cd backend

# Install dependencies
npm install

# Create .env file
echo "MONGO_URI=your_mongodb_uri" > .env
echo "PORT=5000" >> .env

# Start backend server
npm run dev
```

Backend runs at: `http://localhost:5000`

---

## Credentials

| Role    | Username  | Password     |
|---------|-----------|--------------|
| Teacher | teacher   | teacher123   |
| Student | student   | student123   |

---

## What I Implemented

### Core Requirements
- **Teacher Dashboard** — shows teacher name, total/available/booked slot counts, add new slots, view all slots
- **15-minute slots** — every slot is exactly 15 minutes long
- **No overlapping slots** — validated before adding using time conflict detection
- **No past slots** — past date/time is blocked on submission
- **Available / Booked status** — each slot shows its current status
- **Student View** — students can see all available slots and book them
- **After booking** — slot is instantly removed from available list

### Bonus Features
- **Backend API** — Node.js + Express REST API
- **MongoDB Database** — all data persisted with Mongoose
- **Authentication** — demo login with role-based routing (Teacher/Student)
- **Landing Page** — hero section with video background, features, how-it-works, CTA
- **Confirmation Modal** — students confirm before booking
- **Delete Slot** — teachers can remove slots
- **Filter by Status** — filter All / Available / Booked
- **Sidebar + Topbar** — dashboard layout with navigation
- **Responsive Design** — works on mobile and desktop

### How Slot Conflicts Are Handled

```js
// validation.js
export const isOverlapping = (date, time, existingSlots) => {
  const newStart = new Date(`${date}T${time}`)
  const newEnd = new Date(newStart.getTime() + 15 * 60 * 1000)

  return existingSlots.some((slot) => {
    const existStart = new Date(`${slot.date}T${slot.time}`)
    const existEnd = new Date(existStart.getTime() + 15 * 60 * 1000)
    return newStart < existEnd && newEnd > existStart
  })
}
```

### Project Structure

```
mini-class-scheduler/
├── backend/
│   ├── models/
│   │   └── Slot.js          # MongoDB schema
│   ├── routes/
│   │   └── slots.js         # API routes (GET, POST, PATCH, DELETE)
│   ├── .env                 # MongoDB URI, PORT
│   └── server.js            # Express server entry
│
├── src/
│   ├── components/
│   │   ├── hero/Hero.jsx    # Video slideshow hero
│   │   ├── navbar/Navbar.jsx
│   │   ├── footer/Footer.jsx
│   │   ├── sidebar/Sidebar.jsx
│   │   ├── SlotForm.jsx     # Add slot form with validation
│   │   └── SlotList.jsx     # Slot list with filter + confirm modal
│   ├── context/
│   │   └── AuthContext.jsx  # Demo auth with role-based access
│   ├── layouts/
│   │   ├── LandingLayout.jsx
│   │   └── DashboardLayout.jsx
│   ├── pages/
│   │   ├── Landing.jsx      # Landing page
│   │   ├── Login.jsx        # Login with demo credentials
│   │   ├── teacher/
│   │   │   └── TeacherDashboard.jsx
│   │   └── student/
│   │       └── StudentDashboard.jsx
│   ├── routes/
│   │   └── ProtectedRoute.jsx
│   ├── utils/
│   │   ├── storage.js       # API calls to backend
│   │   └── validation.js    # Overlap + past time validation
│   ├── App.jsx              # React Router setup
│   └── App.css              # Global styles
│
└── README.md
```

### Tech Stack
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB (Atlas)
- **Styling:** Custom CSS (dark teal theme)
- **Icons:** React Icons
