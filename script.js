// DOM Element Selections
const weightInput = document.getElementById('weight');
const repsInput = document.getElementById('reps');
const calculateBtn = document.getElementById('calculate-btn');
const errorContainer = document.getElementById('error-container');
const resultsContainer = document.getElementById('results-container');

// Validation Function
function validateInputs(weight, reps) {
    const weightNum = parseFloat(weight);
    const repsNum = parseInt(reps);

    if (isNaN(weightNum)) {
        return "Please enter a valid weight";
    }

    if (weightNum <= 0 || weightNum > 500) {
        return "Weight must be between 1-500 kg";
    }

    if (isNaN(repsNum)) {
        return "Please enter valid repetitions";
    }

    if (repsNum < 1 || repsNum > 20) {
        return "Reps must be between 1-20";
    }

    return null;
}

// 1RM Calculation Function (Epley formula)
function calculate1RM(weight, reps) {
    return Math.round(weight * (1 + (reps / 30)));
}

// Expanded Percentage Calculations (from 40% to 95% in 5% increments)
function calculatePercentages(oneRM) {
    return {
        '40%': Math.round(oneRM * 0.40),
        '45%': Math.round(oneRM * 0.45),
        '50%': Math.round(oneRM * 0.50),
        '55%': Math.round(oneRM * 0.55),
        '60%': Math.round(oneRM * 0.60),
        '65%': Math.round(oneRM * 0.65),
        '70%': Math.round(oneRM * 0.70),
        '75%': Math.round(oneRM * 0.75),
        '80%': Math.round(oneRM * 0.80),
        '85%': Math.round(oneRM * 0.85),
        '90%': Math.round(oneRM * 0.90),
        '95%': Math.round(oneRM * 0.95)
    };
}

// Display Error
function displayError(message) {
    errorContainer.innerHTML = `<div class="error-message">${message}</div>`;
    resultsContainer.innerHTML = '';
}

// Display Results
function displayResults(oneRM, percentages) {
    errorContainer.innerHTML = '';
    resultsContainer.innerHTML = `
        <div class="results-container">
            <h2 class="results-title">Training Weights</h2>
            <div class="one-rm-value">${oneRM} kg</div>
            <div class="percentages-grid">
                ${Object.entries(percentages).map(([percentage, weight]) => `
                    <div class="percentage-item">
                        <div class="percentage-label">${percentage}</div>
                        <div class="percentage-value">${weight} kg</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Prevent form submission
document.querySelector("form")?.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page refresh
});

// Calculate Button Event Listener
calculateBtn.addEventListener('click', (event) => {
    event.preventDefault(); // 🔥 Prevents page refresh

    const weight = weightInput.value;
    const reps = repsInput.value;

    // Validate Inputs
    const validationError = validateInputs(weight, reps);
    if (validationError) {
        displayError(validationError);
        return;
    }

    // Perform Calculations
    const weightNum = parseFloat(weight);
    const repsNum = parseInt(reps);
    const oneRM = calculate1RM(weightNum, repsNum);
    const percentages = calculatePercentages(oneRM);

    // Display Results
    displayResults(oneRM, percentages);
});

// Allow Enter key to trigger calculation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        calculateBtn.click();
    }
});

// Coach Animation
document.addEventListener('DOMContentLoaded', () => {
    const coachContainer = document.getElementById('coachContainer');
    const coachMessage = document.getElementById('coachMessage');
    const paragraphs = coachMessage.querySelectorAll('p');

    // Animate container entrance
    setTimeout(() => {
        coachContainer.classList.add('visible');
    }, 200);

    // Animate paragraphs sequentially
    paragraphs.forEach((para, index) => {
        setTimeout(() => {
            para.classList.add('visible');
        }, 800 + (index * 300));
    });

    // Add subtle avatar animation
    const coachAvatar = document.getElementById('coachAvatar');
    setTimeout(() => {
        coachAvatar.style.transform = 'rotate(5deg)';
        setTimeout(() => {
            coachAvatar.style.transform = 'rotate(-5deg)';
            setTimeout(() => {
                coachAvatar.style.transform = 'rotate(0)';
            }, 200);
        }, 200);
    }, 1500);
});
