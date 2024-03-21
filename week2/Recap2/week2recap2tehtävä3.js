var numbers = [];
var asking = false;
function evenOrNotNumbers() {
    askNumbers();
}

evenOrNotNumbers();

function askNumbers() {
    asking = true;
    while(asking)
    {
        var numberAsk = prompt("Enter a number (or 'done' to finish): ");
        if(numberAsk!="done")
        {
            numbers.push(parseInt(numberAsk));
        }
        else
        {
            break;
        }
    }
    printNumbers();
}

function printNumbers() 
{
    let noEvens = false;
    let printableText = "Even Numbers: ";
    for (let index = 0; index < numbers.length; index++) {
        const element = numbers[index];
        if(element % 2 === 0)
        {
            printableText += element + ", ";
            noEvens = true;
        }
    }
    if(noEvens)
    {
        printableText += "None";
    }
    document.getElementById("code").innerHTML = printableText;
}