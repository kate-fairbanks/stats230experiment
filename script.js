const passageText = `The old oak tree stood tall in the park, its branches reaching like welcoming arms. Squirrels darted up and down its rough bark, burying acorns for the winter. Birds nested in its highest boughs, their songs echoing through the morning air. Children often played beneath its shade, giggling as they chased each other around its wide trunk. The oak tree was a quiet guardian, watching the seasons change and life unfold beneath its leaves.`;

// Only Times New Roman or Pacifico, and only 12 or 20 pt
// Verdana
const fonts = ["Verdana", "Pacifico", "Parchment"]; // Pacifico is the cursive font you've imported
const sizes = [12, 20];

const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

console.log(`Chosen Font: ${randomFont}, Chosen Size: ${randomSize}pt`);

let passageTimerInterval;
let quizTimerInterval;
const passageTimeLimit = 30; // seconds
const quizTimeLimit = 60; // seconds

document.getElementById("begin-reading").addEventListener("click", () => {
    document.getElementById("welcome-section").style.display = "none";
    document.getElementById("passage-section").style.display = "block";
    document.getElementById("passage").textContent = passageText;
    document.getElementById(
        "passage"
    ).style.fontFamily = `'${randomFont}', cursive`; // Use randomFont, with cursive as a fallback
    document.getElementById("passage").style.fontSize = randomSize + "pt";

    // Start passage timer
    let timeLeft = passageTimeLimit;
    document.getElementById("passage-timer").textContent = `Time left to read: ${timeLeft} seconds`;
    passageTimerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("passage-timer").textContent = `Time left to read: ${timeLeft} seconds`;
        if (timeLeft <= 0) {
            clearInterval(passageTimerInterval);
            document.getElementById("start-quiz").click(); // Automatically move to quiz
        }
    }, 1000);
});

document.getElementById("start-quiz").addEventListener("click", () => {
    clearInterval(passageTimerInterval); // Stop passage timer if user clicks early
    document.getElementById("passage-section").style.display = "none";
    document.getElementById("quiz-section").style.display = "block";

    // Start quiz timer
    let timeLeft = quizTimeLimit;
    document.getElementById("quiz-timer").textContent = `Time left to answer: ${timeLeft} seconds`;
    quizTimerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("quiz-timer").textContent = `Time left to answer: ${timeLeft} seconds`;
        if (timeLeft <= 0) {
            clearInterval(quizTimerInterval);
            // In case of auto-submit, disable the button here too
            document.querySelector('#quiz-form button[type="submit"]').disabled = true;
            document.getElementById("quiz-form").submit(); // Automatically submit quiz
        }
    }, 1000);
});

document.getElementById("quiz-form").addEventListener("submit", function (e) {
    e.preventDefault();
    clearInterval(quizTimerInterval); // Stop quiz timer on manual submission

    // Disable the submit button immediately to prevent double clicks
    const submitButton = this.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...'; // Optional: provide visual feedback
    }

    const data = {
        font: randomFont,
        size: randomSize,
        q1: document.querySelector('input[name="q1"]:checked')?.value || "",
        q2: document.querySelector('input[name="q2"]:checked')?.value || "",
        q3: document.querySelector('input[name="q3"]:checked')?.value || "",
        q4: document.querySelector('input[name="q4"]:checked')?.value || "",
        q5: document.querySelector('input[name="q5"]:checked')?.value || "",
    };

    fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    })
    .then(() => {
        document.getElementById("quiz-section").innerHTML =
            "<h3>Thank you for participating!</h3>";
    })
    .catch((error) => {
        document.getElementById("quiz-section").innerHTML =
            "<h3>There was an error submitting your quiz. Please try again later.</h3>";
        console.error("Submission error:", error);
        // Re-enable button if submission failed (optional, depends on desired UX)
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        }
    });
});