async function errorHandling() {
    try {
      const response = await fetch("https://reqres.in/api/unknown/23");
      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      } else {
          const json = await response.json();
          console.log(json);
          }
      console.log(json);
    } catch (error) {
      console.log('This error is on purpose: ', error.message);
    }
  }
  
  errorHandling();