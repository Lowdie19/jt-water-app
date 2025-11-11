// admin-sales-receipt.js

// Example Sales Data
const salesData = [
  {
    orderId: "ORD101",
    customer: "Camille Tolentino",
    date: "2025-01-01",
    type: "DELIVERY",
    items: [
      { name: "Rectangular Container", qty: 3 },
      { name: "Cylindrical Gallon", qty: 1 }
    ],
    total: 180
  },
  {
    orderId: "ORD102",
    customer: "Bea Arcega",
    date: "2025-01-02",
    type: "PICKUP",
    items: [
      { name: "Cylindrical Gallon", qty: 2 }
    ],
    total: 60
  },
  {
    orderId: "ORD103",
    customer: "Kim Liwanag",
    date: "2025-02-05",
    type: "DELIVERY",
    items: [
      { name: "Rectangular Container", qty: 2 }
    ],
    total: 120
  }
];

// Format Date to "Month Year"
function formatMonth(dateStr) {
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const d = new Date(dateStr);
  return `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
}

// Populate Sales Receipts
function populateSales() {
  const container = document.getElementById("bodyContent");
  container.innerHTML = "";
  
  const monthMap = {}; // Track month dividers

  salesData.forEach(sale => {
    const monthLabel = formatMonth(sale.date);
    if (!monthMap[monthLabel]) {
      const divider = document.createElement("div");
      divider.className = "month-divider";
      divider.textContent = monthLabel;
      container.appendChild(divider);
      monthMap[monthLabel] = true;
    }

    const card = document.createElement("div");
    card.className = "history-card";
    card.dataset.date = sale.date;

    const itemsText = sale.items.map(i => `${i.qty} ${i.name}`).join(", ");

    card.innerHTML = `
      <div class="history-info">
        <span class="order-id" style="font-size:0.85em; font-weight:bold; color:#ccc;">${sale.orderId}</span><br><br>
        <b>Name:</b> ${sale.customer}<br>
        <b>Items:</b> ${itemsText}<br>
        <button class="details-btn" style="margin-top:6px; padding:4px 10px; border:none; border-radius:12px; background:#00acc1; color:white; cursor:pointer;">See Details</button>
        <br><b>Total:</b> ₱${sale.total}
      </div>
    `;
    container.appendChild(card);
  });

  computeTotals();
}

// Compute TOTAL SALES and SOLD PRODUCTS
function computeTotals() {
  const totalSales = salesData.reduce((acc, s) => acc + s.total, 0);
  const totalProducts = salesData.reduce((acc, s) => {
    return acc + s.items.reduce((a, i) => a + i.qty, 0);
  }, 0);

  let summaryDiv = document.getElementById("salesSummary");
  if (!summaryDiv) {
    summaryDiv = document.createElement("div");
    summaryDiv.id = "salesSummary";
    summaryDiv.style.marginTop = "20px";
    summaryDiv.style.fontWeight = "bold";
    summaryDiv.style.fontSize = "16px";
    document.getElementById("bodyContent").appendChild(summaryDiv);
  }

  summaryDiv.innerHTML = `
    TOTAL SALES: <b>₱${totalSales}</b> <br>
    SOLD PRODUCTS: <b>${totalProducts}</b>
  `;

  createSaveButton();
}

// Save As Button (PNG/JPG)
function createSaveButton() {
  let saveBtnDiv = document.getElementById("saveBtnDiv");
  if (!saveBtnDiv) {
    saveBtnDiv = document.createElement("div");
    saveBtnDiv.id = "saveBtnDiv";
    saveBtnDiv.style.marginTop = "12px";
    document.getElementById("bodyContent").appendChild(saveBtnDiv);
  }
  saveBtnDiv.innerHTML = `
    <button onclick="saveAs('png')"
      style="padding:6px 12px; border-radius:20px; background:#00acc1; color:white; border:none; cursor:pointer; margin-right:8px;">
      Save as PNG
    </button>
    <button onclick="saveAs('jpg')"
      style="padding:6px 12px; border-radius:20px; background:#00acc1; color:white; border:none; cursor:pointer;">
      Save as JPG
    </button>
  `;
}

// Dummy Save Function (to implement later with html2canvas or similar)
function saveAs(type) {
  alert(`Sales receipt would be saved as ${type.toUpperCase()}!`);
}

// Search Filter (Name or Date)
function filterSales(query) {
  query = query.trim().toLowerCase();
  const cards = document.querySelectorAll(".history-card");
  const monthDivs = document.querySelectorAll(".month-divider");

  cards.forEach(card => {
    const info = card.querySelector(".history-info").innerText.toLowerCase();
    const dateStr = card.dataset.date;
    const match = info.includes(query) || dateStr.includes(query);
    card.style.display = match ? "" : "none";
  });

  // Show only month dividers with visible cards
  monthDivs.forEach(div => {
    const nextCard = div.nextElementSibling;
    if (nextCard && nextCard.style.display !== "none") div.style.display = "";
    else div.style.display = "none";
  });
}

// Initialize
window.addEventListener("DOMContentLoaded", () => {
  populateSales();

  // Search input listener
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keyup", () => filterSales(searchInput.value));
  }
});
