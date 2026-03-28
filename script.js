// script.js

// Sample data array to store bookings
let bookings = [
  { guest: "John Smith", room: 102, checkin: "2026-01-10", status: "Confirmed", revenue: 200 },
  { guest: "Sarah Johnson", room: 205, checkin: "2026-01-11", status: "Confirmed", revenue: 300 },
  { guest: "Mike Davis", room: 301, checkin: "2026-01-12", status: "Pending", revenue: 150 },
];

// Function to render bookings table
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

    // Handle delete
    row.querySelector(".deleteBtn").addEventListener("click", () => {
      bookings.splice(index, 1);
      renderTable();
      updateCards();
      updateChart();
    });

    // Handle status change
    row.querySelector(".statusDropdown").addEventListener("change", (e) => {
      booking.status = e.target.value;
      updateCards();
    });
  });
}

// Function to update dashboard cards
function updateCards() {
  const totalGuests = bookings.length;
  const activeBookings = bookings.filter(b => b.status === "Confirmed" || b.status === "Pending").length;
  const monthlyRevenue = bookings.reduce((sum, b) => sum + b.revenue, 0);
  const occupancyRate = Math.min(100, Math.round((activeBookings / 10) * 100)); // Assume 10 rooms for demo

  document.getElementById("totalGuests").innerText = totalGuests;
  document.getElementById("activeBookings").innerText = activeBookings;
  document.getElementById("monthlyRevenue").innerText = `$${monthlyRevenue}`;
  document.getElementById("occupancyRate").innerText = `${occupancyRate}%`;
}

// Handle add booking form
document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const guest = document.getElementById("guestName").value;
  const room = document.getElementById("roomNumber").value;
  const checkin = document.getElementById("checkInDate").value;
  const status = document.getElementById("status").value;
  const revenue = Math.floor(Math.random() * 300) + 100; // Random revenue for demo

  bookings.push({ guest, room, checkin, status, revenue });

  // Clear form
  this.reset();

  // Update table, cards, and chart
  renderTable();
  updateCards();
  updateChart();
});

// Revenue Chart using Chart.js
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
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  }
});

// Function to update chart
function updateChart() {
  revenueChart.data.labels = bookings.map(b => b.checkin);
  revenueChart.data.datasets[0].data = bookings.map(b => b.revenue);
  revenueChart.update();
}

// Initial render
renderTable();
updateCards();
updateChart();