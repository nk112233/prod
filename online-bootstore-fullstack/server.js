// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  genre: { type: String, required: true }
});
const Book  = mongoose.model('Book', bookSchema);


// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/onlineBookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('MongoDB Connection Error:', err));

// ➡️ API Endpoints

// Add a new book
app.post('/api/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ message: 'Book added successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a book
app.put('/api/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Book updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a book
app.delete('/api/books/:title', async (req, res) => {
  try {
    await Book.findOneAndDelete( {title :req.params.title } );
    res.json({ message: 'Book deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
