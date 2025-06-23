const params = new URLSearchParams(window.location.search);
const userName = params.get('userName');
document.getElementById('welcomeMessage').textContent = `Welcome, ${userName}`;


document.getElementById('logoutBtn').addEventListener('click', () => {
  window.location.replace('index.html');
});


document.getElementById('addEmployeeBtn').addEventListener('click', () => {
  window.location.href = `addEmployeeDetail.html?userName=${encodeURIComponent(userName)}`; 
});


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
    <p><strong>Email:</strong> ${emp.email} </p>
    <p><strong>Basic Salary:</strong> ₹${emp.salary} </p>
    <p><strong>DA(Dearness Allowance ) 20% of Basic Salary:</strong> ₹${emp.DA}</p>
    <p><strong>HRA(House Rent Allowance) 50% of Basic Salary:</strong> ₹${emp.HRA} </p>
    <p><strong>PF(Provident Fund) 12% of Basic Salary:</strong> ₹ -${emp.PF} </p>
    <p><strong>NPS(National Pension System) 10% of Basic Salary:</strong> ₹ -${emp.NPS} </p>
    <p><strong>Total Salary:</strong> ₹${emp.totalSalary} </p>
    <button class="edit-btn" data-id="${emp.id}">Edit</button>
    <button class="delete-btn" data-id="${emp.id}">Delete</button>
    <hr />
  `;

 
  empDiv.querySelector('.delete-btn').addEventListener('click', function() {
    const id = this.getAttribute('data-id');
    if (confirm('Are you sure you want to delete this employee?')) {
      fetch(`http://localhost:4000/api/employees/${id}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        alert('Employee deleted!');
        location.reload(); 
      })
      .catch(err => {
        console.error('Error deleting employee:', err);
        alert('Delete failed.');
      });
    }
  });


  empDiv.querySelector('.edit-btn').addEventListener('click', function() {
    const id = this.getAttribute('data-id');
    window.location.href = `editEmployeeDetail.html?id=${id}&userName=${encodeURIComponent(userName)}`;

  });

  listContainer.appendChild(empDiv);
});

  })
  .catch(err => {
    console.error('Error fetching employees:', err);
  });
