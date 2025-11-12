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
  const weekday = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
  const monthDayYear = selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  bodyContent.innerHTML = `
    <div style="background:white;border-radius:14px;box-shadow:0 3px 10px rgba(0,0,0,0.1);padding:32px 16px 16px 16px;margin-top:20px;position:relative;">
      <div style="display:flex;align-items:center;gap:15px;margin-bottom:16px;flex-wrap:wrap;">
        <div style="margin-left:30px;display:flex;flex-direction:column;gap:2px;flex:1 1 auto;min-width:0;word-break:break-word;">
          <span style="color:#005f8c;font-weight:bold;">${weekday}</span>
          <span style="color:#005f8c;font-size:1.5rem;font-weight:bold;">${monthDayYear}</span>
        </div>
        <i class="fa-regular fa-calendar-days" onclick="openCalendar()" 
           style="margin-right:30px;font-size:25px;color:#00d084;cursor:pointer;flex:0 0 auto;"></i>
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
        <button id="saveReportBtn" style="background:#00d084;color:white;border:none;border-radius:20px;padding:6px 12px;cursor:pointer;font-weight:bold;">
          <i class="fa-solid fa-download"></i> Save As
        </button>
      </div>
    </div>
  `;

  // --- Render each order ---
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
    // --- Create modal element ---
    let previewModal = document.getElementById("previewModal");
    if (!previewModal) {
      previewModal = document.createElement("div");
      previewModal.id = "previewModal";
      previewModal.style.position = "fixed";
      previewModal.style.top = "0";
      previewModal.style.left = "0";
      previewModal.style.width = "100%";
      previewModal.style.height = "100%";
      previewModal.style.background = "rgba(0,0,0,0.6)";
      previewModal.style.display = "none";
      previewModal.style.justifyContent = "center";
      previewModal.style.alignItems = "center";
      previewModal.innerHTML = `
        <div style="background:white;border-radius:12px;max-width:400px;width:90%;padding:16px;box-shadow:0 6px 20px rgba(0,0,0,0.3);">
          <div id="previewContainer" style="max-height:400px;overflow:auto;margin-bottom:10px;text-align:center;"></div>
          <input id="fileNameInput" type="text" placeholder="Enter file name..." style="width:100%;padding:6px;border:1px solid #ccc;border-radius:6px;margin-bottom:8px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <select id="fileTypeSelect" style="padding:6px;border:1px solid #ccc;border-radius:6px;">
              <option value="jpg">JPG</option>
              <option value="pdf">PDF</option>
            </select>
            <div>
              <button id="confirmSaveBtn" style="background:#00d084;color:white;border:none;border-radius:20px;padding:6px 14px;cursor:pointer;">Save</button>
              <button id="cancelPreviewBtn" style="margin-left:8px;background:#ccc;color:white;border:none;border-radius:20px;padding:6px 14px;cursor:pointer;">Cancel</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(previewModal);
    }

    // Save button functionality → show preview modal
// --- Save button functionality ---
document.getElementById("saveReportBtn").addEventListener("click", () => {
  const card = document.getElementById("bodyContent");
  const clone = card.cloneNode(true);

  // Hide original save button and calendar icon in preview
  const saveBtn = clone.querySelector("#saveReportBtn");
  const calendarIcon = clone.querySelector(".fa-calendar-days");
  if (saveBtn) saveBtn.style.display = "none";
  if (calendarIcon) calendarIcon.style.display = "none";

  // --- Create dim overlay ---
  let dimOverlay = document.getElementById("dimOverlay");
  if (!dimOverlay) {
    dimOverlay = document.createElement("div");
    dimOverlay.id = "dimOverlay";
    Object.assign(dimOverlay.style, {
      position: "fixed",
      top: "0", left: "0",
      width: "100%", height: "100%",
      background: "rgba(0,0,0,0.4)",
      zIndex: "1000",
      display: "none"
    });
    document.body.appendChild(dimOverlay);
  }
  dimOverlay.style.display = "block";

  // --- Bottom modal ---
  let bottomModal = document.getElementById("bottomSaveModal");
  if (!bottomModal) {
    bottomModal = document.createElement("div");
    bottomModal.id = "bottomSaveModal";
    Object.assign(bottomModal.style, {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "white",
      borderRadius: "12px",
      maxWidth: "400px",
      width: "90%",
      boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      zIndex: "1001"
    });

    bottomModal.innerHTML = `
      <div id="modalPreviewContainer" style="max-height:300px; overflow:auto; margin-bottom:10px;"></div>
      <input id="modalFileName" type="text" placeholder="Enter file name..." style="width:100%;padding:8px;border:1px solid #ccc;border-radius:6px;font-size:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <select id="modalFileType" style="padding:6px;border:1px solid #ccc;border-radius:6px;font-size:16px;">
          <option value="jpg">JPG</option>
          <option value="pdf">PDF</option>
        </select>
        <div>
          <button id="modalConfirmSave" style="background:#00d084;color:white;border:none;border-radius:20px;padding:6px 14px;cursor:pointer;font-size:16px;font-weight:bold;">Save</button>
          <button id="modalCancel" style="margin-left:8px;background:#ccc;color:black;border:none;border-radius:20px;padding:6px 14px;cursor:pointer;font-size:16px;font-weight:bold;">Cancel</button>
        </div>
      </div>
    `;
    document.body.appendChild(bottomModal);
  }

  // Add cloned card to modal preview
  const previewContainer = document.getElementById("modalPreviewContainer");
  previewContainer.innerHTML = "";
  previewContainer.appendChild(clone);

  bottomModal.style.display = "flex";

  // Cancel button
  document.getElementById("modalCancel").onclick = () => {
    bottomModal.style.display = "none";
    dimOverlay.style.display = "none";
  };

  // Confirm Save
  document.getElementById("modalConfirmSave").onclick = () => {
    const fileName = document.getElementById("modalFileName").value || "Sales_Report";
    const fileType = document.getElementById("modalFileType").value;

    html2canvas(clone, { scale: 2, useCORS: true }).then((canvas) => {
      if (fileType === "jpg") {
        const link = document.createElement("a");
        link.download = `${fileName}.jpg`;
        link.href = canvas.toDataURL("image/jpeg", 1.0);
        link.click();
      } else {
        const pdf = new jspdf.jsPDF("p", "mm", "a4");
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
        pdf.save(`${fileName}.pdf`);
      }

      // Popup "Saved to device"
      const popup = document.createElement("div");
      popup.textContent = "Saved to device";
      Object.assign(popup.style, {
        position: "fixed",
        top: "75%",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#00d084",
        color: "white",
        padding: "10px 20px",
        borderRadius: "10px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
        zIndex: "2000",
        opacity: "0",
        transition: "opacity 0.3s"
      });
      document.body.appendChild(popup);
      setTimeout(()=>{ popup.style.opacity="1"; }, 50);
      setTimeout(()=>{
        popup.style.opacity="0";
        setTimeout(()=>{ popup.remove(); }, 300);
      }, 1500);

      bottomModal.style.display = "none";
      dimOverlay.style.display = "none";
    });
  };
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
