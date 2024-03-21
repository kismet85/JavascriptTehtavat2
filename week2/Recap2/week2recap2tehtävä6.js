"use strict";

function startMovieRatingProgram() {
    var numberOfMovies = parseInt(prompt("Enter the number of movies you want to rate:"));

    if (isNaN(numberOfMovies) || numberOfMovies <= 0) {
        alert("Please enter a valid number greater than 0.");
        return;
    }

    var movies = [];

    for (var i = 0; i < numberOfMovies; i++) {
        var title = prompt("Enter the title of movie " + (i + 1) + ":");
        var rating = parseInt(prompt("Enter the rating of movie " + (i + 1) + " (1 to 5):"));

        if (isNaN(rating) || rating < 1 || rating > 5) {
            alert("Please enter a valid rating between 1 and 5.");
            return;
        }

        var movie = {
            title: title,
            rating: rating
        };
        movies.push(movie);
    }

    movies.sort((a, b) => b.rating - a.rating);

    var highestRatedMovie = movies[0];

    console.log("Sorted list of movies:");
    movies.forEach(function(movie) {
        console.log(movie.title + " - Rating: " + movie.rating);
    });
    console.log("Highest-rated movie: " + highestRatedMovie.title + " - Rating: " + highestRatedMovie.rating);
}

startMovieRatingProgram();
