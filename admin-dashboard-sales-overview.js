// ============================================
// Admin Dashboard - Sales Overview Cards
// (Realistic numbers based on daily and weekly totals)
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  const chartContainer = document.querySelector(".chart-container");

  // --- Create overview container ---
  const overviewContainer = document.createElement("div");
  overviewContainer.classList.add("overview-container");
  overviewContainer.style.width = "90%";
  overviewContainer.style.maxWidth = "600px";
  overviewContainer.style.margin = "20px auto 40px auto"; // spacing above chart
  overviewContainer.style.display = "flex";
  overviewContainer.style.flexDirection = "column";
  overviewContainer.style.gap = "16px";

  // Insert overview container above the chart
  content.insertBefore(overviewContainer, chartContainer);

  // --- Sales data ---
  const salesData = {
    daily: {
      title: "Daily Sales",
      totals: { Monday: 2500, Tuesday: 1800, Wednesday: 3200, Thursday: 2900, Friday: 4100, Saturday: 3700, Sunday: 4600 },
      selected: "Friday",
    },
    weekly: {
      title: "Weekly Sales",
      totals: { "Week 1": 24500, "Week 2": 26300, "Week 3": 27100, "Week 4": 25400 },
      selected: "Week 4",
    },
    monthly: {
      title: "Monthly Sales",
      totals: { 
        January: 98000, February: 101000, March: 95000, April: 104000, May: 107000, June: 110000,
        July: 113000, August: 117000, September: 119000, October: 122000, November: 126000, December: 130000
      },
      selected: "June",
    }
  };

  Object.keys(salesData).forEach((key) => {
    const { title, totals, selected } = salesData[key];

    // --- Card wrapper ---
    const card = document.createElement("div");
    card.style.background = "#f9f9f9";
    card.style.borderRadius = "12px";
    card.style.padding = "16px";
    card.style.boxShadow = "0 1px 4px rgba(0,0,0,0.1)";
    card.style.textAlign = "center";

    // --- Card title ---
    const titleEl = document.createElement("h2");
    titleEl.textContent = title;
    titleEl.style.color = "#00acc1";
    titleEl.style.marginBottom = "8px";
    titleEl.style.marginBottom = "8px";
    titleEl.style.fontWeight = "bold";
    card.appendChild(titleEl);

    // --- Dropdown ---
    const dropdown = document.createElement("select");
    dropdown.style.width = "100%";
    dropdown.style.padding = "5px";
    dropdown.style.borderRadius = "10px";
    dropdown.style.marginBottom = "8px";
    dropdown.style.border = "1px solid #00acc1";
    dropdown.style.fontSize = "0.90em";
    dropdown.style.color = "#005f8c";
    dropdown.style.background = "#fff";
    dropdown.style.fontWeight = "600";
    dropdown.style.cursor = "pointer";
    dropdown.style.outline = "none";
    dropdown.style.textAlign = "center";

    Object.keys(totals).forEach((item) => {
      const opt = document.createElement("option");
      opt.value = item;
      opt.textContent = item;
      if (item === selected) opt.selected = true;
      dropdown.appendChild(opt);
    });
    card.appendChild(dropdown);

    // --- Value display ---
    const valueEl = document.createElement("div");
    valueEl.textContent = `₱${totals[selected].toLocaleString()}`;
    valueEl.style.fontSize = "2.2rem";
    valueEl.style.fontWeight = "bold";
    valueEl.style.color = "#00b070"; // updated color
    card.appendChild(valueEl);

    // --- Update value when dropdown changes ---
    dropdown.addEventListener("change", () => {
      valueEl.textContent = `₱${totals[dropdown.value].toLocaleString()}`;
      if (typeof playClick === "function") playClick();
    });

    // --- Append card ---
    overviewContainer.appendChild(card);
  });

  // --- Optional: Update existing custom dropdowns if present ---
  document.querySelectorAll(".custom-dropdown").forEach((dropdown) => {
    const selectedEl = dropdown.querySelector(".selected");
    const dropdownList = dropdown.querySelector(".dropdown");

    // Toggle dropdown
    selectedEl.addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = dropdownList.style.display === "block";
      document.querySelectorAll(".dropdown").forEach((d) => (d.style.display = "none"));
      dropdownList.style.display = isVisible ? "none" : "block";
    });

    // Dropdown item click
    dropdown.querySelectorAll(".dropdown li").forEach((li) => {
      li.addEventListener("click", (e) => {
        e.stopPropagation();
        selectedEl.textContent = li.textContent;
        dropdownList.style.display = "none";
        if (typeof playClick === "function") playClick();
      });
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown").forEach((d) => (d.style.display = "none"));
  });
});
