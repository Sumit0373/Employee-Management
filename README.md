# 👨‍💼 Employee Management System

A simple full-stack Employee Management System built using Node.js, Express.js, MySQL, HTML, CSS, and JavaScript.

## 🚀 Features

* Add new employee records
* View all employee details
* Edit existing employee records
* Delete employee entries
* Simple UI with client-side validation
* RESTful API for frontend-backend communication

## 💠 Technologies Used

* **Frontend**: HTML, CSS, JavaScript (Vanilla)
* **Backend**: Node.js, Express.js
* **Database**: MySQL
* **Communication**: Fetch API (JSON)

## 📁 Project Structure

```
employee-management/
│
├── server.js
├── package.json
├── /public
│   ├── index.html
│   ├── employee.html
│   ├── addEmployeeDetail.html
│   ├── editEmployeeDetail.html
│   ├── employee.js
│   ├── addEmployeeDetail.js
│   ├── editEmployeeDetail.js
│   └── employee.css
```

## 🧑‍💻 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Sumit0373/Employee-Management.git
cd Employee-Management
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Setup MySQL Database

1. Open MySQL Workbench or CLI.
2. Run the following SQL commands:

```sql
CREATE DATABASE Employee;

USE Employee;

CREATE TABLE employee_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  age INT,
  experience INT
);
```

### Step 4: Configure Database

In `server.js`, update your MySQL credentials:

```javascript
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'Employee'
});
```

### Step 5: Start the Backend Server

```bash
node server.js
```

The server will run on `http://localhost:4000`.

### Step 6: Open the App in Browser

You can open `public/index.html` in your browser or use a local server like Live Server (VS Code extension) to serve frontend files.

## 🌐 API Endpoints

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| GET    | /api/employees      | Get all employees  |
| GET    | /api/employees/\:id | Get employee by ID |
| POST   | /add/employees      | Add new employee   |
| PUT    | /api/employees/\:id | Update employee    |
| DELETE | /api/employees/\:id | Delete employee    |

```

## 🙇‍♂️ Author

**Sumit Kumar Singh**

## 🤝 Contributing

Pull requests are welcome! Fork this repo and submit your improvements or fixes.
