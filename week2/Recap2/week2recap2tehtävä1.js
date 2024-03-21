
function arrayInvestigator()
{
    var fruits = ["apple", "banana", "orange", "grape", "kiwi"];
    console.log(fruits);
    console.log("Length of Fruits: " + fruits.length);
    console.log("Element at Index 2: " + fruits[2]);
    const lastElement = fruits[fruits.length - 1];
    console.log("Last element of Fruits: " + lastElement);

    var vegetables = [];

    firstVegetable = prompt("Enter first vegetable to add: ")
    vegetables.push(firstVegetable);
    secondVegetable = prompt("Enter second vegetable to add: ")
    vegetables.push(secondVegetable);
    thirdVegetable = prompt("Enter third vegetable to add: ")
    vegetables.push(thirdVegetable);
    console.log(vegetables);
    console.log("Length of Vegetables: " + vegetables.length);
    
}
arrayInvestigator();
