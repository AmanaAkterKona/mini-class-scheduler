export const isPastDateTime = (date, time) => {
  const slotDateTime = new Date(`${date}T${time}`)
  return slotDateTime <= new Date()
}

export const isOverlapping = (date, time, existingSlots) => {
  const newStart = new Date(`${date}T${time}`)
  const newEnd = new Date(newStart.getTime() + 15 * 60 * 1000)

  return existingSlots.some((slot) => {
    const existStart = new Date(`${slot.date}T${slot.time}`)
    const existEnd = new Date(existStart.getTime() + 15 * 60 * 1000)
    return newStart < existEnd && newEnd > existStart
  })
}

export const validateSlot = (date, time, existingSlots) => {
  if (!date || !time) return { valid: false, error: 'Date and time are required.' }
  if (isPastDateTime(date, time)) return { valid: false, error: 'Cannot add a past time slot.' }
  if (isOverlapping(date, time, existingSlots)) return { valid: false, error: 'This slot overlaps with an existing one.' }
  return { valid: true, error: null }
}