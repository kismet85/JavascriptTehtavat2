"use strict";

function multiplicationTable() {
    var positiveInt = prompt("Enter a positive number: ");
    var number = parseInt(positiveInt);
    var tableHtml = "<tr><th>&nbsp;</th>";

    for (let indexj = 1; indexj <= number; indexj++) {
        tableHtml += "<th>" + indexj + "</th>";
    }
    tableHtml += "</tr>";

    for (let indexi = 1; indexi <= number; indexi++) {
        tableHtml += "<tr><th>" + indexi + "</th>";
        for (let indexj = 1; indexj <= number; indexj++) {
            var productRow = indexi * indexj;
            tableHtml += "<td>" + productRow + "</td>";
        }
        tableHtml += "</tr>";
    }

    document.getElementById("code").innerHTML = tableHtml;
}
