# ClassSync — Mini Class Scheduling and Dashboard System

A clean, production-grade React app for managing class time slots between teachers and students.

---

## Live Demo

🔗 [Live Demo](https://tiny-paletas-b012f5.netlify.app) 

---

## How to Run

```bash
# Clone the repo
git clone https://github.com/your-username/mini-class-scheduler.git
cd mini-class-scheduler

# Install dependencies
npm install

# Start development server
npm run dev
```

App runs at `http://localhost:5173`

---

## What I Implemented

### Teacher Dashboard
- Teacher name and slot statistics (total, available, booked)
- Add new 15-minute time slots with date and time picker
- View all slots with filter (All / Available / Booked)
- Delete any slot

### Student View
- View all available slots
- Booking confirmation modal before confirming
- After booking, slot instantly becomes unavailable

### Slot Rules
- **No overlapping slots** — validated before adding
- **No past slots** — date/time must be in the future
- **15-minute duration** — enforced in display and conflict detection
- **Status tracking** — Available / Booked

### Data Handling
- localStorage for persistent data across sessions
- No backend required

### Bonus Features
- Confirmation modal before booking
- Delete slot functionality for teacher
- Filter slots by status
- Animated UI with premium dark teal design

### Code Quality
- Clean component separation: `TeacherDashboard`, `StudentView`, `SlotForm`, `SlotList`
- Business logic isolated in `utils/storage.js` and `utils/validation.js`
- Responsive design

---

## Credentials

| Role    | Username   | Password      |
|---------|------------|---------------|
| Teacher | Mr. Rahman | No auth needed |
| Student | Rahim      | No auth needed |

> Switch between Teacher / Student using the nav buttons at the top.

---

## Tech Stack
- **Frontend**: React + Vite
- **Storage**: localStorage
- **Styling**: Custom CSS

---

## Project Structure

```
src/
├── components/
│   ├── TeacherDashboard.jsx
│   ├── StudentView.jsx
│   ├── SlotForm.jsx
│   └── SlotList.jsx
├── utils/
│   ├── storage.js
│   └── validation.js
├── App.jsx
└── App.css
```
