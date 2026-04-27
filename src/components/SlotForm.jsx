import { useState } from 'react'
import { validateSlot } from '../utils/validation'
import { FiAlertTriangle, FiCheckCircle, FiClock } from 'react-icons/fi'

function SlotForm({ existingSlots, onAdd }) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const result = validateSlot(date, time, existingSlots)
    if (!result.valid) {
      setError(result.error)
      return
    }

    onAdd({ date, time })
    setDate('')
    setTime('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2500)
  }

  return (
    <form className="slot-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Add New Slot</h3>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-input"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Time</label>
          <input
            type="time"
            className="form-input"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Slot
        </button>
      </div>
      {error && (
  <p className="form-error">
    <FiAlertTriangle size={14} /> {error}
  </p>
)}
{success && (
  <p className="form-success">
    <FiCheckCircle size={14} /> Slot added successfully!
  </p>
)}
<p className="form-hint">
  <FiClock size={12} /> Each slot is 15 minutes long.
</p>
    </form>
  )
}

export default SlotForm