const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); 

const app = express();
app.use(cors()); 
app.use(express.json()); 

app.post('/bmi', async (req, res) => {
  try {
    console.log('Incoming BMI data:', req.body);

    const response = await fetch('https://bmi.p.rapidapi.com/v1/bmi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': '3407e84737mshea43352018cdea9p11b338jsnf0f680a7f8cd',
        'X-RapidAPI-Host': 'bmi.p.rapidapi.com'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    console.log('Response from BMI API:', data);
    res.json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Proxy server is running!');
});

app.listen(3000, () => {
  console.log('Proxy server running at http://localhost:3000');
});