document.getElementById('registrationForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const userId = document.getElementById('userid').value;
  const password = document.getElementById('password').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];


  const exists = users.find(user => user.userId === userId);

  if (exists) {
    alert('User ID already exists.');
    return;
  }


  users.push({ name, userId, password });
  localStorage.setItem('users', JSON.stringify(users));

  alert('Registered successfully!');
  this.reset();


  window.location.href = "index.html";
});
