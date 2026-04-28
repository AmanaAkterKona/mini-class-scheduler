const express = require('express')
const router = express.Router()
const Slot = require('../models/Slot')

// GET all slots
router.get('/', async (req, res) => {
  try {
    const slots = await Slot.find().sort({ date: 1, time: 1 })
    res.json(slots)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch slots' })
  }
})

// POST create new slot
router.post('/', async (req, res) => {
  try {
    const { date, time } = req.body

    if (!date || !time) {
      return res.status(400).json({ error: 'Date and time are required.' })
    }

    // Past time check
    const slotDateTime = new Date(`${date}T${time}`)
    if (slotDateTime <= new Date()) {
      return res.status(400).json({ error: 'Cannot add a past time slot.' })
    }

    // Overlap check
    const existingSlots = await Slot.find({ date })
    const newStart = slotDateTime
    const newEnd = new Date(newStart.getTime() + 15 * 60 * 1000)

    const hasOverlap = existingSlots.some((slot) => {
      const existStart = new Date(`${slot.date}T${slot.time}`)
      const existEnd = new Date(existStart.getTime() + 15 * 60 * 1000)
      return newStart < existEnd && newEnd > existStart
    })

    if (hasOverlap) {
      return res.status(400).json({ error: 'This slot overlaps with an existing one.' })
    }

    const slot = await Slot.create({ date, time })
    res.status(201).json(slot)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create slot' })
  }
})

// PATCH book a slot
router.patch('/:id/book', async (req, res) => {
  try {
    const { studentName } = req.body
    const slot = await Slot.findById(req.params.id)

    if (!slot) return res.status(404).json({ error: 'Slot not found' })
    if (slot.status === 'booked') return res.status(400).json({ error: 'Slot already booked' })

    slot.status = 'booked'
    slot.bookedBy = studentName || 'Student'
    await slot.save()

    res.json(slot)
  } catch (err) {
    res.status(500).json({ error: 'Failed to book slot' })
  }
})

// DELETE a slot
router.delete('/:id', async (req, res) => {
  try {
    const slot = await Slot.findByIdAndDelete(req.params.id)
    if (!slot) return res.status(404).json({ error: 'Slot not found' })
    res.json({ message: 'Slot deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete slot' })
  }
})

module.exports = router