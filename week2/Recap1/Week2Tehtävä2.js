"use strict";

function calculateDistance() {
    var x1 = parseFloat(prompt("Enter the x-coordinate of point 1:"));
    var y1 = parseFloat(prompt("Enter the y-coordinate of point 1:"));
    var x2 = parseFloat(prompt("Enter the x-coordinate of point 2:"));
    var y2 = parseFloat(prompt("Enter the y-coordinate of point 2:"));

    console.log("x1:", x1, "y1:", y1, "x2:", x2, "y2:", y2); 

    var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    console.log("Distance:", distance); 

    var euclidresult = document.createElement("p");
    euclidresult.innerHTML = "The distance between the two points is: " + distance.toFixed(2);
    document.body.appendChild(euclidresult);
}
