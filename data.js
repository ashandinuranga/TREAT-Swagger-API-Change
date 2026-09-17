// In-memory test data — no database required.

const users = [
  { username: "admin", password: "password123" },
  { username: "testuser", password: "test@123" }
];

const hospitals = [
  { hospital_id: "H001", name: "Negombo General Hospital", city: "Negombo" },
  { hospital_id: "H002", name: "Colombo National Hospital", city: "Colombo" },
  { hospital_id: "H003", name: "Kandy Teaching Hospital", city: "Kandy" }
];

const patients = [
  {
    id: "P001",
    name: "Nimal Perera",
    age: 45,
    gender: "Male",
    hospitalId: "H001",
    contact: "0771234567"
  },
  {
    id: "P002",
    name: "Kumari Silva",
    age: 32,
    gender: "Female",
    hospitalId: "H002",
    contact: "0779876543"
  },
  {
    id: "P003",
    name: "Sunil Fernando",
    age: 60,
    gender: "Male",
    hospitalId: "H003",
    contact: "0712223344"
  }
];

const encounters = [
  {
    id: "E001",
    patientId: "P001",
    hospitalId: "H001",
    date: "2026-09-01",
    reason: "Fever and cough",
    doctor: "Dr. R. Jayasinghe",
    status: "Completed"
  },
  {
    id: "E002",
    patientId: "P002",
    hospitalId: "H002",
    date: "2026-09-05",
    reason: "Routine checkup",
    doctor: "Dr. A. Wickramasinghe",
    status: "Completed"
  },
  {
    id: "E003",
    patientId: "P003",
    hospitalId: "H003",
    date: "2026-09-10",
    reason: "Chest pain",
    doctor: "Dr. N. Rathnayake",
    status: "In Progress"
  }
];

module.exports = { users, hospitals, patients, encounters };
