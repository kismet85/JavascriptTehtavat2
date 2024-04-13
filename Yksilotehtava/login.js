function setLoggedIn() {
    sessionStorage.setItem('isLoggedIn', 'true');
}

document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://10.120.32.94/restaurant/api/v1/auth/login', {
            mode:  'cors', 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error('Invalid username or password');
        }

        const data = await response.json();
        const { token, data: userData } = data;
        
        
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userData', JSON.stringify(userData));

        setLoggedIn();
        
        window.location.href = 'index.html';
    } catch (error) {
        alert(error.message);
    }
});

const signUpButton = document.getElementById('signup-button');

signUpButton.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'signup.html';
});
