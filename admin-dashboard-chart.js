// ============================================
// Admin Dashboard - Sales Chart (Next Button with Toggle Arrow)
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const chartContainer = document.querySelector(".chart-container");
  const title = chartContainer.querySelector("h2");
  const canvas = document.getElementById("salesChart");

  chartContainer.style.position = "relative";
  chartContainer.style.paddingBottom = "40px"; // extra space at bottom

  // --- Wrap title + time frame buttons ---
  const btnContainer = document.createElement("div");
  btnContainer.style.display = "flex";
  btnContainer.style.gap = "8px";
  btnContainer.style.alignItems = "center";

  const headerWrapper = document.createElement("div");
  headerWrapper.style.display = "flex";
  headerWrapper.style.justifyContent = "space-between";
  headerWrapper.style.alignItems = "center";
  headerWrapper.style.marginBottom = "10px";
  headerWrapper.appendChild(title);
  headerWrapper.appendChild(btnContainer);
  chartContainer.insertBefore(headerWrapper, canvas);

  // --- Time frame buttons ---
  const timeFrames = ["Daily", "Monthly", "Yearly"];
  const buttons = {};
  timeFrames.forEach((frame) => {
    const btn = document.createElement("button");
    btn.textContent = frame;
    styleButton(btn, frame === "Monthly");
    btn.addEventListener("click", () => {
      Object.values(buttons).forEach((b) => styleButton(b, false));
      styleButton(btn, true);
      updateChart(frame.toLowerCase());
      if (typeof playClick === "function") playClick();
    });
    buttons[frame] = btn;
    btnContainer.appendChild(btn);
  });

  // --- Next button ---
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "›"; // start with >
  nextBtn.style.border = "none";
  nextBtn.style.borderRadius = "50%";
  nextBtn.style.padding = "6px 12px";
  nextBtn.style.fontSize = "1.2rem";
  nextBtn.style.cursor = "pointer";
  nextBtn.style.color = "white";
  nextBtn.style.background = "#00acc1";
  nextBtn.style.fontWeight = "bold";
  nextBtn.style.display = "block"; 
  nextBtn.style.transition = "0.2s";
  nextBtn.style.position = "absolute";
  nextBtn.style.bottom = "10px";
  nextBtn.style.right = "16px";
  nextBtn.style.zIndex = "10";

  let showingSecondHalf = false;

  nextBtn.addEventListener("click", () => {
    showingSecondHalf = !showingSecondHalf;
    updateChart("monthly");
    // Toggle arrow
    nextBtn.textContent = showingSecondHalf ? "‹" : "›";
    if (typeof playClick === "function") playClick();
  });

  chartContainer.appendChild(nextBtn);

  // --- Chart setup ---
  const ctx = canvas.getContext("2d");
  const chart = new Chart(ctx, {
    type: "bar",
    data: getChartData("monthly"),
    options: getChartOptions(),
  });

  function updateChart(type) {
    const newData = getChartData(type);
    chart.data.labels = newData.labels;
    chart.data.datasets[0].data = newData.datasets[0].data;
    chart.data.datasets[0].label = newData.datasets[0].label;
    chart.update();
    nextBtn.style.display = type === "monthly" ? "block" : "none";
    // Reset arrow when switching to monthly
    if (type === "monthly") nextBtn.textContent = showingSecondHalf ? "‹" : "›";
  }

  function getChartData(type) {
    if (type === "daily") {
      return {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{ label: "Daily Sales (₱)", data: [2500, 1800, 3200, 2900, 4100, 3700, 4600], backgroundColor: "#0097a7", borderRadius: 8 }],
      };
    } else if (type === "monthly") {
      const months = showingSecondHalf ? ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      const values = showingSecondHalf ? [19500, 22500, 21000, 24000, 25000, 28000] : [12000, 15000, 9000, 18000, 22000, 17000];
      return {
        labels: months,
        datasets: [{ label: "Monthly Sales (₱)", data: values, backgroundColor: "#0097a7", borderRadius: 8 }],
      };
    } else if (type === "yearly") {
      return {
        labels: ["2021", "2022", "2023", "2024", "2025"],
        datasets: [{ label: "Yearly Sales (₱)", data: [95000, 110000, 125000, 145000, 170000], backgroundColor: "#0097a7", borderRadius: 8 }],
      };
    }
  }

  function getChartOptions() {
    return {
      responsive: true,
      scales: {
        y: { beginAtZero: true, ticks: { color: "#0077b6", font: { size: 14 } } },
        x: { ticks: { color: "#0077b6", font: { size: 14 } } },
      },
      plugins: { legend: { labels: { color: "#0077b6" } } },
    };
  }

  function styleButton(btn, active) {
    btn.style.border = "none";
    btn.style.borderRadius = "20px";
    btn.style.padding = "6px 14px";
    btn.style.cursor = "pointer";
    btn.style.fontWeight = "bold";
    btn.style.color = "white";
    btn.style.background = active ? "#00acc1" : "#ccc";
  }
});
li.addEventListener("click", (e) => {
  e.stopPropagation();
  selectedEl.textContent = item;
  dropdown.style.display = "none";

  // Play click sound
  if (typeof playClick === "function") playClick();
});
