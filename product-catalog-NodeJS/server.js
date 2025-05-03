const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Serve static frontend files from public folder
app.use(express.static('public'));

// API to get products
app.get('/api/products', (req, res) => {
  fs.readFile(path.join(__dirname, 'products.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading products.');
    }
    res.json(JSON.parse(data));
  });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
