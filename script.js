// Make passage longer
const passageText = `Jamie’s first day at the transportation office started quietly. The waiting area was nearly empty except for a man reading last week’s newspaper and an older woman who seemed to be asleep. Jamie reviewed the morning checklist: verify vehicle logs, update the driver schedule, and flag overdue inspections. The tasks weren’t difficult, but the system interface was outdated and unintuitive.

By mid-morning, a delivery truck arrived unexpectedly. The driver explained there had been a routing mix-up — the shipment was scheduled for the central warehouse, not the city office. Jamie documented the error, made a quick call to the warehouse manager, and directed the truck back across town. It wasn’t in the training manual, but it got handled.`;

const fonts = ["Arial", "Times New Roman", "Comic Sans MS"];
const sizes = [12, 16, 20];

const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

document.getElementById("passage").textContent = passageText;
document.getElementById("passage").style.fontFamily = randomFont;
document.getElementById("passage").style.fontSize = randomSize + "pt";

document.getElementById("start-quiz").addEventListener("click", () => {
  document.getElementById("passage-section").style.display = "none";
  document.getElementById("quiz-section").style.display = "block";
});

document.getElementById("quiz-form").addEventListener("submit", function (e) {
  e.preventDefault();

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
    });
});
