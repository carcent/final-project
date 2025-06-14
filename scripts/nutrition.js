const apiKey = "IIkzdMW5mG3Nggde5YtIPQ==6ebKZ0ZpXiYFLnWI";

document.addEventListener("DOMContentLoaded", ()=> {
const savedData = JSON.parse(localStorage.getItem("recentFoods"));
if (savedData && savedData.length >0) {
    displayResults(savedData);
}
});

document.getElementById("foodButton").addEventListener("click", (event) => {
    event.preventDefault();
    const food = document.getElementById("foodInput").value.trim();
    if (food ===""){
        alert("Please enter a food Item!");
        return;
    }


fetch(`https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(food)}`, {
    method:"GET", 
    headers:{
        "X-Api-Key": apiKey
    }
})
.then(response => response.json())
.then(data => {
    if(data.length ===0) {
        document.getElementById("result").textContent = "No nutrition data found";
    } else {
        displayResults(data);

        let recentFoods = JSON.parse(localStorage.getItem("recentFoods")) || [];

        recentFoods = recentFoods.slice(0, 4);
        recentFoods.unshift(data[0]);

        localStorage.setItem("recentfoods", JSON.stringify(recentFoods));
    }
})

    .catch(error => {console.error(error)
document.getElementById("result").textContent = "an error has ocurred. Please try again.";
    });

});

function displayResults(data){
    
    const container= document.getElementById("result");
    container.innerHTML =""

data.forEach(item => {
    const card = document.createElement("div");
    card.className = "nutrition-card";

    card.innerHTML = `
    <h3>${item.name}</h3>
    <ul>          
        ${typeof item.calories === "number" ? `<li><strong>Calories:</strong> ${item.calories}</li>` : ""}
        ${typeof item.fat_total_g === "number" ? `<li><strong>Total Fat:</strong> ${item.fat_total_g}g</li>` : ""}
        ${typeof item.fat_saturated_g === "number" ? `<li><strong>Saturated Fat:</strong> ${item.fat_saturated_g}g</li>` : ""}
        ${typeof item.protein_g === "number" ? `<li><strong>Protein:</strong> ${item.protein_g}g</li>` : ""}
        ${typeof item.carbohydrates_total_g === "number" ? `<li><strong>Carbs:</strong> ${item.carbohydrates_total_g}g</li>` : ""}
        ${typeof item.sugar_g === "number" ? `<li><strong>Sugar:</strong> ${item.sugar_g}g</li>` : ""}
        ${typeof item.fiber_g === "number" ? `<li><strong>Fiber:</strong> ${item.fiber_g}g</li>` : ""}
        ${typeof item.sodium_mg === "number" ? `<li><strong>Sodium:</strong> ${item.sodium_mg}mg</li>` : ""}
        </ul>
    `;

    container.appendChild(card);
    });
}