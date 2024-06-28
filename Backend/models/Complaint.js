const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: { type: String, required: true },
  nature: { type: String, required: true },
  image: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
