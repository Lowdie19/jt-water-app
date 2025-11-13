document.addEventListener("DOMContentLoaded", () => {
  const bodyContent = document.getElementById("bodyContent");
  const calendarDays = document.getElementById("calendarDays");
  const monthSelect = document.getElementById("monthSelect");
  const yearSelect = document.getElementById("yearSelect");
  const calendarCard = document.getElementById("calendarModal");

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
        <i class="fa-regular fa-calendar-days" 
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

// --- Animate Date Title with Bounce ---
const weekdayEl = bodyContent.querySelector("span:first-child");
const monthDayYearEl = bodyContent.querySelector("span:nth-child(2)");

// Initial style for animation
[weekdayEl, monthDayYearEl].forEach(el => {
  el.style.transform = "scale(1)";
  el.style.opacity = "1";
  el.style.display = "inline-block"; // ensure transform works
  el.style.transition = "transform 0.1s ease, opacity 0.1s ease";
});

// "Click" animation

  [weekdayEl, monthDayYearEl].forEach(el => {
    el.style.transform = "scale(0.9)"; // press down
    el.style.opacity = "0.7";
  });

  setTimeout(() => {
    [weekdayEl, monthDayYearEl].forEach(el => {
      el.style.transform = "scale(1)"; // release
      el.style.opacity = "1";
    });
  }, 100); // short delay for press


const calendarIcon = document.querySelector(".fa-calendar-days");
if (calendarIcon) {
  calendarIcon.addEventListener("click", () => {
    if (typeof playClick === "function") playClick(); // play sound
    const calendarModal = document.getElementById("calendarModal");
    calendarModal.style.display = "flex";
  });
}


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
    // --- Create card element ---
    let previewcard = document.getElementById("previewcard");
    if (!previewcard) {
      previewcard = document.createElement("div");
      previewcard.id = "previewcard";
      previewcard.style.position = "fixed";
      previewcard.style.top = "0";
      previewcard.style.left = "0";
      previewcard.style.width = "100%";
      previewcard.style.height = "100%";
      previewcard.style.background = "rgba(0,0,0,0.6)";
      previewcard.style.display = "none";
      previewcard.style.justifyContent = "center";
      previewcard.style.alignItems = "center";
      previewcard.innerHTML = `
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
      document.body.appendChild(previewcard);
    }

    // Save button functionality → show preview card
// --- Save button functionality ---
document.getElementById("saveReportBtn").addEventListener("click", () => {
  const card = document.getElementById("bodyContent");
  const clone = card.cloneNode(true);

  // Hide original save button and calendar icon in preview
  const saveBtn = clone.querySelector("#saveReportBtn");
  const calendarIcon = clone.querySelector(".fa-calendar-days");
if (calendarIcon) {
  calendarIcon.addEventListener("click", () => {
    if (typeof playClick === "function") playClick(); // universal click sound
    // Open actual calendar modal
    const calendarModal = document.getElementById("calendarModal");
calendarModal.style.display = "flex";
  });
}

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

  // --- Bottom card ---
  let bottomcard = document.getElementById("bottomSavecard");
  if (!bottomcard) {
    bottomcard = document.createElement("div");
    bottomcard.id = "bottomSavecard";
    Object.assign(bottomcard.style, {
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

    bottomcard.innerHTML = `
      <div id="cardPreviewContainer" style="max-height:300px; overflow:auto; margin-bottom:10px;"></div>
      <input id="cardFileName" type="text" placeholder="Enter file name..." style="width:100%;padding:8px;border:1px solid #ccc;border-radius:6px;font-size:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <select id="cardFileType" style="padding:6px;border:1px solid #ccc;border-radius:6px;font-size:16px;">
          <option value="jpg">JPG</option>
          <option value="pdf">PDF</option>
        </select>
        <div>
          <button id="cardConfirmSave" style="background:#00d084;color:white;border:none;border-radius:20px;padding:6px 14px;cursor:pointer;font-size:16px;font-weight:bold;">Save</button>
          <button id="cardCancel" style="margin-left:8px;background:#ccc;color:black;border:none;border-radius:20px;padding:6px 14px;cursor:pointer;font-size:16px;font-weight:bold;">Cancel</button>
        </div>
      </div>
    `;
    document.body.appendChild(bottomcard);
  }

  // Add cloned card to card preview
  const previewContainer = document.getElementById("cardPreviewContainer");
  previewContainer.innerHTML = "";
  previewContainer.appendChild(clone);

  bottomcard.style.display = "flex";

  // Cancel button
  document.getElementById("cardCancel").onclick = () => {
    bottomcard.style.display = "none";
    dimOverlay.style.display = "none";
  };

  // Confirm Save
  document.getElementById("cardConfirmSave").onclick = () => {
    const fileName = document.getElementById("cardFileName").value || "Sales_Report";
    const fileType = document.getElementById("cardFileType").value;

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

playSuccess();

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

      bottomcard.style.display = "none";
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
    if (typeof playClick === "function") playClick(); // play click sound

    const day = parseInt(e.target.textContent);
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);
    const selectedDate = new Date(year, month, day);

    // --- Animate the selected date ---
    // Remove animation from previously selected
    calendarDays.querySelectorAll("div").forEach(div => {
      div.style.background = "";
      div.style.transform = "scale(1)";
      div.style.transition = "0.2s";
    });

    // Apply animation to clicked day
    e.target.style.background = "#00d084"; // highlight
    e.target.style.transform = "scale(1.2)";
    e.target.style.transition = "0.2s";

    // Optional: revert scale after 0.2s for a "pop" effect
    setTimeout(() => {
      e.target.style.transform = "scale(1)";
    }, 200);

    // Render orders for the selected date
    renderOrders(generateRandomOrders(), selectedDate);

    // Close calendar modal
    setTimeout(() => {
    calendarCard.style.display = "none";
  }, 300);}
});

  // --- Open / Close Calendar ---
window.openCalendar = () => (calendarCard.style.display = "flex");
window.closeCalendar = () => (calendarCard.style.display = "none");
});
