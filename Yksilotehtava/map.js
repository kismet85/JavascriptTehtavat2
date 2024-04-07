const restaurants = [];

async function getRestaurants() {
  try {
    const response = await fetch(
      "https://10.120.32.94/restaurant/api/v1/restaurants"
    );
    if (!response.ok) {
      throw new Error("HTTP error, status = " + response.status);
    } else {
      const data = await response.json();
      console.log("Data from API:", data); 
      restaurants.push(...data);
      initMap(); 
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

async function getDailyMenu(id) {
  try {
    const response = await fetch(
      `https://10.120.32.94/restaurant/api/v1/restaurants/daily/${id}/fi`
    );
    if (!response.ok) {
      throw new Error(error);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

function initMap() {
  let map, currentLocation;

  navigator.geolocation.getCurrentPosition((position) => {
    currentLocation = [position.coords.latitude, position.coords.longitude];
    map = L.map("map").setView(currentLocation, 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    createRestaurantMarkers(map);
    watchUserPosition(map);
    listRestaurants();
  });
}

function createRestaurantMarkers(map) {
  restaurants.forEach((restaurant) => {
    const lat = restaurant.location.coordinates[1];
    const lng = restaurant.location.coordinates[0];
    
    const marker = L.marker([lat, lng])
      .addTo(map)
      .on('click', function() { 
        showMenu(restaurant._id); 
      });

    marker.bindPopup(
      "<h3>" +
      restaurant.name +
      "</h3>" +
      "<p> Address: " +
      restaurant.address +
      "</p>"
    );
  });
}

function showMenu(restaurantId) {
  const menuContainer = document.getElementById("menu-container");
  menuContainer.innerHTML = ""; 
  
  getDailyMenu(restaurantId)
    .then((data) => {
      console.log(data);
      const menuDiv = document.createElement("div");
      menuDiv.id = `menu_${restaurantId}`;
      const menuHeader = document.createElement("h1");
      menuHeader.textContent = "Menu";
      menuDiv.appendChild(menuHeader);
      const courseList = document.createElement("ul");
      data.courses.forEach((course) => {
        const courseItem = document.createElement("li");
        courseItem.textContent = course.name;
        courseList.appendChild(courseItem);
      });
      menuDiv.appendChild(courseList);
      
      menuContainer.appendChild(menuDiv);
    })
    .catch((error) => {
      console.log("Error fetching menu: ", error);
    });
}


function watchUserPosition(map) {
  let nearestMarker;

  navigator.geolocation.watchPosition((position) => {
    const x1 = position.coords.latitude;
    const y1 = position.coords.longitude;

    if (nearestMarker) {
      map.removeLayer(nearestMarker);
    }

    let nearestDistance = Number.MAX_VALUE;
    let nearestRestaurant;

    for (let restaurant of restaurants) {
      let x2 = restaurant.location.coordinates[1];
      let y2 = restaurant.location.coordinates[0];
      restaurant.distance = Math.sqrt(
        Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
      );
      restaurant.distanceKm = restaurant.distance * 111.32;

      if (restaurant.distance < nearestDistance) {
        nearestDistance = restaurant.distance;
        nearestRestaurant = restaurant;
      }
    }

    const lat = nearestRestaurant.location.coordinates[1];
    const lng = nearestRestaurant.location.coordinates[0];

    const customIconOptions = {
      iconSize: [53, 85],
    };

    const customIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      iconSize: customIconOptions.iconSize,
    });

    nearestMarker = L.marker([lat, lng], { icon: customIcon })
      .addTo(map)
      .bindPopup(
        "<h3>" +
          nearestRestaurant.name +
          "</h3>" +
          "<p> Address: " +
          nearestRestaurant.address +
          "</p>"
      );
  });
}

function listRestaurants()
{
  navigator.geolocation.getCurrentPosition((position) => {
    const x1 = position.coords.latitude;
    const y1 = position.coords.longitude;

    for (let restaurant of restaurants) {
      let x2 = restaurant.location.coordinates[1];
      let y2 = restaurant.location.coordinates[0];
      restaurant.distance = Math.sqrt(
        Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
      );
      restaurant.distanceKm = restaurant.distance * 111.32;
    }

    restaurants.sort((a, b) => a.distance - b.distance);

    let target = document.querySelector("table tbody");

    for (let restaurant of restaurants) {
      let row = document.createElement("tr");
      let nameCell = document.createElement("td");
      let addressCell = document.createElement("td");
      let distanceCell = document.createElement("td");
      let checkboxCell = document.createElement("td");
      let buttonCell = document.createElement("td");

      nameCell.textContent = restaurant.name;
      addressCell.textContent = restaurant.address;
      distanceCell.textContent = restaurant.distanceKm.toFixed(1) + " km";

      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.addEventListener("change", function () {
        button.disabled = !checkbox.checked;
      });
      checkboxCell.appendChild(checkbox);

      let button = document.createElement("button");
      button.textContent = "Add to Favorites";
      button.disabled = !checkbox.checked; //
      button.addEventListener("click", function () {
        console.log("Added to favorites:", restaurant.name);
      });
      buttonCell.appendChild(button);

      row.appendChild(nameCell);
      row.appendChild(addressCell);
      row.appendChild(distanceCell);
      row.appendChild(checkboxCell);
      row.appendChild(buttonCell);

      target.appendChild(row);
    }
  });
}

getRestaurants();
