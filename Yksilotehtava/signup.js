function handleSignUp(event) {
    event.preventDefault();

    let message = document.getElementById("signup-m");

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let cpassword = document.getElementById("c-password").value;

    if (password !== cpassword) {
        message.innerHTML = "Passwords do not match";
        message.style.color = "red"; 
        return; 
    }

    let user = {
        username: username,
        email: email,
        password: password
    };

    fetch('https://10.120.32.94/restaurant/api/v1/users', {
        mode:  'cors', 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to sign up');
        }
        return response.json();
    })
    .then(data => {
        console.log('Sign up successful:', data);

        const { username, email, _id, role } = data.data;

        message.innerHTML = "Sign up successful";
        message.style.color = "green"; 

        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('userId', _id);
        localStorage.setItem('role', role);

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    })
    .catch(error => {
        console.error('Error signing up:', error);
        message.innerHTML = "Username already exists"; 
        message.style.color = "red"; 
    });
}

document.getElementById("signup-form").addEventListener("submit", handleSignUp);
