import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import SlotForm from '../../components/SlotForm'
import SlotList from '../../components/SlotList'
import { getSlots, addSlot, deleteSlot } from '../../utils/storage'
import { useAuth } from '../../context/AuthContext'

function TeacherDashboard() {
  const [slots, setSlots] = useState([])
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

  const handleAdd = async ({ date, time }) => {
    const newSlot = await addSlot({ date, time })
    setSlots((prev) => [...prev, newSlot])
  }

  const handleDelete = async (slotId) => {
    await deleteSlot(slotId)
    setSlots((prev) => prev.filter((item) => item._id !== slotId))
  }

  const totalSlots = slots.length
  const availableSlots = slots.filter((s) => s.status === 'available').length
  const bookedSlots = slots.filter((s) => s.status === 'booked').length

  return (
    <DashboardLayout>
      <div className="teacher-dashboard">

        <style>{`
          .teacher-dashboard{
            width:100%;
            min-height:100vh;
            padding:28px;
            display:flex;
            flex-direction:column;
            gap:22px;
          }

          .dashboard-shell{
            width:100%;
            display:flex;
            flex-direction:column;
            gap:22px;
          }

          /* HEADER (clean premium spacing) */
          .dashboard-header{
            padding:6px 2px;
            margin-bottom:6px;
          }

          .dashboard-badge{
            display:inline-block;
            padding:6px 14px;
            border-radius:40px;
            font-size:12px;
            font-weight:700;
            letter-spacing:.5px;
            margin-bottom:10px;
            color:#00d4aa;
            background:rgba(0,212,170,.08);
            border:1px solid rgba(0,212,170,.18);
          }

          .dashboard-title{
            margin:0;
            font-size:34px;
            font-weight:800;
            color:#f5fdff;
            letter-spacing:-.5px;
          }

          .dashboard-subtitle{
            margin-top:6px;
            color:#7ea5b7;
            font-size:15px;
          }

          /* STATS */
          .stats-grid{
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
            gap:18px;
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

          .stat-label{
            color:#7ea5b7;
            font-size:13px;
            margin-bottom:10px;
            text-transform:uppercase;
            letter-spacing:.6px;
          }

          .stat-value{
            font-size:32px;
            font-weight:800;
            color:#00d4aa;
            line-height:1;
          }

          /* SECTION CARD */
          .glass-section{
            background:rgba(7,18,24,.78);
            border:1px solid rgba(0,212,170,.10);
            border-radius:22px;
            padding:26px;
            backdrop-filter:blur(16px);
            box-shadow:0 15px 35px rgba(0,0,0,.25);
            display:flex;
            flex-direction:column;
            gap:18px;
          }

          .section-head{
            display:flex;
            justify-content:space-between;
            align-items:flex-end;
            gap:10px;
            flex-wrap:wrap;
          }

          .section-title{
            margin:0;
            font-size:22px;
            font-weight:700;
            color:#f2fbff;
          }

          .section-meta{
            color:#6e95a7;
            font-size:13px;
          }

          .loading-state{
            padding:30px 10px;
            text-align:center;
            color:#7ea5b7;
          }

          button[type="submit"]{
            background:linear-gradient(135deg,#00b894,#00d4aa)!important;
            color:#031015!important;
            border:none!important;
            font-weight:700;
            border-radius:12px!important;
            padding:12px 18px!important;
          }

          button[type="submit"]:hover{
            filter:brightness(1.08);
          }

          input,select{
            background:rgba(255,255,255,.03)!important;
            border:1px solid rgba(0,212,170,.10)!important;
            color:#eefcff!important;
          }

          @media(max-width:768px){
            .teacher-dashboard{
              padding:18px;
              gap:18px;
            }

            .dashboard-title{
              font-size:28px;
            }

            .glass-section{
              padding:18px;
            }
          }
        `}</style>

        <div className="dashboard-shell">

          {/* HEADER */}
          <div className="dashboard-header">
            <div className="dashboard-badge">Teacher Panel</div>
            <h1 className="dashboard-title">Teacher Dashboard</h1>
            <div className="dashboard-subtitle">
              Welcome back, {user?.name}
            </div>
          </div>

          {/* STATS */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total Slots</div>
              <div className="stat-value">{totalSlots}</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Available</div>
              <div className="stat-value">{availableSlots}</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Booked</div>
              <div className="stat-value">{bookedSlots}</div>
            </div>
          </div>

          {/* ADD SLOT */}
          <div className="glass-section">
            <div className="section-head">
              <h2 className="section-title">Add New Slot</h2>
              <span className="section-meta">Create 15 minute class slots</span>
            </div>

            <SlotForm existingSlots={slots} onAdd={handleAdd} />
          </div>

          {/* ALL SLOTS */}
          <div className="glass-section">
            <div className="section-head">
              <h2 className="section-title">All Slots</h2>
              <span className="section-meta">{totalSlots} total slots</span>
            </div>

            {loading ? (
              <div className="loading-state">Loading slots...</div>
            ) : (
              <SlotList
                slots={slots}
                onDelete={handleDelete}
                showDeleteBtn={true}
              />
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  )
}

export default TeacherDashboard