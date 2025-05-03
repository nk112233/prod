// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// models/Employee.js

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  salary: { type: Number, required: true },
  joiningDate: { type: Date, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/employeeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// ✅ Routes

// ➡️ Add a new employee
app.post('/api/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: 'Employee added successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➡️ View all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➡️ Update an existing employee
app.put('/api/employees/:id', async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Employee updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➡️ Delete an employee
app.delete('/api/employees/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
