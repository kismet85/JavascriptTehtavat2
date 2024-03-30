async function fetchJson() {
    try {
        const response = await fetch('https://reqres.in/api/users/1');
        const json = await response.json();
        console.log(json.data.id);
        console.log(json.data.first_name);
        console.log(json.data.last_name);
        console.log(json.data.email);
        console.log(json.data.avatar);
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchJson();