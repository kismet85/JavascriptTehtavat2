"use strict";
var temperature = parseFloat(prompt("Syötä lämpötila celsiuksena!"));

var fahrenheit = (temperature * 9/5) + 32;
var kelvin = temperature + 273.15;

let fahrenheitParagraph = document.createElement("p");
let kelvinParagraph = document.createElement("p");

fahrenheitParagraph.innerHTML =  "The temperature in fahrenheit is: " + fahrenheit + "F!";
kelvinParagraph.innerHTML = "The temperature in kelvin is: " + kelvin + "K!";

document.body.appendChild(fahrenheitParagraph);
document.body.appendChild(kelvinParagraph);