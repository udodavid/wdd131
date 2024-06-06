const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  worker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  status: { type: String, enum: ['open', 'in progress', 'completed'], default: 'open' },
  budget: Number,
  deadline: Date
});

module.exports = mongoose.model('Job', JobSchema);
