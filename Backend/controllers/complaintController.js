const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res) => {
  try {
    const { title, description, department, nature } = req.body;
    const complaint = new Complaint({
      title,
      description,
      department,
      nature,
      image: req.file.path,
      createdBy: req.user._id,
    });
    await complaint.save();
    res.status(201).send({ message: 'Complaint created successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('createdBy');
    res.send(complaints);
  } catch (error) {
    res.status(500).send(error);
  }
};
