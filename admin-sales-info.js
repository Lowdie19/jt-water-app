document.addEventListener("DOMContentLoaded", () => {
  const bodyContent = document.getElementById("bodyContent");

  // Get today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  bodyContent.innerHTML = `
    <div style="background:white; border-radius:14px; box-shadow:0 3px 10px rgba(0,0,0,0.1); padding:32px 16px 16px 16px; margin-top:20px;">
      <h2 style="color:#005f8c; margin-bottom:10px; text-align:center;">${formattedDate}</h2>

      <!-- Customer / Order / Total Bar -->
      <div id="orderBar" style="display:flex; justify-content:space-between; background:#00acc1; color:white; border-radius:10px; padding:10px; font-weight:bold; text-align:center;">
        <div style="flex:1;">Customer</div>
        <div style="flex:1;">Order</div>
        <div style="flex:1;">Total (₱)</div>
      </div>

      <!-- Sample Orders -->
      <div id="sampleOrders" style="margin-top:8px; display:flex; flex-direction:column; gap:6px;"></div>

      <!-- Summary Row -->
      <div id="summaryRow" style="display:flex; flex-direction:column; gap:5px; background:#005f8c; color:white; border-radius:10px; padding:10px; font-weight:bold; text-align:center; margin:8px;">
        <div style="display:flex; justify-content:space-between;">
          <div>Total Sales</div>
          <div id="totalSalesAmount">₱0</div>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <div>Total Items</div>
          <div id="totalItemsAmount">0</div>
        </div>
      </div>

      <!-- Save Button -->
      <div style="display:flex; justify-content:flex-end; margin-top:12px;">
        <button id="saveReportBtn" style="background:#00b070; color:white; border:none; border-radius:20px; padding:6px 12px; cursor:pointer; font-weight:bold;">
          <i class="fa-solid fa-download"></i> Save As
        </button>
      </div>
    </div>
  `;

  const sampleOrdersData = [
    { customer: "Camille", orderQty: 3, orderType: "Cylindrical", total: 90 },
    { customer: "Bea", orderQty: 5, orderType: "Rectangular", total: 150 },
    { customer: "Kim", orderQty: 2, orderType: "Cylindrical", total: 60 },
    { customer: "Luis", orderQty: 4, orderType: "Cylindrical", total: 120 },
    { customer: "Anna", orderQty: 6, orderType: "Rectangular", total: 180 },
    { customer: "Mark", orderQty: 3, orderType: "Cylindrical", total: 90 },
    { customer: "Judy", orderQty: 2, orderType: "Rectangular", total: 60 },
    { customer: "Peter", orderQty: 5, orderType: "Cylindrical", total: 150 },
    { customer: "Sofia", orderQty: 4, orderType: "Rectangular", total: 120 },
    { customer: "Gina", orderQty: 3, orderType: "Cylindrical", total: 90 }
  ];

  const sampleOrdersContainer = document.getElementById("sampleOrders");

  let totalSales = 0;
  let totalItems = 0;

  sampleOrdersData.forEach((order) => {
    sampleOrdersContainer.innerHTML += `
      <div style="display:flex; justify-content:space-between; background:#f1f1f1; border-radius:8px; padding:8px;">
        <div style="flex:1; text-align:center;">${order.customer}</div>
        <div style="flex:1; text-align:center;">${order.orderQty} ${order.orderType}</div>
        <div style="flex:1; text-align:center; color: black; font-weight:bold;">${order.total}</div>
      </div>
    `;
    totalSales += order.total;
    totalItems += order.orderQty;
  });

  // Update summary row
  document.getElementById("totalSalesAmount").textContent = `₱${totalSales}`;
  document.getElementById("totalItemsAmount").textContent = totalItems;

  // Save button functionality
  document.getElementById("saveReportBtn").addEventListener("click", () => {
    const card = document.getElementById("bodyContent");

    // Clone and prepare for export
    const clone = card.cloneNode(true);
    const saveBtn = clone.querySelector("#saveReportBtn");
    if(saveBtn) saveBtn.style.display = "none";

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
});
