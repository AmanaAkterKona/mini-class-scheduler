import { useState, useEffect } from 'react'
import SlotList from './SlotList'
import { getSlots, bookSlot } from '../utils/storage'

const STUDENT_NAME = 'Rahim'

function StudentView() {
  const [slots, setSlots] = useState([])
  const [booked, setBooked] = useState(null)

  useEffect(() => {
    setSlots(getSlots())
  }, [])

  const availableSlots = slots.filter((s) => s.status === 'available')

  const handleBook = (slotId) => {
    const success = bookSlot(slotId, STUDENT_NAME)
    if (success) {
      const updated = getSlots()
      setSlots(updated)
      const slot = updated.find((s) => s.id === slotId)
      setBooked(slot)
      setTimeout(() => setBooked(null), 3000)
    }
  }

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1 className="page-title">Student View</h1>
          <p className="page-subtitle">Hello, {STUDENT_NAME} — book your slot below</p>
        </div>
      </div>

      {booked && (
        <div className="toast success-toast">
          ✓ Slot booked for {booked.date} at {booked.time}!
        </div>
      )}

      <div className="section">
        <h2 className="section-title">
          Available Slots
          <span className="section-count">{availableSlots.length}</span>
        </h2>
        <SlotList
          slots={availableSlots}
          onBook={handleBook}
          showBookBtn={true}
        />
      </div>
    </div>
  )
}

export default StudentView