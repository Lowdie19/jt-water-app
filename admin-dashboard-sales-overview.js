// ============================================
// Admin Dashboard - Sales Overview Cards (Dropdown Below Title)
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const chartContainer = document.querySelector(".chart-container");

  // Create wrapper that matches chart style
  const overviewContainer = document.createElement("div");
  overviewContainer.classList.add("overview-container");
  overviewContainer.style.width = "90%";
  overviewContainer.style.maxWidth = "600px";
  overviewContainer.style.background = "white";
  overviewContainer.style.margin = "20px auto";
  overviewContainer.style.padding = "20px";
  overviewContainer.style.borderRadius = "15px";
  overviewContainer.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  overviewContainer.style.display = "flex";
  overviewContainer.style.flexDirection = "column";
  overviewContainer.style.alignItems = "center";
  overviewContainer.style.gap = "16px";

  chartContainer.parentNode.insertBefore(overviewContainer, chartContainer);

  // Sales data with believable totals
  const salesData = {
    monthly: {
      title: "Monthly Sales",
      totals: {
        "January": 78000,
        "February": 83000,
        "March": 91000,
        "April": 87000,
        "May": 94000,
        "June": 87000,
        "July": 88000,
        "August": 92000,
        "September": 86000,
        "October": 90000,
        "November": 95000,
        "December": 99000
      },
      selected: "June",
    },
    weekly: {
      title: "Weekly Sales",
      totals: {
        "1st Week": 21000,
        "2nd Week": 24000,
        "3rd Week": 19500,
        "4th Week": 23000
      },
      selected: "4th Week",
    },
    daily: {
      title: "Daily Sales",
      totals: {
        "Monday": 3200,
        "Tuesday": 3400,
        "Wednesday": 3100,
        "Thursday": 3300,
        "Friday": 3600,
        "Saturday": 4100,
        "Sunday": 3800
      },
      selected: "Friday",
    },
  };

  // Create cards
  Object.keys(salesData).forEach((key) => {
    const { title, totals, selected } = salesData[key];

    const card = document.createElement("div");
    card.classList.add("sales-card");
    card.style.background = "#f9f9f9";
    card.style.borderRadius = "12px";
    card.style.padding = "16px";
    card.style.width = "100%";
    card.style.textAlign = "center";
    card.style.boxShadow = "0 1px 4px rgba(0,0,0,0.1)";
    card.style.transition = "transform 0.2s, box-shadow 0.2s";
    card.style.cursor = "pointer";

    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-2px)";
      card.style.boxShadow = "0 3px 8px rgba(0,0,0,0.15)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 1px 4px rgba(0,0,0,0.1)";
    });

    // --- Title ---
    const titleEl = document.createElement("h3");
    titleEl.textContent = title;
    titleEl.style.color = "#0077b6";
    titleEl.style.marginBottom = "8px";
    titleEl.style.fontSize = "1rem";
    titleEl.style.fontWeight = "bold";
    titleEl.style.textAlign = "center";

    // --- Dropdown ---
    const dropdown = document.createElement("select");
    dropdown.style.width = "70%";
    dropdown.style.padding = "8px";
    dropdown.style.borderRadius = "20px";
    dropdown.style.marginBottom = "8px";
    dropdown.style.border = "2px solid #b2ebf2";
    dropdown.style.fontSize = "0.95rem";
    dropdown.style.color = "#007c91";
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

    // --- Total ---
    const valueEl = document.createElement("div");
    valueEl.textContent = `₱${totals[selected].toLocaleString()}`;
    valueEl.style.fontSize = "1.8rem";
    valueEl.style.fontWeight = "bold";
    valueEl.style.color = "#0097a7";
    valueEl.style.textAlign = "center";

    // --- Event: change only this card's total ---
    dropdown.addEventListener("change", () => {
      valueEl.textContent = `₱${totals[dropdown.value].toLocaleString()}`;
    });

    // Assemble card
    card.appendChild(titleEl);
    card.appendChild(dropdown);
    card.appendChild(valueEl);
    overviewContainer.appendChild(card);
  });
});

li.addEventListener("click", (e) => {
  e.stopPropagation();
  selectedEl.textContent = item;
  dropdown.style.display = "none";

  // Play click sound
  if (typeof playClick === "function") playClick();
});
