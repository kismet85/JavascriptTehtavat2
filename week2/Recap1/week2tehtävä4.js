"use strict"
function gradeMyScore() 
{
    var scorepoints = parseInt(prompt("Enter your score to get a grade: "));

    var score;

    if(scorepoints< 40)
    {
        score = 0
    }
    else if(scorepoints > 39 && scorepoints <=51)
    {
        score = 1;
    }
    else if(scorepoints > 51 && scorepoints <=63)
    {
        score = 2;
    }
    else if(scorepoints > 63 && scorepoints <=75)
    {
        score = 3;
    }
    else if(scorepoints > 75 && scorepoints <=87)
    {
        score = 4;
    }
    else
    {
        score = 5;
    }

    document.getElementById("code").innerHTML = score;
}