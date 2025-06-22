const params = new URLSearchParams(window.location.search);
const userName = params.get('userName');

document.getElementById('employeeForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('empName').value;
  const age = document.getElementById('empAge').value;
  const experience = document.getElementById('empExp').value;

  fetch('http://localhost:4000/add/employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, age, experience })
  })
  .then(res => res.json())
  .then(data => {
    alert('Employee added successfully!');
    window.location.href = `employee.html?userName=${encodeURIComponent(userName)}`; 
  })
  .catch(err => {
    alert('Error adding employee'); 
    console.error(err);
  });
});
