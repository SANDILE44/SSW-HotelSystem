// script.js

// ---------------- Hamburger / Sidebar ----------------
const sidebar = document.getElementById("sidebar");
const mainContent = document.querySelector("main");

// Toggle sidebar (hamburger)
function toggleSidebar() {
  sidebar.classList.toggle("active");
  mainContent.classList.toggle("shifted");
}

// Close sidebar if clicking outside (mobile only)
document.addEventListener("click", function(e) {
  if (
    !sidebar.contains(e.target) && 
    !e.target.classList.contains("hamburger") &&
    sidebar.classList.contains("active") &&
    window.innerWidth < 768
  ) {
    sidebar.classList.remove("active");
    mainContent.classList.remove("shifted");
  }
});

// Remove mobile sidebar if resizing to desktop
window.addEventListener("resize", function() {
  if(window.innerWidth >= 768) {
    sidebar.classList.remove("active");
    mainContent.classList.remove("shifted");
  }
});

// ---------------- Bookings Data ----------------
// Start empty for clean dashboard
let bookings = [];

// ---------------- Render Table ----------------
function renderTable() {
  const tbody = document.querySelector("#bookingsTable tbody");
  tbody.innerHTML = ""; // Clear existing rows

  bookings.forEach((booking, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border px-4 py-2">${booking.guest}</td>
      <td class="border px-4 py-2">${booking.room}</td>
      <td class="border px-4 py-2">${booking.checkin}</td>
      <td class="border px-4 py-2">
        <select class="statusDropdown p-1 border rounded">
          <option value="Confirmed" ${booking.status === "Confirmed" ? "selected" : ""}>Confirmed</option>
          <option value="Pending" ${booking.status === "Pending" ? "selected" : ""}>Pending</option>
          <option value="Cancelled" ${booking.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
        </select>
      </td>
      <td class="border px-4 py-2">
        <button class="deleteBtn bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </td>
    `;
    tbody.appendChild(row);

    // Delete booking
    row.querySelector(".deleteBtn").addEventListener("click", () => {
      bookings.splice(index, 1);
      renderTable();
      updateCards();
      updateChart();
    });

    // Status change
    row.querySelector(".statusDropdown").addEventListener("change", (e) => {
      booking.status = e.target.value;
      updateCards();
    });
  });
}

// ---------------- Update Dashboard Cards ----------------
function updateCards() {
  const totalGuests = bookings.length;
  const activeBookings = bookings.filter(b => b.status === "Confirmed" || b.status === "Pending").length;
  const monthlyRevenue = bookings.reduce((sum, b) => sum + (b.revenue || 0), 0);
  const occupancyRate = Math.min(100, Math.round((activeBookings / 10) * 100)); // assume 10 rooms

  document.getElementById("totalGuests").innerText = totalGuests;
  document.getElementById("activeBookings").innerText = activeBookings;
  
  // Show revenue in R
  document.getElementById("monthlyRevenue").innerText = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR'
  }).format(monthlyRevenue);

  document.getElementById("occupancyRate").innerText = `${occupancyRate}%`;
}

// ---------------- Add Booking Form ----------------
document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const guest = document.getElementById("guestName").value.trim();
  const room = document.getElementById("roomNumber").value.trim();
  const checkin = document.getElementById("checkInDate").value;
  const status = document.getElementById("status").value;

  if(!guest || !room || !checkin) return alert("Please fill all fields!");

  // Ask user to input revenue in Rand
  let revenue = prompt("Enter revenue for this booking (R):", "0");
  revenue = parseFloat(revenue.replace(/[^0-9.]/g, "")) || 0;

  bookings.push({ guest, room, checkin, status, revenue });

  this.reset();
  renderTable();
  updateCards();
  updateChart();
});

// ---------------- Revenue Chart (Chart.js) ----------------
const ctx = document.getElementById('revenueChart').getContext('2d');
let revenueChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: bookings.map(b => b.checkin),
    datasets: [{
      label: 'Revenue',
      data: bookings.map(b => b.revenue),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            return new Intl.NumberFormat('en-ZA', { style:'currency', currency:'ZAR' }).format(context.raw);
          }
        }
      }
    },
    scales: { y: { beginAtZero: true } }
  }
});

// ---------------- Update Chart ----------------
function updateChart() {
  revenueChart.data.labels = bookings.map(b => b.checkin);
  revenueChart.data.datasets[0].data = bookings.map(b => b.revenue);
  revenueChart.update();
}

// ---------------- Initial Render ----------------
renderTable();
updateCards();
updateChart();