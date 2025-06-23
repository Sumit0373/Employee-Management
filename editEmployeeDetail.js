const params = new URLSearchParams(window.location.search);
const employeeId = params.get('id');
const userName = params.get('userName');

if (!employeeId) {
  alert('No employee ID provided.');
  window.location.href = 'employee.html';
}


fetch(`http://localhost:4000/api/employees/${employeeId}`)
  .then(res => res.json())
  .then(emp => {
    document.getElementById('empName').value = emp.name;
    document.getElementById('empAge').value = emp.age;
    document.getElementById('empExp').value = emp.experience;
     document.getElementById('empEmail').value = emp.email;
     document.getElementById('empSal').value = emp.salary;

  })
  .catch(err => {
    alert('Failed to load employee data.');
    console.error(err);
    window.location.href = 'employee.html';
  });


document.getElementById('editEmployeeForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('empName').value;
  const age = document.getElementById('empAge').value;
  const experience = document.getElementById('empExp').value;
  const salary = document.getElementById('empSal').value;
  const email = document.getElementById('empEmail').value;


  
   if (!/^[a-zA-Z\s]+$/.test(name)) {
  alert("No numbers or special characters allowed.");
  return;
} 
  if (name.trim() === "") {
  alert("Name cannot be just spaces!");
  return ;
}
    if(Number(age)<18) {
    alert("Age Must be greater than 17");
    return;
  }
  if(Number(age)>100){
alert("Age can never be more than 100");
     return ;
  }
  if(Number(experience) > Number(age )){
    alert(`experience can never be greater than age`);
    return;
  }
   if(Number(experience) < 0){
   alert("Experience can never be in negative");
   return;
  }

  if (!email.endsWith('@accenture.com')) {
  alert('invalid email');
  return ;
}

  if(Number(salary)<20000){
    alert("Salary Must Be Greater Than 20000");
    return ;
  }

 const DA= Number(salary)*0.20;
 const HRA = Number(salary)*0.50;
 const PF = Number(salary)*0.12;
 const NPS = Number(salary)*0.10;
 const totalSalary = Number(salary )+ DA + HRA - PF - NPS;
  

  fetch(`http://localhost:4000/api/employees/${employeeId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, age, experience , email , salary , DA, HRA, PF, NPS, totalSalary})
  })
  .then(res => res.json())
  .then(data => {
    alert('Employee updated successfully!');
window.location.href = `employee.html?userName=${encodeURIComponent(userName)}`; 
  })
  .catch(err => {
    alert('Error updating employee');
    console.error(err);
  });
});
