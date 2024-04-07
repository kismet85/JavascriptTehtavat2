const restaurantRow = (restaurant) => {
    const name = restaurant.name;
    const company = restaurant.company;
  
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.textContent = name;
    row.appendChild(nameCell);
  
    const companyCell = document.createElement('td');
    companyCell.textContent = company;
    row.appendChild(companyCell);
  
    return row;
  };
  
  const restaurantModal = (restaurant, menu) => {
    const name = restaurant.name;
    const address = restaurant.address;
    const postalCode = restaurant.postalCode;
  
    let menuHtml = '';
    menuHtml += `<h2>${name}</h2>`;
    menuHtml += `<p>${address}</p>`;
    menuHtml += `<p>${postalCode}</p>`;
    menuHtml += '<ul>';
    menu.courses.forEach((course) => {
      menuHtml += `<li>${course.name}</li>`;
    });
    menuHtml += '</ul>';
    return menuHtml;
  };
  
  export {restaurantRow, restaurantModal};