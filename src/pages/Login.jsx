import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth, DEMO_USERS } from '../context/AuthContext'
import { FiUser, FiLock, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    setTimeout(() => {
      const result = login(username, password)

      if (result.success) {
        navigate(result.role === 'teacher' ? '/teacher' : '/student')
      } else {
        setError(result.error)
      }

      setLoading(false)
    }, 600)
  }

  const quickLogin = (role) => {
    const user = DEMO_USERS.find((u) => u.role === role)
    if (!user) return
    setUsername(user.username)
    setPassword(user.password)
  }

  return (
    <div className="login-page">

      <style>{`
        .login-page{
          min-height:100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          background:radial-gradient(circle at top, rgba(0,212,170,.12), transparent 40%),
                     radial-gradient(circle at bottom, rgba(0,180,255,.10), transparent 40%),
                     #050c10;
          padding:20px;
          position:relative;
          overflow:hidden;
        }

        .login-bg-glow{
          position:absolute;
          width:500px;
          height:500px;
          background:rgba(0,212,170,.08);
          filter:blur(120px);
          border-radius:50%;
          top:-120px;
          left:-120px;
        }

        .login-back{
          position:absolute;
          top:20px;
          left:20px;
          display:flex;
          align-items:center;
          gap:10px;
          text-decoration:none;
          color:#eafcff;
          font-weight:700;
        }

        .login-box{
          width:100%;
          max-width:420px;
          background:rgba(7,18,24,.75);
          border:1px solid rgba(0,212,170,.15);
          border-radius:24px;
          padding:30px;
          backdrop-filter:blur(18px);
          box-shadow:0 20px 60px rgba(0,0,0,.45);
        }

        .login-title{
          margin:0;
          font-size:28px;
          font-weight:800;
          color:#f5fdff;
        }

        .login-subtitle{
          margin-top:6px;
          color:#7ea5b7;
          font-size:14px;
        }

        .demo-btns{
          display:flex;
          gap:10px;
          margin:18px 0;
        }

        .demo-btn{
          flex:1;
          padding:10px;
          border-radius:12px;
          border:1px solid rgba(0,212,170,.15);
          background:rgba(255,255,255,.03);
          color:#dffcff;
          font-size:12px;
          cursor:pointer;
          transition:.2s;
        }

        .demo-btn:hover{
          transform:translateY(-2px);
          border-color:rgba(0,212,170,.4);
        }

        .login-form{
          display:flex;
          flex-direction:column;
          gap:14px;
        }

        .login-field label{
          font-size:12px;
          color:#7ea5b7;
          margin-bottom:6px;
          display:block;
        }

        .input-wrapper{
          position:relative;
          display:flex;
          align-items:center;
        }

        .input-wrapper input{
          width:100%;
          padding:12px 40px 12px 36px;
          border-radius:12px;
          border:1px solid rgba(0,212,170,.12);
          background:rgba(255,255,255,.03);
          color:#eaffff;
          outline:none;
        }

        .input-wrapper input:focus{
          border-color:#00d4aa;
        }

        .input-icon{
          position:absolute;
          left:10px;
          color:#7ea5b7;
        }

        .input-eye{
          position:absolute;
          right:10px;
          background:transparent;
          border:none;
          color:#7ea5b7;
          cursor:pointer;
        }

        .login-error{
          color:#ff6b6b;
          font-size:13px;
          margin:0;
        }

        .login-submit{
          margin-top:6px;
          padding:12px;
          border:none;
          border-radius:12px;
          font-weight:700;
          cursor:pointer;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:8px;
          background:linear-gradient(135deg,#00b894,#00d4aa);
          color:#031015;
          transition:.2s;
        }

        .login-submit:hover{
          filter:brightness(1.05);
          transform:translateY(-1px);
        }

        .login-submit:disabled{
          opacity:.7;
          cursor:not-allowed;
        }

        .login-credentials{
          margin-top:18px;
          font-size:12px;
          color:#7ea5b7;
        }

        .cred-pills{
          display:flex;
          flex-direction:column;
          gap:6px;
          margin-top:6px;
        }

        .cred-pills span{
          background:rgba(255,255,255,.03);
          padding:8px 10px;
          border-radius:10px;
          border:1px solid rgba(0,212,170,.10);
        }

        @media(max-width:500px){
          .login-box{
            padding:22px;
          }

          .demo-btns{
            flex-direction:column;
          }
        }
      `}</style>

      <div className="login-bg-glow" />

      <Link to="/" className="login-back">
        <span className="landing-logo-icon">◈</span>
        <span className="landing-logo-text">ClassSync</span>
      </Link>

      <div className="login-box">

        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">Sign in to your account</p>

        <div className="demo-btns">
          <button className="demo-btn" onClick={() => quickLogin('teacher')}>
            Teacher Demo
          </button>
          <button className="demo-btn" onClick={() => quickLogin('student')}>
            Student Demo
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          <div className="login-field">
            <label>Username</label>
            <div className="input-wrapper">
              <FiUser size={15} className="input-icon" />
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-field">
            <label>Password</label>
            <div className="input-wrapper">
              <FiLock size={15} className="input-icon" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="input-eye"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-submit" disabled={loading}>
            <FiLogIn size={16} />
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

        </form>

        <div className="login-credentials">
          Demo credentials
          <div className="cred-pills">
            <span><b>Teacher:</b> teacher / teacher123</span>
            <span><b>Student:</b> student / student123</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login