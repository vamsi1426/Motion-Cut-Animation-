document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    let valid = true;

    // Clear previous error messages
    document.getElementById('usernameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('passwordError').innerText = '';
    
    // Validate username
    if (username.length < 3) {
        valid = false;
        document.getElementById('usernameError').innerText = 'Username must be at least 3 characters long.';
        document.getElementById('usernameError').style.display = 'block';
    } else {
        document.getElementById('usernameError').style.display = 'none';
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        valid = false;
        document.getElementById('emailError').innerText = 'Please enter a valid email address.';
        document.getElementById('emailError').style.display = 'block';
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    // Validate password
    if (password.length < 6) {
        valid = false;
        document.getElementById('passwordError').innerText = 'Password must be at least 6 characters long.';
        document.getElementById('passwordError').style.display = 'block';
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }

    if (valid) {
        // Submit the form (for demonstration, we're just logging to console)
        console.log('Form Submitted', { username, email, password });
        alert('Form Submitted Successfully!');
        // Here, you can also use `this.submit()` if you want to actually submit the form.
    }
});
