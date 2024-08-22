document.addEventListener("DOMContentLoaded", () => {
            const movieList = document.getElementById("movieList");
            const loadingSpinner = document.getElementById("loadingSpinner");
            const loadingPercentage = document.getElementById("loadingPercentage");
            const progressBar = document.getElementById("progressBar");
            const videoPlayerContainer = document.getElementById("videoPlayerContainer");
            const videoPlayer = document.getElementById("videoPlayer");
            const backButton = document.getElementById("backButton");
            const homeSection = document.getElementById("home");

            fetch("https://raw.githubusercontent.com/jessesrekdev/Chillax-time-/main/movies.json")
                .then(response => response.json())
                .then(data => {
                    const movies = data.movies;

                    movies.forEach(movie => {
                        const movieCard = document.createElement("div");
                        movieCard.classList.add("movie-card");

                        movieCard.innerHTML = `
                            <img src="${movie.poster_url}" alt="${movie.title}">
                            <h3>${movie.title}</h3>
                            <p>VJ: ${movie.vj} | Released: ${movie.released}</p>
                        `;

                        movieCard.dataset.videoSrc = movie.video_src;

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
                                    videoPlayer.src = movie.video_src;
                                    videoPlayer.play();

                                    // Remove blur from the background
                                    homeSection.classList.remove("blurred");

                                    // Show the back button
                                    backButton.style.display = "block";
                                }
                            }, 30); // Adjust the speed of loading simulation
                        });

                        movieList.appendChild(movieCard);
                    });
                })
                .catch(error => console.error("Error fetching movies:", error));

            backButton.addEventListener("click", () => {
                // Pause the video
                videoPlayer.pause();
                videoPlayer.src = "";

                // Blur the background for 2 seconds
                homeSection.classList.add("blurred");
                videoPlayerContainer.style.display = "none";

                setTimeout(() => {
                    // Remove blur, hide the video player, show movie list
                    homeSection.classList.remove("blurred");
                    videoPlayerContainer.style.display = "none";
                    movieList.style.display = "grid";

                    // Hide the back button
                    backButton.style.display = "none";
                }, 2000); // 2-second delay
            });
        });
