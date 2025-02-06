const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    enum: ['Manager', 'Senior Dev', 'Junior Dev'],
  },
  startDate: {
    type: Date,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
    trim: true,
  },
  salary: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
