document.addEventListener('DOMContentLoaded', () => {
    const movieSelect = document.getElementById('movie-select');
    const movieContainer = document.getElementById('movie-container');
    const ticketQuantity = document.getElementById('ticket-quantity');
    const purchaseBtn = document.getElementById('purchase-btn');
    const movieName = document.getElementById('movie-name');
    const selectedQuantity = document.getElementById('selected-quantity');
    const paymentForm = document.getElementById('payment-form');
  
    // Fetch movie data from local json-server
    fetch('http://localhost:3000/movies')
      .then(response => response.json())
      .then(data => {
        data.forEach(movie => {
          // Populate movie select options
          const option = document.createElement('option');
          option.value = movie.id;
          option.textContent = movie.title;
          movieSelect.appendChild(option);
  
          // Display movie posters
          const movieDiv = document.createElement('div');
          movieDiv.classList.add('movie');
          movieDiv.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title} Poster" class="movie-poster">
            <p>${movie.title}</p>
          `;
          movieContainer.appendChild(movieDiv);
        });
      })
      .catch(error => {
        console.error('Error fetching movie data:', error);
      });
  
    // Handle purchase button click
    purchaseBtn.addEventListener('click', () => {
      const selectedMovie = movieSelect.options[movieSelect.selectedIndex].text;
      const quantity = ticketQuantity.value;
  
      movieName.textContent = `Movie: ${selectedMovie}`;
      selectedQuantity.textContent = `Quantity: ${quantity}`;
    });
  
    // Handle payment form submission
    paymentForm.addEventListener('submit', event => {
      event.preventDefault();
      alert('Payment successful! Enjoy your movie.');
    });
  });
  
