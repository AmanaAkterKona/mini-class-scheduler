const SLOTS_KEY = 'classsync_slots'

export const getSlots = () => {
  try {
    const data = localStorage.getItem(SLOTS_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const saveSlots = (slots) => {
  localStorage.setItem(SLOTS_KEY, JSON.stringify(slots))
}

export const addSlot = (slot) => {
  const slots = getSlots()
  const newSlot = {
    id: Date.now().toString(),
    date: slot.date,
    time: slot.time,
    status: 'available',
    bookedBy: null,
    createdAt: new Date().toISOString(),
  }
  slots.push(newSlot)
  saveSlots(slots)
  return newSlot
}

export const bookSlot = (slotId, studentName) => {
  const slots = getSlots()
  const idx = slots.findIndex((s) => s.id === slotId)
  if (idx === -1) return false
  slots[idx].status = 'booked'
  slots[idx].bookedBy = studentName
  saveSlots(slots)
  return true
}