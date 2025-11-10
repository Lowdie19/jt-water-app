// ============================================
// Admin Dashboard - Sales Chart (Enhanced)
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const chartContainer = document.querySelector(".chart-container");
  const title = chartContainer.querySelector("h2");
  const canvas = document.getElementById("salesChart");

  // --- Create button group beside title ---
  const btnContainer = document.createElement("div");
  btnContainer.style.display = "flex";
  btnContainer.style.gap = "8px";
  btnContainer.style.alignItems = "center";
  btnContainer.style.marginBottom = "10px";

  // Wrap the title and buttons together
  const headerWrapper = document.createElement("div");
  headerWrapper.style.display = "flex";
  headerWrapper.style.justifyContent = "space-between";
  headerWrapper.style.alignItems = "center";
  headerWrapper.style.marginBottom = "10px";
  headerWrapper.appendChild(title);
  headerWrapper.appendChild(btnContainer);
  chartContainer.insertBefore(headerWrapper, canvas);

  // --- Create buttons ---
  const timeFrames = ["Daily", "Monthly", "Yearly"];
  const buttons = {};

  timeFrames.forEach((frame) => {
    const btn = document.createElement("button");
    btn.textContent = frame;
    btn.style.border = "none";
    btn.style.borderRadius = "20px";
    btn.style.padding = "6px 14px";
    btn.style.cursor = "pointer";
    btn.style.fontWeight = "bold";
    btn.style.color = "white";
    btn.style.background = frame === "Monthly" ? "#00acc1" : "#ccc"; // Default: Monthly
    btn.style.transition = "0.2s";
    btn.addEventListener("mouseenter", () => (btn.style.opacity = "0.85"));
    btn.addEventListener("mouseleave", () => (btn.style.opacity = "1"));

    btn.addEventListener("click", () => {
      Object.values(buttons).forEach((b) => (b.style.background = "#ccc"));
      btn.style.background = "#00acc1";
      updateChart(frame.toLowerCase());
    });

    buttons[frame] = btn;
    btnContainer.appendChild(btn);
  });

  // --- Initialize chart ---
  const ctx = canvas.getContext("2d");
  const chart = new Chart(ctx, {
    type: "bar",
    data: getChartData("monthly"),
    options: getChartOptions(),
  });

  // --- Update chart function ---
  function updateChart(type) {
    const newData = getChartData(type);
    chart.data.labels = newData.labels;
    chart.data.datasets[0].data = newData.datasets[0].data;
    chart.data.datasets[0].label = newData.datasets[0].label;
    chart.update();
  }

  // --- Chart data sets ---
  function getChartData(type) {
    if (type === "daily") {
      return {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Daily Sales (₱)",
            data: [2500, 1800, 3200, 2900, 4100, 3700, 4600],
            backgroundColor: "#0097a7",
            borderRadius: 8,
          },
        ],
      };
    } else if (type === "monthly") {
      return {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Monthly Sales (₱)",
            data: [12000, 15000, 9000, 18000, 22000, 17000],
            backgroundColor: "#0097a7",
            borderRadius: 8,
          },
        ],
      };
    } else if (type === "yearly") {
      return {
        labels: ["2021", "2022", "2023", "2024", "2025"],
        datasets: [
          {
            label: "Yearly Sales (₱)",
            data: [95000, 110000, 125000, 145000, 170000],
            backgroundColor: "#0097a7",
            borderRadius: 8,
          },
        ],
      };
    }
  }

  // --- Chart options ---
  function getChartOptions() {
    return {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#0077b6",
            font: { size: 14 },
          },
        },
        x: {
          ticks: {
            color: "#0077b6",
            font: { size: 14 },
          },
        },
      },
      plugins: {
        legend: {
          labels: { color: "#0077b6" },
        },
      },
    };
  }
});

li.addEventListener("click", (e) => {
  e.stopPropagation();
  selectedEl.textContent = item;
  dropdown.style.display = "none";

  // Play click sound when selecting dropdown
  if (typeof playClick === "function") playClick();
});
