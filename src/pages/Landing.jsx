import { useNavigate } from 'react-router-dom'
import LandingLayout from '../layouts/LandingLayout'
import Hero from '../components/hero/Hero'
import { useEffect, useState, useCallback } from 'react'
import FAQ from '../components/faq/FAQ'

function Landing() {
  const navigate = useNavigate()

  const steps = [
    {
      num: '01',
      title: 'Teacher creates slots',
      desc: 'Teachers create 15-minute time slots with smart validation and conflict prevention.',
      img: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=1400&auto=format&fit=crop',
    },
    {
      num: '02',
      title: 'Students view live schedule',
      desc: 'Students instantly see available slots sorted by date and ready for booking.',
      img: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?q=80&w=1400&auto=format&fit=crop',
    },
    {
      num: '03',
      title: 'Book & confirm instantly',
      desc: 'One click booking with instant status updates and smooth user experience.',
      img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1400&auto=format&fit=crop',
    },
  ]

  const featuresData = [
    { icon: '◷', title: '15-Minute Slots', desc: 'Every slot is exactly 15 minutes.' },
    { icon: '⊘', title: 'No Overlaps', desc: 'Smart conflict detection prevents double-booking.' },
    { icon: '◈', title: 'Real-time Status', desc: 'Slots update instantly when booked.' },
    { icon: '⊕', title: 'Easy Booking', desc: 'Students can book in one click.' },
    { icon: '⊟', title: 'Slot Management', desc: 'Teachers control all schedules easily.' },
    { icon: '◉', title: 'MongoDB Backend', desc: 'Reliable scalable persistent storage.' },
  ]

  const [active, setActive] = useState(0)
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeatureIndex((prev) => (prev + 1) % featuresData.length)
    }, 4000)
    return () => clearInterval(featureInterval)
  }, [])

  const goToPrevFeature = useCallback(() => {
    setActiveFeatureIndex((prev) => (prev - 1 + featuresData.length) % featuresData.length)
  }, [])

  const goToNextFeature = useCallback(() => {
    setActiveFeatureIndex((prev) => (prev + 1) % featuresData.length)
  }, [])

  return (
    <LandingLayout>
      <Hero />

      {/* Premium Carousel Features Section - FIXED HEADER CENTERED */}
<section className="landing-section premium-features-carousel" id="features">
  <style>{`
    .premium-features-carousel {
      background: radial-gradient(circle at top, #06141a 0%, #02070a 60%, #02070a 100%);
      position: relative;
      overflow: hidden;
      padding: 140px 0;
    }

    .premium-features-carousel::before,
    .premium-features-carousel::after {
      content: '';
      position: absolute;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      filter: blur(40px);
      pointer-events: none;
    }

    .premium-features-carousel::before {
      top: -200px;
      left: -200px;
      background: radial-gradient(circle, rgba(0,212,170,0.08), transparent 70%);
    }

    .premium-features-carousel::after {
      bottom: -200px;
      right: -200px;
      background: radial-gradient(circle, rgba(0,180,230,0.06), transparent 70%);
    }

    /* ===== HEADER FIXED CENTER ===== */
    .features-header {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }

    .section-badge {
      padding: 6px 14px;
      border-radius: 20px;
      background: rgba(0,212,170,0.08);
      border: 1px solid rgba(0,212,170,0.2);
      color: #00d4aa;
      font-size: 13px;
      letter-spacing: 0.5px;
    }

    .section-title {
      font-size: 42px;
      font-weight: 800;
      color: #eaf7f5;
      margin-top: 18px;
    }

    .section-subtitle {
      font-size: 16px;
      color: #7fa9b8;
      margin-top: 10px;
      max-width: 600px;
      line-height: 1.6;
    }

    /* ===== CAROUSEL ===== */
    .features-carousel-container {
      position: relative;
      margin-top: 80px;
      perspective: 1400px;
    }

    .carousel-stage {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 600px;
    }

    .carousel-track {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .feature-carousel-card {
      position: absolute;
      width: 460px;
      padding: 44px 36px;
      border-radius: 36px;
      text-align: center;
      background: linear-gradient(145deg, rgba(10,25,30,0.9), rgba(5,12,16,0.95));
      border: 1px solid rgba(0,212,170,0.12);
      backdrop-filter: blur(20px);
      transition: all 0.6s ease;
      box-shadow: 0 30px 70px rgba(0,0,0,0.6);
    }

    .feature-carousel-card.center {
      transform: scale(1.1);
      z-index: 20;
      border-color: rgba(0,212,170,0.4);
      box-shadow: 0 40px 90px rgba(0,0,0,0.7),
                  0 0 40px rgba(0,212,170,0.2);
    }

    .feature-carousel-card.left {
      transform: translateX(-440px) scale(0.85);
      opacity: 0.5;
    }

    .feature-carousel-card.right {
      transform: translateX(440px) scale(0.85);
      opacity: 0.5;
    }

    .feature-icon-large {
      width: 100px;
      height: 100px;
      display: grid;
      place-items: center;
      margin: 0 auto 24px;
      font-size: 56px;
      border-radius: 30px;
      color: #00d4aa;
      background: rgba(0,212,170,0.1);
      border: 1px solid rgba(0,212,170,0.2);
    }

    .feature-carousel-card h3 {
      font-size: 24px;
      font-weight: 800;
      margin: 20px 0 12px;
      color: #eaf7f5;
    }

    .feature-carousel-card p {
      font-size: 15px;
      color: #7fa9b8;
      line-height: 1.7;
    }

    /* CONTROLS */
    .carousel-controls {
      display: flex;
      justify-content: center;
      gap: 18px;
      margin-top: 50px;
    }

    .carousel-btn {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      border: 1px solid rgba(0,212,170,0.25);
      background: rgba(255,255,255,0.03);
      color: #00d4aa;
      cursor: pointer;
      transition: 0.3s;
    }

    .carousel-btn:hover {
      background: rgba(0,212,170,0.15);
      transform: scale(1.1);
    }

    /* DOTS */
    .carousel-dots {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-top: 30px;
    }

    .carousel-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(0,212,170,0.25);
      transition: 0.3s;
    }

    .carousel-dot.active {
      width: 30px;
      border-radius: 20px;
      background: #00d4aa;
    }

    @media (max-width: 768px) {
      .feature-carousel-card {
        width: 320px;
        padding: 28px;
      }

      .feature-carousel-card.left,
      .feature-carousel-card.right {
        display: none;
      }

      .section-title {
        font-size: 28px;
      }
    }
  `}</style>

  <div className="section-inner">

    {/* ===== HEADER FIXED CENTER ===== */}
    <div className="features-header">
      <div className="section-badge">Features</div>
      <h2 className="section-title">Smart scheduling made simple</h2>
      <p className="section-subtitle">
        Built for simplicity, designed for efficiency with ultra smooth UI experience
      </p>
    </div>

    {/* ===== CAROUSEL ===== */}
    <div className="features-carousel-container">
      <div className="carousel-stage">
        <div className="carousel-track">
          {featuresData.map((feature, idx) => {
            let positionClass = ''
            const diff = idx - activeFeatureIndex

            if (diff === 0) positionClass = 'center'
            else if (diff === -1) positionClass = 'left'
            else if (diff === 1) positionClass = 'right'

            return (
              <div
                key={idx}
                className={`feature-carousel-card ${positionClass}`}
                onClick={() => setActiveFeatureIndex(idx)}
              >
                <div className="feature-icon-large">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="carousel-controls">
        <button className="carousel-btn" onClick={goToPrevFeature}>←</button>
        <button className="carousel-btn" onClick={goToNextFeature}>→</button>
      </div>

      <div className="carousel-dots">
        {featuresData.map((_, idx) => (
          <div
            key={idx}
            className={`carousel-dot ${activeFeatureIndex === idx ? 'active' : ''}`}
            onClick={() => setActiveFeatureIndex(idx)}
          />
        ))}
      </div>
    </div>

  </div>
</section>

      {/* HOW IT WORKS - Darker */}
      <section className="landing-section premium-how" id="how-it-works">
        <style>{`
  .premium-how {
    background: radial-gradient(circle at top, #06131a 0%, #02070a 55%, #030a0e 100%);
    position: relative;
    overflow: hidden;
    padding: 130px 0;
    border-top: 1px solid rgba(0,212,170,0.08);
    border-bottom: 1px solid rgba(0,212,170,0.08);
  }

  .premium-how::before {
    content: '';
    position: absolute;
    top: -220px;
    right: -220px;
    width: 650px;
    height: 650px;
    background: radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%);
    filter: blur(10px);
  }

  .premium-how::after {
    content: '';
    position: absolute;
    bottom: -220px;
    left: -220px;
    width: 550px;
    height: 550px;
    background: radial-gradient(circle, rgba(0,180,230,0.04) 0%, transparent 70%);
    filter: blur(10px);
  }

  /* HEADER */
  .section-badge {
    padding: 7px 16px;
    border-radius: 40px;
    font-size: 12px;
    font-weight: 700;
    color: #00d4aa;
    background: rgba(0,212,170,.08);
    border: 1px solid rgba(0,212,170,.2);
    letter-spacing: .4px;
  }

  .section-title {
    font-size: 46px;
    font-weight: 800;
    color: #eafcff;
    margin-top: 18px;
    letter-spacing: -0.7px;
  }

  .section-subtitle {
    color: #7aa6b6;
    font-size: 17px;
    margin-top: 10px;
  }

  /* LAYOUT BIGGER */
  .premium-slider {
    display: grid;
    grid-template-columns: 1fr 1.25fr;
    gap: 70px;
    align-items: center;
    margin-top: 80px;
  }

  /* LEFT CARDS BIGGER */
  .steps-left {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .slide-card {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    padding: 28px 28px;
    border-radius: 22px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    cursor: pointer;
    transition: all 0.35s ease;
    backdrop-filter: blur(14px);
    opacity: 0.6;
  }

  .slide-card:hover {
    opacity: 0.95;
    transform: translateX(8px);
    border-color: rgba(0,212,170,0.25);
  }

  .slide-card.active {
    opacity: 1;
    transform: translateX(16px) scale(1.03);
    background: linear-gradient(135deg, rgba(0,212,170,0.08), rgba(0,180,230,0.04));
    border: 1px solid rgba(0,212,170,0.3);
    box-shadow: 0 20px 55px rgba(0,0,0,0.55);
  }

  /* NUMBER BIGGER */
  .slide-num {
    min-width: 60px;
    height: 60px;
    border-radius: 16px;
    display: grid;
    place-items: center;
    font-weight: 800;
    font-size: 16px;
    color: #00d4aa;
    background: rgba(0,212,170,0.08);
    border: 1px solid rgba(0,212,170,0.25);
  }

  .slide-card.active .slide-num {
    box-shadow: 0 0 20px rgba(0,212,170,0.25);
    background: rgba(0,212,170,0.12);
  }

  /* TEXT BIGGER CLEAN */
  .slide-card h3 {
    margin: 0 0 6px;
    font-size: 18px;
    color: #eafcff;
  }

  .slide-card p {
    margin: 0;
    font-size: 15px;
    color: #6fa3b6;
    line-height: 1.7;
  }

  .slide-card.active p {
    color: #9ed9ea;
  }

  /* IMAGE BIGGER PREMIUM */
  .slide-img-wrapper {
    position: relative;
    border-radius: 28px;
    overflow: hidden;
    border: 1px solid rgba(0,212,170,0.18);
    box-shadow: 0 50px 120px rgba(0,0,0,0.7);
  }

  .slide-image {
    width: 100%;
    height: 620px;
    object-fit: cover;
    display: block;
    animation: fadeZoom 0.6s ease;
  }

  .slide-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.78));
  }

  .floating-badge {
    position: absolute;
    bottom: 22px;
    left: 22px;
    padding: 12px 20px;
    border-radius: 30px;
    font-size: 13px;
    font-weight: 700;
    color: #00d4aa;
    background: rgba(10,20,25,0.9);
    border: 1px solid rgba(0,212,170,0.3);
    backdrop-filter: blur(12px);
  }

  .slide-counter {
    position: absolute;
    top: 18px;
    right: 18px;
    padding: 7px 14px;
    border-radius: 20px;
    font-size: 12px;
    color: rgba(255,255,255,0.65);
    background: rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.06);
  }

  @keyframes fadeZoom {
    from { opacity: 0; transform: scale(1.03); }
    to { opacity: 1; transform: scale(1); }
  }

  /* MOBILE */
  @media(max-width: 992px){
    .premium-slider{
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .slide-image{
      height: 420px;
    }
  }

  @media(max-width: 640px){
    .section-title{
      font-size: 32px;
    }
    .slide-card{
      padding: 18px;
    }
    .slide-image{
      height: 280px;
    }
  }
`}</style>

        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="section-badge">How it works</div>
            <h2 className="section-title" style={{ marginTop: '16px', marginBottom: '12px' }}>
              Simple three-step process
            </h2>
            <p className="section-subtitle" style={{ maxWidth: '520px', margin: '0 auto' }}>
              Smooth workflow for teachers & students
            </p>
          </div>

          <div className="premium-slider">
            <div className="steps-left">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`slide-card ${active === i ? 'active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  <span className="slide-num">{step.num}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="steps-right">
              <div className="slide-img-wrapper">
                <img
                  key={active}
                  className="slide-image"
                  src={steps[active]?.img}
                  alt={steps[active]?.title}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400&auto=format&fit=crop'
                  }}
                />
                <div className="slide-img-overlay" />
                <div className="floating-badge">Step {steps[active]?.num} — {steps[active]?.title}</div>
                <div className="slide-counter">{active + 1} / {steps.length}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

     {/* PREMIUM CTA SECTION - ULTRA POLISHED */}
<section className="landing-section premium-cta" id="demo">
  <style>{`
    .premium-cta {
      padding: 140px 0;
      position: relative;
      background: radial-gradient(circle at top, #06131a 0%, #02070a 55%, #02070a 100%);
      overflow: hidden;
    }

    .premium-cta::before,
    .premium-cta::after {
      content: '';
      position: absolute;
      width: 700px;
      height: 700px;
      border-radius: 50%;
      filter: blur(60px);
      pointer-events: none;
    }

    .premium-cta::before {
      top: -250px;
      left: -200px;
      background: radial-gradient(circle, rgba(0,212,170,0.10), transparent 70%);
    }

    .premium-cta::after {
      bottom: -250px;
      right: -200px;
      background: radial-gradient(circle, rgba(0,180,230,0.08), transparent 70%);
    }

    /* ===== CARD ===== */
    .cta-premium-card {
      position: relative;
      max-width: 920px;
      margin: 0 auto;
      padding: 72px 60px;
      text-align: center;

      background: linear-gradient(
        145deg,
        rgba(10, 25, 30, 0.85),
        rgba(2, 10, 14, 0.95)
      );

      border-radius: 60px;
      border: 1px solid rgba(0,212,170,0.18);
      backdrop-filter: blur(22px);

      box-shadow:
        0 40px 100px rgba(0,0,0,0.7),
        0 0 0 1px rgba(0,212,170,0.06);

      transition: all 0.4s ease;
    }

    .cta-premium-card:hover {
      transform: translateY(-6px);
      border-color: rgba(0,212,170,0.35);
      box-shadow:
        0 50px 120px rgba(0,0,0,0.8),
        0 0 40px rgba(0,212,170,0.15);
    }

    /* ===== BADGE ===== */
    .premium-badge {
      display: inline-block;
      padding: 8px 18px;
      border-radius: 30px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.6px;

      color: #00d4aa;
      background: rgba(0,212,170,0.08);
      border: 1px solid rgba(0,212,170,0.25);
    }

    /* ===== TITLE ===== */
    .cta-premium-card h2 {
      font-size: 44px;
      font-weight: 800;
      margin: 22px 0 14px;
      color: #eaf7f5;
      letter-spacing: -0.6px;
    }

    .cta-premium-card > p {
      font-size: 18px;
      color: #7fa9b8;
      margin-bottom: 44px;
    }

    /* ===== CREDENTIALS ===== */
    .credentials-premium {
      display: flex;
      justify-content: center;
      gap: 28px;
      flex-wrap: wrap;
      margin-bottom: 50px;
    }

    .credential-premium-card {
      width: 240px;
      padding: 22px 26px;
      border-radius: 28px;

      background: rgba(0,0,0,0.45);
      border: 1px solid rgba(0,212,170,0.12);
      backdrop-filter: blur(10px);

      transition: 0.3s ease;
    }

    .credential-premium-card:hover {
      transform: translateY(-4px);
      border-color: rgba(0,212,170,0.3);
      background: rgba(0,0,0,0.6);
    }

    .cred-role-premium {
      display: inline-block;
      padding: 6px 14px;
      font-size: 11px;
      font-weight: 700;
      border-radius: 20px;
      margin-bottom: 16px;
      letter-spacing: 0.5px;
    }

    .teacher-role-premium {
      background: rgba(0,212,170,0.12);
      color: #00d4aa;
      border: 1px solid rgba(0,212,170,0.25);
    }

    .student-role-premium {
      background: rgba(0,180,230,0.12);
      color: #4ac7f2;
      border: 1px solid rgba(0,180,230,0.25);
    }

    .cred-row-premium {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      margin-top: 10px;
      color: #6f9aa8;
    }

    .cred-row-premium code {
      background: rgba(0,0,0,0.6);
      padding: 4px 10px;
      border-radius: 20px;
      color: #00d4aa;
      font-family: monospace;
      font-size: 12px;
    }

    /* ===== BUTTON ===== */
    .btn-premium {
      padding: 16px 48px;
      font-size: 18px;
      font-weight: 700;

      border-radius: 50px;
      border: none;
      cursor: pointer;

      color: #051015;
      background: linear-gradient(135deg, #00d4aa, #00b894);

      box-shadow: 0 12px 30px rgba(0,212,170,0.25);
      transition: all 0.3s ease;
    }

    .btn-premium:hover {
      transform: scale(1.05);
      box-shadow: 0 18px 40px rgba(0,212,170,0.35);
    }

    /* ===== TRUST ===== */
    .trust-badge {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      gap: 26px;
      font-size: 12px;
      color: #4e7a88;
    }

    .trust-badge span {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* MOBILE */
    @media (max-width: 640px) {
      .cta-premium-card {
        padding: 40px 24px;
        border-radius: 40px;
      }

      .cta-premium-card h2 {
        font-size: 30px;
      }

      .credential-premium-card {
        width: 100%;
      }
    }
  `}</style>

  <div className="section-inner">

    <div className="cta-premium-card">

      <div className="premium-badge">✨ LIMITED DEMO ACCESS</div>

      <h2>Transform your scheduling experience</h2>

      <p>No signup, no payment — just instant access</p>

      {/* CREDENTIALS */}
      <div className="credentials-premium">
        <div className="credential-premium-card">
          <div className="cred-role-premium teacher-role-premium">👨‍🏫 TEACHER</div>
          <div className="cred-row-premium">
            <span>User</span><code>teacher</code>
          </div>
          <div className="cred-row-premium">
            <span>Pass</span><code>teacher123</code>
          </div>
        </div>

        <div className="credential-premium-card">
          <div className="cred-role-premium student-role-premium">👩‍🎓 STUDENT</div>
          <div className="cred-row-premium">
            <span>User</span><code>student</code>
          </div>
          <div className="cred-row-premium">
            <span>Pass</span><code>student123</code>
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <button className="btn-premium" onClick={() => navigate('/login')}>
        Launch Dashboard →
      </button>

      {/* TRUST */}
      <div className="trust-badge">
        <span>⚡ Instant access</span>
        <span>🔒 Secure demo</span>
        <span>💸 Free forever</span>
      </div>

    </div>

  </div>
</section>
      
    </LandingLayout>
  )
}

export default Landing