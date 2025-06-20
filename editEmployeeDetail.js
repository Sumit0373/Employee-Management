const params = new URLSearchParams(window.location.search);
const employeeId = params.get('id');

if (!employeeId) {
  alert('No employee ID provided.');
  window.location.href = 'employee.html';
}

// Fetch current employee data
fetch(`http://localhost:4000/api/employees/${employeeId}`)
  .then(res => res.json())
  .then(emp => {
    document.getElementById('empName').value = emp.name;
    document.getElementById('empAge').value = emp.age;
    document.getElementById('empExp').value = emp.experience;
  })
  .catch(err => {
    alert('Failed to load employee data.');
    console.error(err);
    window.location.href = 'employee.html';
  });

// Submit update
document.getElementById('editEmployeeForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('empName').value;
  const age = document.getElementById('empAge').value;
  const experience = document.getElementById('empExp').value;

  fetch(`http://localhost:4000/api/employees/${employeeId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, age, experience })
  })
  .then(res => res.json())
  .then(data => {
    alert('Employee updated successfully!');
    window.location.href = 'employee.html';
  })
  .catch(err => {
    alert('Error updating employee');
    console.error(err);
  });
});
