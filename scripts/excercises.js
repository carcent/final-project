const exerciseKey = "IIkzdMW5mG3Nggde5YtIPQ==6ebKZ0ZpXiYFLnWI";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("exerciseForm");
    const resultDiv = document.getElementById("exerciseResults");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
    
        const muscle =document.getElementById("muscle").value;
        const type =document.getElementById("type").value;
        const difficulty =document.getElementById("difficulty").value;

        let url =  "https://api.api-ninjas.com/v1/exercises?";
    if (muscle) url += `muscle=${muscle}&`;
    if (type) url += `type=${type}&`;
    if (difficulty) url += `difficulty=${difficulty}`;
    
    try {
        const response = await fetch(url, {
            headers:{"X-Api-Key": exerciseKey}
        });
    
    const data = await response.json();
    resultDiv.innerHTML = "";

    if (!Array.isArray(data)|| data.length ===0) {
        resultDiv.textContent = "No excercise found";
        return;
    }
    data.forEach(exercise => {
const card = document.createElement("div");
card.className = "exercise-card";
card.innerHTML = `
    <div class="card-inner">
        <div class="card-front">
        <h3>${exercise.name}</h3>
        <p><strong>Muscle:</strong> ${exercise.muscle}</p>
        <p><strong>Type:</strong> ${exercise.type}</p>
        <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
    </div>
    <div class="card-back">
        <p><strong>Instructions:</strong> ${exercise.instructions}</p>
    </div>
    </div>
`;
        resultDiv.appendChild(card);
    });
    } catch (error) {
        console.log("Error Fetching exercises:", error);
        resultDiv.textContent = "An error has ocurred. Please try again";
        }
    });

});