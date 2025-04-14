var express = require("express")
const path = require('path');
var app = express()
var port = process.env.port || 3000;

// Middleware to parse JSON bodies (for POST requests)
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/add', (req, res) => {
    const { n1, n2 } = req.body;
  
    if (typeof n1 !== 'number' || typeof n2 !== 'number') {
      return res.status(400).json({ error: 'Both numbers must be valid numbers.' });
    }
  
    const add = n1 + n2;
    res.json({ add });
  });
  
  app.post('/api/sub', (req, res) => {
    const { n1, n2 } = req.body;
  
    if (typeof n1 !== 'number' || typeof n2 !== 'number') {
      return res.status(400).json({ error: 'Both numbers must be valid numbers.' });
    }
  
    const sub = n1 - n2;
    res.json({ sub });
  });

  app.post('/api/mul', (req, res) => {
    const { n1, n2 } = req.body;
  
    if (typeof n1 !== 'number' || typeof n2 !== 'number') {
      return res.status(400).json({ error: 'Both numbers must be valid numbers.' });
    }
  
    const mul = n1 * n2;
    res.json({ mul });
  });

  app.post('/api/div', (req, res) => {
    const { n1, n2 } = req.body;
  
    if (typeof n1 !== 'number' || typeof n2 !== 'number') {
      return res.status(400).json({ error: 'Both numbers must be valid numbers.' });
    }
  
    const div = n1 / n2;
    res.json({ div });
  });

// Additional example endpoint to check server health
app.get('/health', (req, res) => {
  res.send('Server is healthy!');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});