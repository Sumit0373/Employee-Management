document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const userId = document.getElementById('userid').value;
  const password = document.getElementById('password').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Check if user exists with correct password
  const matchedUser = users.find(user => user.userId === userId && user.password === password);

  if (matchedUser) {
    const userName = matchedUser ? matchedUser.name : null;
    window.location.href = `employee.html?userName=${encodeURIComponent(userName)}`; // redirect to employee page

  } else {
    alert('Wrong user ID or password.');
  }
});
