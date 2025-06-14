/*const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors()); 
app.use(express.json()); 

app.post('/bmi', async (req, res) => {
  try {
    console.log('Incoming BMI data:', req.body);

    const response = await fetch('https://bmi.p.rapidapi.com/v1/bmi', {
      method: 'POST',
      headers: {
        'x-rapidapi-key': '3407e84737mshea43352018cdea9p11b338jsnf0f680a7f8cd',
		'x-rapidapi-host': 'bmi.p.rapidapi.com',
		'Content-Type': 'application/json'
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
*/
const url = 'https://bmi.p.rapidapi.com/v1/bmi';
const options = {
	method: 'POST',
	headers: {
		'x-rapidapi-key': '3407e84737mshea43352018cdea9p11b338jsnf0f680a7f8cd',
		'x-rapidapi-host': 'bmi.p.rapidapi.com',
		'Content-Type': 'application/json'
	},
	body: {
		weight: {
			value: '85.00',
			unit: 'kg'
		},
		height: {
			value: '170.00',
			unit: 'cm'
		},
		sex: 'm',
		age: '24',
		waist: '34.00',
		hip: '40.00'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}