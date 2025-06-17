const exerciseKey = "IIkzdMW5mG3Nggde5YtIPQ==6ebKZ0ZpXiYFLnWI";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("exerciseForm");
    const resultDiv = document.getElementById("exerciseResults");
    const spinner = document.getElementById("loadingSpinner");

    const savedExcercises = JSON.parse(localStorage.getItem("recentExcercises"));
    if (savedExcercises && Array.isArray(savedExcercises)) {
        displayExcerciseResults(savedExcercises, resultDiv);
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        resultDiv.innerHTML="";
        spinner.style.display = "block";
    
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
    spinner.style.display= "none";
    resultDiv.innerHTML = "";

    if (!Array.isArray(data)|| data.length ===0) {
        resultDiv.textContent = "No excercise found";
        return;
    }

    localStorage.setItem("recentExcercises", JSON.stringify(data.slice(0, 5)));
    displayExcerciseResults(data, resultDiv);

    } catch (error) {
        console.log("Error Fetching exercises:", error);
        spinner.style.display = "none";
        resultDiv.textContent = "An error has ocurred. Please try again";
        }
    });
});

function displayExcerciseResults(data, container) {
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
        container.appendChild(card);
    });
}