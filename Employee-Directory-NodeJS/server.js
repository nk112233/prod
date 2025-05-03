const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve static files (frontend)
app.use(express.static('public'));

// API endpoint to get employees
app.get('/api/employees', (req, res) => {
  fs.readFile('./employees.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load employee data.' });
    }
    res.json(JSON.parse(data));
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
