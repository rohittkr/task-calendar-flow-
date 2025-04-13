const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ['exercise', 'eating', 'work', 'relax', 'family', 'social'],
    required: true
  },
  date: { type: String, required: true }, // format: 'yyyy-MM-dd'
  startTime: { type: String, required: true }, // format: 'HH:mm'
  endTime: { type: String, required: true } // format: 'HH:mm'
});

module.exports = mongoose.model('Event', EventSchema);
