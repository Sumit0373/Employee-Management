const params = new URLSearchParams(window.location.search);
const userName = params.get('userName');

document.getElementById('employeeForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('empName').value;
  const age = document.getElementById('empAge').value;
  const experience = document.getElementById('empExp').value;
   const email = document.getElementById('empEmail').value;
  const salary = document.getElementById('empSal').value;
 

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
    alert(`Experience can never be greater than age`);
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
 // salary break down 
 const DA= Number(salary)*0.20;
 const HRA = Number(salary)*0.50;
 const PF = Number(salary)*0.12;
 const NPS = Number(salary)*0.10;
 const totalSalary = Number(salary )+ DA + HRA - PF - NPS;


  fetch('http://localhost:4000/add/employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, age, experience , email , salary , DA, HRA, PF, NPS, totalSalary})
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
