// ------------------- Global Data.js -------------------

// Dashboard counters
let bookings = [
  { id: 1, guest: "John Doe", room: "101", status: "Checked In", date: "2026-03-28" },
  { id: 2, guest: "Jane Smith", room: "102", status: "Checked Out", date: "2026-03-27" }
];

let payments = [
  { id: 1, guest: "John Doe", amount: 200, date: "2026-03-28", method: "Card" },
  { id: 2, guest: "Jane Smith", amount: 150, date: "2026-03-27", method: "Cash" }
];

// Rooms data
let rooms = [
  { number: "101", type: "Single", status: "Occupied", price: 100 },
  { number: "102", type: "Double", status: "Available", price: 150 },
  { number: "103", type: "Suite", status: "Maintenance", price: 300 }
];

// Hotel Settings
let hotelSettings = {
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
  console.log("Settings updated:", hotelSettings);
}

// Add, edit, delete rooms
function addRoom(room) {
  rooms.push(room);
}
function updateRoom(index, room) {
  rooms[index] = room;
}
function deleteRoom(index) {
  rooms.splice(index, 1);
}

// Add, edit, delete bookings
function addBooking(booking) {
  bookings.push(booking);
}
function updateBooking(index, booking) {
  bookings[index] = booking;
}
function deleteBooking(index) {
  bookings.splice(index, 1);
}

// Add, edit, delete payments
function addPayment(payment) {
  payments.push(payment);
}
function updatePayment(index, payment) {
  payments[index] = payment;
}
function deletePayment(index) {
  payments.splice(index, 1);
}

// ------------------- Export for Pages -------------------
// (Optional: if using modules)
// export { bookings, payments, rooms, hotelSettings, getBookingCounts, getRoomCounts, saveSettings, addRoom, updateRoom, deleteRoom };