import { useState } from 'react'
import { FiClock, FiCheck, FiX, FiCalendar, FiUser, FiFilter } from 'react-icons/fi'
import { MdOutlineEventAvailable, MdOutlineEventBusy } from 'react-icons/md'

function ConfirmModal({ slot, onConfirm, onCancel }) {
  const formatTime = (time) => {
    const [h, m] = time.split(':')
    const hour = parseInt(h)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${m} ${ampm}`
  }
  const getEndTime = (time) => {
    const [h, m] = time.split(':')
    const totalMinutes = parseInt(h) * 60 + parseInt(m) + 15
    const endH = Math.floor(totalMinutes / 60) % 24
    const endM = totalMinutes % 60
    return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`
  }
  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon"><FiClock size={28} /></div>
        <h3 className="modal-title">Confirm Booking</h3>
        <p className="modal-subtitle">You are about to book this slot:</p>
        <div className="modal-slot-info">
          <span className="modal-date">
            <FiCalendar size={12} style={{ marginRight: 5 }} />
            {formatDate(slot.date)}
          </span>
          <span className="modal-time">
            {formatTime(slot.time)} — {formatTime(getEndTime(slot.time))}
          </span>
          <span className="modal-duration">
            <FiClock size={11} style={{ marginRight: 4 }} />
            15 minutes
          </span>
        </div>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onCancel}>
            <FiX size={14} style={{ marginRight: 6 }} /> Cancel
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            <FiCheck size={14} style={{ marginRight: 6 }} /> Confirm 
          </button>
        </div>
      </div>
    </div>
  )
}

function SlotList({ slots, onBook, onDelete, showBookBtn = false, showDeleteBtn = false }) {
  const [filter, setFilter] = useState('all')
  const [pendingSlot, setPendingSlot] = useState(null)

  const formatTime = (time) => {
    const [h, m] = time.split(':')
    const hour = parseInt(h)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${m} ${ampm}`
  }

  const getEndTime = (time) => {
    const [h, m] = time.split(':')
    const totalMinutes = parseInt(h) * 60 + parseInt(m) + 15
    const endH = Math.floor(totalMinutes / 60) % 24
    const endM = totalMinutes % 60
    return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  const filtered = [...slots]
    .filter((s) => filter === 'all' ? true : s.status === filter)
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))

  const handleConfirm = () => {
    if (pendingSlot) {
      onBook(pendingSlot.id)
      setPendingSlot(null)
    }
  }

  return (
    <>
      {pendingSlot && (
        <ConfirmModal
          slot={pendingSlot}
          onConfirm={handleConfirm}
          onCancel={() => setPendingSlot(null)}
        />
      )}

      <div className="filter-bar">
        <FiFilter size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        {['all', 'available', 'booked'].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' && 'All'}
            {f === 'available' && <><MdOutlineEventAvailable size={13} style={{ marginRight: 4 }} /> Available</>}
            {f === 'booked' && <><MdOutlineEventBusy size={13} style={{ marginRight: 4 }} /> Booked</>}
          </button>
        ))}
        <span className="filter-count">{filtered.length} slot{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <FiClock size={32} style={{ opacity: 0.25 }} />
          <p>No slots found.</p>
        </div>
      ) : (
        <div className="slot-list">
          {filtered.map((slot) => (
            <div key={slot.id} className={`slot-card ${slot.status}`}>
              <div className="slot-info">
                <span className="slot-date">
                  <FiCalendar size={11} style={{ marginRight: 5 }} />
                  {formatDate(slot.date)}
                </span>
                <span className="slot-time">
                  <FiClock size={13} style={{ marginRight: 6 }} />
                  {formatTime(slot.time)} — {formatTime(getEndTime(slot.time))}
                </span>
                {slot.bookedBy && (
                  <span className="slot-booked-by">
                    <FiUser size={11} style={{ marginRight: 4 }} />
                    Booked by: {slot.bookedBy}
                  </span>
                )}
              </div>
              <div className="slot-right">
                <span className={`status-badge ${slot.status}`}>
                  {slot.status === 'available'
                    ? <><MdOutlineEventAvailable size={12} style={{ marginRight: 4 }} /> Available</>
                    : <><MdOutlineEventBusy size={12} style={{ marginRight: 4 }} /> Booked</>
                  }
                </span>
                {showBookBtn && slot.status === 'available' && (
                  <button className="btn btn-book" onClick={() => setPendingSlot(slot)}>
                    <FiCheck size={13} style={{ marginRight: 5 }} /> Book
                  </button>
                )}
                {showDeleteBtn && (
                  <button className="btn btn-delete" onClick={() => onDelete(slot.id)}>
                    <FiX size={13} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default SlotList