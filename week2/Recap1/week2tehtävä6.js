"use strict"
function multiplicationTable() 
{
    var positiveInt = prompt("Enter a positive number: ");

    var number = parseInt(positiveInt);

    var productRow;

    var tableHtml = "<h2>Multiplication Table:</h2>";
    for (let indexi = 1; indexi <= number; indexi++) {
        for (let indexj = 1; indexj <= number; indexj++) {
            productRow = indexi * indexj;
            tableHtml += productRow + "\t";
        }
        tableHtml += "<br>";
    }
    document.getElementById("code").innerHTML = tableHtml;

    
}