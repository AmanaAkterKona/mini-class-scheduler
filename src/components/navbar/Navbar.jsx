import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiHome, FiStar, FiPlayCircle, FiLogIn } from 'react-icons/fi'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="landing-nav">
      <div className="landing-nav-inner">

        <Link to="/" className="landing-logo">
          <span className="landing-logo-icon">◈</span>
          <span className="landing-logo-text">ClassSync</span>
        </Link>

        <div className={`landing-nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#features">
            <FiStar size={16} />
            Features
          </a>

          <a href="#how-it-works">
            <FiHome size={16} />
            How it works
          </a>

          <a href="#demo">
            <FiPlayCircle size={16} />
            Demo
          </a>
        </div>

        <div className="landing-nav-actions">

          <button
            className="btn-solid"
            onClick={() => navigate('/login')}
          >
            <FiLogIn size={16} />
            Login
          </button>

        </div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </button>

      </div>

      <style>{`
        .landing-nav-links a{
          display:flex;
          align-items:center;
          gap:8px;
        }

        .btn-solid{
          display:flex;
          align-items:center;
          gap:8px;
        }
      `}</style>
    </nav>
  )
}

export default Navbar