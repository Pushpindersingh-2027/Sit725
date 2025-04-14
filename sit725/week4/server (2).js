const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ChargingType = require('./models/chargingType');
const Feedback = require('./models/feedback');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/ev_socket');

// Get all charging types
app.get('/charging-types', async (req, res) => {
  const types = await ChargingType.find();
  res.json(types);
});

// Post feedback
app.post('/feedback', async (req, res) => {
  const feedback = new Feedback(req.body);
  await feedback.save();
  res.json({ message: 'Feedback received!' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
