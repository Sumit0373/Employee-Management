const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', 
  database: 'Employee'
});

connection.connect((err) => {
  if (err) {
    console.error('DB connection error:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// 🆕 API to get all employee details
app.get('/api/employees', (req, res) => {
  connection.query('SELECT * FROM employee_details', (err, results) => {
    if (err) {
      console.error('Error fetching employee data:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// 🆕 Add employee route
app.post('/add/employees', (req, res) => {
  const { name, age, experience } = req.body;

  if (!name || !age || !experience) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = 'INSERT INTO employee_details (name, age, experience) VALUES (?, ?, ?)';
  connection.query(sql, [name, age, experience], (err, result) => {
    if (err) {
      console.error('Error inserting employee:', err);
      return res.status(500).json({ error: 'Failed to insert employee' });
    }
    res.status(201).json({ message: 'Employee added successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
