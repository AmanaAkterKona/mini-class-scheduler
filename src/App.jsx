import { useState } from 'react'
import TeacherDashboard from './components/TeacherDashboard'
import StudentView from './components/StudentView'
import './App.css'

function App() {
  const [activeView, setActiveView] = useState('teacher')

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">◈</span>
            <span className="logo-text">ClassSync</span>
          </div>
          <nav className="nav">
            <button
              className={`nav-btn ${activeView === 'teacher' ? 'active' : ''}`}
              onClick={() => setActiveView('teacher')}
            >
              <span>Teacher</span>
            </button>
            <button
              className={`nav-btn ${activeView === 'student' ? 'active' : ''}`}
              onClick={() => setActiveView('student')}
            >
              <span>Student</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        {activeView === 'teacher' ? <TeacherDashboard /> : <StudentView />}
      </main>
    </div>
  )
}

export default App