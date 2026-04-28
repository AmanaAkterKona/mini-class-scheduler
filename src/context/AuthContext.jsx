import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// Demo credentials
export const DEMO_USERS = [
  { username: 'teacher', password: 'teacher123', role: 'teacher', name: 'Mr. Rahman' },
  { username: 'student', password: 'student123', role: 'student', name: 'Rahim' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('classsync_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (username, password) => {
    const found = DEMO_USERS.find(
      (u) => u.username === username && u.password === password
    )
    if (found) {
      const userData = { username: found.username, role: found.role, name: found.name }
      setUser(userData)
      localStorage.setItem('classsync_user', JSON.stringify(userData))
      return { success: true, role: found.role }
    }
    return { success: false, error: 'Invalid username or password.' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('classsync_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)