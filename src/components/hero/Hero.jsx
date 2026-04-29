import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const VIDEOS = [
  'https://res.cloudinary.com/dlqkxrblv/video/upload/v1777425491/V1_nxcp8r.mp4',
  'https://res.cloudinary.com/dlqkxrblv/video/upload/v1777425514/V2_qqmb42.mp4',
  'https://res.cloudinary.com/dlqkxrblv/video/upload/v1777425543/V3_w7jyxf.mp4',
]

const styles = {
  section: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '0 36px',
  },
  videoBg: {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
  },
  video: (isActive, isFading) => ({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: isActive && !isFading ? 1 : 0,
    transition: 'opacity 0.8s ease',
    zIndex: 0,
  }),
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(11,26,31,0.75) 0%, rgba(11,26,31,0.5) 50%, rgba(11,26,31,0.88) 100%)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '820px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '140px 0 100px',
    animation: 'fadeInUp 1s ease',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(0,212,170,0.08)',
    border: '1px solid rgba(0,212,170,0.28)',
    borderRadius: '30px',
    padding: '8px 22px',
    fontSize: '11px',
    fontWeight: 700,
    color: '#00d4aa',
    letterSpacing: '2.5px',
    textTransform: 'uppercase',
    marginBottom: '24px',
  },
  badgeDot: {
    width: '8px',
    height: '8px',
    background: '#00d4aa',
    borderRadius: '50%',
    boxShadow: '0 0 10px #00d4aa',
    flexShrink: 0,
  },
  eyebrow: {
    fontSize: '11.5px',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: '4px',
    textTransform: 'uppercase',
    marginBottom: '18px',
  },
  title: {
    fontSize: '80px',
    fontWeight: 800,
    letterSpacing: '-3.5px',
    lineHeight: 1.0,
    color: '#ffffff',
    margin: '0 0 6px 0',
    textShadow: '0 4px 40px rgba(0,0,0,0.6)',
  },
  titleAccent: {
    display: 'block',
    fontSize: '86px',
    fontWeight: 800,
    letterSpacing: '-4px',
    background: 'linear-gradient(135deg, #00d4aa 0%, #00b4e6 55%, #7c6df0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '17.5px',
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 1.75,
    maxWidth: '520px',
    margin: '20px 0 44px',
    fontWeight: 400,
  },
  actions: {
    display: 'flex',
    gap: '14px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '60px',
  },
  btnSolid: {
    fontFamily: 'inherit',
    fontSize: '15.5px',
    fontWeight: 700,
    padding: '14px 38px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #00d4aa, #00b4e6)',
    color: '#051015',
    cursor: 'pointer',
    boxShadow: '0 6px 24px rgba(0,212,170,0.4)',
    transition: 'all 0.22s ease',
    letterSpacing: '0.2px',
  },
  btnOutline: {
    fontFamily: 'inherit',
    fontSize: '15.5px',
    fontWeight: 500,
    padding: '14px 38px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(255,255,255,0.07)',
    backdropFilter: 'blur(12px)',
    color: 'rgba(255,255,255,0.82)',
    cursor: 'pointer',
    transition: 'all 0.22s ease',
  },
  stats: {
    display: 'flex',
    alignItems: 'stretch',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    overflow: 'hidden',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
    padding: '22px 44px',
    borderRight: '1px solid rgba(255,255,255,0.07)',
  },
  statLast: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
    padding: '22px 44px',
  },
  statNum: {
    fontSize: '26px',
    fontWeight: 700,
    fontFamily: 'DM Mono, monospace',
    color: '#00d4aa',
    letterSpacing: '-0.5px',
  },
  statLabel: {
    fontSize: '10px',
    color: 'rgba(255,255,255,0.35)',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    fontWeight: 600,
  },
  indicators: {
    position: 'absolute',
    bottom: '32px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
    zIndex: 3,
  },
  indicator: (isActive) => ({
    width: isActive ? '32px' : '10px',
    height: '4px',
    borderRadius: '2px',
    border: 'none',
    background: isActive ? '#00d4aa' : 'rgba(255,255,255,0.22)',
    cursor: 'pointer',
    transition: 'all 0.35s ease',
    padding: 0,
    boxShadow: isActive ? '0 0 10px rgba(0,212,170,0.7)' : 'none',
  }),
}

function Hero() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % VIDEOS.length)
        setFading(false)
      }, 800)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const goTo = (i) => {
    setFading(true)
    setTimeout(() => { setCurrent(i); setFading(false) }, 400)
  }

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,212,170,0.5); }
          50% { box-shadow: 0 0 0 7px rgba(0,212,170,0); }
        }
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
        .hero-btn-solid:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 14px 40px rgba(0,212,170,0.55) !important;
          filter: brightness(1.08);
        }
        .hero-btn-outline:hover {
          background: rgba(255,255,255,0.13) !important;
          border-color: rgba(255,255,255,0.32) !important;
          color: #fff !important;
          transform: translateY(-2px) !important;
        }
        .hero-badge-dot-anim {
          animation: badgePulse 2s ease-in-out infinite;
        }
        .hero-progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #00d4aa, #00b4e6, #7c6df0);
          animation: progressBar 6s linear infinite;
          z-index: 4;
          border-radius: 0 2px 2px 0;
        }
      `}</style>

      <section style={styles.section}>
        {/* Video Background */}
        <div style={styles.videoBg}>
          {VIDEOS.map((src, i) => (
            <video
              key={src}
              src={src}
              autoPlay muted loop playsInline
              style={styles.video(i === current, fading && i === current)}
            />
          ))}
          <div style={styles.overlay} />
        </div>

        {/* Progress bar */}
        <div className="hero-progress-bar" key={current} />

        {/* Indicators */}
        <div style={styles.indicators}>
          {VIDEOS.map((_, i) => (
            <button key={i} style={styles.indicator(i === current)} onClick={() => goTo(i)} />
          ))}
        </div>

        {/* Content */}
        <div style={styles.content}>
          <div style={styles.badge}>
            <span style={styles.badgeDot} className="hero-badge-dot-anim" />
            Class Scheduling Platform
          </div>

          <p style={styles.eyebrow}>Welcome to ClassSync</p>

          <h1 style={styles.title}>
            Schedule Classes
            <span style={styles.titleAccent}>Effortlessly</span>
          </h1>

          <p style={styles.subtitle}>
            A modern platform where teachers create time slots and students book them — no overlap, no confusion, just seamless scheduling.
          </p>

          <div style={styles.actions}>
            <button
              className="hero-btn-solid"
              style={styles.btnSolid}
              onClick={() => navigate('/login')}
            >
              Start Scheduling →
            </button>
            <button
              className="hero-btn-outline"
              style={styles.btnOutline}
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See how it works
            </button>
          </div>

          <div style={styles.stats}>
            <div style={styles.stat}>
              <span style={styles.statNum}>15min</span>
              <span style={styles.statLabel}>Per Slot</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statNum}>0</span>
              <span style={styles.statLabel}>Overlaps</span>
            </div>
            <div style={styles.statLast}>
              <span style={styles.statNum}>Live</span>
              <span style={styles.statLabel}>Real-time</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero