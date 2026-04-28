import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import SlotList from '../../components/SlotList'
import { getSlots, bookSlot } from '../../utils/storage'
import { useAuth } from '../../context/AuthContext'

function StudentDashboard() {
  const [slots, setSlots] = useState([])
  const [booked, setBooked] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchSlots()
  }, [])

  const fetchSlots = async () => {
    try {
      setLoading(true)
      const data = await getSlots()
      setSlots(data)
    } finally {
      setLoading(false)
    }
  }

  const availableSlots = slots.filter((s) => s.status === 'available')

  const handleBook = async (slotId) => {
    try {
      const updated = await bookSlot(slotId, user?.name)
      setSlots((prev) => prev.map((s) => (s._id === slotId ? updated : s)))
      setBooked(updated)
      setTimeout(() => setBooked(null), 3000)
    } catch (err) {
      alert(err.message)
    }
  }

  const myBookings = slots.filter(
    (s) => s.status === 'booked' && s.bookedBy === user?.name
  ).length

  return (
    <DashboardLayout>
      <div className="student-dashboard">

        <style>{`
          .student-dashboard{
            width:100%;
            min-height:100vh;
            padding:20px;
          }

          .page-header{
            margin-bottom:22px;
          }

          .page-title{
            margin:0;
            font-size:34px;
            font-weight:800;
            color:#f5fdff;
            letter-spacing:-.5px;
          }

          .page-subtitle{
            margin-top:8px;
            color:#7ea5b7;
            font-size:15px;
          }

          .toast{
            padding:14px 18px;
            border-radius:14px;
            margin-bottom:20px;
            font-weight:600;
          }

          .success-toast{
            background:rgba(0,212,170,.10);
            border:1px solid rgba(0,212,170,.20);
            color:#00d4aa;
          }

          .stats-row{
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
            gap:18px;
            margin-bottom:22px;
          }

          .stat-card{
            background:rgba(7,18,24,.78);
            border:1px solid rgba(0,212,170,.10);
            border-radius:18px;
            padding:22px;
            transition:.25s ease;
            backdrop-filter:blur(14px);
          }

          .stat-card:hover{
            transform:translateY(-4px);
            border-color:rgba(0,212,170,.28);
            box-shadow:0 10px 25px rgba(0,212,170,.08);
          }

          .stat-value{
            display:block;
            font-size:32px;
            font-weight:800;
            line-height:1;
            color:#f5fdff;
            margin-bottom:10px;
          }

          .available-num,
          .booked-num{
            color:#00d4aa;
          }

          .stat-label{
            color:#7ea5b7;
            font-size:13px;
            text-transform:uppercase;
            letter-spacing:.6px;
          }

          .section{
            background:rgba(7,18,24,.78);
            border:1px solid rgba(0,212,170,.10);
            border-radius:22px;
            padding:24px;
            backdrop-filter:blur(16px);
            box-shadow:0 15px 35px rgba(0,0,0,.25);
          }

          .section-title{
            display:flex;
            align-items:center;
            gap:10px;
            flex-wrap:wrap;
            margin:0 0 18px;
            font-size:24px;
            font-weight:700;
            color:#f2fbff;
          }

          .section-count{
            display:inline-flex;
            align-items:center;
            justify-content:center;
            min-width:34px;
            height:34px;
            padding:0 12px;
            border-radius:50px;
            font-size:14px;
            font-weight:700;
            color:#00d4aa;
            background:rgba(0,212,170,.08);
            border:1px solid rgba(0,212,170,.18);
          }

          .empty-state{
            padding:28px 10px;
            text-align:center;
            color:#7ea5b7;
          }

          button{
            background:linear-gradient(135deg,#00b894,#00d4aa)!important;
            color:#031015!important;
            border:none!important;
            font-weight:700!important;
            border-radius:12px!important;
            padding:12px 18px!important;
          }

          button:hover{
            filter:brightness(1.08);
          }

          @media(max-width:768px){
            .student-dashboard{
              padding:18px;
            }

            .page-title{
              font-size:28px;
            }

            .section{
              padding:18px;
            }
          }
        `}</style>

        <div className="page-header">
          <div>
            <h1 className="page-title">Student Dashboard</h1>
            <p className="page-subtitle">
              Hello, {user?.name} — book your slot below
            </p>
          </div>
        </div>

        {booked && (
          <div className="toast success-toast">
            ✓ Slot booked for {booked.date} at {booked.time}!
          </div>
        )}

        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-value available-num">
              {availableSlots.length}
            </span>
            <span className="stat-label">Available Slots</span>
          </div>

          <div className="stat-card">
            <span className="stat-value booked-num">{myBookings}</span>
            <span className="stat-label">My Bookings</span>
          </div>

          <div className="stat-card">
            <span className="stat-value">{slots.length}</span>
            <span className="stat-label">Total Slots</span>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">
            Available Slots
            <span className="section-count">{availableSlots.length}</span>
          </h2>

          {loading ? (
            <div className="empty-state">
              <p>Loading slots...</p>
            </div>
          ) : (
            <SlotList
              slots={availableSlots}
              onBook={handleBook}
              showBookBtn={true}
            />
          )}
        </div>

      </div>
    </DashboardLayout>
  )
}

export default StudentDashboard