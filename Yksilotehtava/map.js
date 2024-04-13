const restaurants = [];
const sodexoRestaurants = [];
const compassGroupRestaurants = [];
const favoriteRestaurants = [];

let activeRestaurantId = "";
let Viikko = false;
let selectedDay = "";
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

      sodexoRestaurants.push(
        ...data.filter(
          (restaurant) => restaurant.company.toLowerCase() === "sodexo"
        )
      );

      compassGroupRestaurants.push(
        ...data.filter(
          (restaurant) => restaurant.company.toLowerCase() === "compass group"
        )
      );

      console.log("All Restaurants:", restaurants);
      console.log("Sodexo Restaurants:", sodexoRestaurants);
      console.log("Compass Group Restaurants:", compassGroupRestaurants);

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

async function getWeeklyMenu(id) {
  try {
    const response = await fetch(
      `https://10.120.32.94/restaurant/api/v1/restaurants/weekly/${id}/fi`
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
      .on("click", function () {
        activeRestaurantId = restaurant._id;
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

document.addEventListener("DOMContentLoaded", function () {
  const switchInput = document.querySelector("#switch-div input");
  const switchText = document.querySelector("#switch-div h3");
  const daySelector = document.querySelector("#day-selector");
  const daySelected = document.querySelector("#day-select")

  switchInput.addEventListener("change", function () {
    selectedDay = daySelected.value;
    if (switchInput.checked) {
      switchText.textContent = "Viikko";
      Viikko = true;
      daySelector.style.display = "block";

      fetchWeeklyMenu();
    } else {
      switchText.textContent = "Päivä";
      Viikko = false;
      daySelector.style.display = "none";
      fetchDailyMenu();
    }
  });

  daySelected.addEventListener("change", function () {
    selectedDay = daySelected.value;
    fetchWeeklyMenu(selectedDay);
  });
});

function fetchDailyMenu() {
  showMenu(activeRestaurantId);
}

function fetchWeeklyMenu() {
  showMenu(activeRestaurantId);
}

function showMenu(restaurantId) {
  const menuContainer = document.getElementById("menu-container");
  menuContainer.innerHTML = "";

  if (!Viikko) {
    getDailyMenu(restaurantId)
      .then((data) => {
        console.log(data);
        const menuDiv = createMenuDiv(data);
        menuContainer.appendChild(menuDiv);
      })
      .catch((error) => {
        console.log("Error fetching menu: ", error);
      });
  } else {
    getWeeklyMenu(restaurantId)
      .then((data) => {
        console.log(data);
        const selectedDayData = data.days[selectedDay - 1]; 
        if (selectedDayData) {
          const menuDiv = createMenuDiv(selectedDayData);
          menuContainer.appendChild(menuDiv);
        } else {
          console.log("No menu data found for selected day.");
        }
      })
      .catch((error) => {
        console.log("Error fetching menu: ", error);
      });
  }
}


function createMenuDiv(menuData) {
  const menuDiv = document.createElement("div");
  const menuHeader = document.createElement("h1");
  if(!Viikko){
    menuHeader.textContent = "Menu";
  }
  else if(Viikko){
    menuHeader.textContent = menuData.date;
  }
  menuDiv.appendChild(menuHeader);
  const courseList = document.createElement("ul");
  menuData.courses.forEach((course) => {
    const courseItem = document.createElement("li");
    courseItem.textContent = course.name;
    courseList.appendChild(courseItem);
  });
  menuDiv.appendChild(courseList);
  return menuDiv;
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
      )
      .on("click", function () {
        activeRestaurantId = nearestRestaurant._id;
        showMenu(nearestRestaurant._id);
      });
  });
}

function listRestaurants() {
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

      let button = document.createElement("button");
      button.textContent = "Add to Favorites";
      button.addEventListener("click", function () {
        if (
          !favoriteRestaurants
            .map((favRestaurant) => favRestaurant.name)
            .includes(restaurant.name)
        ) {
          favoriteRestaurants.push(restaurant);
          button.textContent = "";
          const checkMark = document.createElement("span");
          checkMark.textContent = "✓";
          checkMark.style.fontSize = "300%";
          checkMark.style.fontWeight = "bold";
          button.appendChild(checkMark);
          console.log(favoriteRestaurants);
        } else {
          alert("Restaurant already exists in favorites");
        }
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

const restaurantTypeSelect = document.getElementById("restaurantType");
const tableBody = document.querySelector("#restaurants-table tbody");

restaurantTypeSelect.addEventListener("change", () => {
  const selectedType = restaurantTypeSelect.value;
  createTable(selectedType);
});

const createTable = (restaurantType = "all") => {
  tableBody.innerHTML = "";

  let filteredRestaurants = [];

  if (restaurantType === "Sodexo") {
    filteredRestaurants = sodexoRestaurants;
  } else if (restaurantType === "Compass Group") {
    filteredRestaurants = compassGroupRestaurants;
  } else if (restaurantType === "favorites") {
    filteredRestaurants = favoriteRestaurants;
  } else {
    filteredRestaurants = restaurants;
  }

  filteredRestaurants.sort((a, b) => a.distance - b.distance);

  filteredRestaurants.forEach((restaurant) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = restaurant.name;
    row.appendChild(nameCell);

    const addressCell = document.createElement("td");
    addressCell.textContent = restaurant.address;
    row.appendChild(addressCell);

    const distanceCell = document.createElement("td");
    distanceCell.textContent = restaurant.distanceKm.toFixed(1) + " km";
    row.appendChild(distanceCell);

    const checkboxCell = document.createElement("td");

    row.appendChild(checkboxCell);

    const buttonCell = document.createElement("td");
    const button = document.createElement("button");
    button.textContent = "Add to Favorites";
    button.addEventListener("click", function () {
      if (
        !favoriteRestaurants
          .map((favRestaurant) => favRestaurant.name)
          .includes(restaurant.name)
      ) {
        favoriteRestaurants.push(restaurant);
        button.textContent = "";
        const checkMark = document.createElement("span");
        checkMark.textContent = "✓";
        checkMark.style.fontSize = "300%";
        checkMark.style.fontWeight = "bold";
        button.appendChild(checkMark);
      } else {
        alert("Restaurant already exists in favorites");
      }
    });
    buttonCell.appendChild(button);
    row.appendChild(buttonCell);

    tableBody.appendChild(row);
  });
};

getRestaurants();
