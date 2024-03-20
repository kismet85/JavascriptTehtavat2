"use strict"
function checkTriangle() 
{
    var firstSide = parseInt(prompt("Enter first side of triangle"));
    var secondSide = parseInt(prompt("Enter second side of triangle"));
    var thirdSide = parseInt(prompt("Enter third side of triangle"));

    var result = document.createElement("p");

    if(firstSide==secondSide&&secondSide==thirdSide)
    {
        result.innerHTML = "The triangle is an equilateral"
    }
    else if(firstSide==secondSide&&secondSide != thirdSide)
    {
        result.innerHTML = "The triangle is isosceles"
    }
    else
    {
        result.innerHTML = "The triangle is scalene"
    }

    document.body.appendChild(result);
}