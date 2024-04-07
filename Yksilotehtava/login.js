document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if(username === "kismet" && password === "root") {
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password. Please try again.'); 
    }
});

const signUpButton = document.getElementById('signup-button');

        signUpButton.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = 'signup.html';
        });