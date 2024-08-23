document.addEventListener("DOMContentLoaded", () => {
    const movieList = document.getElementById("movieList");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const loadingPercentage = document.getElementById("loadingPercentage");
    const progressBar = document.getElementById("progressBar");
    const videoPlayerContainer = document.getElementById("videoPlayerContainer");
    const videoPlayer = document.getElementById("videoPlayer");
    const backButton = document.getElementById("backButton");
    const homeSection = document.getElementById("home");
    const searchBar = document.getElementById("searchBar");
    const logo = document.getElementById("logo");

    const movieTitle = document.getElementById("movieTitle");
    const movieDetails = document.getElementById("movieDetails");

    let movies = []; // Store movies globally to allow filtering

    // Fetch movies and display them
    fetch("https://raw.githubusercontent.com/jessesrekdev/Chillax-time-/main/movies.json")
        .then(response => response.json())
        .then(data => {
            movies = data.movies; // Store the movies
            displayMovies(movies);

            // Check if there's a movie id in the URL
            const urlParams = new URLSearchParams(window.location.hash.replace('#', ''));
            const movieId = urlParams.get('id');
            if (movieId) {
                // Find and display the movie with the specified id
                const selectedMovie = document.getElementById(movieId);
                if (selectedMovie) {
                    selectedMovie.click();
                }
            }
        })
        .catch(error => console.error("Error fetching movies:", error));

    // Function to display movies in the movie list
    function displayMovies(moviesToDisplay) {
        movieList.innerHTML = ""; // Clear the movie list
        moviesToDisplay.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.id = movie.movie_id; // Assign the movie_id as the id of the movie card

            movieCard.innerHTML = `
                <img src="${movie.poster_url}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>VJ: ${movie.vj} | Released: ${movie.released}</p>
            `;

            movieCard.dataset.videoSrc = movie.video_src;
            movieCard.dataset.title = movie.title;
            movieCard.dataset.vj = movie.vj;
            movieCard.dataset.released = movie.released;

            movieCard.addEventListener("click", () => {
                // Blur the background
                homeSection.classList.add("blurred");

                // Show the loading spinner
                loadingSpinner.style.display = "block";

                // Simulate video loading
                let progress = 0;
                const loadingInterval = setInterval(() => {
                    progress += 1;
                    loadingPercentage.textContent = `${progress}%`;
                    progressBar.style.width = `${progress}%`;

                    if (progress >= 100) {
                        clearInterval(loadingInterval);
                        // Hide the loading spinner
                        loadingSpinner.style.display = "none";

                        // Show the video player and load the video
                        movieList.style.display = "none";
                        videoPlayerContainer.style.display = "block";
                        videoPlayer.src = movieCard.dataset.videoSrc;
                        videoPlayer.play();

                        // Show the movie details
                        movieTitle.textContent = movieCard.dataset.title;
                        movieDetails.textContent = `VJ: ${movieCard.dataset.vj} | Released: ${movieCard.dataset.released}`;

                        // Update search bar
                        searchBar.value = movieCard.dataset.title;
                        searchBar.disabled = true;

                        // Hide the logo and show the back button
                        logo.classList.add("hidden");
                        backButton.classList.add("show");

                        // Remove blur from the background
                        homeSection.classList.remove("blurred");

                        // Update URL with the movie id
                        window.location.hash = `#${movieCard.id}`;
                    }
                }, 30); // Adjust the speed of loading simulation
            });

            movieList.appendChild(movieCard);
        });
    }

    // Search functionality
    searchBar.addEventListener("input", (event) => {
        if (!searchBar.disabled) {
            const searchTerm = event.target.value.toLowerCase();
            const filteredMovies = movies.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm)
            );
            displayMovies(filteredMovies);
        }
    });

    backButton.addEventListener("click", () => {
        // Pause the video
        videoPlayer.pause();
        videoPlayer.src = "";

        // Hide the video player and show the movie list
        videoPlayerContainer.style.display = "none";
        movieList.style.display = "grid";

        // Reset search bar
        searchBar.value = "";
        searchBar.disabled = false;

        // Show the logo and hide the back button
        logo.classList.remove("hidden");
        backButton.classList.remove("show");

        // Clear the URL hash
        window.location.hash = '';
    });

    // Ensure the back button is visible when the video player is displayed
    videoPlayer.addEventListener("play", () => {
        backButton.classList.add("show");
        logo.classList.add("hidden");
        searchBar.disabled = true;
    });

    videoPlayer.addEventListener("pause", () => {
        backButton.classList.remove("show");
        logo.classList.remove("hidden");
        searchBar.disabled = false;
    });
});

// Code for the "Already Joined" button functionality

document.addEventListener("DOMContentLoaded", () => {
    const telegramDialog = document.getElementById("telegramDialog");
    const dismissButton = document.getElementById("dismissButton");
    const alreadyJoinedButton = document.getElementById("alreadyJoinedButton"); // Make sure the ID matches
    const homeSection = document.getElementById("home");

    // Show dialog when the website is loaded or visited
    telegramDialog.style.display = "flex";
    homeSection.classList.add("blurred");

    // Dismiss dialog
    dismissButton.addEventListener("click", () => {
        telegramDialog.style.display = "none";
        homeSection.classList.remove("blurred");
    });

    // "Already Joined" button functionality
    alreadyJoinedButton.addEventListener("click", () => {
        telegramDialog.style.display = "none";
        homeSection.classList.remove("blurred");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const videoPlayer = document.getElementById("videoPlayer");

    // Add the "nodownload" option to the video player
    if (videoPlayer) {
        videoPlayer.setAttribute("controlsList", "nodownload");
    }
});
