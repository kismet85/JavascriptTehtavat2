import { restaurantRow, restaurantModal } from "./components2.js";
                                                 
const restaurants = [];

const table = document.querySelector("table");
const modal = document.getElementById("restList");
const span = document.getElementsByClassName("close")[0];

const getRestaurants = async () => {
  try {
    const response = await fetch(
      "https://10.120.32.94/restaurant/api/v1/restaurants"
    );
    if (!response.ok) {
      throw new Error("HTTP error, status = " + response.status);
    } else {
      const data = await response.json();
      data.forEach((restaurant) => {
        restaurants.push(restaurant);
      });
      restaurants.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      createTable();
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

const getDailyMenu = async (id) =>{
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

const restaurantTypeSelect = document.getElementById('restaurantType');

restaurantTypeSelect.addEventListener('change', () => {
  const selectedType = restaurantTypeSelect.value;
  createTable(selectedType);
});

const createTable = (restaurantType = 'all') => {

  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  const filteredRestaurants = restaurants.filter(restaurant => {
    return restaurantType === 'all' || restaurant.company === restaurantType;
  });

  filteredRestaurants.forEach((restaurant) => {

    const row = restaurantRow(restaurant);

    row.addEventListener("click", async () => {
      document.querySelectorAll("tr").forEach((row) => {
        row.classList.remove("highlight");
      });
      row.classList.add("highlight");
      modal.style.display = "block";

      const modalContent = document.querySelector(".restContent");

      while (modalContent.firstChild) {
        modalContent.removeChild(modalContent.firstChild);
      }
      const menuPromise = getDailyMenu(restaurant._id);
      menuPromise.then((menu) => {
        modalContent.innerHTML = restaurantModal(restaurant, menu);
      });
    });

    table.appendChild(row);
  });
  span.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

getRestaurants();