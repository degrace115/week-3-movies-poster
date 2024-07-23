document.addEventListener("DOMContentLoaded", () => {
  const filmsList = document.getElementById('films');
  const postersList = document.getElementById('posters-list');
  const moviePoster = document.getElementById('movie-poster');
  const movieTitle = document.getElementById('movie-title');
  const movieDescription = document.getElementById('movie-description');
  const movieRuntime = document.getElementById('movie-runtime');
  const movieShowtime = document.getElementById('movie-showtime');
  const movieTickets = document.getElementById('movie-tickets');
  const buyTicketButton = document.getElementById('buy-ticket');

  const movies = [
      {
          id: 1,
          title: "Descendants",
          runtime: "108",
          capacity: 30,
          showtime: "04:00PM",
          tickets_sold: 27,
          description: "The rise of the red daughter of the queen of hearts.",
          poster: "https://www.imdb.com/title/tt20202136/mediaviewer/rm47018497/?ref_=tt_ov_i"
      },
      {
          id: 2,
          title: "Deadpool",
          runtime: "118",
          capacity: 50,
          showtime: "06:45PM",
          tickets_sold: 44,
          description: "Wolverine is recovering from his injury when he crosses paths with loudmouth Deadpool. They team up to defeat a common enemy.",
          poster: "https://www.imdb.com/title/tt6263850/mediaviewer/rm136803841/?ref_=tt_ov_i"
      },
      {
          id: 3,
          title: "IF",
          runtime: "92",
          capacity: 40,
          showtime: "08:00PM",
          tickets_sold: 15,
          description: "A barber seeks vengeance after his home is burglarized.",
          poster: "https://www.imdb.com/title/tt11152168/mediaviewer/rm2582412545/?ref_=tt_ov_i"
      }
  ];

  movies.forEach(movie => {
      // Populate films list
      const li = document.createElement('li');
      li.textContent = movie.title;
      li.addEventListener('click', () => showMovieDetails(movie));
      filmsList.appendChild(li);

      // Populate posters list
      const posterDiv = document.createElement('div');
      posterDiv.classList.add('poster-item');
      const posterImg = document.createElement('img');
      posterImg.src = movie.poster;
      posterImg.alt = movie.title;
      const posterLink = document.createElement('a');
      posterLink.href = `#${movie.title.replace(/\s+/g, '-').toLowerCase()}`;
      posterLink.textContent = movie.title;
      posterDiv.appendChild(posterImg);
      posterDiv.appendChild(posterLink);
      postersList.appendChild(posterDiv);
  });

  function showMovieDetails(movie) {
      moviePoster.src = movie.poster;
      movieTitle.textContent = movie.title;
      movieDescription.textContent = movie.description;
      movieRuntime.textContent = movie.runtime;
      movieShowtime.textContent = movie.showtime;
      movieTickets.textContent = movie.capacity - movie.tickets_sold;

      buyTicketButton.addEventListener('click', () => buyTicket(movie), { once: true });
  }

  function buyTicket(movie) {
      if (movie.tickets_sold < movie.capacity) {
          movie.tickets_sold += 1;
          movieTickets.textContent = movie.capacity - movie.tickets_sold;

          // Update the server (assuming a JSON server)
          fetch(`http://localhost:3000/movies/${movie.id}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ tickets_sold: movie.tickets_sold })
          });
      } else {
          alert('No more tickets available');
      }
  }
});
