const data = {
  name: "morpheus",
  job: "leader",
};

async function postData(data) {
  try {
    const response = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log('result: ', json);
  } catch (error) {
    console.error("Error:", error);
  }
}

postData(data);