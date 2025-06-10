const passageText = `Jamie’s first day at the city’s transportation office started without much activity. The waiting area was mostly empty, and the morning checklist included reviewing vehicle logs, updating the driver schedule, and checking for overdue inspections. The process was straightforward, but the software used for scheduling was noticeably outdated and required extra patience.

Midway through the morning, a delivery truck arrived at the wrong building. The shipment was intended for the central warehouse, not the administrative office. Jamie took down the information, called the warehouse to coordinate, and gave the driver directions to the correct site. It wasn’t complicated, but it required quick communication and attention to detail.

In the afternoon, Jamie worked alongside Maria, a dispatcher who had been with the department for over a decade. She explained how to work around common issues in the system and offered insight into how the team typically handled delays or missed check-ins. Jamie appreciated the practical advice more than anything in the training manual.

Throughout the day, Jamie noticed that while the office had its inefficiencies, the staff had developed systems that kept things running. Calls came in waves, drivers returned on a loose schedule, and regular visitors often required the same services. It became clear that experience, not process design, kept the office functioning smoothly.

By the end of the shift, Jamie had handled a few minor issues, taken plenty of notes, and started to recognize some of the informal routines. It hadn’t been an overwhelming day, but it was clear that learning the job would take time and consistent effort.`;

// Only Times New Roman or Comic Sans, and only 12 or 20 pt
const fonts = ["Times New Roman", "Comic Sans MS"];
const sizes = [12, 20];

const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

document.getElementById("begin-reading").addEventListener("click", () => {
  document.getElementById("welcome-section").style.display = "none";
  document.getElementById("passage-section").style.display = "block";
  document.getElementById("passage").textContent = passageText;
  document.getElementById("passage").style.fontFamily = randomFont;
  document.getElementById("passage").style.fontSize = randomSize + "pt";
});

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
