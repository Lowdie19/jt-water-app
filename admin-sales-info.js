document.addEventListener("DOMContentLoaded", () => {
  const bodyContent = document.getElementById("bodyContent");
  const calendarDays = document.getElementById("calendarDays");
  const monthSelect = document.getElementById("monthSelect");
  const yearSelect = document.getElementById("yearSelect");
  const calendarModal = document.getElementById("calendarModal");

  // --- Render initial calendar ---
  function renderCalendar() {
    const today = new Date();

    // months
    monthSelect.innerHTML = "";
    for (let m = 0; m < 12; m++) {
      const opt = document.createElement("option");
      opt.value = m;
      opt.text = new Date(0, m).toLocaleString("en-US", { month: "long" });
      monthSelect.appendChild(opt);
    }
    monthSelect.value = today.getMonth();

    // years
    yearSelect.innerHTML = "";
    for (let y = 2023; y <= 2026; y++) {
      const opt = document.createElement("option");
      opt.value = y;
      opt.text = y;
      yearSelect.appendChild(opt);
    }
    yearSelect.value = today.getFullYear();

    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);
    const numDays = new Date(year, month + 1, 0).getDate();

    calendarDays.innerHTML = "";
    for (let d = 1; d <= numDays; d++) {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = d;
      dayDiv.style.cursor = "pointer";
      dayDiv.style.padding = "8px";
      dayDiv.style.borderRadius = "50%";
      dayDiv.style.transition = "0.2s";
      dayDiv.addEventListener("mouseenter", () => (dayDiv.style.background = "#00d084"));
      dayDiv.addEventListener("mouseleave", () => (dayDiv.style.background = ""));
      calendarDays.appendChild(dayDiv);
    }
  }
  renderCalendar();

  // --- Random Orders Functions ---
  const customers = ["Camille", "Bea", "Kim", "Luis", "Anna", "Mark", "Judy", "Peter", "Sofia", "Gina"];
  const orderTypes = ["Cylindrical", "Rectangular"];
  const pricePerOrderType = { "Cylindrical": 30, "Rectangular": 30 };

  function generateRandomOrders() {
    const numOrders = Math.floor(Math.random() * 6) + 3;
    const orders = [];
    for (let i = 0; i < numOrders; i++) {
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const orderType = orderTypes[Math.floor(Math.random() * orderTypes.length)];
      const orderQty = Math.floor(Math.random() * 6) + 1;
      const total = orderQty * pricePerOrderType[orderType];
      orders.push({ customer, orderType, orderQty, total });
    }
    return orders;
  }

  // --- Render Orders ---
  function renderOrders(orders, selectedDate) {
    const formattedDate = selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    bodyContent.innerHTML = `
      <div style="background:white;border-radius:14px;box-shadow:0 3px 10px rgba(0,0,0,0.1);padding:32px 16px 16px 16px;margin-top:20px;position:relative;">
<div style="display:flex;justify-content:center;align-items:center;position:relative;transform:translateX(-25px);">
  <h2 style="color:#005f8c;margin-bottom:16px;text-align:center;">${formattedDate}</h2>
  <i class="fa-regular fa-calendar-days" onclick="openCalendar()" 
     style="position:absolute;right:8px;top:2px;font-size:22px;color:#00b070;cursor:pointer;"></i>
</div>
        <div id="orderBar" style="display:flex;justify-content:space-between;background:#00acc1;color:white;border-radius:10px;padding:10px;font-weight:bold;text-align:center;">
          <div style="flex:1;">Customer</div>
          <div style="flex:1;">Order</div>
          <div style="flex:1;">Total (₱)</div>
        </div>
        <div id="sampleOrders" style="margin-top:8px;display:flex;flex-direction:column;gap:6px;"></div>
        <div id="summaryRow" style="display:flex;flex-direction:column;gap:5px;background:#005f8c;color:white;border-radius:10px;padding:10px;font-weight:bold;text-align:center;margin:8px;">
          <div style="display:flex;justify-content:space-between;"><div>Total Sales</div><div id="totalSalesAmount">₱0</div></div>
          <div style="display:flex;justify-content:space-between;"><div>Total Items</div><div id="totalItemsAmount">0</div></div>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:12px;">
          <button id="saveReportBtn" style="background:#00b070;color:white;border:none;border-radius:20px;padding:6px 12px;cursor:pointer;font-weight:bold;">
            <i class="fa-solid fa-download"></i> Save As
          </button>
        </div>
      </div>
    `;

    const sampleOrdersContainer = document.getElementById("sampleOrders");
    let totalSales = 0, totalItems = 0;
    orders.forEach((order) => {
      sampleOrdersContainer.innerHTML += `
        <div style="display:flex;justify-content:space-between;background:#f1f1f1;border-radius:8px;padding:8px;">
          <div style="flex:1;text-align:center;">${order.customer}</div>
          <div style="flex:1;text-align:center;">${order.orderQty} ${order.orderType}</div>
          <div style="flex:1;text-align:center;color:black;font-weight:bold;">${order.total}</div>
        </div>
      `;
      totalSales += order.total;
      totalItems += order.orderQty;
    });

    document.getElementById("totalSalesAmount").textContent = `₱${totalSales}`;
    document.getElementById("totalItemsAmount").textContent = totalItems;

    // Save button functionality
    document.getElementById("saveReportBtn").addEventListener("click", () => {
      const card = document.getElementById("bodyContent");
      const clone = card.cloneNode(true);
      const saveBtn = clone.querySelector("#saveReportBtn");
      const calendarIcon = clone.querySelector(".fa-calendar-days");
      if (saveBtn) saveBtn.style.display = "none";
      if (calendarIcon) calendarIcon.style.display = "none";

      const logo = document.createElement("img");
      logo.src = "LOGO_JT.png";
      logo.style.width = "80px";
      logo.style.display = "block";
      logo.style.margin = "0 auto 10px auto";
      clone.prepend(logo);

      const tempDiv = document.createElement("div");
      tempDiv.style.position = "fixed";
      tempDiv.style.left = "-9999px";
      tempDiv.appendChild(clone);
      document.body.appendChild(tempDiv);

      html2canvas(clone, { scale: 2, useCORS: true }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "Sales_Report.jpg";
        link.href = canvas.toDataURL("image/jpeg", 1.0);
        link.click();
        document.body.removeChild(tempDiv);
      });
    });
  }

  // --- Show today's orders first ---
  const today = new Date();
  renderOrders(generateRandomOrders(), today);

  // --- Calendar Click ---
  calendarDays.addEventListener("click", (e) => {
    if (e.target.tagName === "DIV") {
      const day = parseInt(e.target.textContent);
      const month = parseInt(monthSelect.value);
      const year = parseInt(yearSelect.value);
      const selectedDate = new Date(year, month, day);
      renderOrders(generateRandomOrders(), selectedDate);
      calendarModal.style.display = "none";
    }
  });

  // --- Open / Close Calendar ---
  window.openCalendar = () => (calendarModal.style.display = "flex");
  window.closeCalendar = () => (calendarModal.style.display = "none");
});
