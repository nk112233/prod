const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/student', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// Define Schema
const studentSchema = new mongoose.Schema({
  name: String,
  roll_no: Number,
  WAD_Marks: Number,
  CC_Marks: Number,
  DSBDA_Marks: Number,
  CNS_Marks: Number,
  AI_Marks: Number
});

// Model
const Student = mongoose.model('Student', studentSchema);

// API Routes

// a) Insert Sample Students (only once or comment after inserting)
app.post('/api/students/insert-sample', async (req, res) => {
  const sampleStudents = [
    { name: "Alice", roll_no: 1, WAD_Marks: 25, CC_Marks: 28, DSBDA_Marks: 22, CNS_Marks: 30, AI_Marks: 24 },
    { name: "Bob", roll_no: 2, WAD_Marks: 18, CC_Marks: 20, DSBDA_Marks: 19, CNS_Marks: 25, AI_Marks: 22 },
    { name: "Charlie", roll_no: 3, WAD_Marks: 30, CC_Marks: 29, DSBDA_Marks: 27, CNS_Marks: 28, AI_Marks: 30 },
    { name: "David", roll_no: 4, WAD_Marks: 22, CC_Marks: 18, DSBDA_Marks: 21, CNS_Marks: 22, AI_Marks: 20 },
    { name: "Eva", roll_no: 5, WAD_Marks: 32, CC_Marks: 31, DSBDA_Marks: 30, CNS_Marks: 29, AI_Marks: 33 }
  ];
  await Student.insertMany(sampleStudents);
  res.json({ message: 'Sample students inserted' });
});

// b) List All Students + Total Count
app.get('/api/students', async (req, res) => {
  const students = await Student.find();
  const count = await Student.countDocuments();
  res.json({ students, count });
});

// c) Students with DSBDA_Marks > 20
app.get('/api/students/dsbda', async (req, res) => {
  const students = await Student.find({ DSBDA_Marks: { $gt: 20 } });
  res.json(students);
});

// d) Update marks of specified student by 10
app.put('/api/students/update/:name', async (req, res) => {
  const { name } = req.params;
  await Student.updateOne({ name }, {
    $inc: {
      WAD_Marks: 10,
      CC_Marks: 10,
      DSBDA_Marks: 10,
      CNS_Marks: 10,
      AI_Marks: 10
    }
  });
  res.json({ message: `Marks updated for ${name}` });
});

// e) Students who got >25 in ALL subjects
app.get('/api/students/topper', async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $gt: 25 },
    CC_Marks: { $gt: 25 },
    DSBDA_Marks: { $gt: 25 },
    CNS_Marks: { $gt: 25 },
    AI_Marks: { $gt: 25 }
  });
  res.json(students);
});

// f) Students who got <40 in both WAD and CC (assuming Maths = WAD, Science = CC)
app.get('/api/students/weak', async (req, res) => {
  const students = await Student.find({
    WAD_Marks: { $lt: 40 },
    CC_Marks: { $lt: 40 }
  });
  res.json(students);
});

// g) Delete student
app.delete('/api/students/:name', async (req, res) => {
  const { name } = req.params;
  await Student.deleteOne({ name });
  res.json({ message: `Deleted ${name}` });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
