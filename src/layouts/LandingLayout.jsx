import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

function LandingLayout({ children }) {
  return (
    <div className="landing-layout">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default LandingLayout