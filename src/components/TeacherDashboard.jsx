import { useState, useEffect } from 'react'
import SlotForm from './SlotForm'
import SlotList from './SlotList'
import { getSlots, addSlot, saveSlots } from '../utils/storage'

const TEACHER_NAME = 'Mr. Rahman'

function TeacherDashboard() {
  const [slots, setSlots] = useState([])

  useEffect(() => {
    setSlots(getSlots())
  }, [])

  const handleAdd = ({ date, time }) => {
    const newSlot = addSlot({ date, time })
    setSlots((prev) => [...prev, newSlot])
  }

  const handleDelete = (slotId) => {
    const updated = slots.filter((s) => s.id !== slotId)
    saveSlots(updated)
    setSlots(updated)
  }

  const totalSlots = slots.length
  const availableSlots = slots.filter((s) => s.status === 'available').length
  const bookedSlots = slots.filter((s) => s.status === 'booked').length

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1 className="page-title">Teacher Dashboard</h1>
          <p className="page-subtitle">Welcome, {TEACHER_NAME}</p>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-value">{totalSlots}</span>
          <span className="stat-label">Total Slots</span>
        </div>
        <div className="stat-card">
          <span className="stat-value available-num">{availableSlots}</span>
          <span className="stat-label">Available</span>
        </div>
        <div className="stat-card">
          <span className="stat-value booked-num">{bookedSlots}</span>
          <span className="stat-label">Booked</span>
        </div>
      </div>

      <SlotForm existingSlots={slots} onAdd={handleAdd} />

      <div className="section">
        <h2 className="section-title">All Slots</h2>
        <SlotList slots={slots} onDelete={handleDelete} showDeleteBtn={true} />
      </div>
    </div>
  )
}

export default TeacherDashboard