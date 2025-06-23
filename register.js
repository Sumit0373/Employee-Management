document.getElementById('registrationForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const userId = document.getElementById('userid').value;
  const password = document.getElementById('password').value;

  if (!/^[a-zA-Z\s]+$/.test(name)) {
  alert("No numbers or special characters allowed.");
  return;
} 

  if (name.trim() === "") {
  alert("Name cannot be just spaces!");
  return ;
}

if(name.length<4){
  alert("Name is too small ")
return ;
}

if (userId.length <= 4) {
  alert("User ID must be more than 4 characters long.");
  return;
}
 if (/\s/.test(userId)) {
  alert("User ID must not contain any spaces.");
  return;
}

if (!/[@$_!]/.test(userId)) {
  alert("User ID must contain at least one special character: @, $, _, !");
  return;
} 

if (password.length < 6) {
  alert("Password must be at least 6 characters long.");
  return;
}

 if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
  alert("Password must contain at least one special character.");
  return;
}

else if (!/[A-Z]/.test(password)) {
  alert("Password must contain at least one uppercase letter.");
  return;
}
else if (!/[a-z]/.test(password)) {
  alert("Password must contain at least one lowercase letter.");
  return;
}

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
