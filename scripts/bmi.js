
document.getElementById('checkBMI').addEventListener('click', () => {
  const heightVal = parseFloat(document.getElementById('height').value);
  const weightVal = parseFloat(document.getElementById('weight').value);
  const ageVal = parseInt(document.getElementById('age').value);
  const sexVal = document.getElementById('sex').value;
  const sexFormatted = sexVal === "male" ? "m" : "f";
  const waistVal = parseFloat(document.getElementById('waist').value);
  const hipVal = parseFloat(document.getElementById('hip').value);

  if (isNaN(heightVal) || isNaN(weightVal) || isNaN(ageVal) || !sexVal) {
    alert('Please fill in all fields correctly.');
    return;
  }


const bmiData = {
  weight: { value: weightVal.toFixed(2).toString(), unit: 'kg' },
  height: { value: heightVal.toFixed(2).toString(), unit: 'cm' },
  sex: sexVal,
  age: ageVal.toString(),
  waist: { value: waistVal.toFixed(2).toString()},
  hip: { value: hipVal.toFixed(2).toString()},
};

  fetch('http://localhost:3000/bmi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bmiData)
  })
  .then(response => response.json())
.then(data => {
  console.log("API response:", data);

  if (data.bmi) {
    document.getElementById('output').innerHTML = `
      <p><strong>BMI:</strong> ${data.bmi.value}</p>
      <p><strong>Status:</strong> ${data.bmi.status}</p>
    `;
  } else if (data.error) {
    document.getElementById('output').textContent = 'API error: ' + data.error;
  } else {
    document.getElementById('output').textContent = 'Unexpected response from API.';
  }
})


  .catch(error => {
    console.error('Fetch error:', error);
    document.getElementById('output').textContent = 'Error: ' + error.message;
  });
}); 
