import { useState, useEffect } from 'react'
import SlotList from './SlotList'
import { getSlots, bookSlot } from '../utils/storage'

const STUDENT_NAME = 'Rahim'

function StudentView() {
  const [slots, setSlots] = useState([])
  const [booked, setBooked] = useState(null)
  const [loading, setLoading] = useState(true)

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
      const updated = await bookSlot(slotId, STUDENT_NAME)
      setSlots((prev) =>
        prev.map((s) => (s._id === slotId ? updated : s))
      )
      setBooked(updated)
      setTimeout(() => setBooked(null), 3000)
    } catch (err) {
      alert(err.message)
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
        {loading ? (
          <div className="empty-state"><p>Loading slots...</p></div>
        ) : (
          <SlotList
            slots={availableSlots}
            onBook={handleBook}
            showBookBtn={true}
          />
        )}
      </div>
    </div>
  )
}

export default StudentView