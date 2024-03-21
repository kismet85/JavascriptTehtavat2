const numbers = [2,5,22,17,3];

function evenOrNotNumbers() {
    console.log("Original array: " + numbers);
    sortArray (numbers,"asc");
    sortArray (numbers,"desc");
}

evenOrNotNumbers();



function sortArray (numberArray, type) 
{
    if(type==="asc")
    {
        let sortedArray = numberArray.sort((a, b) => a - b);
        console.log("Ascending Sorted Array: " + sortedArray);
    }
    else if(type==="desc")
    {
        let sortedArray = numberArray.sort((b, a) => a - b);
        console.log("Descending Sorted Array: " + sortedArray);
    }
    
}