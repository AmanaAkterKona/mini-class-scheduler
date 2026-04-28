import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="landing-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="landing-logo-icon">◈</span>
          <span className="landing-logo-text">ClassSync</span>
          <p>Simple, elegant class scheduling for teachers and students.</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#demo">Demo</a>
          </div>
          <div className="footer-col">
            <h4>Account</h4>
            <Link to="/login">Login</Link>
            <Link to="/login">Teacher Portal</Link>
            <Link to="/login">Student Portal</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 ClassSync. Built with React, Node.js & MongoDB.</p>
      </div>
    </footer>
  )
}

export default Footer