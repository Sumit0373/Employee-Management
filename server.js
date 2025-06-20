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
  console.log(' Connected to MySQL');
});



app.get('/api/employees', (req, res) => {
  connection.query('SELECT * FROM employee_details', (err, results) => {
    if (err) {
      console.error('Error fetching employee data:', err);
      return res.status(500).send('Server error');
    }
    res.json(results);
  });
});



app.get('/api/employees/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM employee_details WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching employee:', err);
      return res.status(500).json({ error: 'Server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(results[0]);
  });
});


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



app.put('/api/employees/:id', (req, res) => {
  const id = req.params.id;
  const { name, age, experience } = req.body;

  if (!name || !age || !experience) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = 'UPDATE employee_details SET name = ?, age = ?, experience = ? WHERE id = ?';
  connection.query(sql, [name, age, experience, id], (err, result) => {
    if (err) {
      console.error('Error updating employee:', err);
      return res.status(500).json({ error: 'Update failed' });
    }
    res.json({ message: 'Employee updated successfully' });
  });
});


app.delete('/api/employees/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM employee_details WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ error: 'Delete failed' });
    }
    res.json({ message: 'Employee deleted' });
  });
});



app.listen(port, () => {
  console.log(` Server listening on http://localhost:${port}`);
});
