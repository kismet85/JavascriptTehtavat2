"use strict"
function rowTable() 
{
    var positiveInt = prompt("Enter a positive number: ");

    var number = parseInt(positiveInt);

    var productRow = 0;

    var tableHtml = "<h2>Sum of numbers:</h2>";
        for (let indexj = 1; indexj <= number; indexj++) {
            productRow += indexj;
           
            tableHtml += indexj + "\t";
        }
    
    document.getElementById("code").innerHTML = tableHtml;
    document.getElementById("result").innerHTML = "Sum of all numbers: " + productRow;
    
}