// ------------------- Global Data.js with localStorage -------------------

// ------------------- Initialize Data -------------------
let bookings = JSON.parse(localStorage.getItem("bookings")) || [
  { id: 1, guest: "John Doe", room: "101", status: "Checked In", date: "2026-03-28" },
  { id: 2, guest: "Jane Smith", room: "102", status: "Checked Out", date: "2026-03-27" }
];

let payments = JSON.parse(localStorage.getItem("payments")) || [
  { id: 1, guest: "John Doe", amount: 200, date: "2026-03-28", method: "Card", status: "Paid" },
  { id: 2, guest: "Jane Smith", amount: 150, date: "2026-03-27", method: "Cash", status: "Pending" }
];

let rooms = JSON.parse(localStorage.getItem("rooms")) || [
  { number: "101", type: "Single", status: "Occupied", price: 100 },
  { number: "102", type: "Double", status: "Available", price: 150 },
  { number: "103", type: "Suite", status: "Maintenance", price: 300 }
];

let hotelSettings = JSON.parse(localStorage.getItem("hotelSettings")) || {
  hotelName: "HotelPro",
  hotelAddress: "123 Main Street",
  hotelPhone: "+27 123 456 789",
  hotelWebsite: "www.hotelpro.com",
  adminName: "Admin User",
  adminEmail: "admin@hotelpro.com",
  theme: "light",
  logo: "logo.png"
};

// ------------------- Helper Functions -------------------

// Save current data to localStorage
function saveData() {
  localStorage.setItem("bookings", JSON.stringify(bookings));
  localStorage.setItem("payments", JSON.stringify(payments));
  localStorage.setItem("rooms", JSON.stringify(rooms));
  localStorage.setItem("hotelSettings", JSON.stringify(hotelSettings));
}

// Get counts for Dashboard
function getBookingCounts() {
  const checkedIn = bookings.filter(b => b.status === "Checked In").length;
  const checkedOut = bookings.filter(b => b.status === "Checked Out").length;
  return { total: bookings.length, checkedIn, checkedOut };
}

function getRoomCounts() {
  const total = rooms.length;
  const available = rooms.filter(r => r.status === "Available").length;
  const occupied = rooms.filter(r => r.status === "Occupied").length;
  const maintenance = rooms.filter(r => r.status === "Maintenance").length;
  return { total, available, occupied, maintenance };
}

// Save and load hotel settings
function saveSettings(newSettings) {
  hotelSettings = { ...hotelSettings, ...newSettings };
  saveData();
  console.log("Settings updated:", hotelSettings);
}

// Add, edit, delete rooms
function addRoom(room) {
  rooms.push(room);
  saveData();
}
function updateRoom(index, room) {
  rooms[index] = room;
  saveData();
}
function deleteRoom(index) {
  rooms.splice(index, 1);
  saveData();
}

// Add, edit, delete bookings
function addBooking(booking) {
  bookings.push(booking);
  saveData();
}
function updateBooking(index, booking) {
  bookings[index] = booking;
  saveData();
}
function deleteBooking(index) {
  bookings.splice(index, 1);
  saveData();
}

// Add, edit, delete payments
function addPayment(payment) {
  payments.push(payment);
  saveData();
}
function updatePayment(index, payment) {
  payments[index] = payment;
  saveData();
}
function deletePayment(index) {
  payments.splice(index, 1);
  saveData();
}

// ------------------- End of Data.js -------------------