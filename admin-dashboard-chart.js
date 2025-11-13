// ============================================
// Admin Dashboard - Sales Cards & Chart
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------
  // Sales Cards
  // ------------------------
  const cards = document.querySelectorAll(".sales-card");

  const dailyValues = [2500, 1800, 3200, 2900, 4100, 3700, 4600];
  const weeklyValues = [25600, 26800, 27400, 26100, 28900, 29700, 28300, 31000];
  const monthlyValues = [98000,101000,95000,104000,107000,110000,113000,117000,119000,122000,126000,130000];

  cards.forEach(card => {
    const title = card.querySelector("h3").textContent.trim();
    const valueEl = card.querySelector(".sales-value");
    const options = card.querySelectorAll(".dropdown li");

    valueEl.style.color = "#00b070";

    // ------------------------
    // Show first value on load
    // ------------------------
    if (title.includes("Daily")) valueEl.textContent = `₱${dailyValues[0].toLocaleString()}`;
    else if (title.includes("Weekly")) valueEl.textContent = `₱${weeklyValues[0].toLocaleString()}`;
    else if (title.includes("Monthly")) valueEl.textContent = `₱${monthlyValues[0].toLocaleString()}`;

    options.forEach((li, i) => {
      li.addEventListener("click", () => {
        let value = 0;
        if (title.includes("Daily")) value = dailyValues[i];
        else if (title.includes("Weekly")) value = weeklyValues[i];
        else if (title.includes("Monthly")) value = monthlyValues[i];

        valueEl.textContent = `₱${value.toLocaleString()}`;
        if (typeof playClick === "function") playClick();
      });
    });
  });

  // ------------------------
  // Sales Chart
  // ------------------------
  const chartContainer = document.querySelector(".chart-container");
  const title = chartContainer.querySelector("h2");
  const canvas = document.getElementById("salesChart");

  chartContainer.style.position = "relative";
  chartContainer.style.paddingBottom = "40px";
chartContainer.style.overflow = "hidden";
chartContainer.style.boxSizing = "border-box";
chartContainer.style.padding = "20px";

  // Header + buttons wrapper
  const btnContainer = document.createElement("div");
  btnContainer.style.display = "flex";
  btnContainer.style.gap = "8px";
  btnContainer.style.alignItems = "center";
btnContainer.style.flexWrap = "wrap";
btnContainer.style.justifyContent = "flex-end";
btnContainer.style.maxWidth = "90%";
btnContainer.style.overflow = "hidden";

  const headerWrapper = document.createElement("div");
  headerWrapper.style.display = "flex";
  headerWrapper.style.justifyContent = "space-between";
  headerWrapper.style.alignItems = "center";
  headerWrapper.style.marginBottom = "20px";
  headerWrapper.appendChild(title);
  headerWrapper.appendChild(btnContainer);
  chartContainer.insertBefore(headerWrapper, canvas);

  // Time frame buttons
  const timeFrames = ["Daily", "Monthly", "Yearly"];
  const buttons = {};
  timeFrames.forEach((frame) => {
    const btn = document.createElement("button");
    btn.textContent = frame;
    styleButton(btn, frame === "Monthly");
    btn.addEventListener("click", () => {
      Object.values(buttons).forEach(b => styleButton(b, false));
      styleButton(btn, true);
      updateChart(frame.toLowerCase());
      if (typeof playClick === "function") playClick();
    });
    buttons[frame] = btn;
    btnContainer.appendChild(btn);
  });

  // Next button
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "›";
  nextBtn.style.position = "absolute";
  nextBtn.style.right = "15px";
  nextBtn.style.bottom = "15px"; // inside chart card
  nextBtn.style.zIndex = "2"; // above chart, not blocking
  nextBtn.style.border = "none";
  nextBtn.style.borderRadius = "50%";
  nextBtn.style.padding = "8px 14px";
  nextBtn.style.fontSize = "1.3rem";
  nextBtn.style.cursor = "pointer";
  nextBtn.style.color = "white";
  nextBtn.style.background = "#00acc1";
  nextBtn.style.fontWeight = "bold";
  nextBtn.style.display = "block";
  nextBtn.style.transition = "0.2s ease";
  nextBtn.style.filter = "drop-shadow(0 2px 4px rgba(0,0,0,0.2))";
  nextBtn.style.pointerEvents = "auto";

  // ensure the container allows absolutely positioned elements
  chartContainer.style.position = "relative";
  chartContainer.style.paddingBottom = "70px"; // space for button

  let showingSecondHalf = false;

  nextBtn.addEventListener("click", () => {
    showingSecondHalf = !showingSecondHalf;
    updateChart("monthly");
    nextBtn.textContent = showingSecondHalf ? "‹" : "›";
    if (typeof playClick === "function") playClick();
  });

  chartContainer.appendChild(nextBtn);

  // Chart.js setup
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
    if (type === "monthly") nextBtn.textContent = showingSecondHalf ? "‹" : "›";
  }

  function getChartData(type) {
    if (type === "daily") {
      return {
        labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
        datasets: [{
          label: "Daily Sales (₱)",
          data: dailyValues,
          backgroundColor: "#00b070",
          borderRadius: 8
        }]
      };
    } else if (type === "monthly") {
      const months = showingSecondHalf ? ["Jul","Aug","Sep","Oct","Nov","Dec"] : ["Jan","Feb","Mar","Apr","May","Jun"];
      const values = showingSecondHalf ? monthlyValues.slice(6,12) : monthlyValues.slice(0,6);
      return {
        labels: months,
        datasets: [{
          label: "Monthly Sales (₱)",
          data: values,
          backgroundColor: "#00b070",
          borderRadius: 8
        }]
      };
    } else if (type === "yearly") {
      const yearly = [95000, 110000, 125000, 145000, 170000];
      return {
        labels: ["2021","2022","2023","2024","2025"],
        datasets: [{
          label: "Yearly Sales (₱)",
          data: yearly,
          backgroundColor: "#00b070",
          borderRadius: 8
        }]
      };
    }
  }

  function getChartOptions() {
    return {
      responsive: true,
      scales: {
        y: { beginAtZero: true, ticks: { color: "#005f8c", font: { size: 14 } } },
        x: { ticks: { color: "#005f8c", font: { size: 14 } } },
      },
      plugins: { legend: { labels: { color: "#005f8c" } } },
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

  // Initialize chart to show Monthly first
  updateChart("monthly");
});
