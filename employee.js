const params = new URLSearchParams(window.location.search);
const userName = params.get('userName');
document.getElementById('welcomeMessage').textContent = `Welcome, ${userName}`;

//logout button
document.getElementById('logoutBtn').addEventListener('click',()=>{
   window.location.replace('index.html');

})
// Placeholder for add employee button
function addEmployee() {
  alert('Add Employee clicked (feature coming soon)');
}

document.getElementById('addEmployeeBtn').addEventListener('click',()=>{
     window.location.href = ('addEmployeeDetail.html');
})