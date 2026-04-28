const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const getSlots = async () => {
  const res = await fetch(`${API_URL}/slots`)
  if (!res.ok) throw new Error('Failed to fetch slots')
  return res.json()
}

export const addSlot = async (slot) => {
  const res = await fetch(`${API_URL}/slots`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(slot),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to add slot')
  return data
}

export const bookSlot = async (slotId, studentName) => {
  const res = await fetch(`${API_URL}/slots/${slotId}/book`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ studentName }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to book slot')
  return data
}

export const deleteSlot = async (slotId) => {
  const res = await fetch(`${API_URL}/slots/${slotId}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete slot')
  return true
}

export const saveSlots = () => {} // kept for compatibility