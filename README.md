
## 🚀 How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/mini-class-scheduler.git](https://github.com/your-username/mini-class-scheduler.git)
    cd mini-class-scheduler
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Access the app:**
    Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔐 Credentials for Testing
| Role | Username | Password |
| :--- | :--- | :--- |
| **Teacher** | Mr. Rahman | *(No auth required for demo)* |
| **Student** | Rahim | *(No auth required for demo)* |

> **Note:** Use the Toggle/Nav buttons at the top to switch between the Teacher and Student roles instantly.

---

## 📝 Implementation Logic
*   **Overlap Check:** Before adding a slot, the system compares the new start/end time against existing slots in `localStorage` to ensure a 15-minute buffer.
*   **Past Date Validation:** Using JavaScript `Date()` object to block any slot creation for times that have already passed.
*   **Data Flow:** Centralized state managementEi assignment-er requirements ebong tomar provide kora project structure (screenshot onujayi) base kore ekta professional `README.md` file niche deya holo. Ami ekhane backend ebong frontend er folder structure update kore diyechi jate eta dekhlei ekjon reviewer bujhte pare tumi koto gochano bhabe kaj koro.

---

# 🚀 ClassSync — Mini Class Scheduling System

**ClassSync** is a production-grade scheduling platform designed to streamline the interaction between teachers and students. It allows teachers to manage 15-minute time slots while enabling students to book available sessions in real-time.

---

## 🔗 Project Links
*   **Live Demo:(https://tiny-paletas-b012f5.netlify.app/)
*   **GitHub Repository:(https://github.com/AmanaAkterKona/mini-class-scheduler.git)

---

## ✨ Key Features

### 👨‍🏫 Teacher Dashboard
*   **Statistic Overview:** Real-time tracking of total, available, and booked slots.
*   **Slot Management:** Create 15-minute time slots with a modern date/time picker.
*   **Conflict Prevention:** Intelligent validation to prevent overlapping or past-dated slots.
*   **Filtering & Deletion:** View slots by status (All/Available/Booked) and remove unused slots.

### 🎓 Student View
*   **Available Slots:** A clean interface to see all current opportunities for booking.
*   **One-Click Booking:** Simplified booking process with instant status updates.
*   **Dynamic UI:** Booked slots are immediately removed from the student’s view to prevent double booking.

### 🛠️ Technical Excellence
*   **Premium UI:** Modern dark teal aesthetic with glassmorphism and animated components.
*   **Persistence:** Data is managed via `localStorage` for seamless sessions without complex database overhead.
*   **Responsive Design:** Fully optimized for both desktop and mobile viewing.

---

## 💻 Tech Stack
*   **Frontend:** React.js, Vite, Tailwind CSS / Custom CSS
*   **Icons & UI:** Lucide React / Framer Motion
*   **Storage:** Browser LocalStorage
*   **Validation:** Custom logic for time-slot overlap detection

---

## 📂 Project Structure
```text
mini-class-scheduler/
├── backend/                # Server-side logic (Bonus/Placeholder)
│   ├── models/             # Data models
│   ├── routes/             # API Endpoints
│   └── Server.js
├── src/
│   ├── components/         # Reusable UI Components (Navbar, Footer, Sidebar)
│   │   ├── SlotForm.jsx    # Slot creation logic
│   │   └── SlotList.jsx    # Display logic for slots
│   ├── pages/              # Page views (Student/Teacher Dashboards)
│   ├── context/            # AuthContext for role management
│   ├── utils/              # storage.js & validation.js (Business Logic)
│   ├── App.jsx             # Main Routing & Layout
│   └── main.jsx
└── README.md
🚀 How to Run LocallyClone the repository:Bashgit clone [https://github.com/your-username/mini-class-scheduler.git](https://github.com/your-username/mini-class-scheduler.git)
cd mini-class-scheduler
Install dependencies:Bashnpm install
Start the development server:Bashnpm run dev
Access the app:Open http://localhost:5173 in your browser.🔐 Credentials for TestingRoleUsernamePasswordTeacherMr. Rahman(No auth required for demo)StudentRahim(No auth required for demo)Note: Use the Toggle/Nav buttons at the top to switch between the Teacher and Student roles instantly.📝 Implementation LogicOverlap Check: Before adding a slot, the system compares the new start/end time against existing slots in localStorage to ensure a 15-minute buffer.Past Date Validation: Using JavaScript Date() object to block any slot creation for times that have already passed.Data Flow: Centralized state management ensures that when a student books a slot, the Teacher's dashboard reflects the "Booked" status immediately.
