document.getElementById('checkBMI').addEventListener('click', () => {
  const heightVal = parseFloat(document.getElementById('height').value);
  const weightVal = parseFloat(document.getElementById('weight').value);
  const ageVal = parseInt(document.getElementById('age').value);
  const sexVal = document.getElementById('sex').value;

  if (isNaN(heightVal) || isNaN(weightVal) || isNaN(ageVal) || !sexVal) {
    alert('Please fill in all fields correctly.');
    return;
  }

  const bmiData = {
    weight: { value: weightVal, unit: 'kg' },
    height: { value: heightVal, unit: 'cm' },
    sex: sexVal,
    age: ageVal,
    waist: 34.0,
    hip: 40.0
  };

  fetch('http://localhost:3000/bmi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bmiData)
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('output').textContent = JSON.stringify(data, null, 2);
  })
  .catch(error => {
    console.error('Fetch error:', error);
    document.getElementById('output').textContent = 'Error: ' + error.message;
  });
}); 
