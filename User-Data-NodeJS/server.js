const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to serve static files like HTML
app.use(express.static('public'));

// API route to fetch user data
app.get('/api/users', (req, res) => {
    // Read the users data from a JSON file
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading user data.');
        }
        const users = JSON.parse(data);
        res.json(users);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
