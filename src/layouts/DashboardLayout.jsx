import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'

import { useAuth } from '../context/AuthContext'
import { FiBell } from 'react-icons/fi'

function DashboardLayout({ children }) {
  const { user } = useAuth()

  return (
    <>
      {/* Main Navbar */}
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <div className="dashboard-body">
          {/* Dashboard Topbar */}
          

          {/* Main Content */}
          <main className="dashboard-content">
            {children}
          </main>
        </div>
      </div>

      {/* Main Footer */}
      <Footer />
    </>
  )
}

export default DashboardLayout