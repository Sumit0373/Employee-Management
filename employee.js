const params = new URLSearchParams(window.location.search);
const userName = params.get('userName');
document.getElementById('welcomeMessage').textContent = `Welcome, ${userName}`;

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  window.location.replace('index.html');
});

// Redirect to add employee form
document.getElementById('addEmployeeBtn').addEventListener('click', () => {
  window.location.href = 'addEmployeeDetail.html';
});

// Fetch and display employee data
fetch('http://localhost:4000/api/employees')
  .then(response => response.json())
  .then(data => {
    const listContainer = document.getElementById('employeeList');
    if (data.length === 0) {
      listContainer.innerHTML = "<p>No employees found.</p>";
      return;
    }

    data.forEach(emp => {
      const empDiv = document.createElement('div');
      empDiv.className = 'employee-card';
      empDiv.innerHTML = `
        <h3>${emp.name}</h3>
        <p><strong>Age:</strong> ${emp.age}</p>
        <p><strong>Experience:</strong> ${emp.experience} years</p>
        <hr />
      `;
      listContainer.appendChild(empDiv);
    });
  })
  .catch(err => {
    console.error('Error fetching employees:', err);
  });
