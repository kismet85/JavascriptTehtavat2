var numbers = [];

function numbersTehtava() {
    askFiveNumbers();
    printNumbers();
    checkForNumbersInArray();
    popLastNumber();
    sortArray();
}

numbersTehtava();

function askFiveNumbers() {
    for (let index = 1; index <= 5; index++) {
        numberPrompt = prompt("Enter Number " + index + ": ");
        number = parseInt(numberPrompt);
        numbers.push(number);
    }
}

function printNumbers() {
    document.getElementById("code").innerHTML += "Numbers: " + numbers + "<br>";
}

function checkForNumbersInArray() {
    var searchNumber = prompt("Enter a Number to Search: ");
    if (numbers.includes(parseInt(searchNumber))) {
        document.getElementById("code").innerHTML += "Number " + searchNumber + " is found in array.<br>";
    } else {
        document.getElementById("code").innerHTML += "Number " + searchNumber + " is not found in array.<br>";
    }
}

function popLastNumber() {
    numbers.pop();
    document.getElementById("code").innerHTML += "Updated Numbers: " + numbers + "<br>";
}

function sortArray() {
    numbers.sort((a, b) => a - b);
    document.getElementById("code").innerHTML += "Sorted Numbers: " + numbers.join(", ") + "<br>";
}
