const mongoose = require('mongoose')

const slotSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'booked'],
    default: 'available',
  },
  bookedBy: {
    type: String,
    default: null,
  },
}, { timestamps: true })

module.exports = mongoose.model('Slot', slotSchema)