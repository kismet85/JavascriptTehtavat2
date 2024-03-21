var numbers = [2,5,22,17,3];
var asking = false;
function evenOrNotNumbers() {
    console.log("Original array: " + numbers);
    sortArray (numbers);
}

evenOrNotNumbers();



function sortArray (numberArray) 
{
    let sortedArray = numberArray.sort((a, b) => a - b);
    console.log("Sorted Array: " + sortedArray);
}