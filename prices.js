// ============================
// 🔵 STATIC PROGRESS BAR (all steps ≤ currentStep fully active)
// ============================

document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".progress-bar .step");
  const fillLine = document.querySelector(".fill-line");

  // 🧩 CHANGE THIS VALUE ONLY
  let currentStep = 3; // 👈 0-based or 1-based? → this is 1-based (1 = first step)

  // Safety checks
  if (!steps.length || !fillLine) {
    console.warn("⚠️ Missing .progress-bar or .fill-line elements");
    return;
  }

  // Convert to zero-based index
  const stepIndex = Math.max(0, Math.min(currentStep - 1, steps.length - 1));

  // Calculate percentage for the fill line
  const progressPercent = (stepIndex / (steps.length - 1)) * 100;
  fillLine.style.width = `${progressPercent}%`;

  // Mark all previous + current steps as active
  steps.forEach((step, i) => {
    step.classList.remove("active", "completed");

    if (i <= stepIndex) {
      step.classList.add("active", "completed");
    }
  });
});
