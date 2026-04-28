import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  FiGrid,
  FiCalendar,
  FiLogOut,
  FiUser,
  FiBookOpen
} from 'react-icons/fi'

function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const teacherLinks = [
    { to: '/teacher', icon: <FiGrid size={18} />, label: 'Dashboard' },
    { to: '/teacher/slots', icon: <FiCalendar size={18} />, label: 'Manage Slots' }
  ]

  const studentLinks = [
    { to: '/student', icon: <FiGrid size={18} />, label: 'Dashboard' },
    { to: '/student/book', icon: <FiBookOpen size={18} />, label: 'Book a Slot' }
  ]

  const links = user?.role === 'teacher' ? teacherLinks : studentLinks

  return (
    <aside className="sidebar">

      <style>{`
        .sidebar{
          width:280px;
          min-height:100vh;
          padding:24px 18px;
          display:flex;
          flex-direction:column;
          gap:22px;
          background:rgba(7,18,24,.88);
          border-right:1px solid rgba(0,212,170,.10);
          backdrop-filter:blur(18px);
          box-shadow:10px 0 30px rgba(0,0,0,.28);
        }

        .sidebar-brand{
          display:flex;
          align-items:center;
          gap:12px;
          padding:0 6px 10px;
        }

        .brand-logo{
          width:42px;
          height:42px;
          border-radius:14px;
          display:flex;
          align-items:center;
          justify-content:center;
          font-weight:800;
          color:#031015;
          background:linear-gradient(135deg,#00b894,#00d4aa);
          box-shadow:0 8px 20px rgba(0,212,170,.18);
        }

        .brand-text{
          display:flex;
          flex-direction:column;
        }

        .brand-title{
          color:#f5fdff;
          font-size:17px;
          font-weight:800;
          line-height:1.1;
        }

        .brand-sub{
          color:#6f95a7;
          font-size:12px;
          margin-top:3px;
        }

        .sidebar-user{
          display:flex;
          align-items:center;
          gap:14px;
          padding:16px;
          border-radius:18px;
          background:rgba(255,255,255,.03);
          border:1px solid rgba(0,212,170,.10);
        }

        .sidebar-avatar{
          width:46px;
          height:46px;
          border-radius:16px;
          display:flex;
          align-items:center;
          justify-content:center;
          color:#031015;
          background:linear-gradient(135deg,#00b894,#00d4aa);
          flex-shrink:0;
          box-shadow:0 8px 20px rgba(0,212,170,.15);
        }

        .sidebar-user-info{
          display:flex;
          flex-direction:column;
          min-width:0;
        }

        .sidebar-user-name{
          color:#f5fdff;
          font-size:15px;
          font-weight:700;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }

        .sidebar-user-role{
          color:#7ea5b7;
          font-size:12px;
          text-transform:capitalize;
          margin-top:4px;
        }

        .sidebar-nav{
          display:flex;
          flex-direction:column;
          gap:10px;
        }

        .sidebar-link{
          display:flex;
          align-items:center;
          gap:12px;
          padding:14px 16px;
          border-radius:16px;
          color:#b8d1dc;
          text-decoration:none;
          font-weight:600;
          transition:.25s ease;
          border:1px solid transparent;
        }

        .sidebar-link:hover{
          color:#ffffff;
          background:rgba(255,255,255,.03);
          border-color:rgba(0,212,170,.10);
          transform:translateX(3px);
        }

        .sidebar-link.active{
          color:#031015;
          background:linear-gradient(135deg,#00b894,#00d4aa);
          box-shadow:0 10px 22px rgba(0,212,170,.18);
        }

        .sidebar-link svg{
          flex-shrink:0;
        }

        .sidebar-logout{
          margin-top:auto;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:10px;
          width:100%;
          padding:14px 16px;
          border:none;
          border-radius:16px;
          cursor:pointer;
          font-weight:700;
          color:#ffdddd;
          background:rgba(255,70,70,.08);
          border:1px solid rgba(255,70,70,.12);
          transition:.25s ease;
        }

        .sidebar-logout:hover{
          transform:translateY(-2px);
          background:rgba(255,70,70,.14);
        }

        @media(max-width:992px){
          .sidebar{
            width:100%;
            min-height:auto;
            padding:18px;
            border-right:none;
            border-bottom:1px solid rgba(0,212,170,.10);
          }

          .sidebar-nav{
            flex-direction:row;
            flex-wrap:wrap;
          }

          .sidebar-link{
            flex:1 1 calc(50% - 10px);
            justify-content:center;
          }

          .sidebar-logout{
            margin-top:10px;
          }
        }

        @media(max-width:640px){
          .sidebar-link{
            flex:1 1 100%;
          }
        }
      `}</style>

      <div className="sidebar-brand">
        <div className="brand-logo">S</div>
        <div className="brand-text">
          <span className="brand-title">Slot Booking</span>
          <span className="brand-sub">Premium Panel</span>
        </div>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-avatar">
          <FiUser size={18} />
        </div>

        <div className="sidebar-user-info">
          <span className="sidebar-user-name">{user?.name}</span>
          <span className="sidebar-user-role">{user?.role}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <button className="sidebar-logout" onClick={handleLogout}>
        <FiLogOut size={16} />
        <span>Logout</span>
      </button>
    </aside>
  )
}

export default Sidebar