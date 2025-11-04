// ============================
// 🔵 PROGRESS BAR + FORM HANDLING (no Next button, steps 1+2 active)
// ============================

function loadStep1() {
  try {
    return JSON.parse(sessionStorage.getItem("step1") || "{}");
  } catch {
    return {};
  }
}


document.addEventListener("DOMContentLoaded", () => {

  // Progress bar setup
  const steps = document.querySelectorAll(".progress-bar .step");
  const line = document.querySelector(".base-line");
  const fillLine = document.querySelector(".fill-line");

  // Form fields
  const purposeGroup = document.querySelectorAll(".purpose-group .seg-btn");
  const regGroup = document.querySelectorAll(".reg-group .seg-btn");
  const identityInput = document.getElementById("identity-number");
  const serialInput = document.getElementById("serial-number");

  // Safety check
  if (!steps.length || !line) {
    console.warn("⚠️ Progress bar elements not found. Check your selectors.");
    return;
  }

  // ✅ Load and render summary right here
  const s1 = loadStep1();
  renderSummary(s1);

  if (!s1 || Object.keys(s1).length === 0) {
  // No data at all
  document.getElementById("guard").classList.remove("hidden");
  return; // Stop everything else
} else {
  document.getElementById("guard").classList.add("hidden");
  renderSummary(s1);
}

  // -------------------------
  // Helper functions
  // -------------------------
  function setActive(groupBtns, clicked) {
    groupBtns.forEach((b) => b.classList.remove("seg-active"));
    clicked.classList.add("seg-active");
  }

  // (validation etc. same as before…)

  // -------------------------
  // Progress Bar
  // -------------------------
  let currentStep = 1;

  function updateProgressBar() {
    const progressPercent = (currentStep / (steps.length - 1)) * 100;
    line.style.setProperty("--progress-width", `${progressPercent}%`);
    if (fillLine) fillLine.style.width = `${progressPercent}%`;

    steps.forEach((s, i) => {
      s.classList.remove("active", "completed");
      if (i <= currentStep) s.classList.add("active");
      if (i < currentStep) s.classList.add("completed");
    });
  }

  steps.forEach((step, index) => {
    step.addEventListener("click", () => {
      currentStep = index;
      updateProgressBar();
    });
  });

  // -------------------------
  // Segmented Buttons Logic
  // -------------------------
  purposeGroup.forEach((btn) => {
    btn.addEventListener("click", () => setActive(purposeGroup, btn));
  });

  regGroup.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActive(regGroup, btn);
      if (serialInput) {
        serialInput.disabled = false;
        serialInput.placeholder =
          btn.dataset.value === "serial" ? "الرقم التسلسلي" : "رقم البطاقة الجمركية";
      }
    });
  });

  // Initialize
  updateProgressBar();
});
