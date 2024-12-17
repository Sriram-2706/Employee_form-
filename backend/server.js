const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3001',  
  methods: 'GET,POST,PUT,DELETE',  
  allowedHeaders: 'Content-Type,Authorization'  
}));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Masr@2706",
  database: "employee_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
  console.log("Connected to the database.");
});

app.post("/employees", (req, res) => {
  const { emp_name, emp_id, email_id, phone_no, dept, age, dob, doj, gender, role } = req.body;

  if (age < 18) {
    return res.status(400).json({ error: "Age must be at least 18." });
  }

  const checkQuery = `SELECT * FROM emp WHERE emp_id = ? OR email_id = ?`;
  db.execute(checkQuery, [emp_id, email_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error." });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "Employee ID or Email already exists." });
    }

    const insertQuery = `
      INSERT INTO emp (
        emp_id, emp_name, email_id, phone_no, dept, age, dob, doj, gender, role
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.execute(
      insertQuery,
      [emp_id, emp_name, email_id, phone_no, dept, age, dob, doj, gender, role],
      (err) => {
        if (err) {
          return res.status(500).json({ error: "Error inserting data." });
        }
        res.status(201).json({ message: "Employee added successfully." });
      }
    );
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
